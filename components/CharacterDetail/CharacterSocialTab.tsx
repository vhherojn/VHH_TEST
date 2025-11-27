

import React, { useMemo } from 'react';
import type { Clan, Character } from '../../types/index.ts';
import { RelationshipClass } from '../../types/enums.ts';
import { HeartIcon } from '../Icons.tsx';

interface CharacterSocialTabProps {
    character: Character;
    clan: Clan;
    onSelectCharacter: (character: Character) => void;
}

const RELATIONSHIP_COLORS: Record<string, string> = {
    [RelationshipClass.SPOUSE]: 'text-pink-400',
    [RelationshipClass.MASTER]: 'text-amber-300',
    [RelationshipClass.DISCIPLE]: 'text-cyan-300',
    [RelationshipClass.FAMILY_CLOSE]: 'text-pink-400',
    [RelationshipClass.FRIEND]: 'text-green-400',
    [RelationshipClass.RIVAL]: 'text-red-500',
};


const CharacterSocialTab: React.FC<CharacterSocialTabProps> = ({ character, clan, onSelectCharacter }) => {
    
    const sortedRelationships = useMemo(() => {
        return [...character.relationships].sort((a, b) => {
            const order = [RelationshipClass.SPOUSE, RelationshipClass.MASTER, RelationshipClass.DISCIPLE, RelationshipClass.FAMILY_CLOSE, RelationshipClass.FRIEND, RelationshipClass.RIVAL];
            return order.indexOf(a.class) - order.indexOf(b.class);
        });
    }, [character.relationships]);

    if (character.relationships.length === 0) {
        return (
            <div className="p-4 bg-black/20 rounded-lg border border-white/10 text-center text-gray-400 italic">
                {character.name} không có mối quan hệ xã hội nào đáng chú ý.
            </div>
        );
    }
    
    return (
        <div className="space-y-4">
             <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                <h3 className="font-bold text-xl text-amber-200 mb-3" style={{fontFamily: "'Noto Serif SC', serif"}}>Quan Hệ Xã Hội</h3>
                <div className="max-h-[60vh] overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-amber-800/70 scrollbar-track-transparent">
                    {sortedRelationships.map(rel => {
                        const relatedChar = clan.members.find(m => m.id === rel.characterId);
                        if (!relatedChar) return null;
                        
                        const color = RELATIONSHIP_COLORS[rel.class] || 'text-white';

                        return (
                            <div key={rel.characterId} className="flex items-center gap-3 p-2 bg-black/40 rounded-md border border-white/10">
                                <div className="flex-grow">
                                    <div className="flex justify-between items-center">
                                        <button onClick={() => onSelectCharacter(relatedChar)} className={`font-bold text-lg hover:underline ${color}`}>
                                            {relatedChar.name}
                                        </button>
                                        <p className={`font-semibold text-sm ${color}`}>{rel.class}</p>
                                    </div>
                                    <p className="text-xs text-gray-400 italic mt-1">"{rel.description}"</p>
                                </div>
                                <div className="flex items-center gap-1 text-rose-300 font-mono text-lg" title="Độ thân mật">
                                    <HeartIcon className="w-4 h-4" />
                                    <span>{rel.affinity}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default React.memo(CharacterSocialTab);