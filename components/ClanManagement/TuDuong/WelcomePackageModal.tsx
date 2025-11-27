
import React, { useState } from 'react';
import type { Clan, WelcomePackageItem } from '../../../types/index.ts';
import { CloseIcon, PillIcon } from '../../Icons.tsx';
import { ALL_ITEMS, ITEM_QUALITY_COLORS } from '../../../constants.ts';
import ItemTooltip from '../../common/ItemTooltip.tsx';

interface WelcomePackageModalProps {
    isOpen: boolean;
    onClose: () => void;
    clan: Clan;
    onSetWelcomePackage: (items: WelcomePackageItem[]) => void;
}

const WelcomePackageModal: React.FC<WelcomePackageModalProps> = ({ isOpen, onClose, clan, onSetWelcomePackage }) => {
    const [packageItems, setPackageItems] = useState<WelcomePackageItem[]>(clan.welcomePackage || []);
    const [selectedItemId, setSelectedItemId] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);

    const handleAddItem = () => {
        if (!selectedItemId || quantity <= 0) return;
        
        const existingItemIndex = packageItems.findIndex(p => p.itemId === selectedItemId);
        if (existingItemIndex > -1) {
            const newItems = [...packageItems];
            newItems[existingItemIndex].count += quantity;
            setPackageItems(newItems);
        } else {
            setPackageItems([...packageItems, { itemId: selectedItemId, count: quantity }]);
        }
    };
    
    const handleRemoveItem = (itemId: string) => {
        setPackageItems(packageItems.filter(p => p.itemId !== itemId));
    };

    const handleSave = () => {
        onSetWelcomePackage(packageItems);
        onClose();
    };

    if (!isOpen) return null;

    const availableClanItems = Object.keys(clan.itemInventory).filter(id => (clan.itemInventory[id] || 0) > 0);
    const selectedItemInfo = ALL_ITEMS[selectedItemId];
    const maxQuantity = selectedItemInfo ? clan.itemInventory[selectedItemId] || 0 : 0;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4" onClick={onClose}>
            <div className="bg-stone-800 p-6 rounded-lg w-full max-w-2xl border-2 border-amber-400/30 relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-3 right-3 text-white bg-black/50 p-1 rounded-full hover:bg-[var(--color-text-accent)] transition-colors z-20" aria-label="Đóng"><CloseIcon /></button>
                <h3 className="text-xl font-bold text-amber-200 mb-1">Phúc Lợi Nhập Tộc</h3>
                <p className="text-sm text-gray-400 mb-4">Các vật phẩm trong danh sách này sẽ được tự động trao cho tộc nhân mới khi họ gia nhập.</p>

                <div className="min-h-[8rem] max-h-60 overflow-y-auto pr-2 mb-4 scrollbar-thin scrollbar-thumb-amber-700 scrollbar-track-stone-900">
                    <div className="grid grid-cols-2 gap-2">
                        {packageItems.map(pkgItem => {
                            const itemInfo = ALL_ITEMS[pkgItem.itemId];
                            if (!itemInfo) return null;
                            return (
                                 <ItemTooltip key={pkgItem.itemId} item={itemInfo}>
                                    <div className="flex justify-between items-center p-2 bg-stone-900/70 rounded-md">
                                        <p className={`font-semibold text-sm ${ITEM_QUALITY_COLORS[itemInfo.quality]}`}>{itemInfo.name} <span className="text-xs font-normal text-gray-400">x{pkgItem.count}</span></p>
                                        <button onClick={() => handleRemoveItem(pkgItem.itemId)} className="text-xs bg-red-800 text-white px-2 py-1 rounded hover:bg-red-700">Xóa</button>
                                    </div>
                                </ItemTooltip>
                            )
                        })}
                    </div>
                     {packageItems.length === 0 && <p className="text-center text-gray-500 italic py-8">Chưa có phúc lợi nào.</p>}
                </div>

                <div className="bg-stone-900/50 p-3 rounded-lg flex items-center gap-3">
                    <select value={selectedItemId} onChange={e => setSelectedItemId(e.target.value)} className="flex-grow p-2 bg-stone-900 rounded border border-white/20 text-white text-sm">
                        <option value="">-- Chọn vật phẩm từ kho --</option>
                        {availableClanItems.map(id => <option key={id} value={id}>{ALL_ITEMS[id]?.name} (Tồn: {clan.itemInventory[id]})</option>)}
                    </select>
                    <input type="number" min="1" max={maxQuantity} value={quantity} onChange={e => setQuantity(Math.min(maxQuantity, parseInt(e.target.value) || 1))} className="w-20 p-2 bg-stone-900 rounded border border-white/20 text-white text-sm" disabled={!selectedItemId}/>
                    <button onClick={handleAddItem} disabled={!selectedItemId || quantity > maxQuantity} className="px-4 py-2 bg-blue-700 rounded text-sm font-semibold enabled:hover:bg-blue-600 disabled:bg-gray-600">Thêm</button>
                </div>
                
                <button onClick={handleSave} className="w-full mt-4 p-3 bg-green-700 rounded hover:bg-green-600 font-bold text-lg disabled:bg-gray-600 transition-colors">Lưu Thay Đổi</button>
            </div>
        </div>
    );
};

export default WelcomePackageModal;