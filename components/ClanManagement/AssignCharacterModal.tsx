import React from 'react';
import type { Clan, Profession } from '../../types/index.ts';
import { ProfessionType, RankType, ItemQuality, EquipmentQuality } from '../../types/index.ts';

interface AssignCharacterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAssign: (characterId: string | null) => void;
    clan: Clan;
    assignmentType: 'worker' | 'apprentice' | 'manager' | 'miner' | 'supervisor';
    professionType: ProfessionType | null;
    allowedRanks?: RankType[];
    buildingTier?: ItemQuality;
}

const AssignCharacterModal: React.FC<AssignCharacterModalProps> = ({ isOpen, onClose, onAssign, clan, assignmentType, professionType, allowedRanks, buildingTier }) => {
    if (!isOpen) return null;

    const eligibleMembers = clan.members.filter(m => {
        const isAvailable = m.status === 'Còn Sống' && !m.activeTaskId && !m.seclusionState && !m.cultivationTowerState;
        if (!isAvailable) return false;
        
        const profession = professionType ? m.professions.find(p => p.type === professionType) : null;
        if (profession?.promotionState) return false; // Không thể phân công khi đang lĩnh ngộ

        if (assignmentType === 'manager' || assignmentType === 'supervisor') {
            return allowedRanks ? allowedRanks.includes(m.rank) : true;
        }
        
        if (assignmentType === 'worker') {
            if (!buildingTier) return false; // Safety check
            if (professionType) {
                if (!profession || profession.apprenticeship) return false; // Worker cannot be an apprentice
                
                // Allow higher-tier professionals to work in lower-tier stations
                const profTierIndex = Object.values(ItemQuality).indexOf(profession.tier);
                const buildingTierIndex = Object.values(ItemQuality).indexOf(buildingTier);
                return profTierIndex >= buildingTierIndex;
            }
            return true; // If no profession type (like for Tran Yeu Duong), just check availability
        }

        if (assignmentType === 'apprentice') {
            if (!professionType || !buildingTier) return false;
            
            // Case 1: Character has no profession yet. They can only become an apprentice in a Tier 1 station.
            if (!profession) {
                return buildingTier === ItemQuality.NHAT_GIAI;
            }
    
            // Case 2: Character has the profession. They can become an apprentice for the next TIER.
            const profTierIndex = Object.values(ItemQuality).indexOf(profession.tier);
            const buildingTierIndex = Object.values(ItemQuality).indexOf(buildingTier);
    
            // Can only become an apprentice for a higher tier
            if (buildingTierIndex > profTierIndex) {
                // And only if they have maxed out their current tier's quality AND EXP.
                return profession.quality === EquipmentQuality.THUONG_PHAM && profession.exp >= profession.expToNext;
            }
            
            // Cannot be an apprentice in the same or lower tier.
            return false;
        }
        
        if (assignmentType === 'miner') {
            return true;
        }

        return true; // Fallback for other types
    });

    const getTitle = () => {
        switch(assignmentType) {
            case 'manager': return 'Bổ Nhiệm Quản Lý';
            case 'worker': 
                if (!professionType) return `Chọn Tộc Nhân Trấn Thủ (${buildingTier})`;
                return `Chọn ${professionType || 'Thợ Chính'} (${buildingTier})`;
            case 'apprentice': return `Chọn Đệ Tử Học Việc (${buildingTier})`;
            case 'miner': return 'Chọn Phu Mỏ';
            case 'supervisor': return 'Bổ Nhiệm Giám Sát';
            default: return 'Chọn Tộc Nhân';
        }
    }

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4" onClick={onClose}>
            <div className="bg-stone-800 p-4 rounded-lg w-full max-w-lg border-2 border-amber-400/30" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-amber-200 mb-4">{getTitle()}</h3>
                <div className="grid grid-cols-2 gap-2 max-h-[60vh] overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-amber-700 scrollbar-track-stone-900">
                    {eligibleMembers.length > 0 ? eligibleMembers.map(char => (
                        <div key={char.id} onClick={() => onAssign(char.id)} className="p-2 bg-stone-700 rounded text-left hover:bg-amber-800 cursor-pointer transition-colors">
                             <p className="font-bold text-white">{char.name}</p>
                             <p className="text-sm text-gray-300">{char.cultivationStage} - Tầng {char.cultivationLevel}</p>
                             <p className="text-xs text-yellow-400">{char.rank}</p>
                        </div>
                    )) : <p className="col-span-2 text-center text-gray-400 italic">Không có tộc nhân nào phù hợp và rảnh rỗi.</p>}
                </div>
                 <button onClick={() => onAssign(null)} className="mt-4 w-full p-2 bg-red-800 rounded font-bold hover:bg-red-700">Gỡ Bỏ Phân Công</button>
            </div>
        </div>
    );
};

export default AssignCharacterModal;