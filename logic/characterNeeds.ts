
import type { Character, Clan, CharacterNeed, EquippableItem, Talisman } from '../types/index.ts';
import { NeedType, ItemType, ItemQuality, EquipmentQuality } from '../types/index.ts';
import { ALL_ITEMS } from '../constants.ts';

const qualityToNumber = (item: { quality: ItemQuality, equipmentQuality: EquipmentQuality }): number => {
    const tierOrder = Object.values(ItemQuality);
    const qualityOrder = Object.values(EquipmentQuality);

    const tierValue = tierOrder.indexOf(item.quality) * 10;
    const qualityValue = qualityOrder.indexOf(item.equipmentQuality);
    
    return tierValue + qualityValue;
}

const checkEquipmentNeeds = (character: Character, clan: Clan): CharacterNeed[] => {
    const needs: CharacterNeed[] = [];
    const equipmentSlots: (keyof Character['equipment'])[] = ['weapon', 'head', 'chest', 'feet', 'accessory1', 'accessory2'];

    // Check for empty slots
    for (const slot of equipmentSlots) {
        if (!character.equipment[slot as 'weapon']) { // Type assertion to access equipment properties
            needs.push({
                type: NeedType.EQUIPMENT,
                urgency: 30,
                detail: `Ô trang bị ${slot} đang trống.`
            });
        }
    }

    // Check for potential upgrades in clan MERIT SHOP
    for (const shopItem of clan.meritShop) {
        if (shopItem.stock < 1 || character.contribution < shopItem.cost) continue;
        
        const itemInfo = ALL_ITEMS[shopItem.itemId];
        if (!itemInfo || !('equipmentQuality' in itemInfo)) continue;

        let currentItem: (EquippableItem | Talisman) | null = null;
        
        switch (itemInfo.type) {
            case ItemType.WEAPON: currentItem = character.equipment.weapon; break;
            case ItemType.HELMET: currentItem = character.equipment.head; break;
            case ItemType.CHESTPLATE: currentItem = character.equipment.chest; break;
            case ItemType.BOOTS: currentItem = character.equipment.feet; break;
            case ItemType.TALISMAN: 
                const acc1 = character.equipment.accessory1;
                const acc2 = character.equipment.accessory2;
                if (!acc1) {
                    currentItem = null;
                } else if (!acc2) {
                    currentItem = acc1;
                } else {
                    currentItem = qualityToNumber(acc1) < qualityToNumber(acc2) ? acc1 : acc2;
                }
                break;
        }

        if (currentItem === null || qualityToNumber(itemInfo) > qualityToNumber(currentItem)) {
            const urgency = currentItem ? (qualityToNumber(itemInfo) - qualityToNumber(currentItem)) * 5 : 40;
            needs.push({
                type: NeedType.EQUIPMENT,
                urgency: Math.min(90, urgency),
                detail: `${itemInfo.name} (từ Huân Công Đường) là một nâng cấp.`
            });
        }
    }


    return needs;
};

const checkCultivationNeeds = (character: Character): CharacterNeed[] => {
    const needs: CharacterNeed[] = [];
    if (character.isCultivationBlocked) {
        needs.push({
            type: NeedType.CULTIVATION,
            urgency: 80, // High urgency
            detail: 'Công pháp chủ tu đã đạt giới hạn, cần tìm công pháp cao cấp hơn.'
        });
    }
    return needs;
};


export const processCharacterNeeds = (character: Character, clan: Clan): CharacterNeed[] => {
    let currentNeeds: CharacterNeed[] = [];

    const equipmentNeeds = checkEquipmentNeeds(character, clan);
    currentNeeds.push(...equipmentNeeds);
    
    const cultivationNeeds = checkCultivationNeeds(character);
    currentNeeds.push(...cultivationNeeds);

    // Sort by urgency, descending
    return currentNeeds.sort((a, b) => b.urgency - a.urgency);
};
