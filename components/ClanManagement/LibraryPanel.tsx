import React, { useState, useEffect } from 'react';
import type { Clan } from '../../types/index.ts';
import { ItemType, ItemQuality } from '../../types/index.ts';
import { ALL_TECHNIQUES, ITEM_QUALITY_COLORS, BUILDING_UPGRADE_DATA } from '../../constants.ts';
import ItemTooltip from '../common/ItemTooltip.tsx';
import { getNextTierAndQuality } from '../../logic/utils/clone.ts';
import { RESOURCE_COST_ICONS } from './constants.ts';

interface LibraryPanelProps {
    clan: Clan;
    onStore: (techId: string) => void;
    onUpgrade: (buildingId: string) => void;
}

const LibraryPanel: React.FC<LibraryPanelProps> = ({ clan, onStore, onUpgrade }) => {
    const building = clan.buildings.library;
    const unlockedTiers = Object.keys(clan.library).sort((a, b) => Object.values(ItemQuality).indexOf(a as ItemQuality) - Object.values(ItemQuality).indexOf(b as ItemQuality)) as ItemQuality[];
    
    const [activeTier, setActiveTier] = useState<ItemQuality>(unlockedTiers[0] || ItemQuality.NHAT_GIAI);
    const [selectedTechToStore, setSelectedTechToStore] = useState('');

    useEffect(() => {
        if (!unlockedTiers.includes(activeTier) && unlockedTiers.length > 0) {
            setActiveTier(unlockedTiers[0]);
        }
    }, [unlockedTiers, activeTier]);

    const availableTechniquesInInventory = Object.entries(clan.itemInventory)
        .map(([id, count]) => ({ id, item: ALL_TECHNIQUES[id as keyof typeof ALL_TECHNIQUES], count }))
        .filter(({ item, count }) => item && count > 0 && (item.type === ItemType.CULTIVATION_METHOD || item.type === ItemType.SECRET_ART || item.type === ItemType.SPELL));

    const handleStore = () => {
        if (!selectedTechToStore) return;
        onStore(selectedTechToStore);
        setSelectedTechToStore('');
    };

    const currentFloorSlots = clan.library[activeTier] || [];
    const usedSlots = currentFloorSlots.filter(s => s !== null).length;

    const nextLevelInfo = getNextTierAndQuality(building.tier, building.quality);
    const upgradeCost = nextLevelInfo ? BUILDING_UPGRADE_DATA[building.id]?.[nextLevelInfo.tier]?.[nextLevelInfo.quality] : null;

    const canAffordUpgrade = upgradeCost
        ? Object.entries(upgradeCost).every(([resourceId, cost]) =>
            ((resourceId === 'spirit_stone' ? clan.resources[resourceId] : clan.itemInventory[resourceId]) || 0) >= (cost as number)
        )
        : false;

    return (
        <div>
            <div className="flex justify-between items-start">
                 <h3 className="text-2xl font-bold text-amber-300 mb-4">Tàng Kinh Các</h3>
                 <p className="font-semibold text-green-400">{building.tier} - {building.quality} (Cấp {building.level})</p>
            </div>
            <div className="bg-stone-800/60 p-4 rounded-lg mb-6">
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

            <div className="bg-stone-800/60 p-4 rounded-lg mb-6">
                <h4 className="font-bold text-amber-200 text-lg mb-2">Cất Giữ Bí Tịch</h4>
                <p className="text-sm text-gray-300 mb-2">Chọn bí tịch từ Khố Phòng để đưa vào tầng tương ứng trong Tàng Kinh Các. Hệ thống sẽ tự tìm vị trí trống.</p>
                <div className="flex gap-2">
                    <select value={selectedTechToStore} onChange={e => setSelectedTechToStore(e.target.value)} className="flex-grow p-2 bg-stone-900 rounded border border-white/20 text-white text-sm">
                        <option value="">-- Chọn Bí Tịch --</option>
                        {availableTechniquesInInventory.map(({ id, item, count }) => <option key={id} value={id}>{item.name} ({item.quality}) (x{Math.floor(count)})</option>)}
                    </select>
                    <button onClick={handleStore} disabled={!selectedTechToStore} className="px-4 py-1 bg-blue-800 rounded text-sm font-semibold hover:bg-blue-700 disabled:bg-gray-600">Cất Giữ</button>
                </div>
            </div>

            <div className="mt-6">
                <div className="flex border-b border-amber-400/30">
                    {unlockedTiers.map(tier => (
                        <button
                            key={tier}
                            onClick={() => setActiveTier(tier)}
                            className={`px-5 py-2 font-bold text-base transition-colors duration-200 -mb-px border-x border-t rounded-t-lg
                                ${activeTier === tier
                                    ? 'border-amber-400/30 bg-stone-800 text-amber-300'
                                    : 'border-transparent text-amber-200/70 hover:bg-stone-900/50'
                                }`}
                        >
                            Tầng {tier}
                        </button>
                    ))}
                </div>

                <div className="bg-stone-800 border-x border-b border-amber-400/30 rounded-b-lg p-4 min-h-[30vh]">
                     {unlockedTiers.length > 0 ? (
                        <>
                            <h4 className="font-bold text-amber-200 text-lg mb-2">Công Pháp Tầng {activeTier} ({usedSlots}/{currentFloorSlots.length})</h4>
                             <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[35vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-800/70 scrollbar-track-transparent">
                                {currentFloorSlots.map((techId, index) => {
                                    const tech = techId ? ALL_TECHNIQUES[techId] : null;
                                    return (
                                        <ItemTooltip key={index} item={tech}>
                                            <div className={`h-full p-2 rounded-md border ${tech ? ITEM_QUALITY_COLORS[tech.quality] : 'text-gray-600'} ${tech ? 'bg-stone-900/70 border-white/20' : 'bg-black/30 border-dashed border-white/10'}`}>
                                                <span className="text-xs text-gray-500">Vị trí {index + 1}</span>
                                                <p className="font-semibold text-sm truncate">{tech ? tech.name : 'Trống'}</p>
                                            </div>
                                        </ItemTooltip>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-gray-400 italic py-8">Chưa mở khoá tầng nào của Tàng Kinh Các.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LibraryPanel;