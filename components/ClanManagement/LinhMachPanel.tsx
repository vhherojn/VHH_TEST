
import React, { useState } from 'react';
import type { Clan, Character } from '../../types/index.ts';
import { LINH_MACH_DATA } from '../../constants.ts';
import { CultivationStage, RankType } from '../../types/index.ts';
import { getNextTierAndQuality } from '../../logic/utils/clone.ts';
import AssignCharacterModal from './AssignCharacterModal.tsx';

interface LinhMachPanelProps {
    clan: Clan;
    onUpgrade: () => void;
    onAssign: (characterId: string | null, role: 'miner' | 'supervisor', slotIndex?: number) => void;
}

const LinhMachPanel: React.FC<LinhMachPanelProps> = ({ clan, onUpgrade, onAssign }) => {
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [assignPayload, setAssignPayload] = useState<{role: 'miner' | 'supervisor', slotIndex?: number} | null>(null);

    const currentInfo = LINH_MACH_DATA[clan.linhMach.tier]?.[clan.linhMach.quality];
    const nextLinhMach = getNextTierAndQuality(clan.linhMach.tier, clan.linhMach.quality);
    const nextInfo = nextLinhMach ? LINH_MACH_DATA[nextLinhMach.tier]?.[nextLinhMach.quality] : null;

    if (!currentInfo) {
        return <div className="text-white">Lỗi dữ liệu linh mạch.</div>;
    }
    
    const canAfford = nextInfo ? (clan.resources.spirit_stone || 0) >= nextInfo.upgradeCost : false;
    const supervisor = clan.linhMach.miningAssignments.supervisorId ? clan.members.find(m => m.id === clan.linhMach.miningAssignments.supervisorId) : null;
    const supervisorRanks = [RankType.TRUONG_LAO, RankType.DAI_TRUONG_LAO, RankType.TOC_TRUONG];

    const handleOpenAssignModal = (role: 'miner' | 'supervisor', slotIndex?: number) => {
        setAssignPayload({ role, slotIndex });
        setIsAssignModalOpen(true);
    };

    const handleAssignCharacter = (characterId: string | null) => {
        if (assignPayload) {
            onAssign(characterId, assignPayload.role, assignPayload.slotIndex);
        }
        setIsAssignModalOpen(false);
        setAssignPayload(null);
    };

    return (
        <div>
             {assignPayload && (
                 <AssignCharacterModal 
                    isOpen={isAssignModalOpen} 
                    onClose={() => setIsAssignModalOpen(false)} 
                    onAssign={handleAssignCharacter} 
                    clan={clan}
                    assignmentType={assignPayload.role}
                    professionType={null}
                    allowedRanks={assignPayload.role === 'supervisor' ? supervisorRanks : undefined}
                />
             )}
            <h3 className="text-2xl font-bold text-amber-300 mb-4">Tổ Địa Linh Mạch</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column: Stats & Upgrade */}
                <div className="space-y-4">
                     <div className="bg-stone-800/50 p-4 rounded-lg shadow-inner space-y-3">
                        <div className="flex justify-between items-center text-lg">
                            <span className="text-amber-200/80 font-semibold">Cấp Hiện Tại:</span>
                            <span className="font-bold text-green-400">{clan.linhMach.tier} - {clan.linhMach.quality}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg">
                            <span className="text-amber-200/80 font-semibold">Sản Lượng Linh Khí:</span>
                            <span className="font-bold text-green-400">{currentInfo.linhKhiProduction.toLocaleString()} / tháng</span>
                        </div>
                        <div className="flex justify-between items-center text-lg">
                            <span className="text-amber-200/80 font-semibold">Hỗ Trợ Tu Luyện:</span>
                            <span className="font-bold text-green-400">+{((currentInfo.cultivationModifier - 1) * 100).toFixed(0)}%</span>
                        </div>
                    </div>
                    {nextLinhMach && nextInfo && (
                         <div>
                            <h4 className="font-semibold text-xl text-amber-200 mb-3">Thăng Cấp</h4>
                            <div className="bg-stone-800/50 p-4 rounded-lg shadow-inner space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-amber-200/70">Mục tiêu:</span>
                                    <span className="font-bold text-yellow-400">{nextLinhMach.tier} - {nextLinhMach.quality}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-amber-200/70">Chi phí:</span>
                                    <span className={`font-bold ${canAfford ? 'text-yellow-400' : 'text-red-500'}`}>{nextInfo.upgradeCost.toLocaleString()} Linh Thạch</span>
                                </div>
                            </div>
                            <button
                                onClick={onUpgrade}
                                disabled={!canAfford}
                                className="mt-4 w-full p-3 rounded-lg font-bold text-xl text-white transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:scale-105"
                                style={{
                                    background: canAfford ? 'radial-gradient(ellipse at center, var(--color-jade) 0%, var(--color-jade-dark) 100%)' : 'radial-gradient(ellipse at center, #555, #333)',
                                    boxShadow: canAfford ? `0 0 15px var(--color-jade)` : 'none'
                                }}
                            >
                                Thăng Cấp
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Column: Mining Assignments */}
                <div>
                     <h4 className="font-semibold text-xl text-amber-200 mb-3">Khai Thác Linh Thạch</h4>
                     <div className="space-y-3">
                         <div className="bg-stone-800/50 p-3 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="text-sm text-amber-200/60">Trưởng Lão Giám Sát</p>
                                {supervisor ? (
                                    <p className="font-bold text-white">{supervisor.name}</p>
                                ) : ( <p className="text-gray-500 italic">Chưa bổ nhiệm</p> )}
                            </div>
                            <button onClick={() => handleOpenAssignModal('supervisor')} className="px-3 py-1 text-xs rounded font-semibold bg-blue-800 hover:bg-blue-700 text-white">Bổ Nhiệm</button>
                         </div>
                         <h5 className="font-semibold text-amber-200/80 pt-2">Phu Mỏ</h5>
                         <div className="grid grid-cols-1 gap-2">
                             {clan.linhMach.miningAssignments.minerIds.map((charId, index) => {
                                 const character = charId ? clan.members.find(m => m.id === charId) : null;
                                 return (
                                     <div key={index} className="bg-stone-800/50 p-3 rounded-lg flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-amber-200/60">Vị trí {index + 1}</p>
                                            {character ? (
                                                <p className="font-bold text-white">{character.name}</p>
                                            ) : ( <p className="text-gray-500 italic">Trống</p> )}
                                        </div>
                                        <button onClick={() => handleOpenAssignModal('miner', index)} className="px-3 py-1 text-xs rounded font-semibold bg-blue-800 hover:bg-blue-700 text-white">Thay đổi</button>
                                    </div>
                                 );
                             })}
                         </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default LinhMachPanel;