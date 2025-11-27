
import type { Clan, Event, TechniqueItem, Character, MasteryProgress } from '../../types/index.ts';
import { ItemType, ProfessionType, ItemQuality, EquipmentQuality, CultivationStage, TechniqueMastery } from '../../types/index.ts';
import { ALL_ITEMS, ALL_TECHNIQUES } from '../../constants.ts';
import { deepClone } from '../utils/clone.ts';

type TechniqueActionResult = { updatedClan?: Clan; newEvents?: Omit<Event, 'id' | 'date'>[]; error?: string; };

const qualityToNumber = (item: TechniqueItem): number => {
    const tierOrder = Object.values(ItemQuality);
    const qualityOrder = Object.values(EquipmentQuality);
    const tierValue = tierOrder.indexOf(item.quality) * 10;
    const qualityValue = qualityOrder.indexOf(item.equipmentQuality);
    return tierValue + qualityValue;
};


// NEW HELPER FUNCTION
const autoEquipBestMainCultivation = (character: Character): { event?: Omit<Event, 'id' | 'date'> } => {
    const currentMainTechId = character.techniques.mainCultivation;
    const currentMainTech = currentMainTechId ? ALL_TECHNIQUES[currentMainTechId] as TechniqueItem : null;

    let bestLearnedTech: TechniqueItem | null = null;
    for (const techId of character.learnedTechniques) {
        const tech = ALL_TECHNIQUES[techId] as TechniqueItem;
        if (tech && tech.type === ItemType.CULTIVATION_METHOD) {
            if (!bestLearnedTech || qualityToNumber(tech) > qualityToNumber(bestLearnedTech)) {
                bestLearnedTech = tech;
            }
        }
    }

    if (bestLearnedTech && (!currentMainTech || qualityToNumber(bestLearnedTech) > qualityToNumber(currentMainTech))) {
        // Unequip current main tech and add it back to learned list
        if (currentMainTech) {
            character.learnedTechniques.push(currentMainTech.id);
        }
        // Remove the new best tech from learned list
        character.learnedTechniques = character.learnedTechniques.filter(id => id !== bestLearnedTech!.id);
        // Equip the new best tech
        character.techniques.mainCultivation = bestLearnedTech.id;
        
        return {
            event: {
                description: `Sau khi lĩnh ngộ, ${character.name} cảm thấy công pháp mới "${bestLearnedTech.name}" phù hợp hơn với đại đạo của mình, liền lập tức thay đổi công pháp chủ tu.`,
                characterIds: [character.id]
            }
        };
    }
    
    return {};
};


export function storeTechnique(clan: Clan, techniqueId: string): TechniqueActionResult {
    const item = ALL_ITEMS[techniqueId as keyof typeof ALL_ITEMS] as TechniqueItem;
    if (!item) {
        return { error: 'Bí tịch không tồn tại.' };
    }
    if ((clan.itemInventory[techniqueId] || 0) < 1) {
        return { error: `Không có bí tịch ${item.name} trong kho.` };
    }
    
    const techniqueTier = item.quality;
    const libraryFloor = clan.library[techniqueTier];

    if (!libraryFloor) {
        return { error: `Tàng Kinh Các chưa mở khóa Tầng ${techniqueTier} để cất giữ bí tịch này.` };
    }

    const emptySlotIndex = libraryFloor.indexOf(null);
    if (emptySlotIndex === -1) {
        return { error: `Tầng ${techniqueTier} của Tàng Kinh Các đã đầy.` };
    }

    const newClan = deepClone(clan);
    newClan.itemInventory[techniqueId] -= 1;
    if (newClan.itemInventory[techniqueId] === 0) {
        delete newClan.itemInventory[techniqueId];
    }
    newClan.library[techniqueTier]![emptySlotIndex] = techniqueId;

    return {
        updatedClan: newClan,
        newEvents: [{ description: `Bí tịch "${item.name}" đã được cất vào Tầng ${techniqueTier} của Tàng Kinh Các.` }]
    };
}

