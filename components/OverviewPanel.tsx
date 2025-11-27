
import React, { useState, useMemo } from 'react';
import type { Clan, Character } from '../types/index.ts';
import { CharacterStatus } from '../types/index.ts';
import { ChartIcon, CloseIcon, SpiritStoneIcon, CombatPowerIcon, FamilyIcon } from './Icons.tsx';
import AvatarDisplay from './AvatarDisplay.tsx';

interface OverviewPanelProps {
    clan: Clan;
    isOpen: boolean;
    onClose: () => void;
}

const TimeRangeButton: React.FC<{ label: string; value: number; activeValue: number; onClick: (v: number) => void }> = ({ label, value, activeValue, onClick }) => (
    <button
        onClick={() => onClick(value)}
        className={`px-4 py-2 text-sm font-bold rounded-full transition-all ${activeValue === value ? 'bg-amber-500 text-stone-900 shadow-lg scale-105' : 'bg-stone-800 text-gray-400 hover:bg-stone-700 hover:text-white'}`}
    >
        {label}
    </button>
);

const StatCard: React.FC<{ title: string; value: string | number; delta?: string; icon?: React.ReactNode; colorClass?: string }> = ({ title, value, delta, icon, colorClass = 'text-white' }) => (
    <div className="bg-stone-800/60 p-4 rounded-lg border border-white/5 shadow-md">
        <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-gray-400 font-semibold">{title}</p>
            {icon}
        </div>
        <div className="flex items-end gap-2">
            <p className={`text-2xl font-bold ${colorClass}`}>{typeof value === 'number' ? value.toLocaleString() : value}</p>
            {delta && (
                <p className={`text-sm font-semibold mb-1 ${delta.startsWith('+') ? 'text-green-400' : delta.startsWith('-') ? 'text-red-400' : 'text-gray-400'}`}>
                    {delta}
                </p>
            )}
        </div>
    </div>
);

