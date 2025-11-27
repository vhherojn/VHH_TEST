
import React from 'react';
import type { Clan } from '../../types/index.ts';
import { BUILDINGS, BUILDING_UPGRADE_DATA } from '../../constants.ts';
import { ItemQuality } from '../../types/index.ts';
import { RESOURCE_COST_ICONS, BUILDING_ICONS } from './constants.ts';

interface ConstructionPanelProps {
    clan: Clan;
    onUpgrade: (buildingId: string) => void;
}

const ConstructionPanel: React.FC<ConstructionPanelProps> = ({ clan, onUpgrade }) => {
    const unbuiltBuildings = Object.values(BUILDINGS).filter(b => clan.buildings[b.id].level === 0);

    return (
        <div>
            <h3 className="text-2xl font-bold text-amber-300 mb-4">Xây Dựng Công Trình</h3>
            <p className="text-gray-300 mb-6">Chọn một công trình từ danh sách dưới đây để bắt đầu xây dựng và mở rộng gia tộc.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {unbuiltBuildings.length > 0 ? unbuiltBuildings.map(buildingInfo => {
                    const costData = BUILDING_UPGRADE_DATA[buildingInfo.id]?.[ItemQuality.NHAT_GIAI]?.['Hạ Phẩm'];
                    if (!costData) return null;

                    const canAfford = Object.entries(costData).every(([resourceId, cost]) => 
                        ((resourceId === 'spirit_stone' ? clan.resources[resourceId] : clan.itemInventory[resourceId]) || 0) >= cost
                    );
                    
                    const Icon = BUILDING_ICONS[buildingInfo.id];

                    return (
                        <div key={buildingInfo.id} className="bg-stone-800/50 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                {Icon && <Icon className="w-5 h-5 text-amber-200/80" />}
                                <h4 className="text-base font-bold text-white">{buildingInfo.name}</h4>
                            </div>
                            <div className="border-t border-white/10 pt-2">
                                <div className="text-xs text-amber-200/60 mb-2">Chi phí:</div>
                                <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2">
                                    {Object.entries(costData).map(([resourceId, cost]) => {
                                        const ResourceIconComponent = RESOURCE_COST_ICONS[resourceId];
                                        const hasEnough = ((resourceId === 'spirit_stone' ? clan.resources[resourceId] : clan.itemInventory[resourceId]) || 0) >= cost;
                                        return (
                                            <div key={resourceId} className={`flex items-center gap-1 text-xs ${hasEnough ? 'text-gray-300' : 'text-red-500'}`}>
                                                {ResourceIconComponent && <ResourceIconComponent className="w-3 h-3"/>}
                                                <span>{cost}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <button
                                    onClick={() => onUpgrade(buildingInfo.id)}
                                    disabled={!canAfford}
                                    className="w-full mt-1 px-4 py-1 text-sm rounded font-bold bg-green-700 text-white disabled:bg-gray-600 enabled:hover:bg-green-600 transition-colors"
                                >
                                    Xây Dựng
                                </button>
                            </div>
                        </div>
                    );
                }) : (
                    <p className="col-span-full text-center text-gray-400 italic pt-10">Tất cả công trình đã được xây dựng.</p>
                )}
            </div>
        </div>
    );
};

export default ConstructionPanel;
