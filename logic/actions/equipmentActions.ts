import type { Clan, Event, Character, Pill, EquippableItem, Talisman } from '../../types/index.ts';
import { ItemType } from '../../types/index.ts';
import { ALL_ITEMS } from '../../constants.ts';
import { deepClone } from '../utils/clone.ts';
import { recalculateAllStats } from '../character.ts';

type EquipmentActionResult = { updatedClan?: Clan; newEvents?: Omit<Event, 'id' | 'date'>[]; error?: string; };

const getSlotName = (slotKey: keyof Character['equipment'] | string, itemType: ItemType): string => {
    if (typeof slotKey === 'string' && slotKey.startsWith('belt-')) return "Ô Dược Phẩm";
    switch (slotKey) {
        case 'weapon': return 'Vũ Khí';
        case 'head': return 'Đầu';
        case 'chest': return 'Thân';
        case 'feet': return 'Chân';
        case 'accessory1':
        case 'accessory2': return 'Phụ Kiện';
        default: return itemType;
    }
};


export function equipItem(clan: Clan, characterId: string, itemId: string): EquipmentActionResult {
    const newClan = deepClone(clan);
    const character = newClan.members.find((m: Character) => m.id === characterId);
    const newItem = ALL_ITEMS[itemId as keyof typeof ALL_ITEMS];

    if (!character) return { error: "Không tìm thấy tộc nhân." };
    if (!newItem) return { error: "Vật phẩm không tồn tại." };
    if ((character.inventory[itemId] || 0) < 1) return { error: `Không có ${newItem.name} trong túi đồ.`};

    let targetSlot: keyof Character['equipment'] | string | null = null;
    let beltIndex: number | null = null;
    
    // Special handling for "Châm" to go into accessory slots
    if (newItem.type === ItemType.WEAPON && newItem.id.includes('_cham_')) {
        if (!character.equipment.accessory1) targetSlot = 'accessory1';
        else if (!character.equipment.accessory2) targetSlot = 'accessory2';
        else targetSlot = 'accessory1'; // Default to replacing the first one if both are full
    } else {
        switch(newItem.type) {
            case ItemType.WEAPON: targetSlot = 'weapon'; break;
            case ItemType.HELMET: targetSlot = 'head'; break;
            case ItemType.CHESTPLATE: targetSlot = 'chest'; break;
            case ItemType.BOOTS: targetSlot = 'feet'; break;
            case ItemType.TALISMAN:
                if (!character.equipment.accessory1) targetSlot = 'accessory1';
                else if (!character.equipment.accessory2) targetSlot = 'accessory2';
                else targetSlot = 'accessory1'; // Default to replacing the first one if both are full
                break;
            case ItemType.PILL:
                const emptyBeltSlot = character.equipment.belt.indexOf(null);
                if (emptyBeltSlot !== -1) {
                    targetSlot = `belt-${emptyBeltSlot}`;
                    beltIndex = emptyBeltSlot;
                } else {
                     targetSlot = 'belt-0'; // Default to replacing the first one
                     beltIndex = 0;
                }
                break;
        }
    }


    if (!targetSlot) return { error: `Vật phẩm ${newItem.name} không thể trang bị.` };
    
    // Unequip old item if present and move to inventory
    let oldItem: EquippableItem | Pill | Talisman | null = null;
    if (beltIndex !== null) {
        oldItem = character.equipment.belt[beltIndex];
        character.equipment.belt[beltIndex] = null;
    } else {
        oldItem = character.equipment[targetSlot as keyof Omit<Character['equipment'], 'belt'>];
        (character.equipment[targetSlot as keyof Omit<Character['equipment'], 'belt'>]) = null;
    }
    
    if (oldItem) {
        character.inventory[oldItem.id] = (character.inventory[oldItem.id] || 0) + 1;
    }

    // Equip new item
    if (beltIndex !== null) {
        character.equipment.belt[beltIndex] = newItem as Pill;
    } else {
        character.equipment[targetSlot as keyof Omit<Character['equipment'], 'belt'>] = newItem as EquippableItem;
    }

    // Update inventory
    character.inventory[itemId] -= 1;
    if (character.inventory[itemId] === 0) delete character.inventory[itemId];
    
    // Recalculate all stats after equipment change
    Object.assign(character, recalculateAllStats(character));

    const slotName = getSlotName(targetSlot, newItem.type);
    
    return {
        updatedClan: newClan,
        newEvents: [{ description: `${character.name} đã trang bị [${slotName}] ${newItem.name}.`, characterIds: [character.id] }]
    };
}

export function unequipItem(clan: Clan, characterId: string, slotKey: keyof Character['equipment'] | string): EquipmentActionResult {
    const newClan = deepClone(clan);
    const character = newClan.members.find((m: Character) => m.id === characterId);
    if (!character) return { error: "Không tìm thấy tộc nhân." };
    
    let itemToUnequip: EquippableItem | Pill | Talisman | null = null;

    if (typeof slotKey === 'string' && slotKey.startsWith('belt-')) {
        const beltIndex = parseInt(slotKey.split('-')[1]);
        if (!isNaN(beltIndex) && character.equipment.belt[beltIndex]) {
            itemToUnequip = character.equipment.belt[beltIndex];
            character.equipment.belt[beltIndex] = null;
        }
    } else if (character.equipment[slotKey as keyof Omit<Character['equipment'], 'belt'>]) {
        itemToUnequip = character.equipment[slotKey as keyof Omit<Character['equipment'], 'belt'>];
        (character.equipment[slotKey as keyof Omit<Character['equipment'], 'belt'>]) = null;
    }

    if (!itemToUnequip) return { error: "Ô trang bị này trống." };
    
    character.inventory[itemToUnequip.id] = (character.inventory[itemToUnequip.id] || 0) + 1;
    
    // Recalculate all stats after equipment change
    Object.assign(character, recalculateAllStats(character));
    
    const slotName = getSlotName(slotKey, itemToUnequip.type);

    return {
        updatedClan: newClan,
        newEvents: [{ description: `${character.name} đã tháo [${slotName}] ${itemToUnequip.name}.`, characterIds: [character.id] }]
    };
}
