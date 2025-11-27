import React from 'react';
import type { Character, Profession, TechniqueItem } from '../../types/index.ts';
import { ALL_ITEMS, ITEM_QUALITY_COLORS } from '../../constants.ts';
import { BookIcon } from '../Icons.tsx';

const ProfessionRow: React.FC<{ profession: Profession }> = ({ profession }) => (
    <div className="p-3 bg-black/30 rounded-md border border-white/10">
        <p className="font-bold text-white">{profession.type} - {profession.tier} {profession.quality}</p>
        {profession.promotionState ? (
            <p className="text-sm text-cyan-300 animate-pulse mt-1">
                Đang lĩnh ngộ... (còn {profession.promotionState.monthsRemaining} tháng)
            </p>
        ) : (
            <>
                <div className="w-full bg-black/50 rounded-full h-2 mt-1 shadow-inner">
                    <div className="bg-amber-400 h-2 rounded-full" style={{width: `${(profession.exp / profession.expToNext) * 100}%`}}></div>
                </div>
                <p className="text-xs text-right text-gray-400 mt-1">{profession.exp} / {profession.expToNext}</p>
            </>
        )}
    </div>
);

const TechniqueUnlockRow: React.FC<{ technique: TechniqueItem }> = ({ technique }) => (
    <div className="flex items-center gap-2 p-2 bg-black/20 rounded">
        <BookIcon className="w-4 h-4 text-amber-200/70 flex-shrink-0" />
        <p className="text-sm">
            <span className="text-gray-400">Lĩnh ngộ từ: </span>
            <span className={`font-semibold ${ITEM_QUALITY_COLORS[technique.quality] || 'text-white'}`}>{technique.name}</span>
        </p>
    </div>
);

interface CharacterProfessionsTabProps {
    character: Character;
}

const CharacterProfessionsTab: React.FC<CharacterProfessionsTabProps> = ({ character }) => (
    <div className="p-4 bg-black/20 rounded-lg border border-white/10 space-y-4">
        <div>
            <h3 className="font-bold text-xl text-amber-200 mb-2">Nghề Nghiệp Đã Học</h3>
            {character.professions.length > 0 
                ? <div className="space-y-3">{character.professions.map(p => <ProfessionRow key={p.type} profession={p} />)}</div>
                : <p className="text-gray-400 italic">Chưa học nghề nghiệp nào.</p>
            }
        </div>
        {character.professionTechniques.length > 0 && (
             <div>
                <h3 className="font-bold text-xl text-amber-200 mb-2">Công Pháp Nghề Nghiệp</h3>
                 <div className="space-y-2">
                    {character.professionTechniques.map(techId => {
                        const tech = ALL_ITEMS[techId] as TechniqueItem;
                        if (!tech) return null;
                        return <TechniqueUnlockRow key={tech.id} technique={tech} />;
                    })}
                </div>
            </div>
        )}
    </div>
);

export default React.memo(CharacterProfessionsTab);