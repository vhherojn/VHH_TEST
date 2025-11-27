
import React, { useState } from 'react';
import type { Clan, Character } from '../../types/index.ts';
import { PHYSIQUES, ELEMENT_DATA, PHYSIQUE_TIER_COLORS } from '../../constants.ts';
import { SpiritualRootIcon, PhysiqueIcon, ElementIcon, StarIcon } from '../Icons.tsx';

interface ThangTienDaiPanelProps {
    clan: Clan;
    onDiscover: () => void;
    onRecruit: (recruitId: string) => void;
}

const RecruitCard: React.FC<{ recruit: Character, onRecruit: (id: string) => void }> = ({ recruit, onRecruit }) => {
    const physique = PHYSIQUES[recruit.physiqueName];
    const physiqueColor = PHYSIQUE_TIER_COLORS[physique.tier];
    return (
        <div className="bg-stone-800/50 p-4 rounded-lg border border-amber-300/20">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold text-lg text-white">{recruit.name}</p>
                    <p className="text-sm text-gray-400">6 tuổi</p>
                </div>
                <button 
                    onClick={() => onRecruit(recruit.id)}
                    className="px-4 py-1.5 bg-green-700 rounded text-sm font-semibold hover:bg-green-600"
                >
                    Tuyển Mộ
                </button>
            </div>
            <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 text-amber-200/70"><SpiritualRootIcon className="w-4 h-4" /> Linh Căn</span>
                    <div className="flex items-center gap-1">
                         <span className="font-semibold text-white/90 mr-1">{recruit.spiritualRoot.type}</span>
                         {recruit.spiritualRoot.elements.map(el => <ElementIcon key={el} color={ELEMENT_DATA[el].color} className="w-3.5 h-3.5" title={ELEMENT_DATA[el].name} />)}
                    </div>
                </div>
                 <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 text-amber-200/70"><PhysiqueIcon className="w-4 h-4" /> Thể Chất</span>
                    <span className={`font-semibold ${physiqueColor}`}>{recruit.physiqueName}</span>
                </div>
                 <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 text-amber-200/70"><StarIcon className="w-4 h-4" /> Ngộ Tính</span>
                    <span className="font-semibold text-white/90">{recruit.comprehension}</span>
                </div>
            </div>
        </div>
    )
};


const ThangTienDaiPanel: React.FC<ThangTienDaiPanelProps> = ({ clan, onDiscover, onRecruit }) => {
    const DISCOVERY_COST = 500;
    const canAfford = (clan.resources.spirit_stone || 0) >= DISCOVERY_COST;

    return (
        <div>
            <h3 className="text-2xl font-bold text-amber-300 mb-4">Thăng Tiên Đài</h3>
            <div className="bg-stone-800/50 p-4 rounded-lg mb-6">
                <h4 className="font-bold text-amber-200 text-lg mb-2">Tìm Kiếm Tiên Miêu</h4>
                <p className="text-sm text-gray-300 mb-3">Phái người đi các nơi tìm kiếm những hài đồng (6 tuổi) có tư chất tu tiên. Có thể tìm thấy cả ngoại tộc.</p>
                <div className="flex justify-between items-center">
                    <p className={`font-semibold text-lg ${canAfford ? 'text-yellow-400' : 'text-red-500'}`}>Chi phí: {DISCOVERY_COST} Linh Thạch</p>
                    <button 
                        onClick={onDiscover}
                        disabled={!canAfford}
                        className="px-6 py-2 bg-blue-700 rounded font-semibold hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        Tìm Kiếm
                    </button>
                </div>
            </div>

            <div>
                <h4 className="font-bold text-amber-200 text-lg mb-2">Danh Sách Hài Đồng</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[45vh] overflow-y-auto pr-2">
                    {clan.pendingRecruits.length > 0 ? (
                        clan.pendingRecruits.map(recruit => (
                            <RecruitCard key={recruit.id} recruit={recruit} onRecruit={onRecruit} />
                        ))
                    ) : (
                        <p className="col-span-2 text-center text-gray-400 italic py-8">Chưa tìm thấy hài đồng nào.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ThangTienDaiPanel;
