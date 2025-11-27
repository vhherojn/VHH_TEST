import React, { useState, useEffect, useMemo } from 'react';
import type { Clan, AnyItem } from '../../types/index.ts';
import { ALL_ITEMS, ITEM_QUALITY_COLORS } from '../../constants.ts';
import ItemTooltip from '../common/ItemTooltip.tsx';
import { SpiritStoneIcon, BookIcon } from '../Icons.tsx';
import type { GameActions } from '../../hooks/useGameLoop.ts';
import { ItemType } from '../../types/index.ts';


interface KhoPhongPanelProps {
    clan: Clan;
    actions: GameActions;
}

const TabButton: React.FC<{label: string, isActive: boolean, onClick: () => void}> = ({ label, isActive, onClick }) => {
    const activeClasses = 'bg-black/40 border-amber-300 text-amber-300';
    const inactiveClasses = 'text-amber-200/60 hover:bg-black/20 border-transparent';
    return (
        <button onClick={onClick} className={`px-4 py-2 font-bold text-sm transition-all duration-200 border-b-2 ${isActive ? activeClasses : inactiveClasses}`}>
            {label}
        </button>
    )
};


const KhoPhongPanel: React.FC<KhoPhongPanelProps> = ({ clan, actions }) => {
    const itemCategories = useMemo(() => {
        const categories: {[key: string]: {item: AnyItem, count: number}[]} = {};
        Object.entries(clan.itemInventory).forEach(([itemId, count]) => {
            const itemInfo = ALL_ITEMS[itemId as keyof typeof ALL_ITEMS] as AnyItem;
            if (itemInfo && count > 0) {
                const type = itemInfo.type;
                if (!categories[type]) {
                    categories[type] = [];
                }
                categories[type]!.push({item: itemInfo, count});
            }
        });
        return categories;
    }, [clan.itemInventory]);
    
    const availableTypes = Object.keys(itemCategories);
    const [activeTab, setActiveTab] = useState(availableTypes[0] || '');

    useEffect(() => {
        if (!activeTab && availableTypes.length > 0) {
            setActiveTab(availableTypes[0]);
        }
        if (activeTab && !availableTypes.includes(activeTab)) {
            setActiveTab(availableTypes[0] || '');
        }
    }, [availableTypes, activeTab]);

    return (
        <div>
            <h3 className="text-2xl font-bold text-amber-300 mb-4">Khố Phòng</h3>

            <div className="bg-stone-900/50 p-3 rounded-lg mb-4">
                <div className="flex items-center gap-2" title="Linh Thạch">
                     <SpiritStoneIcon className="w-6 h-6 text-amber-300" />
                     <div>
                        <p className="text-xs text-amber-200/70">Linh Thạch</p>
                        <p className="font-bold text-white text-lg">{(clan.resources.spirit_stone || 0).toLocaleString()}</p>
                     </div>
                </div>
            </div>

            <div className="flex border-b border-amber-300/20 mb-4 flex-wrap">
                 {availableTypes.length > 0 ? availableTypes.map(type => (
                    <TabButton key={type} label={type} isActive={activeTab === type} onClick={() => setActiveTab(type)} />
                )) : null}
            </div>

            <div className="space-y-4 max-h-[45vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-800/70 scrollbar-track-transparent">
                {availableTypes.length > 0 && itemCategories[activeTab] ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                        {itemCategories[activeTab].map(({item, count}) => {
                             const isTechnique = [ItemType.CULTIVATION_METHOD, ItemType.SECRET_ART, ItemType.SPELL].includes(item.type);
                            return (
                                <ItemTooltip key={item.id} item={item}>
                                    <div className="flex items-center justify-between gap-3 p-2 bg-stone-900/70 rounded-md border border-white/10">
                                        <p className={`font-semibold ${ITEM_QUALITY_COLORS[item.quality] || 'text-white'}`}>
                                            {item.name} <span className="text-sm font-normal text-gray-400">x{Math.floor(count)}</span>
                                        </p>
                                        {isTechnique && (
                                            <button 
                                                onClick={() => actions.patriarchLearnTechnique(item.id)}
                                                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1 text-xs bg-purple-700 rounded hover:bg-purple-600 font-semibold text-white transition-colors"
                                                title="Chỉ định Tộc Trưởng học công pháp này"
                                            >
                                                <BookIcon className="w-3 h-3"/>
                                                <span>Học</span>
                                            </button>
                                        )}
                                    </div>
                                </ItemTooltip>
                            )
                        })}
                    </div>
                ) : (
                    <p className="text-center text-gray-400 italic py-8">Kho đồ trống rỗng.</p>
                )}
            </div>
        </div>
    );
};

export default KhoPhongPanel;