
import React, { useState, useMemo } from 'react';
import type { Location, LocationData, Force, Clan, Character } from '../types/index.ts';
import { ITEM_QUALITY_COLORS, ALL_ITEMS } from '../constants.ts';
import { CloseIcon, ScrollIcon, FamilyIcon, ResourceIcon, SpiritVeinIcon, ClanIcon, BattleIcon, MineIcon, SpiritHerbGardenIcon, MineralIcon, SecretRealmIcon, KingdomIcon, MarketIcon, CityIcon2, HeadquartersIcon, MountainPeakIcon } from './Icons.tsx';
import ForceInteractionModal from './ForceInteractionModal.tsx';
import ItemTooltip from './common/ItemTooltip.tsx';

interface LocationModalProps {
  location: Location;
  onClose: () => void;
  data: LocationData | null | undefined;
  isLoading: boolean;
  error: string | null;
  clanName?: string;
  clan?: Clan;
  onEstablishSubBranch?: (loc: Location) => void;
  onAppointMaster?: (loc: Location, charId: string) => void;
  onInvestigate?: (loc: Location) => void;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-[var(--color-text-main)]">
        <svg className="animate-spin h-12 w-12 text-[var(--color-text-accent)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-lg font-semibold">Đang phân tích địa thế, dò xét thiên cơ...</p>
    </div>
);

const ScrollEnd: React.FC<{className?: string}> = ({className}) => (
    <div className={`absolute left-0 w-full h-8 bg-gradient-to-b from-[#6b5b4c] to-[#3c3836] ${className}`}
        style={{
            boxShadow: '0 4px 8px rgba(0,0,0,0.5), inset 0 2px 2px rgba(255,255,255,0.2)'
        }}
    >
        <div className="absolute inset-0 bg-repeat-x opacity-10" style={{backgroundImage: 'url(https://www.transparenttextures.com/patterns/wood-pattern.png)'}}></div>
    </div>
);

