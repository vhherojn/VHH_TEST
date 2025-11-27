import type { Clan, Event, Character, Pill, Blueprint, Recipe, Talisman, DanPhuong } from '../../types/index.ts';
import { ItemQuality, ItemType, EquipmentQuality, ProfessionType, TalentType, Element } from '../../types/index.ts';
import { ALL_RECIPES, BUILDINGS, ALL_ITEMS } from '../../constants.ts';
import { deepClone } from '../utils/clone.ts';

type ItemActionResult = { updatedClan?: Clan; newEvents?: Omit<Event, 'id' | 'date'>[]; error?: string; };

export function storeItemToClan(clan: Clan, characterId: string, itemId: string): ItemActionResult {
    const newClan = deepClone(clan);
    const character = newClan.members.find((m: Character) => m.id === characterId);
    const itemInfo = ALL_ITEMS[itemId as keyof typeof ALL_ITEMS];

    if (!character) return { error: "Không tìm thấy tộc nhân." };
    if (!itemInfo) return { error: "Vật phẩm không tồn tại." };
    if ((character.inventory[itemId] || 0) < 1) return { error: `Trong túi đồ không có ${itemInfo.name}.` };

    character.inventory[itemId] -= 1;
    if (character.inventory[itemId] === 0) {
        delete character.inventory[itemId];
    }
    newClan.itemInventory[itemId] = (newClan.itemInventory[itemId] || 0) + 1;
    character.loyalty = Math.max(0, character.loyalty - 1);

    return {
        updatedClan: newClan,
        newEvents: [{
            description: `Tịch thu 1 ${itemInfo.name} từ ${character.name}, lòng trung thành giảm 1.`,
            characterIds: [character.id]
        }]
    };
}

