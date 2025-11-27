
import React from 'react';
import type { BattleReport, Clan } from '../types/index.ts';
import { CloseIcon, BattleIcon } from './Icons.tsx';
import AvatarDisplay from './AvatarDisplay.tsx';

interface BattleDetailModalProps {
  report: BattleReport;
  clan: Clan;
  onClose: () => void;
}

const BattleDetailModal: React.FC<BattleDetailModalProps> = ({ report, clan, onClose }) => {
  const [p1, p2] = report.participants;
  const combatant1 = clan.members.find(m => m.id === p1.id);
  const combatant2 = clan.members.find(m => m.id === p2.id);
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="relative w-full max-w-2xl h-auto max-h-[85vh] bg-gradient-to-b from-[var(--color-wood-dark)] to-[#2a201c] rounded-lg p-6 border-2 border-amber-500/50 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white bg-black/50 p-1 rounded-full hover:bg-[var(--color-text-accent)] transition-colors z-20" aria-label="Đóng">
            <CloseIcon />
        </button>

        <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-amber-300" style={{fontFamily: "'Noto Serif SC', serif"}}>Chi Tiết Chiến Báo</h2>
            <p className="text-sm text-gray-400">Năm {report.date.year}, Tháng {report.date.month}</p>
        </div>

        <div className="flex justify-around items-center mb-4 p-3 bg-black/20 rounded-lg">
            <div className="flex flex-col items-center gap-2">
                {combatant1 && <div className="w-20 h-20 rounded-full bg-stone-700 p-0.5 shadow-lg overflow-hidden border-2 border-amber-400/40"><AvatarDisplay avatar={combatant1.avatar} /></div>}
                <p className="font-bold text-lg text-white">{p1.name}</p>
            </div>
            <div className="text-4xl font-bold text-red-500">VS</div>
            <div className="flex flex-col items-center gap-2">
                {combatant2 && <div className="w-20 h-20 rounded-full bg-stone-700 p-0.5 shadow-lg overflow-hidden border-2 border-amber-400/40"><AvatarDisplay avatar={combatant2.avatar} /></div>}
                <p className="font-bold text-lg text-white">{p2.name}</p>
            </div>
        </div>

        <div className="flex-grow overflow-y-auto bg-black/30 p-3 rounded-md border border-white/10 scrollbar-thin scrollbar-thumb-amber-800/70 scrollbar-track-transparent">
            <div className="space-y-2 text-sm">
                {report.log.map((turn, index) => (
                    <div key={index} className="p-2 rounded-sm bg-stone-800/50">
                        <span className="font-bold text-amber-300/70 mr-2">[Hiệp {turn.turnNumber}]</span>
                        <span className="text-gray-200">{turn.description}</span>
                    </div>
                ))}
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default BattleDetailModal;
