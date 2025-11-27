
import React, { useState, useMemo } from 'react';
import { ALL_BEASTS, ALL_ITEMS, ITEM_QUALITY_COLORS, ELEMENT_DATA } from '../../constants.ts';
import { ItemQuality, Element } from '../../types/index.ts';
import { BeastCoreIcon, ElementIcon } from '../Icons.tsx';
import ItemTooltip from '../common/ItemTooltip.tsx';

// Import Lore Components
import { NhatGiaiLore } from './BeastLore/NhatGiaiLore.tsx';
import { NhiGiaiLore } from './BeastLore/NhiGiaiLore.tsx';
import { TamGiaiLore } from './BeastLore/TamGiaiLore.tsx';
import { TuGiaiLore } from './BeastLore/TuGiaiLore.tsx';
import { NguGiaiLore } from './BeastLore/NguGiaiLore.tsx';

const tierOrder = [ItemQuality.NHAT_GIAI, ItemQuality.NHI_GIAI, ItemQuality.TAM_GIAI, ItemQuality.TU_GIAI, ItemQuality.NGU_GIAI];

const loreComponents: Record<string, React.FC> = {
    [ItemQuality.NHAT_GIAI]: NhatGiaiLore,
    [ItemQuality.NHI_GIAI]: NhiGiaiLore,
    [ItemQuality.TAM_GIAI]: TamGiaiLore,
    [ItemQuality.TU_GIAI]: TuGiaiLore,
    [ItemQuality.NGU_GIAI]: NguGiaiLore,
};

const BeastEncyclopedia: React.FC = () => {
    const [activeTier, setActiveTier] = useState<ItemQuality>(ItemQuality.NHAT_GIAI);

    const beastsInTier = useMemo(() => {
        return Object.values(ALL_BEASTS).filter(beast => beast.tier === activeTier);
    }, [activeTier]);

    const ActiveLore = loreComponents[activeTier];

    return (
        <div className="flex gap-4 h-full">
            {/* Left Navigation */}
            <nav className="w-1/4 flex flex-col gap-1 pr-2 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-800/70 scrollbar-track-transparent">
                {tierOrder.map(tier => (
                    <button 
                        key={tier} 
                        onClick={() => setActiveTier(tier)}
                        className={`w-full text-left p-3 rounded-md font-semibold text-sm transition-all flex items-center gap-2 ${activeTier === tier ? 'text-amber-200 bg-black/40 border-l-4 border-amber-500' : 'text-gray-400 hover:bg-black/20 hover:text-amber-300'}`}
                    >
                        <BeastCoreIcon className={`w-5 h-5 ${activeTier === tier ? 'text-amber-400' : 'text-gray-500'}`} />
                        {tier}
                    </button>
                ))}
            </nav>

            {/* Main Content */}
            <main className="w-3/4 bg-black/20 rounded-lg p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-800/70 scrollbar-track-transparent flex flex-col gap-6">
                
                {/* Lore Section */}
                <div className="bg-stone-900/60 p-4 rounded-lg border border-white/10 shadow-md">
                    {ActiveLore ? <ActiveLore /> : <p className="text-gray-400 italic">Chưa có ghi chép về cảnh giới này.</p>}
                </div>

                {/* Beast List */}
                <div>
                    <h4 className="font-bold text-amber-200 text-lg mb-3 pl-1 border-l-4 border-amber-500/50">Danh Sách Yêu Thú Đã Biết</h4>
                    {beastsInTier.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {beastsInTier.map(beast => (
                                <div key={beast.id} className="bg-stone-800/80 p-3 rounded-lg border border-white/10 flex flex-col gap-2 hover:border-amber-500/30 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h5 className={`font-bold text-base ${ITEM_QUALITY_COLORS[beast.tier]}`}>{beast.name}</h5>
                                            <p className="text-xs text-gray-400 italic">{beast.stage}</p>
                                        </div>
                                        <div className="flex gap-1">
                                            {beast.elements.map(el => (
                                                <ElementIcon key={el} color={ELEMENT_DATA[el].color} className="w-4 h-4" title={ELEMENT_DATA[el].name} />
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <p className="text-sm text-gray-300 line-clamp-3 bg-black/20 p-2 rounded">{beast.description}</p>
                                    
                                    <div className="mt-auto pt-2 border-t border-white/10">
                                        <p className="text-xs font-semibold text-amber-200/70 mb-1">Vật phẩm rơi ra:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {beast.drops.map((drop, idx) => {
                                                const item = ALL_ITEMS[drop.itemId];
                                                if (!item) return null;
                                                return (
                                                    <ItemTooltip key={idx} item={item}>
                                                        <div className={`text-xs px-2 py-0.5 rounded bg-black/40 border border-white/5 ${ITEM_QUALITY_COLORS[item.quality]}`}>
                                                            {item.name} <span className="text-gray-500">({(drop.chance * 100).toFixed(0)}%)</span>
                                                        </div>
                                                    </ItemTooltip>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500 italic bg-stone-900/30 rounded-lg border border-dashed border-gray-700">
                            <p>Gia tộc chưa thu thập được thông tin về yêu thú ở cảnh giới này.</p>
                            <p className="text-xs mt-1">Hãy nâng cấp Trấn Yêu Đường để khám phá thêm.</p>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
};

export default BeastEncyclopedia;
