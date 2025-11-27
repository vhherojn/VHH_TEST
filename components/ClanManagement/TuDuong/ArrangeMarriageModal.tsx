import React, { useState, useMemo } from 'react';
import type { Clan } from '../../../types/index.ts';
import { Gender, RelationshipClass } from '../../../types/index.ts';
import { CloseIcon } from '../../Icons.tsx';
import { MARRIAGE_AGE_MIN } from '../../../constants.ts';

interface ArrangeMarriageModalProps {
    isOpen: boolean;
    onClose: () => void;
    clan: Clan;
    onArrangeMarriage: (char1Id: string, char2Id: string) => void;
}

const ArrangeMarriageModal: React.FC<ArrangeMarriageModalProps> = ({ isOpen, onClose, clan, onArrangeMarriage }) => {
    const [char1Id, setChar1Id] = useState<string>('');
    const [char2Id, setChar2Id] = useState<string>('');

    const eligibleMembers = useMemo(() => 
        clan.members.filter(m => 
            m.status === 'Còn Sống' && 
            m.age >= MARRIAGE_AGE_MIN &&
            !m.relationships.some(r => r.class === RelationshipClass.SPOUSE)
        ), 
    [clan.members]);

    const char1 = useMemo(() => clan.members.find(m => m.id === char1Id), [clan.members, char1Id]);

    const eligiblePartners = useMemo(() => {
        if (!char1) return [];
        return eligibleMembers.filter(m => m.id !== char1.id && m.gender !== char1.gender);
    }, [eligibleMembers, char1]);
    
    const handleSubmit = () => {
        if (char1Id && char2Id) {
            onArrangeMarriage(char1Id, char2Id);
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
                <h3 className="text-xl font-bold text-amber-200 mb-4">Ban Hôn</h3>
                
                <div className="flex flex-col gap-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Chọn Tộc Nhân Thứ Nhất</label>
                        <select value={char1Id} onChange={e => {setChar1Id(e.target.value); setChar2Id('')}} className="w-full p-2 bg-stone-900 rounded border border-white/20 text-white">
                            <option value="">-- Chọn --</option>
                            {eligibleMembers.map(m => <option key={m.id} value={m.id}>{m.name} ({m.gender}, {m.age} tuổi)</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Chọn Đạo Lữ</label>
                        <select value={char2Id} onChange={e => setChar2Id(e.target.value)} className="w-full p-2 bg-stone-900 rounded border border-white/20 text-white" disabled={!char1Id}>
                            <option value="">-- Chọn --</option>
                            {eligiblePartners.map(m => <option key={m.id} value={m.id}>{m.name} ({m.gender}, {m.age} tuổi)</option>)}
                        </select>
                    </div>
                </div>
                
                <button 
                    onClick={handleSubmit} 
                    disabled={!char1Id || !char2Id} 
                    className="w-full mt-4 p-3 bg-pink-700 rounded hover:bg-pink-600 font-bold text-lg disabled:bg-gray-600 transition-colors"
                >
                    Tác Hợp
                </button>
            </div>
        </div>
    );
};

export default ArrangeMarriageModal;
