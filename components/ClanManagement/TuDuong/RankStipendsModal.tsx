
import React, { useState } from 'react';
import type { Clan } from '../../../types/index.ts';
import { CloseIcon } from '../../Icons.tsx';
import { RankType } from '../../../types/index.ts';
import { ALL_ITEMS, ITEM_QUALITY_COLORS } from '../../../constants.ts';
import ItemTooltip from '../../common/ItemTooltip.tsx';

interface RankStipendsModalProps {
    isOpen: boolean;
    onClose: () => void;
    clan: Clan;
    onSetRankStipend: (rank: RankType, itemId: string, amount: number) => void;
}

const RankStipendsModal: React.FC<RankStipendsModalProps> = ({ isOpen, onClose, clan, onSetRankStipend }) => {
    const [stipends, setStipends] = useState(clan.rankStipends);
    const [selectedRank, setSelectedRank] = useState<RankType | null>(null);
    const [selectedItem, setSelectedItem] = useState<string>('');
    const [itemAmount, setItemAmount] = useState<number>(1);

    const handleAmountChange = (rank: RankType, itemId: string, amountStr: string) => {
        const amount = parseInt(amountStr) || 0;
        setStipends(prev => ({
            ...prev,
            [rank]: {
                ...prev[rank],
                [itemId]: amount,
            }
        }));
    };

    const handleSave = () => {
        Object.entries(stipends).forEach(([rank, items]) => {
            Object.entries(items).forEach(([itemId, amount]) => {
                onSetRankStipend(rank as RankType, itemId, amount);
            });
        });
        onClose();
    };
    
    const handleAddItem = () => {
        if (!selectedRank || !selectedItem) return;
        const amount = itemAmount > 0 ? itemAmount : 1;
        
        handleAmountChange(selectedRank, selectedItem, amount.toString());

        setSelectedItem('');
        setItemAmount(1);
    };
    
    const handleRemoveItem = (rank: RankType, itemId: string) => {
        const newRankStipends = {...stipends[rank]};
        delete newRankStipends[itemId];
        setStipends(prev => ({ ...prev, [rank]: newRankStipends }));
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4" onClick={onClose}>
            <div className="bg-stone-800 p-6 rounded-lg w-full max-w-4xl border-2 border-amber-400/30 relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-3 right-3 text-white bg-black/50 p-1 rounded-full hover:bg-[var(--color-text-accent)] transition-colors z-20" aria-label="Đóng"><CloseIcon /></button>
                <h3 className="text-xl font-bold text-amber-200 mb-1">Thiết Lập Bổng Lộc Thân Phận</h3>
                <p className="text-sm text-gray-400 mb-4">Các vật phẩm trong danh sách này sẽ được tự động phát cho tộc nhân mỗi tháng.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-stone-900 scrollbar-thumb-amber-700">
                    {Object.values(RankType).map(rank => (
                        <div key={rank} className="bg-stone-900/50 p-3 rounded-lg">
                            <h4 className="font-bold text-amber-200 border-b border-amber-300/20 pb-1 mb-2">{rank}</h4>
                            <div className="space-y-1">
                                {stipends[rank] && Object.entries(stipends[rank]).map(([itemId, amount]) => {
                                    const itemInfo = ALL_ITEMS[itemId];
                                    if (!itemInfo) return null;
                                    return (
                                        <ItemTooltip key={itemId} item={itemInfo}>
                                            <div className="flex items-center justify-between text-sm bg-black/30 p-1 rounded">
                                                <span className={`flex-shrink-0 ${ITEM_QUALITY_COLORS[itemInfo.quality]}`}>{itemInfo.name}</span>
                                                <div className="flex items-center gap-1">
                                                    <input type="number" value={amount} onChange={(e) => handleAmountChange(rank, itemId, e.target.value)} className="w-12 text-center bg-stone-900 rounded" />
                                                    <button onClick={() => handleRemoveItem(rank, itemId)} className="text-xs text-red-400 hover:text-red-300">✖</button>
                                                </div>
                                            </div>
                                        </ItemTooltip>
                                    )
                                })}
                            </div>
                            <button onClick={() => setSelectedRank(rank)} className="w-full text-center mt-2 text-xs py-1 bg-blue-900/70 hover:bg-blue-800 rounded-md">+ Thêm vật phẩm</button>
                        </div>
                    ))}
                </div>

                 {selectedRank && (
                    <div className="mt-4 p-3 bg-stone-900/50 rounded-lg flex gap-3">
                        <h4 className="font-semibold text-white">Thêm vào {selectedRank}:</h4>
                        <select value={selectedItem} onChange={e => setSelectedItem(e.target.value)} className="flex-grow p-1 bg-stone-900 rounded border border-white/20 text-white text-sm">
                            <option value="">-- Chọn vật phẩm --</option>
                            {Object.keys(ALL_ITEMS).map(id => <option key={id} value={id}>{ALL_ITEMS[id]?.name}</option>)}
                        </select>
                        <input type="number" min="1" value={itemAmount} onChange={e => setItemAmount(parseInt(e.target.value) || 1)} className="w-20 p-1 bg-stone-900 rounded border border-white/20 text-white text-sm"/>
                        <button onClick={handleAddItem} className="px-3 bg-blue-700 rounded text-sm hover:bg-blue-600">Thêm</button>
                         <button onClick={() => setSelectedRank(null)} className="px-3 bg-gray-600 rounded text-sm hover:bg-gray-500">Hủy</button>
                    </div>
                )}
                
                 <button onClick={handleSave} className="w-full mt-4 p-3 bg-green-700 rounded hover:bg-green-600 font-bold text-lg disabled:bg-gray-600 transition-colors">Lưu Tất Cả Thay Đổi</button>
            </div>
        </div>
    );
};

export default RankStipendsModal;