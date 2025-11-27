import React, { useState } from 'react';
import type { Clan, Building, Recipe, CraftingStation } from '../../types/index.ts';
import { RankType, ProfessionType, ItemQuality } from '../../types/index.ts';
import { BUILDINGS, BUILDING_UPGRADE_DATA, ALL_ITEMS, ALL_RECIPES, ITEM_QUALITY_COLORS, CRAFTING_DURATIONS } from '../../constants.ts';
import { getNextTierAndQuality } from '../../logic/utils/clone.ts';
import { RESOURCE_COST_ICONS, BUILDING_ICONS } from './constants.ts';
import AssignCharacterModal from './AssignCharacterModal.tsx';
import type { GameActions } from '../../hooks/useGameLoop.ts';
import ItemTooltip from '../common/ItemTooltip.tsx';
import { calculateCraftingSuccessChance } from '../../logic/professions/crafting.ts';

interface CraftingStationPanelProps {
    building: Building;
    clan: Clan;
    actions: GameActions;
    professionType: ProfessionType;
}

const stationNameMap: Partial<Record<ProfessionType, string>> = {
    [ProfessionType.ALCHEMIST]: 'Lò Luyện Đan',
    [ProfessionType.BLACKSMITH]: 'Lò Rèn',
    [ProfessionType.TALISMAN_MASTER]: 'Bàn Chế Phù',
    [ProfessionType.FORMATION_MASTER]: 'Bàn Trận Pháp',
    [ProfessionType.SPIRIT_FARMER]: 'Thửa Ruộng',
};

