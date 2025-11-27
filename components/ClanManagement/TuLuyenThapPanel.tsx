import React from 'react';
import type { Clan, Building, CraftingStation } from '../../types/index.ts';
import { ItemQuality } from '../../types/index.ts';
import { TuLuyenThapIcon } from '../Icons.tsx';
import { getNextTierAndQuality } from '../../logic/utils/clone.ts';
import { BUILDING_UPGRADE_DATA, CULTIVATION_TOWER_CONFIGS, ALL_ITEMS } from '../../constants.ts';
import { RESOURCE_COST_ICONS } from './constants.ts';

interface TuLuyenThapPanelProps {
    building: Building;
    clan: Clan;
    onUpgrade: (buildingId: string) => void;
}

const tierOrder = Object.values(ItemQuality);

const TuLuyenThapPanel: React.FC<TuLuyenThapPanelProps> = ({ building, clan, onUpgrade }) => {
    const stationsByTier = building.stations.reduce((acc, station) => {
        if (!acc[station.tier]) {
            acc[station.tier] = [];
        }
        acc[station.tier].push(station);
        return acc;
    }, {} as Record<ItemQuality, CraftingStation[]>);

    const unlockedTiers = Object.keys(stationsByTier).sort((a,b) => tierOrder.indexOf(a as ItemQuality) - tierOrder.indexOf(b as ItemQuality)) as ItemQuality[];

    const nextLevelInfo = getNextTierAndQuality(building.tier, building.quality);
    const upgradeCost = nextLevelInfo ? BUILDING_UPGRADE_DATA[building.id]?.[nextLevelInfo.tier]?.[nextLevelInfo.quality] : null;
    
    const canAffordUpgrade = upgradeCost 
        ? Object.entries(upgradeCost).every(([resourceId, cost]) => 
            ((resourceId === 'spirit_stone' ? clan.resources[resourceId] : clan.itemInventory[resourceId]) || 0) >= (cost as number)
          ) 
        : false;

    return (
        <div>
            <div className="flex items-center gap-3 mb-4">
                <TuLuyenThapIcon className="w-10 h-10 text-amber-300" />
                <div>
                    <h3 className="text-2xl font-bold text-amber-300">{building.name}</h3>
                    <p className="font-semibold text-green-400">{building.tier} - {building.quality} (Cấp {building.level})</p>
                </div>
            </div>
            
            <p className="text-gray-300 mb-4">Tu Luyện Tháp khuếch đại linh khí, giúp tộc nhân tu luyện với tốc độ nhanh hơn. Tộc nhân sẽ tự động tìm đến tầng phù hợp với cảnh giới của mình để tu luyện trong 1 tháng nếu đáp ứng đủ điều kiện.</p>

            <div className="bg-stone-800/50 p-4 rounded-lg mb-6">
                <h4 className="font-bold text-amber-200 text-lg mb-2">Thăng Cấp</h4>
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
                {unlockedTiers.map(tier => {
                    const config = CULTIVATION_TOWER_CONFIGS[tier];
                    const slots = stationsByTier[tier] || [];
                    const occupiedSlots = slots.filter(s => s.workerId).length;
                    const costItem = config.costType !== 'contribution' ? ALL_ITEMS[config.costType] : null;

                    return (
                        <div key={tier}>
                            <h4 className="font-bold text-amber-200 text-lg mb-2">Tầng {tier.split(' ')[0]} ({occupiedSlots}/{slots.length} vị trí)</h4>
                            <div className="bg-stone-800/60 p-3 rounded-lg">
                                <div className="flex justify-between items-center text-sm mb-2 pb-2 border-b border-white/10">
                                    <span className="text-gray-300">Cảnh giới yêu cầu: <span className="font-semibold text-white">{config.stage}</span></span>
                                    <span className="text-gray-300">Phí vào cửa / tháng: <span className="font-semibold text-yellow-300">
                                        {costItem ? `1 ${costItem.name}` : `${config.cost} Cống hiến`}
                                    </span></span>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
                                     {slots.map((station, index) => {
                                         const character = station.workerId ? clan.members.find(m => m.id === station.workerId) : null;
                                         return (
                                            <div key={index} className="bg-black/40 p-2 rounded-md border border-purple-500/30 text-center">
                                                <p className="font-semibold text-white truncate text-sm">{character?.name || 'Trống'}</p>
                                                {character && <p className="text-xs text-gray-400">Còn {character.cultivationTowerState?.turnsRemaining} tháng</p>}
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

export default TuLuyenThapPanel;