export function learnTechnique(clan: Clan, characterId: string, techniqueId: string): TechniqueActionResult {
    const newClan = deepClone(clan);
    const character = newClan.members.find((c: Character) => c.id === characterId);
    const technique = ALL_ITEMS[techniqueId as keyof typeof ALL_ITEMS] as TechniqueItem;

    if (!character) return { error: "Không tìm thấy tộc nhân." };
    if (!technique) return { error: "Bí tịch không tồn tại." };

    // Requirements check
    const { cultivationStage, elements, comprehension, daoTam } = technique.requirements;
    const currentStageIndex = Object.values(CultivationStage).indexOf(character.cultivationStage);
    const requiredStageIndex = cultivationStage ? Object.values(CultivationStage).indexOf(cultivationStage) : -1;
    
    if (requiredStageIndex !== -1 && currentStageIndex < requiredStageIndex) {
        return { error: `${character.name} chưa đủ cảnh giới (${cultivationStage}) để học ${technique.name}.` };
    }
    if (comprehension && character.comprehension < comprehension) {
        return { error: `${character.name} chưa đủ ngộ tính (${comprehension}) để học ${technique.name}.` };
    }
     if (daoTam && character.daoTam < daoTam) {
        return { error: `${character.name} chưa đủ đạo tâm (${daoTam}) để học ${technique.name}.` };
    }
    if (elements && !elements.some(e => character.spiritualRoot.elements.includes(e))) {
         return { error: `${character.name} không có linh căn phù hợp (${elements.join('/')}) để học ${technique.name}.` };
    }
    
    // Check if already learned
    if (character.learnedTechniques.includes(techniqueId) || character.professionTechniques.includes(techniqueId)) {
        return { error: `${character.name} đã học qua "${technique.name}".` };
    }

    if (technique.effects?.professionUnlock) {
        const professionType = technique.effects.professionUnlock as ProfessionType;
        if (!character.professions.some((p: any) => p.type === professionType)) {
            character.professionTechniques.push(techniqueId);
            character.professions.push({ type: professionType, tier: ItemQuality.NHAT_GIAI, quality: EquipmentQuality.HA_PHAM, exp: 0, expToNext: 100 });
        }
    } else {
        character.learnedTechniques.push(techniqueId);
    }
    
    // Initialize mastery
    character.masteredTechniques[techniqueId] = { mastery: TechniqueMastery.NHAP_MON, exp: 0 };
    
    const allEvents: Omit<Event, 'id' | 'date'>[] = [{
        description: `${character.name} đã học thành công "${technique.name}".`,
        characterIds: [characterId]
    }];

    // Auto-equip if it's a better main cultivation method
    if (technique.type === ItemType.CULTIVATION_METHOD) {
        const equipResult = autoEquipBestMainCultivation(character);
        if (equipResult.event) {
            allEvents.push(equipResult.event);
        }
    }

    return {
        updatedClan: newClan,
        newEvents: allEvents,
    };
}


export function equipTechnique(clan: Clan, characterId: string, techniqueId: string, slotType: 'mainCultivation' | 'subCultivation' | 'secretArts' | 'spells', slotIndex: number): TechniqueActionResult {
    const newClan = deepClone(clan);
    const character = newClan.members.find((c: Character) => c.id === characterId)!;
    
    if (!character.learnedTechniques.includes(techniqueId)) {
        return { error: "Công pháp chưa được học." };
    }
    const technique = ALL_TECHNIQUES[techniqueId] as TechniqueItem;

    // Unequip from learned list
    character.learnedTechniques = character.learnedTechniques.filter(id => id !== techniqueId);

    // Unequip from target slot if occupied and move back to learned
    let oldTechniqueId: string | null = null;
    if (slotType === 'mainCultivation') {
        oldTechniqueId = character.techniques.mainCultivation;
        character.techniques.mainCultivation = techniqueId;
    } else {
        oldTechniqueId = character.techniques[slotType][slotIndex];
        (character.techniques[slotType] as (string | null)[])[slotIndex] = techniqueId;
    }
    
    if (oldTechniqueId) {
        character.learnedTechniques.push(oldTechniqueId);
    }

    return {
        updatedClan: newClan,
        newEvents: [{ description: `${character.name} đã trang bị "${technique.name}".`, characterIds: [character.id] }]
    };
}


