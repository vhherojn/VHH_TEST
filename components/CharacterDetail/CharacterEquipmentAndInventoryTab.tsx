import React, { useMemo } from 'react';
import type { Character, EquippableItem, Pill, Talisman } from '../../types/index.ts';
import { ITEM_QUALITY_COLORS, ITEM_QUALITY_BORDER_COLORS, ALL_ITEMS } from '../../constants.ts';
import { HelmetIcon, ChestplateIcon, LeggingsIcon, SwordIcon, ShieldIcon, PillIcon } from '../Icons.tsx';
import { ItemType, ItemQuality } from '../../types/index.ts';
import ItemTooltip from '../common/ItemTooltip.tsx';

const EquipmentSlot: React.FC<{ 
    label: string; 
    item: EquippableItem | Pill | Talisman | null;
    icon: React.ReactNode;
    slotKey: keyof Character['equipment'] | string;
    onUnequip?: (slot: keyof Character['equipment'] | string) => void;
}> = ({ label, item, icon, slotKey, onUnequip }) => {
    const qualityColor = item ? (ITEM_QUALITY_COLORS[item.quality] || 'text-white') : 'text-gray-500';
    const borderColor = item ? (ITEM_QUALITY_BORDER_COLORS[item.quality] || 'border-white/10') : 'border-white/10';

    const itemContent = (
        <div className={`p-3 bg-black/30 rounded-md border-2 ${borderColor} flex gap-4 items-center`}>
            <div className="flex-shrink-0 w-10 h-10 bg-black/30 rounded flex items-center justify-center">
                {icon}
            </div>
            <div className="flex-grow">
                <div className="text-xs text-amber-200/60 mb-0.5">{label}</div>
                {item ? (
                    <div>
                        <div className={`font-semibold text-base ${qualityColor}`}>{item.name}</div>
                        { 'equipmentQuality' in item && <div className='text-xs text-gray-300'>{item.quality} - {item.equipmentQuality}</div>}
                    </div>
                ) : (
                    <div className="font-semibold text-gray-500">Trống</div>
                )}
            </div>
            {item && onUnequip && (
                <button onClick={() => onUnequip(slotKey)} className="flex-shrink-0 px-3 py-1 text-xs bg-red-800 rounded hover:bg-red-700 font-semibold">Tháo Ra</button>
            )}
        </div>
    );

     return item ? <ItemTooltip item={item}>{itemContent}</ItemTooltip> : itemContent;
};


interface CharacterEquipmentAndInventoryTabProps {
    character: Character;
    onUnequipItem: (equipmentSlot: keyof Character['equipment'] | string) => void;
    onUseItem: (itemId: string) => void;
    onEquipItem: (itemId: string) => void;
    onStoreItemToClan: (itemId: string) => void;
}