const SimpleBarChart: React.FC<{ data: number[]; labels: string[]; color: string; title: string }> = ({ data, labels, color, title }) => {
    const maxVal = Math.max(...data, 1);
    
    return (
        <div className="bg-stone-800/40 p-4 rounded-lg border border-white/5 h-full flex flex-col">
            <h4 className="text-sm font-bold text-gray-300 mb-4">{title}</h4>
            <div className="flex-grow flex items-end justify-between gap-2 min-h-[150px]">
                {data.map((val, idx) => (
                    <div key={idx} className="flex flex-col items-center flex-1 group relative h-full justify-end">
                         <div 
                            className={`w-full max-w-[30px] mx-auto rounded-t-sm transition-all duration-500 ${color} relative min-h-[4px]`} 
                            style={{ height: `${(val / maxVal) * 100}%` }}
                         >
                             <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-black/90 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap border border-white/10">
                                 {val.toLocaleString()}
                             </div>
                         </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-2 border-t border-white/10 pt-2">
                 {labels.map((label, idx) => (
                    <p key={idx} className="text-[10px] text-gray-500 text-center flex-1 truncate px-0.5">{label}</p>
                 ))}
            </div>
        </div>
    );
};

const IdleMemberRow: React.FC<{ member: Character }> = ({ member }) => (
    <div className="flex items-center justify-between p-3 bg-stone-800/40 rounded-lg border border-white/5 hover:bg-stone-700/40 transition-colors">
        <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-stone-700 overflow-hidden border border-amber-400/30">
                <AvatarDisplay avatar={member.avatar} />
             </div>
             <div>
                 <p className="font-bold text-white text-sm">{member.name}</p>
                 <p className="text-xs text-gray-400">{member.cultivationStage} - Tầng {member.cultivationLevel}</p>
             </div>
        </div>
        <div className="text-right">
            <p className="text-xs text-amber-200">{member.rank}</p>
            <p className="text-xs text-gray-500">Chiến lực: {member.combatPower.toLocaleString()}</p>
        </div>
    </div>
);


const OverviewPanel: React.FC<OverviewPanelProps> = ({ clan, isOpen, onClose }) => {
    const [timeRange, setTimeRange] = useState<number>(5); // Default 5 years
    const [activeTab, setActiveTab] = useState<'general' | 'members'>('general');
    
    if (!isOpen) return null;

    // Filter records based on selected time range
    const records = useMemo(() => {
        const history = clan.yearlyRecords || [];
        // If history is empty or shorter than timeRange, take what we have
        if (history.length === 0) return [];
        const sliced = history.slice(-timeRange);
        return sliced;
    }, [clan.yearlyRecords, timeRange]);

    // Calculate comparisons
    const latestRecord = records[records.length - 1] || { 
        population: clan.members.filter(m => m.status === CharacterStatus.ALIVE).length, 
        spiritStonesEarned: 0, 
        totalCombatPower: clan.members.reduce((s,m) => s + m.combatPower, 0),
        itemsCreated: 0,
        deaths: 0,
        births: 0,
        year: 0
    };
    
    const oldestRecord = records[0] || latestRecord;
    
    // Delta calculations
    const popDelta = latestRecord.population - oldestRecord.population;
    const powerDelta = latestRecord.totalCombatPower - oldestRecord.totalCombatPower;
    
    // Totals over the period
    const totalIncome = records.reduce((sum, r) => sum + r.spiritStonesEarned, 0) + (clan.currentYearStats?.spiritStonesEarned || 0);
    const totalItems = records.reduce((sum, r) => sum + r.itemsCreated, 0) + (clan.currentYearStats?.itemsCreated || 0);
    const totalDeaths = records.reduce((sum, r) => sum + r.deaths, 0) + (clan.currentYearStats?.deaths || 0);
    const totalBirths = records.reduce((sum, r) => sum + r.births, 0) + (clan.currentYearStats?.births || 0);
    
    // Format Deltas
    const formatDelta = (val: number) => val > 0 ? `+${val.toLocaleString()}` : val === 0 ? '-' : `${val.toLocaleString()}`;
    
    // Chart Data preparation
    const chartLabels = records.map(r => `Năm ${r.year}`);
    const incomeData = records.map(r => r.spiritStonesEarned);
    const popData = records.map(r => r.population);

    // Ensure we have some data points for chart, even if empty
    if (chartLabels.length === 0) {
        chartLabels.push('Hiện tại');
        incomeData.push(clan.currentYearStats?.spiritStonesEarned || 0);
        popData.push(clan.members.filter(m => m.status === CharacterStatus.ALIVE).length);
    }
    
    // Member lists
    const idleMembers = clan.members.filter(m => 
        m.status === CharacterStatus.ALIVE && 
        !m.activeTaskId && 
        !m.assignedToBuildingId && 
        !m.cultivationTowerState && 
        !m.seclusionState &&
        !m.techniqueTrainingState
    );

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4 font-sans" onClick={onClose}>
            <div 
                className="relative w-full max-w-6xl h-[85vh] bg-gradient-to-br from-stone-900 to-[#1c1917] rounded-2xl shadow-2xl border border-stone-700 flex flex-col overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/20">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-500/10 rounded-lg">
                            <ChartIcon className="w-6 h-6 text-amber-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-amber-100">Tổng Quan Gia Tộc</h2>
                            <p className="text-xs text-gray-400">Niên giám lịch sử và phân tích dữ liệu</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10">
                        <CloseIcon />
                    </button>
                </div>

                {/* Controls */}
                <div className="px-6 py-3 border-b border-white/5 flex flex-wrap gap-4 items-center justify-between bg-black/10">
                     <div className="flex bg-stone-800 rounded-lg p-1">
                        <button onClick={() => setActiveTab('general')} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${activeTab === 'general' ? 'bg-stone-600 text-white' : 'text-gray-400 hover:text-gray-200'}`}>Tổng Hợp</button>
                        <button onClick={() => setActiveTab('members')} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${activeTab === 'members' ? 'bg-stone-600 text-white' : 'text-gray-400 hover:text-gray-200'}`}>Nhân Sự ({idleMembers.length} Nhàn rỗi)</button>
                    </div>
                    
                    {activeTab === 'general' && (
                        <div className="flex gap-2 items-center">
                            <span className="text-xs font-semibold text-gray-500 uppercase mr-2">Thống kê:</span>
                            <TimeRangeButton label="1 Năm" value={1} activeValue={timeRange} onClick={setTimeRange} />
                            <TimeRangeButton label="3 Năm" value={3} activeValue={timeRange} onClick={setTimeRange} />
                            <TimeRangeButton label="5 Năm" value={5} activeValue={timeRange} onClick={setTimeRange} />
                            <TimeRangeButton label="10 Năm" value={10} activeValue={timeRange} onClick={setTimeRange} />
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-grow overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-stone-600 scrollbar-track-transparent bg-stone-900/50">
                    
                    {activeTab === 'general' && (
                        <div className="space-y-6">
                            {/* Key Metrics Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <StatCard 
                                    title="Thu Nhập Linh Thạch" 
                                    value={totalIncome} 
                                    icon={<SpiritStoneIcon className="w-5 h-5 text-green-400" />}
                                    colorClass="text-green-400"
                                    delta={`Trong ${timeRange} năm`}
                                />
                                <StatCard 
                                    title="Vật Phẩm Sản Xuất" 
                                    value={totalItems} 
                                    icon={<div className="text-blue-400 text-lg leading-none">🛠️</div>}
                                    colorClass="text-blue-300"
                                    delta={`Trong ${timeRange} năm`}
                                />
                                <StatCard 
                                    title="Thành Viên" 
                                    value={latestRecord.population} 
                                    icon={<FamilyIcon />}
                                    colorClass="text-amber-200"
                                    delta={`${formatDelta(popDelta)} so với ${timeRange} năm trước`}
                                />
                                <StatCard 
                                    title="Tổng Chiến Lực" 
                                    value={latestRecord.totalCombatPower} 
                                    icon={<CombatPowerIcon className="w-5 h-5 text-red-500" />}
                                    colorClass="text-red-400"
                                    delta={`${formatDelta(powerDelta)} so với ${timeRange} năm trước`}
                                />
                            </div>

                            {/* Charts */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-64">
                                <SimpleBarChart title="Biểu Đồ Thu Nhập (Linh Thạch)" data={incomeData} labels={chartLabels} color="bg-green-600" />
                                <SimpleBarChart title="Biểu Đồ Dân Số" data={popData} labels={chartLabels} color="bg-amber-600" />
                            </div>

                            {/* Vital Stats Row */}
                            <div className="bg-stone-800/40 p-4 rounded-lg border border-white/5">
                                <h4 className="text-sm font-bold text-gray-300 mb-4">Sinh Lão Bệnh Tử ({timeRange} năm qua)</h4>
                                <div className="flex items-center justify-around">
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-green-400">{totalBirths}</p>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Hài nhi chào đời</p>
                                    </div>
                                    <div className="h-12 w-px bg-white/10"></div>
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-gray-400">{totalDeaths}</p>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Tộc nhân tạ thế</p>
                                    </div>
                                    <div className="h-12 w-px bg-white/10"></div>
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-amber-400">{formatDelta(totalBirths - totalDeaths)}</p>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Tăng trưởng tự nhiên</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'members' && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h4 className="text-lg font-bold text-amber-200">Danh Sách Tộc Nhân Nhàn Rỗi ({idleMembers.length})</h4>
                                <p className="text-xs text-gray-400">Chưa được phân công nhiệm vụ hoặc công việc</p>
                            </div>
                            
                            {idleMembers.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {idleMembers.map(member => (
                                        <IdleMemberRow key={member.id} member={member} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 text-gray-500 italic bg-black/10 rounded-lg border border-dashed border-white/5">
                                    <p>Không có tộc nhân nào đang nhàn rỗi.</p>
                                    <p className="text-sm mt-2">Mọi người đều đang nỗ lực cống hiến cho gia tộc!</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OverviewPanel;
