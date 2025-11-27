
import React from 'react';
import type { Force } from '../types/index.ts';
import { CloseIcon, ScrollIcon } from './Icons.tsx';

interface ForceModalProps {
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

const ForceModal: React.FC<ForceModalProps> = ({ force, onClose }) => {
  const title = `${force.name} Chí`;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="relative w-full max-w-xl h-auto max-h-[70vh] bg-gradient-to-b from-[var(--color-paper-light)] to-[var(--color-paper-dark)] rounded-lg flex flex-col pt-12 pb-12"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="force-modal-title"
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

        <div className="w-full text-center mb-4 px-6">
           <h2 id="force-modal-title" className="text-4xl font-bold text-[var(--color-text-main)]" style={{fontFamily: "'Noto Serif SC', serif", textShadow: '1px 1px 2px rgba(0,0,0,0.2)'}}>{force.name}</h2>
           <p className="text-center font-semibold text-lg -mt-2 mb-2 text-amber-600">{force.rank}</p>
        </div>

        <div className="w-full flex-grow overflow-y-auto px-6 scrollbar-thin scrollbar-thumb-amber-800/70 scrollbar-track-transparent">
            <div className="space-y-4 text-[var(--color-text-main)]">
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-[var(--color-text-accent)]"><ScrollIcon /> Thế Lực Giới Thiệu</h3>
                <p className="text-base leading-relaxed whitespace-pre-wrap p-4 bg-black/5 rounded-md border border-black/10 shadow-inner">{force.description}</p>
              </div>
            </div>
        </div>
        
        <ScrollEnd className="-bottom-4 rounded-b-full" />
      </div>
    </div>
  );
};

export default ForceModal;
