
import React from 'react';
import { PlayIcon, PauseIcon, JournalIcon, ClanIcon, ManagementIcon, SecretRecordsIcon, BattleIcon, ChartIcon, NewsIcon } from './Icons.tsx';

interface BottomBarProps {
  clanExists: boolean;
  isRunning: boolean;
  speed: number;
  onTogglePlay: () => void;
  onSetSpeed: (speed: number) => void;
  onToggleEventLog: () => void;
  onToggleBattleLog: () => void;
  onToggleFamilyPanel: () => void;
  onToggleClanManagement: () => void;
  onToggleSecretRecords: () => void;
  onToggleOverview: () => void;
  onToggleWorldNews: () => void; // New prop
}

const speeds = [1, 2, 5, 10];

const ActionButton: React.FC<{onClick: () => void; label: string; children: React.ReactNode;}> = ({onClick, label, children}) => (
    <button 
        onClick={onClick} 
        className="group relative w-14 h-14 flex items-center justify-center rounded-full bg-stone-800/80 border-2 border-amber-300/30 text-white transition-all duration-300 transform hover:scale-110 hover:bg-stone-700 hover:border-amber-300/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6),0_5px_15px_rgba(0,0,0,0.5)]" 
        aria-label={label}
        title={label}
    >
        {children}
        <div className="absolute inset-0 rounded-full ring-2 ring-amber-400/0 group-hover:ring-amber-400/50 transition-all duration-300 scale-125 opacity-0 group-hover:opacity-100 group-hover:scale-100"></div>
    </button>
);


const BottomBar: React.FC<BottomBarProps> = (props) => {
    const { clanExists, isRunning, speed, onTogglePlay, onSetSpeed, onToggleEventLog, onToggleBattleLog, onToggleFamilyPanel, onToggleClanManagement, onToggleSecretRecords, onToggleOverview, onToggleWorldNews } = props;

    return (
        <div className="absolute bottom-0 left-0 right-0 p-4 z-30 flex justify-between items-end pointer-events-none">
            
            {/* Left Actions */}
            <div className="flex items-center gap-3 pointer-events-auto">
                <ActionButton onClick={onToggleEventLog} label="Nhật Ký"><JournalIcon className="h-7 w-7" /></ActionButton>
                <ActionButton onClick={onToggleOverview} label="Tổng Quan"><ChartIcon className="h-7 w-7" /></ActionButton>
                <ActionButton onClick={onToggleBattleLog} label="Chiến Báo"><BattleIcon className="h-7 w-7" /></ActionButton>
                <ActionButton onClick={onToggleWorldNews} label="Phong Vân"><NewsIcon className="h-7 w-7" /></ActionButton>
            </div>

            {/* Center Time Controls */}
            <div className="absolute left-1/2 bottom-4 transform -translate-x-1/2 flex items-center gap-3 pointer-events-auto">
                <div className="flex items-center bg-black/50 rounded-full p-1 gap-1 shadow-inner border border-amber-400/20">
                    {speeds.map((s) => (
                        <button
                            key={s}
                            onClick={() => onSetSpeed(s)}
                            className={`w-9 h-9 flex items-center justify-center rounded-full font-bold text-sm transition-all duration-300`}
                            style={
                                speed === s 
                                ? { background: 'radial-gradient(circle at center, #8ec07c, #689d6a)', color: 'white', textShadow: '0 0 5px white' }
                                : { background: 'radial-gradient(circle at center, #555, #333)', color: '#aaa', textShadow: '0 0 2px black' }
                            }
                        >
                            x{s}
                        </button>
                    ))}
                </div>
                <button 
                    onClick={onTogglePlay} 
                    className="w-16 h-16 flex items-center justify-center rounded-full text-white transition-all duration-300 transform hover:scale-105"
                    style={{
                        background: `radial-gradient(circle at center, ${isRunning ? '#f7931a' : '#8ec07c'} 50%, ${isRunning ? '#d57808' : '#689d6a'} 100%)`,
                        boxShadow: `0 0 15px 3px ${isRunning ? 'rgba(247,147,26,0.4)' : 'rgba(142,192,124,0.4)'}, inset 0 2px 4px rgba(255,255,255,0.4), 0 5px 10px rgba(0,0,0,0.5)`,
                        border: '2px solid rgba(0,0,0,0.5)'
                    }}
                    aria-label={isRunning ? "Dừng" : "Chạy"}
                >
                    {isRunning ? <PauseIcon className="w-8 h-8 drop-shadow-lg"/> : <PlayIcon className="w-8 h-8 drop-shadow-lg"/>}
                </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3 pointer-events-auto">
                {clanExists && (
                    <>
                        <ActionButton onClick={onToggleFamilyPanel} label="Gia Tộc"><ClanIcon className="h-8 w-8" /></ActionButton>
                        <ActionButton onClick={onToggleClanManagement} label="Quản Lý"><ManagementIcon className="h-8 w-8" /></ActionButton>
                        <ActionButton onClick={onToggleSecretRecords} label="Bí Lục"><SecretRecordsIcon className="h-8 w-8" /></ActionButton>
                    </>
                )}
            </div>
        </div>
    );
};

export default React.memo(BottomBar);
