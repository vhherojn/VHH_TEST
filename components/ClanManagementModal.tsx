import React, { useState } from 'react';
import type { Clan } from '../../types/index.ts';
import { CloseIcon, ManagementIcon, SpiritVeinIcon, BuildingIcon } from './Icons.tsx';
import type { GameActions } from '../../hooks/useGameLoop.ts';

// Import các panel đã được tách nhỏ
import LinhMachPanel from './ClanManagement/LinhMachPanel.tsx';
import ConstructionPanel from './ClanManagement/ConstructionPanel.tsx';
import KhoPhongPanel from './ClanManagement/KhoPhongPanel.tsx';
import TuDuongPanel from './ClanManagement/TuDuongPanel.tsx';
import VoDaiPanel from './ClanManagement/VoDaiPanel.tsx';
import SuVuDuongPanel from './ClanManagement/SuVuDuongPanel.tsx';
import LibraryPanel from './ClanManagement/LibraryPanel.tsx';
import AlchemyPanel from './ClanManagement/AlchemyPanel.tsx';
import BlacksmithPanel from './ClanManagement/BlacksmithPanel.tsx';
import TalismanPanel from './ClanManagement/TalismanPanel.tsx';
import FormationPanel from './ClanManagement/FormationPanel.tsx';
import HuanCongDuongPanel from './ClanManagement/HuanCongDuongPanel.tsx';
import { BUILDING_ICONS } from './ClanManagement/constants.ts';
import ThangTienDaiPanel from './ClanManagement/ThangTienDaiPanel.tsx';
import TuLuyenThapPanel from './ClanManagement/TuLuyenThapPanel.tsx';
import HerbGardenPanel from './ClanManagement/HerbGardenPanel.tsx';
import ThietLuatDuongPanel from './ClanManagement/ThietLuatDuongPanel.tsx';
import TranYeuDuongPanel from './ClanManagement/TranYeuDuongPanel.tsx';

// --- PROPS INTERFACE ---
interface ClanManagementModalProps {
    clan: Clan;
    isOpen: boolean;
    onClose: () => void;
    actions: GameActions;
}

const NavButton: React.FC<{
    id: string;
    activeView: string;
    onClick: (id: string) => void;
    icon: React.FC<{className?: string}>;
    label: string;
}> = ({ id, activeView, onClick, icon: Icon, label }) => (
    <button 
        onClick={() => onClick(id)} 
        className={`w-full text-left p-3 rounded-md font-semibold transition-all flex items-center gap-3 ${activeView === id ? 'text-amber-200 bg-black/30 border-l-4 border-amber-300' : 'text-gray-400 hover:bg-black/20 hover:text-amber-300'}`}
    >
        <Icon className="w-5 h-5" />
        {label}
    </button>
);


const MAIN_BUILDINGS = ['tu_duong', 'kho_phong', 'library', 'su_vu_duong', 'huan_cong_duong', 'thang_tien_dai'];
const AUX_BUILDINGS = ['alchemist_room', 'blacksmith_forge', 'talisman_house', 'tran_phap_duong', 'herb_garden', 'tu_luyen_thap', 'vo_dai', 'thiet_luat_duong', 'tran_yeu_duong'];


