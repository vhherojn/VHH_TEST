
import type { Clan, Event, MeritShopItem, Character } from '../../types/index.ts';
import { ALL_ITEMS } from '../../constants.ts';
import { deepClone } from '../utils/clone.ts';

type MeritShopActionResult = { updatedClan?: Clan; newEvents?: Omit<Event, 'id' | 'date'>[]; error?: string; };

export function storeToMeritShop(clan: Clan, itemId: string, count: number, cost: number): MeritShopActionResult {
    const itemInfo = ALL_ITEMS[itemId as keyof typeof ALL_ITEMS];
    if (!itemInfo) return { error: "Vật phẩm không tồn tại." };
    if ((clan.itemInventory[itemId] || 0) < count) return { error: `Trong kho chỉ có ${clan.itemInventory[itemId] || 0} ${itemInfo.name}.` };
    if (count <= 0 || cost <= 0) return { error: "Số lượng và giá phải lớn hơn 0." };

    const newClan = deepClone(clan);
    
    // Decrease item from clan inventory
    newClan.itemInventory[itemId] -= count;
    if (newClan.itemInventory[itemId] === 0) {
        delete newClan.itemInventory[itemId];
    }
    
    // Add or update item in merit shop
    const existingShopItem = newClan.meritShop.find((i: MeritShopItem) => i.itemId === itemId && i.cost === cost);
    if (existingShopItem) {
        existingShopItem.stock += count;
    } else {
        const nextSlotIndex = newClan.meritShop.length > 0 ? Math.max(...newClan.meritShop.map((i: MeritShopItem) => i.slotIndex)) + 1 : 0;
        newClan.meritShop.push({ slotIndex: nextSlotIndex, itemId: itemId, cost: cost, stock: count });
    }

    return {
        updatedClan: newClan,
        newEvents: [{ description: `${count} ${itemInfo.name} đã được thêm vào Huân Công Đường với giá ${cost} cống hiến.` }]
    };
}


export function buyFromMeritShop(clan: Clan, characterId: string, meritShopItem: MeritShopItem): MeritShopActionResult {
    const newClan = deepClone(clan);
    const character = newClan.members.find((m: Character) => m.id === characterId);
    const shopItem = newClan.meritShop.find((i: MeritShopItem) => i.slotIndex === meritShopItem.slotIndex);
    
    if (!character) return { error: "Không tìm thấy tộc nhân." };
    if (!shopItem) return { error: "Vật phẩm không còn trong cửa hàng." };
    if (character.contribution < shopItem.cost) return { error: `${character.name} không đủ điểm cống hiến.`};
    if (shopItem.stock < 1) return { error: "Vật phẩm đã được đổi hết."};

    const itemInfo = ALL_ITEMS[shopItem.itemId as keyof typeof ALL_ITEMS];

    // Decrease character contribution
    character.contribution -= shopItem.cost;

    // Decrease stock from shop
    shopItem.stock -= 1;

    // Add item to character inventory
    character.inventory[shopItem.itemId] = (character.inventory[shopItem.itemId] || 0) + 1;

    // Remove item from shop if stock is 0
    newClan.meritShop = newClan.meritShop.filter((i: MeritShopItem) => i.stock > 0);

    return {
        updatedClan: newClan,
        newEvents: [{ description: `${character.name} đã dùng ${shopItem.cost} điểm cống hiến để đổi lấy ${itemInfo.name}.`, characterIds: [characterId] }]
    };
}