export function useItem(clan: Clan, characterId: string, itemId: string): ItemActionResult {
    const newClan = deepClone(clan);
    const character = newClan.members.find((m: Character) => m.id === characterId);
    
    if (!character) return { error: "Không tìm thấy tộc nhân." };
    const itemInfo = ALL_ITEMS[itemId as keyof typeof ALL_ITEMS];
    if (!itemInfo) return { error: "Vật phẩm không tồn tại."};

    if ((character.inventory[itemId] || 0) < 1) return { error: `Trong túi đồ không có ${itemInfo.name}.` };

    if (itemInfo.type === ItemType.BLUEPRINT || itemInfo.type === ItemType.DAN_PHUONG) {
        const blueprintInfo = itemInfo as Blueprint | DanPhuong;
        if (!newClan.knownRecipes) newClan.knownRecipes = [];
        
        const recipe = ALL_RECIPES[blueprintInfo.recipeId];
        if (!recipe) return { error: "Công thức không hợp lệ." };

        if (newClan.knownRecipes.includes(recipe.id)) {
            return { error: `Gia tộc đã học qua ${blueprintInfo.name}.` };
        }

        character.inventory[itemId] -= 1;
        if (character.inventory[itemId] === 0) delete character.inventory[itemId];

        newClan.knownRecipes.push(recipe.id);
        
        return {
            updatedClan: newClan,
            newEvents: [{
                description: `${character.name} đã lĩnh ngộ ${blueprintInfo.name}, gia tộc đã có thể chế tạo ${recipe.name}.`,
                characterIds: [characterId]
            }]
        };
    }

    if (itemInfo.type === ItemType.PILL) {
        const pillInfo = itemInfo as Pill;

        // Special checks for specific pills
        if (pillInfo.effects.combat_recovery || pillInfo.effects.instant_recovery || pillInfo.effects.instant_mana_recovery || pillInfo.effects.instant_health_recovery || pillInfo.effects.lifespan_cost) {
            return { error: 'Loại đan dược này chỉ có thể dùng trong chiến đấu.' };
        }
        if (pillInfo.effects.requires_element_fire && !character.spiritualRoot.elements.includes(Element.FIRE)) {
            return { error: `${character.name} không có Hỏa linh căn, không thể sử dụng ${pillInfo.name}.` };
        }
        if (pillInfo.id.includes('duong_viem_dan') || pillInfo.id.includes('han_ngung_tan')) {
             return { error: `Loại đan dược này quá nguy hiểm, không thể trực tiếp sử dụng.` };
        }


        character.inventory[itemId] -= 1;
        if (character.inventory[itemId] === 0) delete character.inventory[itemId];

        let eventDescription = `${character.name} đã sử dụng ${pillInfo.name}.`;
        
        // Apply effects
        if (pillInfo.effects.cultivation_progress_gain) { character.cultivationProgress += pillInfo.effects.cultivation_progress_gain; eventDescription += ` Tu vi tăng ${pillInfo.effects.cultivation_progress_gain}.`; }
        if (pillInfo.effects.health_recovery) { character.health = Math.min(character.maxHealth, character.health + pillInfo.effects.health_recovery); eventDescription += ` Hồi phục ${pillInfo.effects.health_recovery} khí huyết.`; }
        if (pillInfo.effects.mana_recovery) { character.mana = Math.min(character.maxMana, character.mana + pillInfo.effects.mana_recovery); eventDescription += ` Hồi phục ${pillInfo.effects.mana_recovery} linh lực.`; }
        if (pillInfo.effects.injury_recovery) { character.injuryTurnsRemaining = Math.max(0, (character.injuryTurnsRemaining || 0) - pillInfo.effects.injury_recovery); eventDescription += ` Vết thương hồi phục tương đương ${pillInfo.effects.injury_recovery} tháng.`; }
        if (pillInfo.effects.aura_concealment) { eventDescription += ` Khí tức tạm thời được che giấu.`; }
        if (pillInfo.effects.full_recovery) { character.health = character.maxHealth; character.injuryTurnsRemaining = 0; eventDescription += ` Sinh cơ hồi phục, thương thế hoàn toàn khỏi hẳn!`; }
        if (pillInfo.effects.self_harm_buff) { character.injuryTurnsRemaining = (character.injuryTurnsRemaining || 0) + 120; eventDescription += ` Sức mạnh bùng nổ nhưng Kim Đan bị rạn nứt, trọng thương 120 tháng!`; }
        
        // Lifespan Increase
        if (pillInfo.effects.lifespan_increase) {
            if (!character.statModifiers) character.statModifiers = {};
            if (!character.statModifiers.lifespanPillsUsed) character.statModifiers.lifespanPillsUsed = {};
            
            const timesUsed = character.statModifiers.lifespanPillsUsed[pillInfo.id] || 0;
            let lifespanGain = pillInfo.effects.lifespan_increase;

            if (timesUsed === 1) lifespanGain *= 0.5;
            if (timesUsed >= 2) lifespanGain = 0;

            if (lifespanGain > 0) {
                character.maxAge += Math.floor(lifespanGain);
                character.statModifiers.lifespanPillsUsed[pillInfo.id] = timesUsed + 1;
                eventDescription += ` Sinh cơ được bổ sung, thọ nguyên tăng ${Math.floor(lifespanGain)} năm.`;
            } else {
                eventDescription += ` Dược lực đã bị kháng, không có tác dụng.`;
            }
        }
        
         if (pillInfo.effects.lifespan_cost) {
            character.maxAge -= pillInfo.effects.lifespan_cost;
            eventDescription += ` Thọ nguyên bị đốt cháy ${pillInfo.effects.lifespan_cost} năm!`;
        }

        // Permanent Stat Boosts
        if (pillInfo.effects.dao_co_vung_chac) {
            if (!character.statModifiers) character.statModifiers = {};
            character.statModifiers.maxNguyenKhiModifier = (character.statModifiers.maxNguyenKhiModifier || 0) + pillInfo.effects.dao_co_vung_chac;
            eventDescription += ` Cảm thấy đạo cơ trở nên vững chắc hơn.`;
        }
        if (pillInfo.effects.cuong_hoa_xuong_cot) {
            if (!character.statModifiers) character.statModifiers = {};
            character.statModifiers.physicalDefenseModifier = (character.statModifiers.physicalDefenseModifier || 0) + pillInfo.effects.cuong_hoa_xuong_cot;
            eventDescription += ` Cảm thấy xương cốt trở nên cứng rắn hơn.`;
        }
        // New T4 Pill effects
        if (pillInfo.effects.body_impurity_cleanse) { character.bodyImpurity = Math.max(0, (character.bodyImpurity || 0) - pillInfo.effects.body_impurity_cleanse); eventDescription += ` Tạp chất trong cơ thể được gột rửa.`; }
        if (pillInfo.effects.permanent_health_boost) {
            if (!character.statModifiers) character.statModifiers = {};
            character.statModifiers.permanent_health_modifier = (character.statModifiers.permanent_health_modifier || 0) + pillInfo.effects.permanent_health_boost;
            eventDescription += ` Cảm thấy khí huyết tăng vọt.`;
        }
        if (pillInfo.effects.permanent_physical_attack_boost) {
            if (!character.statModifiers) character.statModifiers = {};
            character.statModifiers.permanent_physical_attack_modifier = (character.statModifiers.permanent_physical_attack_modifier || 0) + pillInfo.effects.permanent_physical_attack_boost;
            eventDescription += ` Cảm thấy sức mạnh tăng mạnh.`;
        }
        if (pillInfo.effects.dao_tam_boost) {
            character.daoTam += pillInfo.effects.dao_tam_boost;
            eventDescription += ` Đạo tâm trở nên vững chắc hơn.`;
        }

        // Impurity
        if (pillInfo.impurity && pillInfo.impurity > 0) {
            character.bodyImpurity = (character.bodyImpurity || 0) + pillInfo.impurity;
            eventDescription += ` Tạp chất trong cơ thể tăng lên.`;
        }

        return { updatedClan: newClan, newEvents: [{ description: eventDescription, characterIds: [characterId] }] };
    }
    
    if (itemInfo.type === ItemType.TALISMAN) {
        character.inventory[itemId] -= 1;
        if (character.inventory[itemId] === 0) delete character.inventory[itemId];

        const talismanInfo = itemInfo as Talisman;
        const eventDescription = `${character.name} đã sử dụng ${talismanInfo.name}. (Hiệu ứng sẽ được áp dụng trong chiến đấu)`;

        return { updatedClan: newClan, newEvents: [{ description: eventDescription, characterIds: [characterId] }] };
    }


    return { error: "Vật phẩm không thể sử dụng." };
}