import React, { useState, useMemo } from 'react';
import type { Clan, Character } from '../../../types/index.ts';
import { RankType } from '../../../types/index.ts';
import { CloseIcon } from '../../Icons.tsx';

interface ElectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    clan: Clan;
    onStartElection: () => void;
    onCastVote: (voterId: string, candidateId: string) => void;
    onEndElection: () => void;
}

const ElectionModal: React.FC<ElectionModalProps> = ({ isOpen, onClose, clan, onStartElection, onCastVote, onEndElection }) => {
    const [votes, setVotes] = useState<Record<string, string>>({});

    const elders = useMemo(() => clan.members.filter(m => m.rank === RankType.TRUONG_LAO || m.rank === RankType.DAI_TRUONG_LAO), [clan.members]);
    const candidates = useMemo(() => clan.election?.candidates.map(id => clan.members.find(m => m.id === id)).filter(Boolean) as Character[] || [], [clan.election, clan.members]);

    const handleVoteChange = (voterId: string, candidateId: string) => {
        setVotes(prev => ({ ...prev, [voterId]: candidateId }));
        onCastVote(voterId, candidateId);
    };
    
    const handleStart = () => {
        onStartElection();
        setVotes({}); // Reset local votes state
    }

    if (!isOpen) return null;

    const ElectionUI = () => {
        if (!clan.election || !clan.election.isActive) {
            return (
                <div className='text-center'>
                    <p className="text-gray-300 text-sm mb-4">Bắt đầu cuộc họp để các Trưởng Lão bầu chọn Đệ Tử Tinh Anh trở thành Thiếu Tộc Trưởng.</p>
                    <button onClick={handleStart} className="w-full p-3 bg-purple-800 rounded hover:bg-purple-700 font-bold text-lg">Bắt đầu tuyển chọn</button>
                </div>
            );
        }

        return (
            <div className="mt-2 space-y-4">
                <p className="text-center font-semibold text-purple-300 animate-pulse">Cuộc họp đang diễn ra!</p>
                {candidates.length === 0 ? (
                    <p className="text-gray-400 italic text-center">Không có ứng viên nào.</p>
                ) : (
                    <div className="space-y-2 bg-stone-900/50 p-3 rounded-md">
                        <p className="text-sm text-gray-300 font-semibold">Ứng cử viên:</p>
                        <ul className="list-disc list-inside pl-2 text-sm text-white">
                            {candidates.map(c => <li key={c.id}>{c.name} ({c.cultivationStage} Tầng {c.cultivationLevel})</li>)}
                        </ul>
                    </div>
                )}
                 {elders.length > 0 && candidates.length > 0 && (
                    <div className="space-y-2 pt-2 bg-stone-900/50 p-3 rounded-md">
                        <p className="text-sm text-gray-300 font-semibold">Các Trưởng Lão bỏ phiếu:</p>
                        {elders.map(elder => (
                            <div key={elder.id} className="flex items-center justify-between">
                                <label htmlFor={`vote-${elder.id}`} className="text-white text-sm">{elder.name}:</label>
                                <select 
                                    id={`vote-${elder.id}`}
                                    value={votes[elder.id] || ''}
                                    onChange={(e) => handleVoteChange(elder.id, e.target.value)}
                                    className="p-1 bg-stone-900 rounded border border-white/20 text-white text-xs"
                                >
                                    <option value="">-- Chưa bỏ phiếu --</option>
                                    {candidates.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                        ))}
                    </div>
                 )}
                <button onClick={onEndElection} className="w-full mt-3 p-3 bg-rose-700 rounded hover:bg-rose-600 font-bold text-lg">Công Bố Kết Quả</button>
            </div>
        );
    };

    return (
         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4" onClick={onClose}>
            <div className="bg-stone-800 p-6 rounded-lg w-full max-w-lg border-2 border-amber-400/30 relative" onClick={e => e.stopPropagation()}>
                 <button onClick={onClose} className="absolute top-3 right-3 text-white bg-black/50 p-1 rounded-full hover:bg-[var(--color-text-accent)] transition-colors z-20" aria-label="Đóng">
                    <CloseIcon />
                </button>
                <h3 className="text-xl font-bold text-amber-200 mb-4">Tuyển Chọn Thiếu Tộc Trưởng</h3>
                <ElectionUI />
            </div>
        </div>
    );
};

export default ElectionModal;
