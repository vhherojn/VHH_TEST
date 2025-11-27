
import React, { useMemo } from 'react';
import type { Clan, Character } from '../types/index.ts';
import { CharacterStatus, CultivationStage } from '../types/index.ts';
import { ELEMENT_DATA } from '../constants.ts';
import { CloseIcon, CombatPowerIcon } from './Icons.tsx';
import AvatarDisplay from './AvatarDisplay.tsx';
import { cultivationStateFactory } from '../logic/cultivation/stateFactory.ts';


const CharacterCard: React.FC<{char: Character, onSelect: (character: Character) => void}> = React.memo(({ char, onSelect }) => {
    const isDeceased = char.status === CharacterStatus.DECEASED;
    const isInjured = (char.injuryTurnsRemaining || 0) > 0;
    const cultivationState = cultivationStateFactory.getState(char.cultivationStage);
    const isAtPeak = char.cultivationLevel === cultivationState.levels;
    const levelDisplay = isAtPeak ? 'Đỉnh Phong' : `Tầng ${char.cultivationLevel}`;

    const getCardClasses = () => {
        if (isDeceased) return 'bg-stone-800/60 border-stone-700 opacity-60';
        if (isInjured) return 'bg-red-900/40 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)] cursor-pointer hover:border-red-400 hover:shadow-[0_5px_15px_rgba(239,68,68,0.5)]';
        return 'bg-gradient-to-br from-stone-800 to-stone-900 border-[var(--color-wood-light)] shadow-lg cursor-pointer hover:border-yellow-300 hover:shadow-[0_5px_15px_rgba(251,191,36,0.2)]';
    };

    const cardClasses = `p-3 rounded-lg border-2 transition-all duration-300 flex gap-3 items-center ${getCardClasses()}`;

    return (
        <div 
             onClick={() => !isDeceased && onSelect(char)}
             className={cardClasses}
             style={{boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1), 0 5px 10px rgba(0,0,0,0.5)'}}
             role={!isDeceased ? "button" : undefined}
             aria-label={!isDeceased ? `Xem chi tiết ${char.name}` : undefined}
        >
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-stone-700 border-2 border-amber-300/20 p-0.5 flex items-center justify-center overflow-hidden">
                <AvatarDisplay avatar={char.avatar} />
            </div>

            <div className="flex-grow">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1.5">
                        {char.isPatriarch && <span title="Tộc Trưởng" className="text-xl text-yellow-300 drop-shadow-[0_0_5px_rgba(251,191,36,0.7)]">👑</span>}
                        <p className={`font-bold text-lg ${isDeceased ? 'text-gray-400' : 'text-[var(--color-gold-light)]'}`}>{char.name}</p>
                    </div>
                    <p className={`text-xs font-semibold pt-1 ${isDeceased ? 'text-gray-500' : 'text-amber-200/80'}`}>
                        {isDeceased ? `Hưởng thọ: ${char.age}` : `Tuổi: ${char.age}`}
                    </p>
                </div>

                {!isDeceased && (
                     <div className="mt-1.5 text-sm text-[var(--color-text-main)]">
                        <div className="flex justify-between items-center">
                            <p className="text-amber-100/90 text-sm">
                                {char.cultivationStage} - {levelDisplay}
                            </p>
                            {isInjured && <span className="text-red-400 font-bold text-xs animate-pulse">TRỌNG THƯƠNG</span>}
                            <div className="flex items-center gap-1" title={char.spiritualRoot.type}>
                                {char.spiritualRoot.elements.map(el => (
                                    <div key={el} className="w-3 h-3 rounded-full border border-black/50" style={{ backgroundColor: ELEMENT_DATA[el].color }}></div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-rose-300">
                            <CombatPowerIcon className="w-4 h-4" />
                            <span className="text-sm font-semibold">Chiến Lực: {char.combatPower.toLocaleString()}</span>
                        </div>
                     </div>
                )}
            </div>
        </div>
    )
});

interface FamilyPanelProps {
    clan: Clan;
    isOpen: boolean;
    onClose: () => void;
    onSelectCharacter: (character: Character) => void;
}

const FamilyPanel: React.FC<FamilyPanelProps> = ({ clan, isOpen, onClose, onSelectCharacter }) => {
    
    const membersByGeneration = useMemo(() => {
        if (!clan) return {};
        const aliveMembers = clan.members.filter(m => m.status === CharacterStatus.ALIVE);

        const grouped = aliveMembers.reduce((acc, member) => {
            const gen = member.generation;
            if (acc[gen] === undefined) {
                acc[gen] = [];
            }
            acc[gen].push(member);
            return acc;
        }, {} as Record<number, Character[]>);

        // Sort members within each generation
        for (const gen in grouped) {
            grouped[gen].sort((a, b) => {
                if (a.isPatriarch && !b.isPatriarch) return -1;
                if (!a.isPatriarch && b.isPatriarch) return 1;
                
                const stageIndexA = Object.values(CultivationStage).indexOf(a.cultivationStage);
                const stageIndexB = Object.values(CultivationStage).indexOf(b.cultivationStage);
                if (stageIndexB !== stageIndexA) return stageIndexB - stageIndexA;
                
                if (b.cultivationLevel !== a.cultivationLevel) return b.cultivationLevel - a.cultivationLevel;
                
                return b.age - a.age;
            });
        }

        return grouped;
    }, [clan]);

    const sortedGenerations = useMemo(() => Object.keys(membersByGeneration).map(Number).sort((a, b) => a - b), [membersByGeneration]);
    const totalAliveMembers = useMemo(() => clan?.members.filter(m => m.status === CharacterStatus.ALIVE).length || 0, [clan?.members]);

    if (!clan) return null;

    return (
        <div 
            className={`absolute top-0 right-0 h-full p-4 z-40 transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            style={{ filter: 'drop-shadow(-5px 0px 15px rgba(0,0,0,0.5))' }}
        >
            <div 
                className="relative bg-gradient-to-b from-[var(--color-wood-dark)] to-[#2a201c] rounded-lg shadow-2xl w-[36rem] h-full flex flex-col"
                style={{
                    border: '3px solid #1d1d1d',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3), inset 0 0 0 4px var(--color-wood-medium)'
                }}
            >
                <div className="absolute -left-4 top-4 bottom-4 w-4 bg-gradient-to-r from-stone-800 to-stone-600 rounded-l-md shadow-lg border-y-2 border-l-2 border-stone-900"></div>

                <div className="text-center p-4 border-b-4 border-double border-[var(--color-wood-dark)] bg-gradient-to-b from-[var(--color-wood-medium)] to-[var(--color-wood-dark)] rounded-t-md relative">
                    <h2 className="text-2xl font-bold text-[var(--color-gold-light)] shimmer-effect" style={{ fontFamily: "'Noto Serif SC', serif", textShadow: '2px 2px 3px #000' }}>
                        {clan.name} Phả
                    </h2>
                     <button onClick={onClose} className="absolute top-1/2 -translate-y-1/2 right-3 text-white bg-black/50 p-1 rounded-full hover:bg-[var(--color-text-accent)] transition-colors z-20" aria-label="Đóng">
                        <CloseIcon />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-amber-800/70 scrollbar-track-transparent">
                    {sortedGenerations.map(gen => (
                        <div key={gen}>
                            <h4 className="font-bold text-amber-300 text-lg mb-2 pl-2 border-l-4 border-amber-500/50">
                                Đời Thứ {gen === 0 ? 'Tổ' : gen}
                            </h4>
                            <div className="space-y-3">
                                {membersByGeneration[gen].map(member => (
                                    <CharacterCard key={member.id} char={member} onSelect={onSelectCharacter} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                 <div className="text-center p-3 border-t-2 border-[var(--color-wood-dark)] bg-[var(--color-wood-medium)] rounded-b-md">
                    <p className="text-sm font-semibold text-[var(--color-gold-light)]">Tổng số tộc nhân: {totalAliveMembers}</p>
                 </div>
            </div>
        </div>
    );
};

export default React.memo(FamilyPanel);
