import React, { useState } from 'react';
import type { Clan, Building, CraftingStation } from '../../types/index.ts';
import { RankType } from '../../types/index.ts';
import { BUILDINGS, BUILDING_UPGRADE_DATA, ALL_ITEMS, ITEM_QUALITY_COLORS } from '../../constants.ts';
import { getNextTierAndQuality } from '../../logic/utils/clone.ts';
import { RESOURCE_COST_ICONS, BUILDING_ICONS } from './constants.ts';
import AssignCharacterModal from './AssignCharacterModal.tsx';
import { ItemType, ItemQuality, ProfessionType } from '../../types/index.ts';
import type { GameActions } from '../../hooks/useGameLoop.ts';

interface HerbGardenPanelProps {
    building: Building;
    clan: Clan;
    actions: GameActions;
}

const tierOrder = Object.values(ItemQuality);

const HerbGardenPanel: React.FC<HerbGardenPanelProps> = ({ building, clan, actions }) => {
    const stationsByTier = building.stations.reduce((acc, station) => {
        if (!acc[station.tier]) {
            acc[station.tier] = [];
        }
        acc[station.tier].push(station);
        return acc;
    }, {} as Record<ItemQuality, CraftingStation[]>);
    
    const unlockedTiers = Object.keys(stationsByTier).sort((a,b) => tierOrder.indexOf(a as ItemQuality) - tierOrder.indexOf(b as ItemQuality)) as ItemQuality[];

    const [activeTier, setActiveTier] = useState<ItemQuality>(unlockedTiers[unlockedTiers.length - 1] || ItemQuality.NHAT_GIAI);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<{ type: 'worker' | 'apprentice', stationIndex: number, tier: ItemQuality, apprenticeSlotIndex?: 0|1 } | null>(null);

    const buildingDef = BUILDINGS[building.id];
    const Icon = BUILDING_ICONS[building.id]!;
    
    const handleOpenAssignModal = (type: 'worker' | 'apprentice', stationIndex: number, tier: ItemQuality, apprenticeSlotIndex?: 0 | 1) => {
        setSelectedSlot({ type, stationIndex, tier, apprenticeSlotIndex });
        setIsAssignModalOpen(true);
    };
    
    const handleAssignCharacter = (characterId: string | null) => {
        if (selectedSlot) {
            actions.assignToBuilding(building.id, characterId, selectedSlot.type, selectedSlot.tier, selectedSlot.stationIndex, selectedSlot.apprenticeSlotIndex);
        }
        setIsAssignModalOpen(false);
        setSelectedSlot(null);
    };
    
    const stationsInActiveTier = stationsByTier[activeTier] || [];
    
    const availableSeeds = Object.entries(clan.itemInventory)
        .filter(([id, count]) => {
            const item = ALL_ITEMS[id];
            return item?.type === ItemType.SEED && count > 0;
        });
    
    const firstActiveRecipeId = building.stations.find(s => s.isActive)?.activeRecipeId;

    const UpgradeSection = () => {
        const nextLevelInfo = getNextTierAndQuality(building.tier, building.quality);
        const upgradeCost = nextLevelInfo ? BUILDING_UPGRADE_DATA[building.id]?.[nextLevelInfo.tier]?.[nextLevelInfo.quality] : null;
        
        const canAffordUpgrade = upgradeCost 
            ? Object.entries(upgradeCost).every(([resourceId, cost]) => 
                ((resourceId === 'spirit_stone' ? clan.resources[resourceId] : clan.itemInventory[resourceId]) || 0) >= (cost as number)
              ) 
            : false;
        
        return (
            <div className="bg-stone-800/50 p-4 rounded-lg mb-4">
                <h4 className="font-bold text-amber-200 text-lg mb-2">Thăng Cấp</h4>
                {nextLevelInfo && upgradeCost ? (
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            {Object.entries(upgradeCost).map(([resourceId, cost]) => {
                                const ResourceIcon = RESOURCE_COST_ICONS[resourceId];
                                return (
                                <div key={resourceId} className={`flex items-center gap-1 text-sm ${((clan.itemInventory[resourceId] || clan.resources[resourceId] || 0) >= (cost as number)) ? 'text-gray-300' : 'text-red-500'}`} title={resourceId}>
                                    {ResourceIcon && <ResourceIcon className="w-4 h-4"/>}
                                    <span>{cost.toLocaleString()}</span>
                                </div>
                                );
                            })}
                        </div>
                        <button onClick={() => actions.upgradeBuilding(building.id)} disabled={!canAffordUpgrade} className="px-4 py-2 text-sm rounded font-bold bg-green-600 text-white disabled:bg-gray-600 enabled:hover:bg-green-500">Nâng Cấp</button>
                    </div>
                ) : <p className="text-yellow-400 italic">Công trình đã đạt cấp tối đa.</p>}
            </div>
        );
    };

    return (
        <div className="space-y-4">
            {selectedSlot && <AssignCharacterModal 
                isOpen={isAssignModalOpen} 
                onClose={() => setIsAssignModalOpen(false)} 
                onAssign={handleAssignCharacter} 
                clan={clan} 
                assignmentType={selectedSlot.type}
                professionType={buildingDef.profession}
                buildingTier={selectedSlot.tier}
            />}
            
            <div className="flex items-center gap-3">
                {Icon && <Icon className="w-10 h-10 text-amber-300" />}
                <div>
                    <h3 className="text-2xl font-bold text-amber-300">{building.name}</h3>
                    <p className="font-semibold text-green-400">{building.tier} - {building.quality} (Cấp {building.level})</p>
                </div>
            </div>
            
            <UpgradeSection />

            <div className="bg-stone-800/50 p-4 rounded-lg">
                <h4 className="font-bold text-amber-200 text-lg mb-2">Trồng Trọt</h4>
                <p className="text-sm text-gray-400 mb-3">Chọn một loại hạt giống để gieo trồng trên tất cả các thửa ruộng trống.</p>
                <div className='flex items-center gap-2'>
                    <select 
                        value={firstActiveRecipeId || ''} 
                        onChange={(e) => actions.setBuildingRecipe(building.id, e.target.value || null)} 
                        className="flex-grow p-2 bg-stone-900 rounded border border-white/20 text-white text-sm"
                    >
                        <option value="">-- Ngừng canh tác --</option>
                        {availableSeeds.map(([id]) => <option key={id} value={id}>{ALL_ITEMS[id]?.name}</option>)}
                    </select>
                </div>
                {firstActiveRecipeId ? (
                    <p className='text-sm text-gray-300 mt-2'>Đang trồng: 
                        <span className={`font-semibold ${ITEM_QUALITY_COLORS[ALL_ITEMS[firstActiveRecipeId].quality]}`}> {ALL_ITEMS[firstActiveRecipeId]?.name}</span>
                    </p>
                ) : <p className="text-center italic text-gray-400 pt-2">Chọn hạt giống để bắt đầu.</p>}
            </div>
            
            <div className="flex border-b border-amber-400/30">
                {unlockedTiers.map(tier => (
                    <button
                        key={tier}
                        onClick={() => setActiveTier(tier)}
                        className={`px-5 py-2 font-bold text-base transition-colors duration-200 -mb-px border-x border-t rounded-t-lg ${activeTier === tier ? 'border-amber-400/30 bg-stone-800 text-amber-300' : 'border-transparent text-amber-200/70 hover:bg-stone-900/50'}`}
                    >
                        Ruộng {tier.split(' ')[0]}
                    </button>
                ))}
            </div>

            <div className="bg-stone-800 border-x border-b border-amber-400/30 rounded-b-lg p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(stationsInActiveTier || []).map(station => {
                    const worker = station.workerId ? clan.members.find(m => m.id === station.workerId) : null;
                    const stationIndex = building.stations.findIndex(s => s.id === station.id);
                    return (
                        <div key={station.id} className="bg-stone-900/50 p-3 rounded-lg flex flex-col gap-2">
                            <h5 className="font-bold text-amber-200">Thửa Ruộng #{stationIndex + 1}</h5>
                             <div className="bg-black/20 p-2 rounded-md flex justify-between items-center">
                                 <div>
                                    <p className="text-xs text-amber-200/60">Linh Nông</p>
                                    <p className="font-bold text-white text-sm">{worker?.name || <span className="italic text-gray-500">Trống</span>}</p>
                                 </div>
                                 <button onClick={() => handleOpenAssignModal('worker', stationIndex, station.tier)} className="px-2 py-1 text-xs rounded font-semibold bg-blue-800 hover:bg-blue-700 text-white">Phân công</button>
                            </div>
                             <div className="grid grid-cols-2 gap-2">
                                {station.apprenticeIds.map((charId, index) => {
                                    const apprentice = charId ? clan.members.find(m => m.id === charId) : null;
                                    return (
                                        <div key={index} className="bg-black/20 p-2 rounded-md">
                                            <p className="text-xs text-amber-200/60">Học Việc {index + 1}</p>
                                            <p className="font-semibold text-white text-sm truncate">{apprentice?.name || <span className="italic text-gray-500">Trống</span>}</p>
                                            <button onClick={() => handleOpenAssignModal('apprentice', stationIndex, station.tier, index as 0 | 1)} className="mt-1 w-full text-center px-2 py-0.5 text-xs rounded font-semibold bg-blue-900/80 hover:bg-blue-800 text-white">Thay đổi</button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HerbGardenPanel;