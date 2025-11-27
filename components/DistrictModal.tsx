
import React from 'react';
import type { District, Location } from '../types/index.ts';
import { CloseIcon, CityIcon2, MarketIcon, ClanIcon, BattleIcon, ResourceIcon, HeadquartersIcon } from './Icons.tsx';
import { ITEM_QUALITY_COLORS } from '../constants.ts';

interface DistrictModalProps {
    district: District | null;
    locations: Location[];
    isOpen: boolean;
    onClose: () => void;
    onSelectLocation: (location: Location) => void;
}

const ScrollEnd: React.FC<{className?: string}> = ({className}) => (
    <div className={`absolute left-0 w-full h-8 bg-gradient-to-b from-[#6b5b4c] to-[#3c3836] ${className}`}
        style={{
            boxShadow: '0 4px 8px rgba(0,0,0,0.5), inset 0 2px 2px rgba(255,255,255,0.2)'
        }}
    >
        <div className="absolute inset-0 bg-repeat-x opacity-10" style={{backgroundImage: 'url(https://www.transparenttextures.com/patterns/wood-pattern.png)'}}></div>
    </div>
);

const DistrictModal: React.FC<DistrictModalProps> = ({ district, locations, isOpen, onClose, onSelectLocation }) => {
    if (!isOpen || !district) return null;

    const districtLocations = locations.filter(loc => loc.districtId === district.id);

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div 
                className="relative w-full max-w-5xl h-[85vh] bg-gradient-to-b from-[var(--color-paper-light)] to-[var(--color-paper-dark)] rounded-lg flex flex-col pt-12 pb-12"
                onClick={(e) => e.stopPropagation()}
                style={{
                    boxShadow: '0 0 0 5px var(--color-wood-medium), 0 0 0 8px var(--color-wood-dark), 0 15px 50px 10px rgba(0,0,0,0.7)',
                }}
            >
                <ScrollEnd className="-top-4 rounded-t-full" />

                <button onClick={onClose} className="absolute top-4 right-4 text-white bg-black/50 p-1 rounded-full hover:bg-[var(--color-text-accent)] transition-colors z-20">
                    <CloseIcon />
                </button>

                <div className="w-full text-center mb-6 px-6 flex-shrink-0 border-b border-[#8a6e5a] pb-4 mx-auto max-w-3xl">
                    <h2 className="text-4xl font-bold text-[#3c3836]" style={{fontFamily: "'Noto Serif SC', serif", textShadow: '1px 1px 0px rgba(255,255,255,0.5)'}}>
                        {district.name}
                    </h2>
                    <p className="text-lg text-[#6b5b4c] font-semibold mt-1 uppercase tracking-widest">
                        {district.region}
                    </p>
                </div>

                <div className="flex-grow overflow-y-auto px-8 scrollbar-thin scrollbar-thumb-[#8a6e5a] scrollbar-track-transparent">
                    <div className="grid grid-cols-1 gap-6 pb-8">
                        {districtLocations.map(location => (
                            <div 
                                key={location.id} 
                                onClick={() => onSelectLocation(location)}
                                className="relative bg-[#fdf6e3] p-5 rounded-md border-2 border-[#d3c0a3] hover:border-[#8a6e5a] hover:shadow-lg transition-all cursor-pointer group"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-2xl font-bold text-[#3c3836] group-hover:text-[#9d0006] transition-colors flex items-center gap-2">
                                        {location.name}
                                        {location.isAncestral && <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded border border-yellow-400">Tổ Địa</span>}
                                    </h3>
                                    <span className="text-xs font-bold text-[#8a6e5a] bg-[#eee8d5] px-2 py-1 rounded uppercase tracking-wider">
                                        {location.prefab === 'city' ? 'Thành Trì' : 
                                         location.prefab === 'forest' ? 'Sâm Lâm' : 
                                         location.prefab === 'mountains' ? 'Sơn Mạch' : 
                                         location.prefab === 'ruins' ? 'Di Tích' : 
                                         location.prefab === 'island' ? 'Hải Đảo' : 'Vùng Đất'}
                                    </span>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#586e75]">
                                    {/* Resources */}
                                    <div className="bg-[#eee8d5]/50 p-3 rounded border border-[#e0d6c2]">
                                        <p className="font-bold text-[#8a6e5a] mb-2 flex items-center gap-2 border-b border-[#d3c0a3] pb-1">
                                            <ResourceIcon /> Tài Nguyên ({location.territories.length})
                                        </p>
                                        <div className="space-y-1 pl-1">
                                            {location.territories.slice(0, 3).map((t, idx) => (
                                                <div key={idx} className="flex justify-between">
                                                    <span>{t.name}</span>
                                                    <span className={`text-xs font-bold ${t.tier === 'Nhất Giai' ? 'text-gray-500' : 'text-green-600'}`}>{t.tier}</span>
                                                </div>
                                            ))}
                                            {location.territories.length > 3 && <span className="text-xs italic text-gray-400">...và {location.territories.length - 3} nơi khác</span>}
                                        </div>
                                    </div>

                                    {/* Occupying Forces */}
                                    <div className="bg-[#eee8d5]/50 p-3 rounded border border-[#e0d6c2]">
                                        <p className="font-bold text-[#8a6e5a] mb-2 flex items-center gap-2 border-b border-[#d3c0a3] pb-1">
                                            <ClanIcon className="w-4 h-4"/> Thế Lực ({location.forces.length})
                                        </p>
                                        <div className="space-y-2 pl-1">
                                            {location.forces.length > 0 ? location.forces.map(force => {
                                                const isHQ = force.headquartersId === location.id;
                                                return (
                                                    <div key={force.id} className="flex justify-between items-center">
                                                        <div className="flex items-center gap-1">
                                                            <span className={`font-semibold ${force.icon === 'righteous' ? 'text-blue-700' : 'text-red-700'}`}>{force.name}</span>
                                                            {isHQ && <HeadquartersIcon className="w-4 h-4 text-amber-600" title="Tổng Đà"/>}
                                                        </div>
                                                        <span className="text-xs bg-white/50 px-1.5 py-0.5 rounded border border-gray-300">
                                                            {isHQ ? 'Tổng Đà' : 'Phân Đà'}
                                                        </span>
                                                    </div>
                                                );
                                            }) : <span className="italic text-gray-400">Vô chủ</span>}
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Stats */}
                                <div className="mt-4 pt-3 border-t border-[#d3c0a3] flex gap-6 text-sm">
                                    <div className="flex items-center gap-2" title="Tổng số tu sĩ đồn trú">
                                        <BattleIcon className="w-4 h-4 text-red-600"/>
                                        <span className="font-bold text-[#3c3836]">
                                            {location.forces.reduce((sum, f) => sum + f.population, 0).toLocaleString()} <span className="text-xs font-normal text-gray-500">Tu sĩ</span>
                                        </span>
                                    </div>
                                    
                                    {(location.cities.length > 0 || location.markets.length > 0) && (
                                        <div className="flex items-center gap-3">
                                            {location.cities.length > 0 && (
                                                <span className="flex items-center gap-1 text-amber-700 font-semibold">
                                                    <CityIcon2 className="w-4 h-4"/> {location.cities.length} Thành
                                                </span>
                                            )}
                                            {location.markets.length > 0 && (
                                                <span className="flex items-center gap-1 text-green-700 font-semibold">
                                                    <MarketIcon className="w-4 h-4"/> {location.markets.length} Phường Thị
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <ScrollEnd className="-bottom-4 rounded-b-full" />
            </div>
        </div>
    );
};

export default DistrictModal;
