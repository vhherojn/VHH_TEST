import type { Character, Recipe, TechniqueItem, Building, Pill } from '../../types/index.ts';
import { ItemQuality, EquipmentQuality, TalentType, ProfessionType, ItemType } from '../../types/index.ts';
import { ALL_TECHNIQUES, PROFESSION_CRAFTING_SUCCESS_RATES, ALL_ITEMS } from '../../constants.ts';

const TALENT_MAP: Partial<Record<ProfessionType, TalentType>> = {
    [ProfessionType.ALCHEMIST]: TalentType.ALCHEMY,
    [ProfessionType.BLACKSMITH]: TalentType.BLACKSMITHING,
    [ProfessionType.TALISMAN_MASTER]: TalentType.TALISMAN_MAKING,
    [ProfessionType.FORMATION_MASTER]: TalentType.FORMATION_MAKING,
};

const TECHNIQUE_BONUS_MAP: Partial<Record<ProfessionType, string>> = {
    [ProfessionType.ALCHEMIST]: 'alchemySuccessRateBonus',
    [ProfessionType.BLACKSMITH]: 'blacksmithingSuccessRateBonus',
    [ProfessionType.TALISMAN_MASTER]: 'talismanSuccessRateBonus',
    [ProfessionType.FORMATION_MASTER]: 'formationSuccessRateBonus',
};

const qualityToNumber = (item: any): number => {
    if (!item || !item.quality || !item.equipmentQuality) return 0;
    const tierOrder = Object.values(ItemQuality);
    const qualityOrder = Object.values(EquipmentQuality);
    const tierValue = tierOrder.indexOf(item.quality) * 10;
    const qualityValue = qualityOrder.indexOf(item.equipmentQuality);
    return tierValue + qualityValue;
};

export const calculateCraftingSuccessChance = (crafter: Character, recipe: Recipe, professionType: ProfessionType, building: Building): number => {
    const profession = crafter.professions.find(p => p.type === professionType);
    if (!profession) return 0.01; // Không thể chế tạo nếu không có nghề

    // Determine the highest quality item that can be produced by this recipe
    const bestOutputItem = recipe.outputs
        .map(o => ALL_ITEMS[o.itemId])
        .reduce((best, current) => qualityToNumber(current) > qualityToNumber(best) ? current : best, { quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.HA_PHAM });

    if (!bestOutputItem) return 0.01;

    const itemTier = bestOutputItem.quality;
    const itemQuality = (bestOutputItem as any).equipmentQuality;

    const crafterTierIndex = Object.values(ItemQuality).indexOf(profession.tier);
    const itemTierIndex = Object.values(ItemQuality).indexOf(itemTier);
    const tierDifference = crafterTierIndex - itemTierIndex;
    
    let baseChance = 0;
    if (tierDifference < 0) { // Crafter tier is lower than item tier
         baseChance = 0.01; // Almost impossible
    } else if (tierDifference > 0) { // Crafter tier is higher than item tier
        baseChance = 0.8 + (tierDifference * 0.1); // 90% for 1 tier diff, 100% for 2 tiers
    } else { // Same tier
        if (!itemQuality) {
            baseChance = 0.6; // Default chance for items without quality
        } else {
            baseChance = PROFESSION_CRAFTING_SUCCESS_RATES[profession.tier]?.[profession.quality]?.[itemTier]?.[itemQuality] || 0;
        }
    }
    
    // Penalty for high-quality pills is implicitly handled by the base chance table if we consider the best output
    
    // Cộng thưởng từ Thiên phú (rất nhỏ)
    const talentType = TALENT_MAP[professionType];
    if (talentType) {
        // 100 điểm thiên phú sẽ cộng thêm 5% tỷ lệ
        baseChance += (crafter.talents[talentType] || 0) / 2000; 
    }
    
    // Cộng thưởng từ các Công pháp/Bí thuật
    const bonusKey = TECHNIQUE_BONUS_MAP[professionType];
    if (bonusKey) {
        const allTechs = [...Object.values(crafter.techniques).flat().filter(Boolean), ...crafter.learnedTechniques, ...crafter.professionTechniques];
        const uniqueTechIds = [...new Set(allTechs)];

        for (const techId of uniqueTechIds) {
            const tech = ALL_TECHNIQUES[techId] as TechniqueItem;
            if (tech && tech.effects && typeof (tech.effects as any)[bonusKey] === 'number') {
                baseChance += (tech.effects as any)[bonusKey];
            }
        }
    }

    // Cộng thưởng từ Thần Thức
    if (crafter.thanThuc) {
        // 100 điểm thần thức cộng thêm 10% tỷ lệ
        baseChance += crafter.thanThuc / 1000;
    }

    // Cộng thưởng từ Quản Lý
    if (building.managerId) {
        baseChance += 0.05; // 5% bonus
    }

    return Math.min(0.95, Math.max(0.01, baseChance)); // Giới hạn tỷ lệ trong khoảng 1% đến 95%
};