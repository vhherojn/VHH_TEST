import React, { useState } from 'react';
import type { Clan } from '../../../types/index.ts';
import { CloseIcon } from '../../Icons.tsx';
import { RankType } from '../../../types/enums.ts';

interface ClanSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    clan: Clan;
    onSetFrequency: (rank: RankType, frequency: number) => void;
}

const ClanSettingsModal: React.FC<ClanSettingsModalProps> = ({ isOpen, onClose, clan, onSetFrequency }) => {
    const [frequencies, setFrequencies] = useState(clan.mandatoryQuestFrequency);

    if (!isOpen) return null;

    const handleFrequencyChange = (rank: RankType, value: string) => {
        const numValue = parseInt(value, 10);
        if (isNaN(numValue) || numValue < 0) return;

        const newFrequencies = {
            ...frequencies,
            [rank]: numValue,
        };
        setFrequencies(newFrequencies);
        onSetFrequency(rank, numValue);
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4" onClick={onClose}>
            <div className="bg-stone-800 p-6 rounded-lg w-full max-w-2xl border-2 border-amber-400/30 relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-3 right-3 text-white bg-black/50 p-1 rounded-full hover:bg-[var(--color-text-accent)] transition-colors z-20" aria-label="Đóng">
                    <CloseIcon />
                </button>
                <h3 className="text-xl font-bold text-amber-200 mb-1">Thiết Lập Chung</h3>
                <p className="text-sm text-gray-400 mb-4">Điều chỉnh các quy định như tần suất nhiệm vụ bắt buộc cho từng cấp bậc.</p>

                <div className="bg-stone-900/50 p-3 rounded-lg">
                    <h4 className="font-semibold text-amber-200 mb-2">Tần Suất Nhiệm Vụ Bắt Buộc (Tháng/Lần)</h4>
                    <p className="text-xs text-gray-400 mb-3">Số càng nhỏ, nhiệm vụ càng thường xuyên. Nhập 0 để không bao giờ giao nhiệm vụ bắt buộc.</p>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 max-h-[50vh] overflow-y-auto pr-2">
                        {Object.values(RankType).map(rank => (
                            <div key={rank} className="flex items-center justify-between">
                                <label htmlFor={`freq-${rank}`} className="text-sm text-gray-200">{rank}:</label>
                                <input
                                    id={`freq-${rank}`}
                                    type="number"
                                    min="0"
                                    value={frequencies[rank] || 0}
                                    onChange={(e) => handleFrequencyChange(rank, e.target.value)}
                                    className="w-20 p-1 bg-stone-900 rounded border border-white/20 text-white text-center"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                 <button 
                    onClick={onClose} 
                    className="w-full mt-4 p-3 bg-blue-700 rounded hover:bg-blue-600 font-bold text-lg"
                >
                    Đóng
                </button>
            </div>
        </div>
    );
};

export default ClanSettingsModal;