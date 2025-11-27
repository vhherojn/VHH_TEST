
import React, { useState, useMemo } from 'react';
import type { Clan } from '../../../types/index.ts';
import { RankType } from '../../../types/index.ts';
import { CloseIcon } from '../../Icons.tsx';

interface AssignRankModalProps {
    isOpen: boolean;
    onClose: () => void;
    clan: Clan;
    onSetRank: (charId: string, rank: RankType) => void;
}

const AssignRankModal: React.FC<AssignRankModalProps> = ({ isOpen, onClose, clan, onSetRank }) => {
    const [selectedCharId, setSelectedCharId] = useState<string>('');
    const [selectedRank, setSelectedRank] = useState<RankType>(RankType.DE_TU_NOI_TOC);

    const selectedChar = useMemo(() => clan.members.find(m => m.id === selectedCharId), [clan.members, selectedCharId]);

    const handleSubmit = () => {
        if (selectedCharId) {
            onSetRank(selectedCharId, selectedRank);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4" onClick={onClose}>
            <div className="bg-stone-800 p-6 rounded-lg w-full max-w-md border-2 border-amber-400/30 relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-3 right-3 text-white bg-black/50 p-1 rounded-full hover:bg-[var(--color-text-accent)] transition-colors z-20" aria-label="Đóng">
                    <CloseIcon />
                </button>
                <h3 className="text-xl font-bold text-amber-200 mb-4">Bổ Nhiệm Thân Phận</h3>
                
                <div className="flex flex-col gap-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Chọn Tộc Nhân</label>
                        <select value={selectedCharId} onChange={e => setSelectedCharId(e.target.value)} className="w-full p-2 bg-stone-900 rounded border border-white/20 text-white">
                            <option value="">-- Chọn Tộc Nhân --</option>
                            {clan.members.filter(m => !m.isPatriarch).map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Bổ Nhiệm Thân Phận</label>
                        <select value={selectedRank} onChange={e => setSelectedRank(e.target.value as RankType)} className="w-full p-2 bg-stone-900 rounded border border-white/20 text-white" disabled={!selectedCharId}>
                            {Object.values(RankType).filter(r => r !== RankType.TOC_TRUONG).map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>
                </div>

                {selectedChar && <p className="text-sm text-gray-400 mt-3">Thân phận hiện tại của {selectedChar.name}: <span className="font-semibold text-yellow-300">{selectedChar.rank}</span></p>}
                
                <button 
                    onClick={handleSubmit} 
                    disabled={!selectedCharId} 
                    className="w-full mt-4 p-3 bg-blue-700 rounded hover:bg-blue-600 font-bold text-lg disabled:bg-gray-600 transition-colors"
                >
                    Xác Nhận Bổ Nhiệm
                </button>
            </div>
        </div>
    );
};

export default AssignRankModal;
