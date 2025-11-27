
import React, { useState } from 'react';
import type { Clan, Building } from '../../types/index.ts';
import { getNextTierAndQuality } from '../../logic/utils/clone.ts';
import { BUILDING_UPGRADE_DATA } from '../../constants.ts';
import { RESOURCE_COST_ICONS, BUILDING_ICONS } from './constants.ts';
import AssignCharacterModal from './AssignCharacterModal.tsx';
import { ItemQuality, EquipmentQuality } from '../../types/index.ts';

interface TranYeuDuongPanelProps {
    building: Building;
    clan: Clan;
    onUpgrade: (buildingId: string) => void;
    onAssign: (characterId: string | null, tier: ItemQuality, slotIndex: number) => void;
}

const tierOrder = Object.values(ItemQuality);
const qualityOrder = Object.values(EquipmentQuality);

const calculateSlotsForTier = (targetTier: ItemQuality, buildingTier: ItemQuality, buildingQuality: EquipmentQuality): number => {
    const targetTierIndex = tierOrder.indexOf(targetTier);
    const buildingTierIndex = tierOrder.indexOf(buildingTier);

    if (targetTierIndex > buildingTierIndex) return 0;
    if (targetTierIndex < buildingTierIndex) return 5 + (qualityOrder.length * 5); // Max slots for lower tiers

    // For the current building tier, calculate slots based on quality
    return 5 + (qualityOrder.indexOf(buildingQuality) * 5);
};

const TranYeuDuongPanel: React.FC<TranYeuDuongPanelProps> = ({ building, clan, onUpgrade, onAssign }) => {
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [assignPayload, setAssignPayload] = useState<{ tier: ItemQuality, slotIndex: number } | null>(null);

    const Icon = BUILDING_ICONS[building.id]!;
    
    const nextLevelInfo = getNextTierAndQuality(building.tier, building.quality);
    const upgradeCost = nextLevelInfo ? BUILDING_UPGRADE_DATA[building.id]?.[nextLevelInfo.tier]?.[nextLevelInfo.quality] : null;
    
    const canAffordUpgrade = upgradeCost 
        ? Object.entries(upgradeCost).every(([resourceId, cost]) => 
            ((resourceId === 'spirit_stone' ? clan.resources[resourceId] : clan.itemInventory[resourceId]) || 0) >= (cost as number)
          ) 
        : false;

    const handleOpenAssignModal = (tier: ItemQuality, slotIndex: number) => {
        setAssignPayload({ tier, slotIndex });
        setIsAssignModalOpen(true);
    };
    
    const handleAssignCharacter = (characterId: string | null) => {
        if (assignPayload) {
            onAssign(characterId, assignPayload.tier, assignPayload.slotIndex);
        }
        setIsAssignModalOpen(false);
        setAssignPayload(null);
    };

    return (
        <div>
            {assignPayload && <AssignCharacterModal 
                isOpen={isAssignModalOpen} 
                onClose={() => setIsAssignModalOpen(false)} 
                onAssign={handleAssignCharacter} 
                clan={clan} 
                assignmentType={'worker'} // Using a generic type
                professionType={null} // No profession needed for hunting
                buildingTier={assignPayload.tier}
            />}
            <div className="flex items-center gap-3 mb-4">
                {Icon && <Icon className="w-10 h-10 text-amber-300" />}
                <div>
                    <h3 className="text-2xl font-bold text-amber-300">{building.name}</h3>
                    <p className="font-semibold text-green-400">{building.tier} - {building.quality} (Cấp {building.level})</p>
                </div>
            </div>

            <p className="text-gray-300 mb-6">Nơi các tộc nhân có thể trấn thủ để đối phó với yêu thú rình rập, rèn luyện kinh nghiệm thực chiến và thu thập Yêu Đan.</p>
            
            <div className="bg-stone-800/50 p-4 rounded-lg mb-6">
                <h4 className="font-bold text-amber-200 text-lg mb-2">Thăng Cấp Công Trình</h4>
                {nextLevelInfo && upgradeCost ? (
                    <div>
                        <p className="text-sm text-amber-200/70">Mục tiêu: <span className="font-bold text-yellow-400">{nextLevelInfo.tier} - {nextLevelInfo.quality}</span></p>
                        <div className="flex justify-between items-center mt-2">
                             <div className="flex gap-4 items-center">
                                {Object.entries(upgradeCost).map(([resourceId, cost]) => {
                                    const ResourceIconComponent = RESOURCE_COST_ICONS[resourceId];
                                    const hasEnough = ((resourceId === 'spirit_stone' ? clan.resources[resourceId] : clan.itemInventory[resourceId]) || 0) >= (cost as number);
                                    return ( <div key={resourceId} className={`flex items-center gap-1 text-sm ${hasEnough ? 'text-gray-300' : 'text-red-500'}`} title={resourceId}> {ResourceIconComponent && <ResourceIconComponent className="w-4 h-4"/>} <span>{cost.toLocaleString()}</span> </div> );
                                })}
                            </div>
                            <button onClick={() => onUpgrade(building.id)} disabled={!canAffordUpgrade} className="px-4 py-2 text-sm rounded font-bold bg-green-600 text-white disabled:bg-gray-600 enabled:hover:bg-green-500">Nâng Cấp</button>
                        </div>
                    </div>
                ) : ( <p className="text-yellow-400 italic">Công trình đã đạt cấp tối đa.</p> )}
            </div>

            <div className="space-y-4">
                 {(building.huntingAssignments || []).map(assignment => {
                     const totalSlots = calculateSlotsForTier(assignment.tier, building.tier, building.quality);
                     const occupiedSlots = assignment.memberIds.filter(id => id !== null).length;
                     return (
                        <div key={assignment.tier}>
                            <h4 className="font-bold text-amber-200 text-lg mb-2">Tổ Đội Săn Bắn {assignment.tier} ({occupiedSlots}/{totalSlots})</h4>
                            <div className="bg-stone-800/60 p-3 rounded-lg">
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
                                     {Array.from({ length: totalSlots }).map((_, index) => {
                                         const memberId = assignment.memberIds[index];
                                         const character = memberId ? clan.members.find(m => m.id === memberId) : null;
                                         return (
                                            <div key={index} className="bg-black/40 p-2 rounded-md border border-purple-500/30 text-center flex flex-col justify-center min-h-[4rem]">
                                                {character ? (
                                                     <>
                                                        <p className="font-semibold text-white truncate text-sm">{character.name}</p>
                                                        <button onClick={() => handleOpenAssignModal(assignment.tier, index)} className="mt-1 text-xs text-red-400 hover:text-red-300">Gỡ bỏ</button>
                                                     </>
                                                ) : (
                                                    <button onClick={() => handleOpenAssignModal(assignment.tier, index)} className="w-full h-full text-center text-gray-500 hover:text-white hover:bg-stone-700 rounded-md text-2xl">+</button>
                                                )}
                                            </div>
                                         );
                                     })}
                                </div>
                            </div>
                        </div>
                     )
                 })}
            </div>
        </div>
    );
};

export default TranYeuDuongPanel;
