
import React from 'react';
import type { Force } from '../types/index.ts';
import { CloseIcon } from './Icons.tsx';
import ForceInfoPanel from './ForceInteraction/ForceInfoPanel.tsx';
import ForceActionPanel from './ForceInteraction/ForceActionPanel.tsx';

interface ForceInteractionModalProps {
  force: Force;
  onClose: () => void;
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

const ForceInteractionModal: React.FC<ForceInteractionModalProps> = ({ force, onClose }) => {
  // TODO: In a real implementation, we would get the player's Clan ID to find the specific diplomacy state.
  // For now, we default to a neutral state if not found.
  const playerDiplomacy = force.diplomacy['player_clan_force'] || { relation: 0, intelLevel: 0 };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[70] p-4" onClick={onClose}>
      <div 
        className="relative w-full max-w-2xl h-auto max-h-[90vh] bg-gradient-to-b from-[var(--color-paper-light)] to-[var(--color-paper-dark)] rounded-lg flex flex-col pt-12 pb-12"
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

        <div className="w-full text-center mb-2 px-6 flex-shrink-0">
           <h2 className="text-3xl font-bold text-[var(--color-text-main)]" style={{fontFamily: "'Noto Serif SC', serif", textShadow: '1px 1px 2px rgba(0,0,0,0.2)'}}>{force.name}</h2>
           <div className={`inline-block mt-2 px-3 py-1 rounded border text-sm font-bold ${force.icon === 'righteous' ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-red-100 text-red-800 border-red-300'}`}>
               {force.rank}
           </div>
        </div>

        <div className="w-full flex-grow overflow-y-auto px-6 scrollbar-thin scrollbar-thumb-amber-800/70 scrollbar-track-transparent">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column: Info (Affected by Fog of War) */}
                <div className="border-r border-black/10 pr-4 md:pr-6">
                    <h4 className="font-bold text-amber-800 mb-3 border-b border-amber-800/20 pb-1">Thông Tin Tình Báo</h4>
                    <ForceInfoPanel force={force} diplomacy={playerDiplomacy} />
                </div>

                {/* Right Column: Actions */}
                <div>
                    <h4 className="font-bold text-amber-800 mb-3 border-b border-amber-800/20 pb-1">Ngoại Giao Lệnh</h4>
                    <ForceActionPanel diplomacy={playerDiplomacy} />
                </div>
            </div>
        </div>
        
        <ScrollEnd className="-bottom-4 rounded-b-full" />
      </div>
    </div>
  );
};

export default ForceInteractionModal;