export function unequipTechnique(clan: Clan, characterId: string, techniqueId: string): TechniqueActionResult {
    const newClan = deepClone(clan);
    const character = newClan.members.find((c: Character) => c.id === characterId)!;
    
    let forgottenTechniqueId: string | null = null;
    let found = false;

    if (character.techniques.mainCultivation === techniqueId) {
        forgottenTechniqueId = character.techniques.mainCultivation;
        character.techniques.mainCultivation = null;
        found = true;
    } else {
        const checkSlots = (slotArray: 'subCultivation' | 'spells' | 'secretArts'): boolean => {
            const arr = character.techniques[slotArray] as (string | null)[];
            const index = arr.findIndex(id => id === techniqueId);
            if (index !== -1) {
                forgottenTechniqueId = arr[index];
                arr[index] = null;
                return true;
            }
            return false;
        }
        found = checkSlots('subCultivation') || checkSlots('spells') || checkSlots('secretArts');
    }

    if (!found || !forgottenTechniqueId) {
        return { error: "Không tìm thấy công pháp/bí thuật này trên người tộc nhân." };
    }
    
    // Add back to learned list
    character.learnedTechniques.push(forgottenTechniqueId);

    const techniqueInfo = ALL_TECHNIQUES[forgottenTechniqueId] as TechniqueItem;
    return {
        updatedClan: newClan,
        newEvents: [{
            description: `${character.name} đã gỡ bỏ "${techniqueInfo.name}", đưa về danh sách đã học.`,
            characterIds: [characterId]
        }]
    };
}

export function patriarchLearnTechnique(clan: Clan, techniqueId: string): TechniqueActionResult {
    const newClan = deepClone(clan);
    const patriarch = newClan.members.find((c: Character) => c.isPatriarch);
    const technique = ALL_ITEMS[techniqueId as keyof typeof ALL_ITEMS] as TechniqueItem;

    if (!patriarch) return { error: "Không tìm thấy tộc trưởng." };
    if (!technique) return { error: "Bí tịch không tồn tại." };
    if ((newClan.itemInventory[techniqueId] || 0) < 1) {
        return { error: `Không có bí tịch ${technique.name} trong kho.` };
    }
    
    // Requirements check
    const { cultivationStage, elements, comprehension, daoTam } = technique.requirements;
    const currentStageIndex = Object.values(CultivationStage).indexOf(patriarch.cultivationStage);
    const requiredStageIndex = cultivationStage ? Object.values(CultivationStage).indexOf(cultivationStage) : -1;
    
    if (requiredStageIndex !== -1 && currentStageIndex < requiredStageIndex) {
        return { error: `Tộc trưởng chưa đủ cảnh giới (${cultivationStage}) để học ${technique.name}.` };
    }
    if (comprehension && patriarch.comprehension < comprehension) {
        return { error: `Tộc trưởng chưa đủ ngộ tính (${comprehension}) để học ${technique.name}.` };
    }
    if (daoTam && patriarch.daoTam < daoTam) {
        return { error: `Tộc trưởng chưa đủ đạo tâm (${daoTam}) để học ${technique.name}.` };
    }
    if (elements && !elements.some(e => patriarch.spiritualRoot.elements.includes(e))) {
         return { error: `Tộc trưởng không có linh căn phù hợp (${elements.join('/')}) để học ${technique.name}.` };
    }
    
    // Check if already learned
    if (patriarch.learnedTechniques.includes(techniqueId) || patriarch.professionTechniques.includes(techniqueId) || Object.values(patriarch.techniques).flat().includes(techniqueId)) {
        return { error: `Tộc trưởng đã học qua "${technique.name}".` };
    }

    // Perform the action
    newClan.itemInventory[techniqueId] -= 1;
    if (newClan.itemInventory[techniqueId] <= 0) {
        delete newClan.itemInventory[techniqueId];
    }
    
    if (technique.effects?.professionUnlock) {
        const professionType = technique.effects.professionUnlock as ProfessionType;
        if (!patriarch.professions.some((p: any) => p.type === professionType)) {
            patriarch.professionTechniques.push(techniqueId);
            patriarch.professions.push({ type: professionType, tier: ItemQuality.NHAT_GIAI, quality: EquipmentQuality.HA_PHAM, exp: 0, expToNext: 100 });
        }
    } else {
        patriarch.learnedTechniques.push(techniqueId);
    }
    
    // Initialize mastery
    patriarch.masteredTechniques[techniqueId] = { mastery: TechniqueMastery.NHAP_MON, exp: 0 };
    
    const allEvents: Omit<Event, 'id' | 'date'>[] = [{
        description: `Tộc trưởng ${patriarch.name} đã học thành công "${technique.name}" từ kho của gia tộc.`,
        characterIds: [patriarch.id]
    }];
    
    // Auto-equip if it's a better main cultivation method
    if (technique.type === ItemType.CULTIVATION_METHOD) {
        const equipResult = autoEquipBestMainCultivation(patriarch);
        if (equipResult.event) {
            allEvents.push(equipResult.event);
        }
    }

    return {
        updatedClan: newClan,
        newEvents: allEvents
    };
}
