
import React from 'react';
import { InfoIcon, InventoryIcon, StatsChartIcon, JournalIcon, BookIcon, StarIcon, ClanIcon } from '../Icons.tsx';

type TabId = 'overview' | 'attributes' | 'techniques' | 'equipment_inventory' | 'professions' | 'history' | 'social';

const TabButton: React.FC<{label: string, icon: React.ReactNode, isActive: boolean, onClick: () => void}> = ({ label, icon, isActive, onClick }) => {
    const activeClasses = 'bg-black/30 border-b-2 border-amber-300 text-amber-300';
    const inactiveClasses = 'text-amber-200/60 hover:bg-black/20 border-b-2 border-transparent';
    return (
        <button onClick={onClick} className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 font-bold text-xs md:text-sm transition-all duration-200 ${isActive ? activeClasses : inactiveClasses}`}>
            {icon}
            <span className="hidden md:inline">{label}</span>
        </button>
    )
};

interface CharacterTabsProps {
    activeTab: string;
    setActiveTab: (tab: TabId) => void;
}

const TABS: { id: TabId; label: string; icon: React.FC<{className?: string}> }[] = [
    { id: 'overview', label: 'Tổng Quan', icon: InfoIcon },
    { id: 'attributes', label: 'Thuộc Tính', icon: StatsChartIcon },
    { id: 'techniques', label: 'Công Pháp', icon: BookIcon },
    { id: 'equipment_inventory', label: 'Trang Bị & Túi Đồ', icon: InventoryIcon },
    { id: 'professions', label: 'Nghề Nghiệp', icon: StarIcon },
    { id: 'social', label: 'Xã Giao', icon: ClanIcon },
    { id: 'history', label: 'Lịch Sử', icon: JournalIcon },
];

const CharacterTabs: React.FC<CharacterTabsProps> = ({ activeTab, setActiveTab }) => {
    return (
        <nav className="flex border-b border-amber-300/20">
           {TABS.map(tab => (
               <TabButton 
                key={tab.id}
                label={tab.label}
                icon={<tab.icon className="w-5 h-5" />}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
               />
           ))}
        </nav>
    );
};

export default React.memo(CharacterTabs);