const StationCard: React.FC<{
    station: CraftingStation;
    stationIndex: number;
    building: Building;
    clan: Clan;
    actions: GameActions;
    professionType: ProfessionType;
    onOpenAssignModal: (type: 'worker' | 'apprentice', stationIndex: number, apprenticeSlotIndex?: 0 | 1) => void;
}> = ({ station, stationIndex, building, clan, actions, professionType, onOpenAssignModal }) => {
    
    const worker = station.workerId ? clan.members.find(m => m.id === station.workerId) : null;
    const recipe = station.activeRecipeId ? ALL_RECIPES[station.activeRecipeId] : null;
    const craftedItem = recipe && recipe.outputs.length > 0 ? ALL_ITEMS[recipe.outputs[0].itemId] : null;

    const availableRecipes = Object.values(ALL_RECIPES).filter(r => r.building === building.id && r.requiredTier === station.tier);
    const [selectedRecipeId, setSelectedRecipeId] = useState(availableRecipes[0]?.id || '');
    
    const successChance = worker && selectedRecipeId ? calculateCraftingSuccessChance(worker, ALL_RECIPES[selectedRecipeId], professionType, building) : 0;


    const handleStartCrafting = () => {
        if (selectedRecipeId) {
            actions.startCrafting(building.id, stationIndex, selectedRecipeId);
        }
    }
    
    const stationName = stationNameMap[professionType] || 'Lò/Bàn';
    
    return (
        <div className="bg-stone-900/50 p-3 rounded-lg flex flex-col gap-2">
            <h5 className="font-bold text-amber-200">{stationName} #{stationIndex + 1} ({station.tier})</h5>
            
            {/* Worker Slot */}
            <div className="bg-black/20 p-2 rounded-md flex justify-between items-center">
                 <div>
                    <p className="text-xs text-amber-200/60">Thợ Chính</p>
                    <p className="font-bold text-white text-sm">{worker?.name || <span className="italic text-gray-500">Trống</span>}</p>
                 </div>
                 <button onClick={() => onOpenAssignModal('worker', stationIndex)} className="px-2 py-1 text-xs rounded font-semibold bg-blue-800 hover:bg-blue-700 text-white">Bổ nhiệm</button>
            </div>
            
            {/* Apprentice Slots */}
            <div className="grid grid-cols-2 gap-2">
                {station.apprenticeIds.map((charId, index) => {
                    const apprentice = charId ? clan.members.find(m => m.id === charId) : null;
                    const prof = apprentice?.professions.find(p => p.type === professionType);
                    const apprenticeshipState = prof?.apprenticeship;

                    return (
                        <div key={index} className="bg-black/20 p-2 rounded-md">
                            <p className="text-xs text-amber-200/60">Học Việc {index + 1}</p>
                            <p className="font-semibold text-white text-sm truncate">{apprentice?.name || <span className="italic text-gray-500">Trống</span>}</p>
                            {apprenticeshipState && <p className="text-xs text-cyan-300">Còn {apprenticeshipState.monthsRemaining} tháng</p>}
                            <button onClick={() => onOpenAssignModal('apprentice', stationIndex, index as 0 | 1)} className="mt-1 w-full text-center px-2 py-0.5 text-xs rounded font-semibold bg-blue-900/80 hover:bg-blue-800 text-white">Thay đổi</button>
                        </div>
                    )
                })}
            </div>
            
             {/* Crafting Section */}
            <div className="mt-1 pt-2 border-t border-amber-400/20">
                {station.isActive && recipe && craftedItem ? (
                     <div>
                        <p className="text-xs text-gray-300">Đang luyện chế:</p>
                        <p className={`font-bold ${ITEM_QUALITY_COLORS[craftedItem.quality]}`}>{craftedItem.name}</p>
                        <div className="w-full bg-black/50 rounded-full h-2.5 mt-1 shadow-inner">
                            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(station.progress / station.duration) * 100}%` }}></div>
                        </div>
                         <p className="text-xs text-right text-gray-400 mt-0.5">{station.progress} / {station.duration} tháng</p>
                     </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        <select value={selectedRecipeId} onChange={e => setSelectedRecipeId(e.target.value)} className="w-full p-1 bg-stone-900 rounded border border-white/20 text-white text-xs">
                             <option value="">-- Chọn công thức --</option>
                            {availableRecipes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                        </select>
                        <div className='flex justify-between items-center'>
                             <p className="text-xs text-cyan-300">Tỷ lệ: <span className="font-bold">{(successChance * 100).toFixed(0)}%</span></p>
                             <button onClick={handleStartCrafting} disabled={!worker || !selectedRecipeId} className="px-3 py-1 bg-green-700 rounded text-xs font-semibold enabled:hover:bg-green-600 disabled:bg-gray-600">Bắt đầu</button>
                        </div>
                    </div>
                )}
            </div>
             {/* Auto-Crafting Section */}
             <div className="mt-1 pt-2 border-t border-amber-400/20">
                <p className="text-xs font-semibold text-gray-300 mb-1">Tự động sản xuất:</p>
                <div className="flex gap-2">
                    <select
                        value={station.autoCraftRecipeId || ''}
                        onChange={(e) => actions.setStationAutoCraft(building.id, stationIndex, e.target.value || null)}
                        className="flex-grow w-full p-1 bg-stone-900 rounded border border-white/20 text-white text-xs"
                    >
                        <option value="">-- Không tự động --</option>
                        {availableRecipes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                    </select>
                </div>
            </div>

        </div>
    );
};


const CraftingStationPanel: React.FC<CraftingStationPanelProps> = ({ building, clan, actions, professionType }) => {
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<{ type: 'worker' | 'apprentice' | 'manager', stationIndex?: number, apprenticeSlotIndex?: 0 | 1 } | null>(null);

    const Icon = BUILDING_ICONS[building.id]!;
    const manager = building.managerId ? clan.members.find(m => m.id === building.managerId) : null;

    const handleOpenAssignModal = (type: 'worker' | 'apprentice' | 'manager', stationIndex?: number, apprenticeSlotIndex?: 0 | 1) => {
        setSelectedSlot({ type, stationIndex: stationIndex ?? 0, apprenticeSlotIndex });
        setIsAssignModalOpen(true);
    };

    const handleAssignCharacter = (characterId: string | null) => {
        if (selectedSlot?.type === 'manager') {
            actions.assignManagerToBuilding(building.id, characterId);
        } else if (selectedSlot) {
            actions.assignToBuilding(building.id, characterId, selectedSlot.type as 'worker' | 'apprentice', building.stations[selectedSlot.stationIndex].tier, selectedSlot.stationIndex, selectedSlot.apprenticeSlotIndex);
        }
        setIsAssignModalOpen(false);
        setSelectedSlot(null);
    };
    
    const stationsByTier = building.stations.reduce((acc, station) => {
        if (!acc[station.tier]) {
            acc[station.tier] = [];
        }
        acc[station.tier].push(station);
        return acc;
    }, {} as Record<ItemQuality, CraftingStation[]>);

    const unlockedTiers = Object.keys(stationsByTier).sort((a,b) => Object.values(ItemQuality).indexOf(a as ItemQuality) - Object.values(ItemQuality).indexOf(b as ItemQuality)) as ItemQuality[];
    const [activeTier, setActiveTier] = useState<ItemQuality>(unlockedTiers[unlockedTiers.length - 1] || ItemQuality.NHAT_GIAI);

    const UpgradeSection = () => {
        const nextLevelInfo = getNextTierAndQuality(building.tier, building.quality);
        const upgradeCost = nextLevelInfo ? BUILDING_UPGRADE_DATA[building.id]?.[nextLevelInfo.tier]?.[nextLevelInfo.quality] : null;
        
        const canAffordUpgrade = upgradeCost 
            ? Object.entries(upgradeCost).every(([resourceId, cost]) => 
                ((resourceId === 'spirit_stone' ? clan.resources[resourceId] : clan.itemInventory[resourceId]) || 0) >= (cost as number)
              ) 
            : false;
        
        return (
            <div className="bg-stone-800/50 p-4 rounded-lg">
                <h4 className="font-bold text-amber-200 text-lg mb-2">Thăng Cấp</h4>
                {nextLevelInfo && upgradeCost ? (
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col md:flex-row gap-x-4 gap-y-1 items-start md:items-center">
                            <p className="text-sm text-amber-200/70">Mục tiêu: <span className="font-bold text-yellow-400">{nextLevelInfo.tier} - {nextLevelInfo.quality}</span></p>
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
                        </div>
                        <button onClick={() => actions.upgradeBuilding(building.id)} disabled={!canAffordUpgrade} className="px-4 py-2 text-sm rounded font-bold bg-green-600 text-white disabled:bg-gray-600 enabled:hover:bg-green-500 flex-shrink-0">Nâng Cấp</button>
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
                professionType={professionType}
                buildingTier={selectedSlot.stationIndex !== undefined ? building.stations[selectedSlot.stationIndex].tier : undefined}
                allowedRanks={selectedSlot.type === 'manager' ? [RankType.TRUONG_LAO_SU_VU] : undefined}
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
                <div className="flex justify-between items-center">
                    <div>
                        <h4 className="font-bold text-amber-200 text-lg">Quản Lý Công Trình</h4>
                        <p className="text-sm text-gray-400">
                           {manager ? `Đương nhiệm: ${manager.name}` : 'Chưa bổ nhiệm'}
                        </p>
                    </div>
                    <button onClick={() => handleOpenAssignModal('manager')} className="px-4 py-2 text-sm rounded font-semibold bg-blue-800 hover:bg-blue-700 text-white">Bổ nhiệm</button>
                </div>
            </div>

            <div className="flex border-b border-amber-400/30">
                 {unlockedTiers.map(tier => (
                    <button
                        key={tier}
                        onClick={() => setActiveTier(tier)}
                        className={`px-5 py-2 font-bold text-base transition-colors duration-200 -mb-px border-x border-t rounded-t-lg ${activeTier === tier ? 'border-amber-400/30 bg-stone-800 text-amber-300' : 'border-transparent text-amber-200/70 hover:bg-stone-900/50'}`}
                    >
                        Tầng {tier.split(' ')[0]}
                    </button>
                ))}
            </div>

            <div className="bg-stone-800 border-x border-b border-amber-400/30 rounded-b-lg p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                     {(stationsByTier[activeTier] || []).map((station, index) => (
                        <StationCard 
                            key={station.id}
                            station={station}
                            stationIndex={building.stations.findIndex(s => s.id === station.id)}
                            building={building}
                            clan={clan}
                            actions={actions}
                            professionType={professionType}
                            onOpenAssignModal={(type, stationIndex, apprenticeSlotIndex) => handleOpenAssignModal(type, stationIndex, apprenticeSlotIndex)}
                        />
                     ))}
                     {(!stationsByTier[activeTier] || stationsByTier[activeTier].length === 0) && <p className="text-gray-400 italic text-center col-span-2">Cần nâng cấp công trình để mở khóa tầng này.</p>}
                </div>
            </div>
        </div>
    )
};

export default CraftingStationPanel;