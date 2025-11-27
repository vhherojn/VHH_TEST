
import React from 'react';
import type { Force, DiplomacyState } from '../../types/forces.ts';
import { BattleIcon, ResourceIcon, ClanIcon, ScrollIcon, StarIcon } from '../Icons.tsx';
import AvatarDisplay from '../AvatarDisplay.tsx';

interface ForceInfoPanelProps {
    force: Force;
    diplomacy: DiplomacyState; // Trạng thái ngoại giao/tình báo đối với người chơi
}

const HiddenValue: React.FC = () => <span className="text-gray-500 italic font-normal">???</span>;

const ForceInfoPanel: React.FC<ForceInfoPanelProps> = ({ force, diplomacy }) => {
    const intel = diplomacy.intelLevel || 0;

    // Fog of War Logic
    const showPower = intel >= 20;
    const showResources = intel >= 40;
    const showPopulation = intel >= 30;
    const showExperts = intel >= 50;
    const showDetailedDescription = intel >= 10;
    
    // Leader is always public now (0.20.45)
    const showLeader = true; 

    return (
        <div className="space-y-4 text-[var(--color-text-main)]">
            {/* Leader Section (New 0.20.44 & Updated 0.20.45) */}
            <div className="flex items-center gap-4 p-3 bg-stone-800/40 rounded-lg border border-amber-500/20">
                <div className="w-16 h-16 rounded-full bg-stone-700 border-2 border-amber-500/50 overflow-hidden flex-shrink-0">
                    {force.leader ? (
                        <AvatarDisplay avatar={force.leader.avatar} />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">?</div>
                    )}
                </div>
                <div className="flex-grow">
                    {force.leader ? (
                        <>
                            <p className="text-xs text-amber-500 uppercase font-bold">
                                {force.leader.title} - {force.name}
                            </p>
                            <h3 className="text-lg font-bold text-white">
                                {force.leader.name}
                            </h3>
                            <p className="text-xs text-gray-400">
                                Tu vi: {force.leader.cultivationStage}
                            </p>
                        </>
                    ) : (
                         <p className="text-gray-500 italic">Chưa có thông tin lãnh đạo</p>
                    )}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-black/5 rounded border border-black/10 flex flex-col items-center">
                    <span className="text-xs text-gray-500 uppercase font-bold mb-1">Thực Lực</span>
                    <div className="flex items-center gap-1 text-lg font-bold text-red-700">
                        <BattleIcon className="w-5 h-5"/> 
                        {showPower ? force.power.toLocaleString() : <HiddenValue />}
                    </div>
                </div>
                <div className="p-3 bg-black/5 rounded border border-black/10 flex flex-col items-center">
                    <span className="text-xs text-gray-500 uppercase font-bold mb-1">Tài Nguyên</span>
                    <div className="flex items-center gap-1 text-lg font-bold text-amber-700">
                        <ResourceIcon /> 
                        {showResources ? force.resources.toLocaleString() : <HiddenValue />}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                 <div className="p-3 bg-black/5 rounded border border-black/10">
                    <p className="text-xs text-gray-500 uppercase font-bold mb-1 flex items-center gap-1"><ClanIcon className="w-3 h-3"/> Môn Nhân</p>
                    <p className="text-base font-semibold">
                        {showPopulation ? `${force.population.toLocaleString()} người` : <HiddenValue />}
                    </p>
                </div>
                 <div className="p-3 bg-black/5 rounded border border-black/10">
                    <p className="text-xs text-gray-500 uppercase font-bold mb-1 flex items-center gap-1"><StarIcon className="w-3 h-3"/> Cao Tầng</p>
                    <p className="text-base font-semibold">
                        {showExperts ? `${force.experts} vị` : <HiddenValue />}
                    </p>
                </div>
            </div>

            <div className="p-3 bg-black/5 rounded border border-black/10">
                <p className="text-sm font-semibold mb-1 flex items-center gap-2"><ClanIcon className="w-4 h-4"/> Địa Bàn ({force.territoryIds.length})</p>
                {intel >= 20 ? (
                    force.territoryIds.length > 0 ? (
                        <p className="text-xs text-gray-600">Đang chiếm giữ {force.territoryIds.length} địa điểm quan trọng.</p>
                    ) : (
                        <p className="text-xs text-gray-500 italic">Chưa chiếm giữ địa bàn nào.</p>
                    )
                ) : (
                    <p className="text-xs text-gray-500 italic">Chưa rõ tình hình lãnh thổ.</p>
                )}
            </div>

            <div>
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-[var(--color-text-accent)] border-b border-black/10 pb-1"><ScrollIcon className="w-5 h-5"/> Giới Thiệu</h3>
                <p className="text-sm leading-relaxed whitespace-pre-wrap italic text-gray-700">
                    {showDetailedDescription ? force.description : "Một thế lực bí ẩn, cần thẩm thấu để biết thêm chi tiết."}
                </p>
            </div>
        </div>
    );
};

export default ForceInfoPanel;
