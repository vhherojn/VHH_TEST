
import React, { useState } from 'react';
import type { Clan, MeritShopItem, Character, AnyItem } from '../../types/index.ts';
import { ALL_ITEMS, ITEM_QUALITY_COLORS } from '../../constants.ts';
import ItemTooltip from '../common/ItemTooltip.tsx';

interface HuanCongDuongPanelProps {
    clan: Clan;
    onStoreItem: (itemId: string, count: number, cost: number) => void;
    onBuyItem: (characterId: string, meritShopItem: MeritShopItem) => void;
}

const HuanCongDuongPanel: React.FC<HuanCongDuongPanelProps> = ({ clan, onStoreItem, onBuyItem }) => {
    const [selectedTab, setSelectedTab] = useState<'buy' | 'manage'>('buy');
    
    // For Buy Tab
    const [buyerId, setBuyerId] = useState<string>('');
    const buyer = clan.members.find(m => m.id === buyerId);

    const handleBuyItem = (shopItem: MeritShopItem) => {
        if (!buyer) return;
        onBuyItem(buyer.id, shopItem);
    };

    const ManageTab = () => {
        const [inputs, setInputs] = useState<Record<string, { quantity: string, cost: string }>>({});
        
        const handleInputChange = (itemId: string, field: 'quantity' | 'cost', value: string) => {
            setInputs(prev => ({
                ...prev,
                [itemId]: {
                    ...(prev[itemId] || { quantity: '1', cost: '10' }), // Ensure object exists
                    [field]: value
                }
            }));
        };

        const handleStoreItem = (itemId: string) => {
            const itemInClan = clan.itemInventory[itemId] || 0;
            const quantity = parseInt(inputs[itemId]?.quantity || '1');
            const cost = parseInt(inputs[itemId]?.cost || '10');

            if (quantity > 0 && cost > 0 && quantity <= itemInClan) {
                onStoreItem(itemId, quantity, cost);
                setInputs(prev => {
                    const newInputs = { ...prev };
                    delete newInputs[itemId];
                    return newInputs;
                });
            }
        };

        const availableItems = Object.entries(clan.itemInventory).filter(([id, count]) => count > 0);

        return (
            <div>
                <h4 className="font-bold text-amber-200 text-lg mb-2">Thêm Vật Phẩm vào Sàn Đấu Giá</h4>
                <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-700 scrollbar-track-stone-900">
                    {availableItems.length > 0 ? availableItems.map(([itemId, count]) => {
                        const itemInfo = ALL_ITEMS[itemId];
                        if (!itemInfo) return null;
                        
                        const currentInput = inputs[itemId] || { quantity: '1', cost: '10' };

                        return (
                            <div key={itemId} className="flex flex-col md:flex-row items-stretch md:items-center gap-3 p-2 bg-stone-800/60 rounded-lg">
                                <div className="flex-grow">
                                    <ItemTooltip item={itemInfo}>
                                        <p className={`font-semibold ${ITEM_QUALITY_COLORS[itemInfo.quality]}`}>
                                            {itemInfo.name} <span className="text-sm font-normal text-gray-400">(Tồn kho: {Math.floor(count)})</span>
                                        </p>
                                    </ItemTooltip>
                                </div>
                                <div className="flex items-center gap-2">
                                     <label className="text-xs text-gray-400">Số lượng:</label>
                                     <input 
                                        type="number" 
                                        min="1" 
                                        max={Math.floor(count)} 
                                        value={currentInput.quantity}
                                        onChange={e => handleInputChange(itemId, 'quantity', e.target.value)}
                                        className="w-16 p-1 bg-stone-900 rounded border border-white/20 text-white text-sm" 
                                    />
                                </div>
                                 <div className="flex items-center gap-2">
                                    <label className="text-xs text-gray-400">Giá (cống hiến):</label>
                                    <input 
                                        type="number" 
                                        min="1" 
                                        value={currentInput.cost}
                                        onChange={e => handleInputChange(itemId, 'cost', e.target.value)}
                                        className="w-20 p-1 bg-stone-900 rounded border border-white/20 text-white text-sm" 
                                    />
                                </div>
                                <button 
                                    onClick={() => handleStoreItem(itemId)} 
                                    className="px-4 py-1.5 bg-blue-800 rounded text-sm font-semibold hover:bg-blue-700 disabled:bg-gray-600 self-center"
                                >
                                    Thêm
                                </button>
                            </div>
                        )
                    }) : (
                        <p className="text-gray-400 italic text-center py-4">Kho đồ trống.</p>
                    )}
                </div>
            </div>
        );
    };

    const BuyTab = () => (
        <div>
            <h4 className="font-bold text-amber-200 text-lg mb-2">Tộc Nhân Trao Đổi</h4>
            <div className="mb-4 flex items-center gap-4">
                 <select value={buyerId} onChange={e => setBuyerId(e.target.value)} className="flex-grow p-2 bg-stone-900 rounded border border-white/20 text-white text-sm">
                    <option value="">-- Chọn Tộc Nhân --</option>
                    {clan.members.filter(m => m.status === "Còn Sống").map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
                {buyer && <div className="text-white font-semibold">Cống hiến: <span className="text-amber-300">{buyer.contribution}</span></div>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[45vh] overflow-y-auto pr-2">
                {clan.meritShop.map((item) => {
                    const itemInfo = ALL_ITEMS[item.itemId] as AnyItem;
                    if (!itemInfo) return null;
                    const canBuy = buyer ? buyer.contribution >= item.cost : false;
                    return (
                        <ItemTooltip key={item.slotIndex} item={itemInfo}>
                            <div className={`bg-stone-800/60 p-3 rounded-lg border-l-4 ${canBuy ? 'border-green-500' : 'border-red-600'}`}>
                                <p className={`font-bold ${ITEM_QUALITY_COLORS[itemInfo.quality]}`}>{itemInfo.name}</p>
                                <p className="text-xs text-gray-400">Còn lại: {item.stock}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="font-bold text-amber-300">Giá: {item.cost} Cống hiến</p>
                                    <button onClick={() => handleBuyItem(item)} disabled={!canBuy} className="px-3 py-1 bg-green-700 rounded text-xs font-semibold hover:bg-green-600 disabled:bg-gray-600">Đổi</button>
                                </div>
                            </div>
                        </ItemTooltip>
                    );
                })}
                 {clan.meritShop.length === 0 && <p className="col-span-2 text-center italic text-gray-500 py-8">Huân Công Đường chưa có vật phẩm nào.</p>}
            </div>
        </div>
    );


    return (
        <div>
            <h3 className="text-2xl font-bold text-amber-300 mb-4">Huân Công Đường</h3>
             <div className="flex border-b border-amber-300/20 mb-4">
                <button onClick={() => setSelectedTab('buy')} className={`flex-1 py-2 font-bold ${selectedTab === 'buy' ? 'text-amber-300 border-b-2 border-amber-300' : 'text-gray-400'}`}>Trao Đổi</button>
                <button onClick={() => setSelectedTab('manage')} className={`flex-1 py-2 font-bold ${selectedTab === 'manage' ? 'text-amber-300 border-b-2 border-amber-300' : 'text-gray-400'}`}>Quản Lý</button>
            </div>
            {selectedTab === 'buy' ? <BuyTab /> : <ManageTab />}
        </div>
    );
};

export default HuanCongDuongPanel;
