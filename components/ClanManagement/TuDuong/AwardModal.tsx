import React, { useState } from 'react';
import type { Clan } from '../../../types/index.ts';
import { CloseIcon } from '../../Icons.tsx';
import { ALL_ITEMS } from '../../../constants.ts';

interface AwardModalProps {
    isOpen: boolean;
    onClose: () => void;
    clan: Clan;
    onAward: (characterId: string, contribution: number, itemId?: string, count?: number) => void;
}

const AwardModal: React.FC<AwardModalProps> = ({ isOpen, onClose, clan, onAward }) => {
    const [characterId, setCharacterId] = useState<string>('');
    const [contribution, setContribution] = useState<number>(0);
    const [itemId, setItemId] = useState<string>('');
    const [itemCount, setItemCount] = useState<number>(1);
    
    if (!isOpen) return null;

    const selectedItemInfo = ALL_ITEMS[itemId];
    const maxItemCount = selectedItemInfo ? clan.itemInventory[itemId] || 0 : 0;

    const handleAward = () => {
        if (!characterId) {
            alert("Vui lòng chọn một tộc nhân.");
            return;
        }
        if (contribution <= 0 && (!itemId || itemCount <= 0)) {
            alert("Vui lòng nhập số cống hiến hoặc chọn vật phẩm để ban thưởng.");
            return;
        }
        
        onAward(characterId, contribution, itemId || undefined, itemCount > 0 ? itemCount : undefined);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4" onClick={onClose}>
            <div className="bg-stone-800 p-6 rounded-lg w-full max-w-lg border-2 border-amber-400/30 relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-3 right-3 text-white bg-black/50 p-1 rounded-full hover:bg-[var(--color-text-accent)] transition-colors z-20" aria-label="Đóng">
                    <CloseIcon />
                </button>
                <h3 className="text-xl font-bold text-amber-200 mb-4">Ban Thưởng Tộc Nhân</h3>
                
                <div className="space-y-4">
                    {/* Character Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Đối tượng ban thưởng</label>
                        <select value={characterId} onChange={e => setCharacterId(e.target.value)} className="w-full p-2 bg-stone-900 rounded border border-white/20 text-white">
                            <option value="">-- Chọn Tộc Nhân --</option>
                            {clan.members.filter(m => m.status === 'Còn Sống').map(m => (
                                <option key={m.id} value={m.id}>{m.name} (Cống hiến: {m.contribution})</option>
                            ))}
                        </select>
                    </div>

                    {/* Contribution Award */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Điểm cống hiến</label>
                        <input
                            type="number"
                            value={contribution}
                            onChange={e => setContribution(parseInt(e.target.value, 10) || 0)}
                            min="0"
                            className="w-full p-2 bg-stone-900 rounded border border-white/20 text-white"
                        />
                    </div>
                    
                    {/* Item Award */}
                    <div className="border-t border-amber-400/20 pt-4">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Vật phẩm từ kho</label>
                         <div className="flex gap-2">
                             <select value={itemId} onChange={e => setItemId(e.target.value)} className="flex-grow p-2 bg-stone-900 rounded border border-white/20 text-white text-sm">
                                <option value="">-- Chọn vật phẩm --</option>
                                {Object.entries(clan.itemInventory).map(([id, count]) => (
                                    count > 0 && <option key={id} value={id}>{ALL_ITEMS[id]?.name} (Tồn: {Math.floor(count)})</option>
                                ))}
                            </select>
                            <input 
                                type="number" 
                                value={itemCount} 
                                onChange={e => setItemCount(Math.min(maxItemCount, parseInt(e.target.value, 10) || 1))} 
                                min="1" 
                                max={maxItemCount}
                                className="w-20 p-2 bg-stone-900 rounded border border-white/20 text-white"
                                disabled={!itemId}
                            />
                        </div>
                    </div>
                </div>

                <button 
                    onClick={handleAward}
                    disabled={!characterId}
                    className="w-full mt-6 p-3 bg-green-700 rounded hover:bg-green-600 font-bold text-lg disabled:bg-gray-600 transition-colors"
                >
                    Ban Thưởng
                </button>
            </div>
        </div>
    );
};

export default AwardModal;