const LocationModal: React.FC<LocationModalProps> = ({ location, onClose, data, isLoading, error, clanName, clan, onEstablishSubBranch, onAppointMaster, onInvestigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'peaks' | 'territories' | 'structures' | 'forces' | 'management'>('overview');
  const [selectedForceToInteract, setSelectedForceToInteract] = useState<Force | null>(null);
  const [selectedMasterId, setSelectedMasterId] = useState<string>('');

  const isAncestral = location.isAncestral;
  
  const getForceName = (forceId: string | null) => {
      if (!forceId) return "Vô Chủ";
      if (forceId === 'player_clan_force') return clanName || "Gia Tộc";
      const force = location.forces.find(f => f.id === forceId);
      return force ? force.name : "Thế lực khác";
  }

  const getTerritoryIcon = (type: string) => {
      switch(type) {
          case 'linh_thach': return <MineIcon className="w-6 h-6 text-white" />;
          case 'duoc_lieu': return <SpiritHerbGardenIcon className="w-6 h-6 text-white" />;
          case 'khoang_san': return <MineralIcon className="w-6 h-6 text-white" />;
          case 'bi_canh': return <SecretRealmIcon className="w-6 h-6 text-white" />;
          default: return <ResourceIcon />;
      }
  }

  const playerSubBranch = location.subBranches?.['player_clan_force'];
  const hasTerritory = location.territories.some(t => t.ownerForceId === 'player_clan_force') || location.peaks?.some(p => p.ownerForceId === 'player_clan_force');

  const eligibleMasters = useMemo(() => {
      if (!clan) return [];
      return clan.members.filter(m => !m.isPatriarch && m.status === 'Còn Sống' && !m.assignedToBuildingId);
  }, [clan]);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
        {selectedForceToInteract && (
            <ForceInteractionModal force={selectedForceToInteract} onClose={() => setSelectedForceToInteract(null)} />
        )}

      <div 
        className="relative w-full max-w-4xl h-[85vh] bg-gradient-to-b from-[var(--color-paper-light)] to-[var(--color-paper-dark)] rounded-lg flex flex-col pt-12 pb-12"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        style={{
          boxShadow: '0 0 0 5px var(--color-wood-medium), 0 0 0 8px var(--color-wood-dark), 0 15px 50px 10px rgba(0,0,0,0.7)',
          filter: 'drop-shadow(0 0 15px black)',
        }}
      >
        <ScrollEnd className="-top-4 rounded-t-full" />

        <button onClick={onClose} className="absolute top-4 right-4 text-white bg-black/50 p-1 rounded-full hover:bg-[var(--color-text-accent)] transition-colors z-20" aria-label="Đóng">
            <CloseIcon />
        </button>

        <div className="w-full text-center mb-4 px-6 flex-shrink-0">
           <h2 id="location-modal-title" className="text-4xl font-bold text-[var(--color-text-main)]" style={{fontFamily: "'Noto Serif SC', serif", textShadow: '1px 1px 2px rgba(0,0,0,0.2)'}}>{location.name}</h2>
           <p className="text-lg text-amber-700 font-bold mt-1">- {location.type} -</p>
           <p className="text-sm text-gray-600">{location.region}</p>
           {isAncestral && <p className="text-amber-600 font-bold text-sm mt-1 shimmer-effect">(Gia Tộc Tổ Địa)</p>}
        </div>

        <div className="flex justify-center gap-2 mb-4 px-4 border-b border-[var(--color-wood-medium)] flex-shrink-0 overflow-x-auto scrollbar-thin scrollbar-thumb-amber-800">
             <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 font-bold text-lg transition-all whitespace-nowrap ${activeTab === 'overview' ? 'text-[var(--color-text-accent)] border-b-2 border-[var(--color-text-accent)]' : 'text-gray-500 hover:text-gray-700'}`}>Tổng Quan</button>
             <button onClick={() => setActiveTab('peaks')} className={`px-4 py-2 font-bold text-lg transition-all whitespace-nowrap ${activeTab === 'peaks' ? 'text-[var(--color-text-accent)] border-b-2 border-[var(--color-text-accent)]' : 'text-gray-500 hover:text-gray-700'}`}>Sơn Phong ({location.peaks?.length || 0})</button>
             <button onClick={() => setActiveTab('territories')} className={`px-4 py-2 font-bold text-lg transition-all whitespace-nowrap ${activeTab === 'territories' ? 'text-[var(--color-text-accent)] border-b-2 border-[var(--color-text-accent)]' : 'text-gray-500 hover:text-gray-700'}`}>Địa Bàn ({location.territories.length})</button>
             <button onClick={() => setActiveTab('structures')} className={`px-4 py-2 font-bold text-lg transition-all whitespace-nowrap ${activeTab === 'structures' ? 'text-[var(--color-text-accent)] border-b-2 border-[var(--color-text-accent)]' : 'text-gray-500 hover:text-gray-700'}`}>Nhân Sinh</button>
             <button onClick={() => setActiveTab('forces')} className={`px-4 py-2 font-bold text-lg transition-all whitespace-nowrap ${activeTab === 'forces' ? 'text-[var(--color-text-accent)] border-b-2 border-[var(--color-text-accent)]' : 'text-gray-500 hover:text-gray-700'}`}>Thế Lực ({location.forces.length})</button>
             {hasTerritory && <button onClick={() => setActiveTab('management')} className={`px-4 py-2 font-bold text-lg transition-all whitespace-nowrap ${activeTab === 'management' ? 'text-[var(--color-text-accent)] border-b-2 border-[var(--color-text-accent)]' : 'text-gray-500 hover:text-gray-700'}`}>Quản Lý Phân Đà</button>}
        </div>

        <div className="w-full flex-grow overflow-y-auto px-6 scrollbar-thin scrollbar-thumb-amber-800/70 scrollbar-track-transparent">
          {isLoading && <LoadingSpinner />}
          {error && !isLoading && <div className="text-center text-red-700 font-bold">{error}</div>}
          
          {data && !isLoading && !error && activeTab === 'overview' && (
            <div className="space-y-4 text-[var(--color-text-main)] animate-[fadeIn_0.3s_ease-out]">
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-[var(--color-text-accent)]"><ScrollIcon /> Giới Thiệu</h3>
                <p className="text-base leading-relaxed whitespace-pre-wrap p-4 bg-black/5 rounded-md border border-black/10 shadow-inner">{data.description}</p>
              </div>
              <div className="decorative-line"></div>
               <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-[var(--color-text-accent)]"><SpiritVeinIcon /> Tài Nguyên & Đặc Sản</h3>
                   <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 text-green-900 rounded-md border-2 border-green-300 mb-4 shadow-md">
                    <strong className="font-semibold">Phẩm chất Linh Khí:</strong> {data.linh_khi}
                  </div>
                  <ul className="list-none space-y-2">
                      {data.tai_nguyen.map((resource, index) => (
                      <li key={index} className="flex items-center gap-2 p-3 bg-gradient-to-br from-yellow-50 to-amber-100 text-amber-900 rounded-md border-2 border-amber-200 shadow-md"><ResourceIcon /> {resource}</li>
                      ))}
                  </ul>
              </div>
            </div>
          )}
          
          {/* 0.20.50: Tab Sơn Phong Mới */}
          {!isLoading && activeTab === 'peaks' && (
              <div className="grid grid-cols-1 gap-3 animate-[fadeIn_0.3s_ease-out]">
                  {(location.peaks || []).map(peak => (
                      <div key={peak.id} className="flex justify-between items-center p-4 bg-stone-200 rounded-md border border-stone-400 shadow-sm hover:bg-stone-100 transition-colors">
                          <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-stone-800 rounded-full flex items-center justify-center border-2 border-gray-500">
                                  <MountainPeakIcon className="w-8 h-8 text-gray-300" />
                              </div>
                              <div>
                                  <div className="flex items-center gap-2">
                                      <h4 className="font-bold text-lg text-stone-800">{peak.name}</h4>
                                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-white border ${ITEM_QUALITY_COLORS[peak.tier]}`}>
                                          {peak.tier}
                                      </span>
                                  </div>
                                  <p className="text-xs text-gray-600 italic">{peak.description}</p>
                              </div>
                          </div>
                          <div className="text-right">
                              <p className="text-xs text-gray-500">Chiếm giữ</p>
                              <p className={`text-sm font-bold ${peak.ownerForceId === 'player_clan_force' ? 'text-green-700' : peak.ownerForceId ? 'text-red-700' : 'text-gray-400'}`}>
                                  {getForceName(peak.ownerForceId)}
                              </p>
                          </div>
                      </div>
                  ))}
                  {(location.peaks || []).length === 0 && <p className="text-center text-gray-500">Không có sơn phong nào.</p>}
              </div>
          )}

          {!isLoading && activeTab === 'forces' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-[fadeIn_0.3s_ease-out]">
                  {location.forces.map(force => {
                      const isHeadquarters = force.headquartersId === location.id;
                      // Kiểm tra xem force này có chiếm peak nào ở đây không
                      const occupiedPeaks = location.peaks?.filter(p => p.ownerForceId === force.id).length || 0;
                      
                      return (
                        <div 
                            key={force.id} 
                            onClick={() => setSelectedForceToInteract(force)}
                            className={`p-4 bg-stone-200/50 rounded-lg border-2 ${isHeadquarters ? 'border-amber-500 shadow-amber-200' : 'border-stone-300'} shadow-sm relative overflow-hidden cursor-pointer hover:bg-stone-100 hover:border-amber-400 transition-all`}
                        >
                            <div className={`absolute top-0 right-0 w-16 h-16 opacity-10 transform translate-x-4 -translate-y-4 rotate-45 ${force.icon === 'righteous' ? 'bg-blue-500' : 'bg-red-500'}`}></div>
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <h4 className={`font-bold text-lg ${force.icon === 'righteous' ? 'text-blue-800' : 'text-red-800'}`}>{force.name}</h4>
                                    {isHeadquarters && <HeadquartersIcon className="w-5 h-5 text-amber-600" title="Tổng Đà" />}
                                </div>
                                <span className="text-xs font-bold bg-white/80 px-2 py-1 rounded border border-black/10">{force.rank}</span>
                            </div>
                            <p className="text-sm text-gray-700 mb-3 line-clamp-2 italic">{force.description}</p>
                            <div className="flex justify-between items-center text-xs font-semibold bg-white/50 p-2 rounded">
                                <span className="flex items-center gap-1"><BattleIcon className="w-3 h-3"/> Lực lượng: {force.power.toLocaleString()}</span>
                                <span className="flex items-center gap-1" title="Số lượng sơn phong chiếm giữ"><MountainPeakIcon className="w-3 h-3"/> {occupiedPeaks} Sơn Phong</span>
                            </div>
                        </div>
                      );
                  })}
                  {location.forces.length === 0 && <p className="text-center col-span-2 text-gray-500">Chưa có thế lực nào đóng quân tại đây.</p>}
              </div>
          )}

          {!isLoading && activeTab === 'territories' && (
              <div className="grid grid-cols-1 gap-3 animate-[fadeIn_0.3s_ease-out]">
                  {location.territories.map(terr => {
                      const resourceItem = terr.resourceItemId ? ALL_ITEMS[terr.resourceItemId] : null;
                      return (
                      <div key={terr.id} className="flex justify-between items-center p-3 bg-stone-100 rounded-md border border-stone-300 shadow-sm hover:bg-stone-50 transition-colors">
                          <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm
                                  ${terr.type === 'linh_thach' ? 'bg-blue-500' : 
                                    terr.type === 'duoc_lieu' ? 'bg-green-600' : 
                                    terr.type === 'khoang_san' ? 'bg-gray-600' : 'bg-purple-600'
                                  }`}
                              >
                                  {getTerritoryIcon(terr.type)}
                              </div>
                              <div>
                                  <div className="flex items-center gap-2">
                                      <p className="font-bold text-stone-800">{terr.name}</p>
                                      {terr.tier && <span className={`text-xs font-bold px-1.5 rounded border bg-white ${ITEM_QUALITY_COLORS[terr.tier]}`}>{terr.tier}</span>}
                                  </div>
                                  {resourceItem ? (
                                      <ItemTooltip item={resourceItem}>
                                          <p className="text-xs text-gray-600 cursor-help hover:underline">Sản vật: <span className="font-semibold">{resourceItem.name}</span></p>
                                      </ItemTooltip>
                                  ) : <p className="text-xs text-gray-500">Sản vật: Chưa rõ</p>}
                              </div>
                          </div>
                          <div className="text-right">
                              <p className="text-xs text-gray-400 mb-1">Chiếm giữ bởi</p>
                              <p className={`text-sm font-bold ${terr.ownerForceId === 'player_clan_force' ? 'text-green-700' : terr.ownerForceId ? 'text-indigo-700' : 'text-gray-400 italic'}`}>
                                  {getForceName(terr.ownerForceId)}
                              </p>
                          </div>
                      </div>
                  )})}
                  {location.territories.length === 0 && <p className="text-center text-gray-500">Vùng đất cằn cỗi, không có tài nguyên.</p>}
              </div>
          )}

          {!isLoading && activeTab === 'structures' && (
            <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
                
                {/* Kingdoms Section */}
                {location.kingdoms && location.kingdoms.length > 0 && (
                    <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200/50">
                        <h4 className="font-bold text-xl text-amber-800 mb-4 flex items-center gap-2 pb-2 border-b border-amber-300/30">
                            <KingdomIcon className="w-6 h-6" /> Nhân Quốc ({location.kingdoms.length})
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {location.kingdoms.map(kingdom => (
                                <div key={kingdom.id} className="p-3 bg-white rounded-lg border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
                                    <h5 className="font-bold text-amber-900 text-lg mb-1">{kingdom.name}</h5>
                                    <div className="flex justify-between text-xs text-gray-600 mt-2">
                                        <span>Dân số: <span className="font-mono font-semibold">{kingdom.population.toLocaleString()}</span></span>
                                        <span>Ổn định: <span className={`font-semibold ${kingdom.stability > 80 ? 'text-green-600' : 'text-yellow-600'}`}>{kingdom.stability}</span></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Cities Section */}
                    {location.cities && location.cities.length > 0 && (
                        <div className="bg-stone-200/50 p-4 rounded-xl border border-stone-300/50">
                            <h4 className="font-bold text-xl text-stone-800 mb-4 flex items-center gap-2 pb-2 border-b border-stone-400/30">
                                <CityIcon2 className="w-6 h-6" /> Thành Trì ({location.cities.length})
                            </h4>
                            <div className="space-y-3">
                                {location.cities.map(city => (
                                    <div key={city.id} className="p-3 bg-white rounded-lg border border-stone-200 shadow-sm">
                                        <div className="flex justify-between items-center mb-1">
                                            <h5 className="font-bold text-stone-800">{city.name}</h5>
                                            <span className="text-xs bg-stone-100 px-2 py-0.5 rounded text-stone-600 border border-stone-200">Cấp {city.level}</span>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-2 flex justify-between">
                                            <span>Thu nhập: <span className="text-amber-600 font-semibold">{city.taxIncome}</span></span>
                                            <span>Phòng thủ: <span className="text-blue-600 font-semibold">{city.defense}</span></span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1 pt-1 border-t border-stone-100">Chủ: {getForceName(city.ownerForceId)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Markets Section */}
                    {location.markets && location.markets.length > 0 && (
                        <div className="bg-green-50/50 p-4 rounded-xl border border-green-200/50">
                            <h4 className="font-bold text-xl text-green-800 mb-4 flex items-center gap-2 pb-2 border-b border-green-300/30">
                                <MarketIcon className="w-6 h-6" /> Phường Thị ({location.markets.length})
                            </h4>
                            <div className="space-y-3">
                                {location.markets.map(market => (
                                    <div key={market.id} className="p-3 bg-white rounded-lg border border-green-100 shadow-sm">
                                        <div className="flex justify-between items-center mb-1">
                                            <h5 className="font-bold text-green-900">{market.name}</h5>
                                            <span className={`text-xs px-2 py-0.5 rounded border capitalize ${market.size === 'large' ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>{market.size}</span>
                                        </div>
                                        <p className="text-xs text-gray-600 mt-1">Đặc sản: <span className="font-semibold">{market.specialty}</span></p>
                                        <p className="text-xs text-gray-400 mt-1 pt-1 border-t border-green-50">Quản lý: {getForceName(market.ownerForceId)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {(!location.kingdoms?.length && !location.cities?.length && !location.markets?.length) && (
                     <p className="text-center text-gray-500 italic py-4">Khu vực hoang dã, chưa có kiến trúc nhân tạo.</p>
                )}
            </div>
          )}

        {/* Management Tab */}
        {!isLoading && activeTab === 'management' && (
            <div className="animate-[fadeIn_0.3s_ease-out] p-4">
                {playerSubBranch ? (
                    <div className="space-y-6">
                        <div className="bg-white/5 p-4 rounded-lg border border-amber-400/30">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-xl font-bold text-amber-300">Tiểu Phân Đà - {location.name}</h4>
                                <div className={`px-3 py-1 rounded text-sm font-bold ${playerSubBranch.isRevolting ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
                                    {playerSubBranch.isRevolting ? 'ĐANG LÀM PHẢN' : 'Hoạt Động Bình Thường'}
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <p className="text-sm text-gray-400">Tiểu Đà Chủ</p>
                                    {playerSubBranch.masterId ? (
                                        <p className="font-bold text-white">{clan?.members.find(m => m.id === playerSubBranch.masterId)?.name || 'Không rõ'}</p>
                                    ) : (
                                        <p className="italic text-yellow-500">Chưa bổ nhiệm</p>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Tham Ô</p>
                                    <div className="w-full bg-gray-700 h-2 rounded-full mt-1">
                                        <div 
                                            className={`h-full rounded-full ${playerSubBranch.corruption > 50 ? 'bg-red-500' : 'bg-green-500'}`} 
                                            style={{width: `${playerSubBranch.corruption}%`}}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-right">{playerSubBranch.corruption}%</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Lòng Trung Thành</p>
                                    <div className="w-full bg-gray-700 h-2 rounded-full mt-1">
                                        <div 
                                            className={`h-full rounded-full ${playerSubBranch.loyalty < 50 ? 'bg-red-500' : 'bg-blue-500'}`} 
                                            style={{width: `${playerSubBranch.loyalty}%`}}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-right">{playerSubBranch.loyalty}%</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <select 
                                        value={selectedMasterId} 
                                        onChange={e => setSelectedMasterId(e.target.value)}
                                        className="w-full p-2 bg-stone-900 border border-gray-600 rounded text-sm text-white mb-2"
                                    >
                                        <option value="">-- Chọn người bổ nhiệm --</option>
                                        {eligibleMasters.map(m => (
                                            <option key={m.id} value={m.id}>{m.name} ({m.rank})</option>
                                        ))}
                                    </select>
                                    <button 
                                        onClick={() => onAppointMaster && selectedMasterId && onAppointMaster(location, selectedMasterId)}
                                        disabled={!selectedMasterId || !!playerSubBranch.isRevolting}
                                        className="w-full bg-blue-700 hover:bg-blue-600 disabled:bg-gray-600 text-white py-2 rounded font-bold"
                                    >
                                        Bổ Nhiệm
                                    </button>
                                </div>
                                <div className="flex-1 flex items-end">
                                    <button 
                                        onClick={() => onInvestigate && onInvestigate(location)}
                                        disabled={!!playerSubBranch.isRevolting}
                                        className="w-full bg-yellow-700 hover:bg-yellow-600 disabled:bg-gray-600 text-white py-2 rounded font-bold"
                                    >
                                        Điều Tra & Chấn Chỉnh
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <p className="text-sm text-gray-400 italic text-center">
                            Tiểu Phân Đà giúp tự động thu thập tài nguyên từ các địa bàn đã chiếm đóng tại {location.name}. Hãy cẩn thận với nạn tham ô!
                        </p>
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <h4 className="text-xl font-bold text-gray-300 mb-4">Chưa có Tiểu Phân Đà</h4>
                        <p className="text-gray-400 mb-6">
                            Thành lập Tiểu Phân Đà để quản lý các địa bàn, sơn phong và thành trì đã chiếm đóng, thu thuế và tài nguyên tự động.
                        </p>
                        <button 
                            onClick={() => onEstablishSubBranch && onEstablishSubBranch(location)}
                            className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold text-lg shadow-lg transform hover:scale-105 transition-all"
                        >
                            Thành Lập (1000 Linh Thạch)
                        </button>
                    </div>
                )}
            </div>
        )}

        </div>
        
        <ScrollEnd className="-bottom-4 rounded-b-full" />
      </div>
    </div>
  );
};

export default React.memo(LocationModal);