const CharacterEquipmentAndInventoryTab: React.FC<CharacterEquipmentAndInventoryTabProps> = ({ character, onUnequipItem, onUseItem, onEquipItem, onStoreItemToClan }) => {
    
    const sortedInventory = useMemo(() => {
        if (!character.inventory) return [];

        const itemEntries = Object.entries(character.inventory)
            .map(([itemId, count]) => ({
                item: ALL_ITEMS[itemId as keyof typeof ALL_ITEMS],
                count,
            }))
            .filter(entry => entry.item && entry.count > 0);

        const typeOrder = Object.values(ItemType);
        const qualityOrder = Object.values(ItemQuality);

        return itemEntries.sort((a, b) => {
            const typeComparison = typeOrder.indexOf(a.item.type) - typeOrder.indexOf(b.item.type);
            if (typeComparison !== 0) return typeComparison;

            const qualityComparison = qualityOrder.indexOf(b.item.quality) - qualityOrder.indexOf(a.item.quality);
            if (qualityComparison !== 0) return qualityComparison;

            return a.item.name.localeCompare(b.item.name);
        });
    }, [character.inventory]);

    return (
        <div className="space-y-4">
            <div className="p-4 bg-black/20 rounded-lg border border-white/10 space-y-4">
                 <div>
                    <h4 className="font-bold text-lg text-amber-200 mb-2">Trang Bị Chiến Đấu</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <EquipmentSlot label="Vũ Khí" item={character.equipment.weapon} icon={<SwordIcon className="w-6 h-6 text-amber-200/50" />} slotKey="weapon" onUnequip={onUnequipItem} />
                        <EquipmentSlot label="Pháp Bào / Giáp" item={character.equipment.chest} icon={<ChestplateIcon className="w-6 h-6 text-amber-200/50" />} slotKey="chest" onUnequip={onUnequipItem} />
                        <EquipmentSlot label="Nón / Trâm" item={character.equipment.head} icon={<HelmetIcon className="w-6 h-6 text-amber-200/50" />} slotKey="head" onUnequip={onUnequipItem} />
                        <EquipmentSlot label="Giày / Toa" item={character.equipment.feet} icon={<LeggingsIcon className="w-6 h-6 text-amber-200/50" />} slotKey="feet" onUnequip={onUnequipItem} />
                        <EquipmentSlot label="Phụ Kiện 1" item={character.equipment.accessory1} icon={<ShieldIcon className="w-6 h-6 text-amber-200/50" />} slotKey="accessory1" onUnequip={onUnequipItem} />
                        <EquipmentSlot label="Phụ Kiện 2" item={character.equipment.accessory2} icon={<ShieldIcon className="w-6 h-6 text-amber-200/50" />} slotKey="accessory2" onUnequip={onUnequipItem} />
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-lg text-amber-200 mb-2">Đai Lưng Dược Phẩm</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                         {character.equipment.belt.map((pill, index) => (
                            <EquipmentSlot key={index} label={`Ô Dược Phẩm ${index + 1}`} item={pill} icon={<PillIcon className="w-6 h-6 text-amber-200/50" />} slotKey={`belt-${index}`} onUnequip={() => onUnequipItem(`belt-${index}`)} />
                         ))}
                    </div>
                </div>
            </div>

            <div className="p-4 bg-black/20 rounded-lg border border-white/10 space-y-3">
                <h3 className="font-bold text-xl text-amber-200" style={{fontFamily: "'Noto Serif SC', serif"}}>Nhẫn Trữ Vật</h3>
                <div className="max-h-[35vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-2 pr-2 scrollbar-thin scrollbar-thumb-amber-800/70 scrollbar-track-transparent">
                    {sortedInventory.length > 0 ? sortedInventory.map(({ item: itemInfo, count }) => {
                        if (!itemInfo || count === 0) return null;
                        
                        const isUsable = itemInfo.type === ItemType.PILL || itemInfo.type === ItemType.TALISMAN;
                        const isEquippable = [ItemType.WEAPON, ItemType.HELMET, ItemType.CHESTPLATE, ItemType.BOOTS, ItemType.PILL, ItemType.TALISMAN].includes(itemInfo.type);

                        return (
                            <ItemTooltip key={itemInfo.id} item={itemInfo}>
                                <div className="flex items-center gap-3 p-2 bg-black/40 rounded-md border border-white/10">
                                    <div className="flex-grow">
                                        <p className={`font-semibold ${ITEM_QUALITY_COLORS[itemInfo.quality] || 'text-white'}`}>{itemInfo.name} <span className="text-sm font-normal text-gray-400">x{Math.floor(count)}</span></p>
                                    </div>
                                    <div className="flex flex-col gap-1.5 flex-shrink-0">
                                        {isEquippable && <button onClick={() => onEquipItem(itemInfo.id)} className="w-24 px-3 py-1 text-xs bg-blue-600 rounded hover:bg-blue-500 font-semibold">Trang Bị</button>}
                                        {isUsable && <button onClick={() => onUseItem(itemInfo.id)} className="w-24 px-3 py-1 text-xs bg-green-600 rounded hover:bg-green-500 font-semibold">Sử Dụng</button>}
                                        <button onClick={() => onStoreItemToClan(itemInfo.id)} className="w-24 px-3 py-1 text-xs bg-gray-600 rounded hover:bg-gray-500 font-semibold">Cất vào kho</button>
                                    </div>
                                </div>
                            </ItemTooltip>
                        );
                    }) : <p className="text-gray-400 italic text-center py-4">Trống rỗng.</p>}
                </div>
            </div>
        </div>
    );
};

export default React.memo(CharacterEquipmentAndInventoryTab);