export const ClanManagementModal: React.FC<ClanManagementModalProps> = (props) => {
    const { clan, isOpen, onClose, actions } = props;
    const [activeView, setActiveView] = useState<string>('linhmach');
    
    const handleClose = () => { setActiveView('linhmach'); onClose(); };
    const handleSelectView = (view: string) => { setActiveView(view); }
    
    const renderContent = () => {
        if (activeView === 'construction') return <ConstructionPanel clan={clan} onUpgrade={actions.upgradeBuilding} />;
        if (activeView === 'linhmach') return <LinhMachPanel clan={clan} onUpgrade={actions.upgradeLinhMach} onAssign={actions.assignToLinhMach} />;

        const building = clan.buildings[activeView];
        if (!building) { 
            // Default to a safe view if the active one is invalid
             setActiveView('linhmach');
            return <LinhMachPanel clan={clan} onUpgrade={actions.upgradeLinhMach} onAssign={actions.assignToLinhMach} />; 
        }
        if (building.level === 0) { return <div className="text-gray-400 italic text-center p-8">Công trình "{building.name}" chưa được xây dựng. Hãy vào mục "Xây Dựng".</div>; }
        
        switch(activeView) {
            case 'tu_duong': return <TuDuongPanel clan={clan} actions={actions}/>;
            case 'kho_phong': return <KhoPhongPanel clan={clan} actions={actions} />;
            case 'vo_dai': return <VoDaiPanel clan={clan} onSpar={actions.sparring} onLifeAndDeath={actions.lifeAndDeathBattle} />;
            case 'su_vu_duong': return <SuVuDuongPanel clan={clan} onAssignTask={actions.assignTask} />;
            case 'library': return <LibraryPanel clan={clan} onStore={actions.storeTechnique} onUpgrade={actions.upgradeBuilding} />;
            case 'huan_cong_duong': return <HuanCongDuongPanel clan={clan} onStoreItem={actions.storeToMeritShop} onBuyItem={actions.buyFromMeritShop} />;
            case 'thang_tien_dai': return <ThangTienDaiPanel clan={clan} onDiscover={actions.discoverRecruits} onRecruit={actions.confirmRecruitment} />;
            case 'herb_garden': return <HerbGardenPanel building={building} clan={clan} actions={actions} />;
            case 'tu_luyen_thap': return <TuLuyenThapPanel building={building} clan={clan} onUpgrade={actions.upgradeBuilding} />;
            case 'thiet_luat_duong': return <ThietLuatDuongPanel clan={clan} actions={actions} />;
            case 'tran_yeu_duong': return <TranYeuDuongPanel building={building} clan={clan} onUpgrade={actions.upgradeBuilding} onAssign={actions.assignToHuntingParty} />;
            
            // Crafting Panels
            case 'alchemist_room': return <AlchemyPanel building={building} clan={clan} actions={actions} />;
            case 'blacksmith_forge': return <BlacksmithPanel building={building} clan={clan} actions={actions} />;
            case 'talisman_house': return <TalismanPanel building={building} clan={clan} actions={actions} />;
            case 'tran_phap_duong': return <FormationPanel building={building} clan={clan} actions={actions} />;

            default: return null;
        }
    };

    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={handleClose}>
            <div className="relative w-full max-w-[1600px] h-auto max-h-[90vh] bg-gradient-to-b from-[var(--color-wood-dark)] to-[#2a201c] rounded-2xl p-2 flex flex-col" onClick={(e) => e.stopPropagation()} style={{ boxShadow: '0 0 0 3px #1d1d1d, 0 0 0 7px var(--color-wood-medium), 0 25px 60px 15px rgba(0,0,0,0.8)' }}>
                <div className="bg-gradient-to-t from-stone-800/80 to-stone-900/90 rounded-lg p-6 border-2 border-amber-400/20 relative flex flex-col flex-grow min-h-0">
                    <button onClick={handleClose} className="absolute top-4 right-4 text-white bg-black/50 p-1 rounded-full hover:bg-[var(--color-text-accent)] transition-colors z-20" aria-label="Đóng"><CloseIcon /></button>
                    <div className="flex items-center gap-4 border-b-2 border-amber-400/20 pb-4 mb-4 flex-shrink-0">
                        <ManagementIcon className="w-12 h-12 text-amber-300" />
                        <h2 className="text-4xl font-bold text-[var(--color-gold-light)]" style={{ fontFamily: "'Noto Serif SC', serif" }}>Quản Lý Gia Tộc</h2>
                    </div>
                    <div className="grid grid-cols-12 gap-6 flex-grow min-h-0">
                        {/* Left Nav */}
                        <nav className="col-span-3 flex flex-col gap-1 pr-2 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-800/70 scrollbar-track-transparent">
                            <h4 className="font-bold text-amber-200 px-3 pb-1 mt-1 text-sm uppercase tracking-wider">Công Trình Chính</h4>
                            <NavButton id="linhmach" activeView={activeView} onClick={handleSelectView} icon={SpiritVeinIcon} label="Linh Mạch"/>
                            {MAIN_BUILDINGS.map(id => {
                                const building = clan.buildings[id];
                                if (!building || building.level === 0) return null;
                                return <NavButton key={id} id={id} activeView={activeView} onClick={handleSelectView} icon={BUILDING_ICONS[id]!} label={building.name}/>
                            })}
                            <hr className="border-t-2 border-dotted border-white/10 my-3" />
                            <NavButton id="construction" activeView={activeView} onClick={handleSelectView} icon={BuildingIcon} label="Xây Dựng"/>
                        </nav>
                        
                        {/* Main Content */}
                        <main className="col-span-6 p-4 bg-black/20 rounded-lg overflow-y-auto scrollbar-thin scrollbar-thumb-amber-800/70 scrollbar-track-transparent">
                           {renderContent()}
                        </main>

                        {/* Right Nav */}
                        <aside className="col-span-3 flex flex-col gap-1 pl-2 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-800/70 scrollbar-track-transparent">
                           <h4 className="font-bold text-amber-200 px-3 pb-1 mt-1 text-sm uppercase tracking-wider">Công Trình Phụ Trợ</h4>
                           {AUX_BUILDINGS.map(id => {
                                const building = clan.buildings[id];
                                if (!building || building.level === 0) return null;
                                return <NavButton key={id} id={id} activeView={activeView} onClick={handleSelectView} icon={BUILDING_ICONS[id]!} label={building.name}/>
                            })}
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
};