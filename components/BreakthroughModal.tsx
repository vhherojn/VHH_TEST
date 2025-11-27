
import React, { useState, useMemo } from 'react';
import type { Clan, Character, AnyItem } from '../types/index.ts';
import { CultivationStage } from '../types/index.ts';
import { cultivationStateFactory } from '../logic/cultivation/stateFactory.ts';
import AvatarDisplay from './AvatarDisplay.tsx';
import { ALL_ITEMS, ITEM_QUALITY_COLORS } from '../constants.ts';
import ItemTooltip from './common/ItemTooltip.tsx';

interface BreakthroughModalProps {
    character: Character;
    clan: Clan;
    onConfirm: (aidItemId?: string) => void;
    onDecline: () => void;
}

const TRIBULATIONS: Partial<Record<CultivationStage, { name: string, description: string }[]>> = {
    [CultivationStage.CORE_FORMATION]: [
        { name: 'Bình Cảnh Kiếp', description: 'Kiểm tra đạo tâm và sự vững chắc của căn cơ.' },
        { name: 'Địa Lôi Kiếp', description: 'Kiểm tra khả năng chống chịu của cơ thể trước sức mạnh của đất trời.' }
    ],
    [CultivationStage.NASCENT_SOUL]: [
        { name: 'Bình Cảnh Kiếp', description: 'Kiểm tra sự lĩnh ngộ về đại đạo.' },
        { name: 'Thiên Lôi Kiếp', description: 'Cửu thiên thần lôi giáng thế, hủy diệt mọi thứ không được thiên địa công nhận.' },
        { name: 'Tâm Ma Kiếp', description: 'Đối mặt với những chấp niệm sâu thẳm nhất trong lòng.' }
    ],
    [CultivationStage.SOUL_FORMATION]: [
        { name: 'Bình Cảnh Kiếp', description: 'Vượt qua giới hạn của phàm nhân.' },
        { name: 'Pháp Tắc Phản Phệ', description: 'Cảm ngộ pháp tắc thiên địa, thất bại sẽ bị pháp tắc cắn trả, thân tử đạo tiêu.' }
    ]
};

const BreakthroughModal: React.FC<BreakthroughModalProps> = ({ character, clan, onConfirm, onDecline }) => {
    const [selectedAidItemId, setSelectedAidItemId] = useState<string | undefined>(undefined);

    const targetStage = clan.breakthroughDecision?.targetStage || CultivationStage.SOUL_FORMATION;
    const cultivationState = cultivationStateFactory.getState(character.cultivationStage);

    const baseSuccessChance = useMemo(() => {
        return cultivationState.getBreakthroughSuccessChance({ ...character, breakthroughAid: null }, clan);
    }, [character, clan, cultivationState]);

    const aidItems = useMemo(() => {
        return Object.entries(clan.itemInventory)
            .map(([id, count]) => ({ item: ALL_ITEMS[id], count }))
            // @ts-ignore
            .filter(({ item, count }) => item && count > 0 && item.effects?.breakthrough_success_chance_bonus);
    }, [clan.itemInventory]);

    const selectedAidItemBonus = useMemo(() => {
        if (!selectedAidItemId) return 0;
        const item = ALL_ITEMS[selectedAidItemId];
        // @ts-ignore
        return item?.effects?.breakthrough_success_chance_bonus || 0;
    }, [selectedAidItemId]);

    const totalSuccessChance = baseSuccessChance + selectedAidItemBonus;
    const tribulations = TRIBULATIONS[targetStage] || [];

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4 font-serif">
            <div 
                className="relative w-full max-w-4xl bg-gradient-to-b from-stone-900 to-black rounded-2xl p-8 border-4 border-purple-600/80 shadow-[0_0_40px_15px_rgba(147,51,234,0.3)]"
            >
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-purple-300 mb-2 shimmer-effect">
                        ĐỘT PHÁ ĐẠI CẢNH GIỚI
                    </h1>
                    <p className="text-lg text-amber-100/80 mb-6">
                        {character.cultivationStage} → {targetStage}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Panel: Character & Tribulations */}
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-stone-700 p-1 shadow-lg overflow-hidden border-2 border-amber-400/60 mb-3">
                            <AvatarDisplay avatar={character.avatar} />
                        </div>
                        <h2 className="text-3xl font-bold text-white">{character.name}</h2>
                        <div className="mt-4 w-full bg-black/30 p-4 rounded-lg">
                            <h3 className="font-bold text-amber-200 text-lg mb-2 text-center">Thiên Kiếp Sắp Tới</h3>
                            <div className="space-y-2">
                                {tribulations.map(trib => (
                                    <div key={trib.name} className="p-2 bg-black/40 rounded">
                                        <p className="font-semibold text-red-400">{trib.name}</p>
                                        <p className="text-xs text-gray-300 italic">"{trib.description}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Aid & Decision */}
                    <div className="bg-black/30 p-4 rounded-lg flex flex-col">
                         <h3 className="font-bold text-amber-200 text-lg mb-3">Vật Phẩm Hộ Đạo</h3>
                         <div className="space-y-2 flex-grow max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-700 scrollbar-track-stone-900">
                             {aidItems.map(({ item, count }) => (
                                 <ItemTooltip item={item} key={item.id}>
                                    <button 
                                        onClick={() => setSelectedAidItemId(prev => prev === item.id ? undefined : item.id)}
                                        className={`w-full text-left p-2 rounded-md border-2 transition-colors ${selectedAidItemId === item.id ? 'bg-green-900/70 border-green-400' : 'bg-stone-800 border-stone-600 hover:border-amber-400'}`}
                                    >
                                        <p className={`font-semibold ${ITEM_QUALITY_COLORS[item.quality]}`}>{item.name} <span className="text-xs text-gray-400">(còn {Math.floor(count)})</span></p>
                                    </button>
                                 </ItemTooltip>
                             ))}
                             {aidItems.length === 0 && <p className="text-sm text-gray-500 italic text-center">Trong kho không có vật phẩm hỗ trợ.</p>}
                         </div>

                         <div className="mt-auto pt-4 space-y-4">
                            <div className="text-center">
                                <p className="text-base text-amber-100/80">Tỷ lệ thành công cơ bản: <span className="font-bold text-xl text-white">{(baseSuccessChance * 100).toFixed(0)}%</span></p>
                                {selectedAidItemId && <p className="text-base text-green-400">Vật phẩm hỗ trợ: +{(selectedAidItemBonus * 100).toFixed(0)}%</p>}
                                <p className="text-2xl font-bold text-amber-300 mt-1">Tổng tỷ lệ: <span className="text-4xl">{(totalSuccessChance * 100).toFixed(0)}%</span></p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <button 
                                    onClick={() => onConfirm(selectedAidItemId)}
                                    className="w-full text-lg font-bold p-3 rounded-lg bg-gradient-to-r from-purple-700 to-indigo-800 text-white hover:from-purple-600 hover:to-indigo-700 transition-all shadow-[0_0_15px_rgba(124,58,237,0.5)] border-2 border-purple-500/50 transform hover:scale-105"
                                >
                                    Bắt Đầu Đột Phá
                                </button>
                                <button 
                                    onClick={onDecline}
                                    className="w-full text-lg font-bold p-3 rounded-lg bg-gradient-to-r from-gray-700 to-stone-800 text-white hover:from-gray-600 hover:to-stone-700 transition-all shadow-lg border-2 border-gray-500/50 transform hover:scale-105"
                                >
                                    Tạm Hoãn
                                </button>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreakthroughModal;
