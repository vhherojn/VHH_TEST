
import React, { useMemo } from 'react';
import type { Clan, Character } from '../../types/index.ts';
import {
    PHYSIQUES, ELEMENT_DATA,
    PHYSIQUE_TIER_COLORS, COMBAT_STAT_TRANSLATIONS
} from '../../constants.ts';
import {
    HourglassIcon, SpiritualRootIcon, PhysiqueIcon,
    ElementIcon, PersonalityIcon, GenderIcon,
    StarIcon, DestinyIcon, DaoHeartIcon, HeartIcon
} from '../Icons.tsx';
import AvatarDisplay from '../AvatarDisplay.tsx';
import { RelationshipClass, CharacterStatus } from '../../types/index.ts';

const ContributionIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v4h-2zm0 6h2v2h-2z"/></svg>);
const RankIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 18.14l-5-4.87 6.91-1.01L12 2z"></path></svg>);

const formatModifier = (mod: number) => {
    const percentage = Math.round((mod - 1) * 100);
    if (percentage === 0) return `Không đổi`;
    return `${percentage > 0 ? '+' : ''}${percentage}%`;
};

const InfoRow: React.FC<{icon: React.ReactNode; label: string; value: React.ReactNode; className?: string, tooltip?: React.ReactNode}> = ({ icon, label, value, className, tooltip }) => (
    <div className={`relative group flex items-start justify-between py-2 border-b border-white/10 ${className}`}>
        <div className="flex items-center gap-2 text-amber-200/80 font-semibold">{icon} {label}</div>
        <div className="text-right text-white font-semibold">{value}</div>
        {tooltip && (<div className="absolute bottom-full mb-2 right-0 w-80 p-3 bg-stone-900 border border-amber-300/30 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-left">{tooltip}</div>)}
    </div>
);

const FamilyMemberRow: React.FC<{label: string, member: Character | null | undefined, onSelect?: (member: Character) => void}> = ({label, member, onSelect}) => {
    const isSelectable = member && onSelect && member.status === CharacterStatus.ALIVE;
    return (
         <div className="flex items-center justify-between text-sm py-1">
            <span className="text-amber-200/60">{label}:</span>
            {isSelectable ? (
                <button onClick={() => onSelect(member)} className="font-semibold text-white hover:text-amber-300 hover:underline">
                    {member.name}
                </button>
            ) : (
                <span className={`font-semibold ${member ? 'text-white' : 'text-gray-500'}`}>{member?.name || 'Không rõ'} {member?.status === CharacterStatus.DECEASED ? '(Đã mất)' : ''}</span>
            )}
        </div>
    );
};

interface CharacterInfoPanelProps {
    character: Character;
    clan: Clan;
    onSelectCharacter: (character: Character) => void;
    onAwardLibraryToken: () => void;
}

const CharacterInfoPanel: React.FC<CharacterInfoPanelProps> = ({ character, clan, onSelectCharacter, onAwardLibraryToken }) => {
    const physique = PHYSIQUES[character.physiqueName as keyof typeof PHYSIQUES];
    const physiqueTierColor = PHYSIQUE_TIER_COLORS[physique.tier];
    const libraryTokenCount = clan.itemInventory['library_token_1'] || 0;

     const { father, mother, spouse, children } = useMemo(() => {
        const clanMembers = clan.members;
        const father = character.parents?.fatherId ? clanMembers.find(m => m.id === character.parents!.fatherId) : null;
        const mother = character.parents?.motherId ? clanMembers.find(m => m.id === character.parents!.motherId) : null;
        const spouseRel = character.relationships.find(r => r.class === RelationshipClass.SPOUSE);
        const spouse = spouseRel ? clanMembers.find(m => m.id === spouseRel.characterId) : null;
        const children = clanMembers.filter(m => m.parents?.fatherId === character.id || m.parents?.motherId === character.id);
        return { father, mother, spouse, children };
    }, [character, clan.members]);

    const PhysiqueTooltip = () => (
        <>
            <p className={`font-bold text-lg ${physiqueTierColor}`}>{physique.name} <span className="text-sm font-normal text-white/70">({physique.tier})</span></p>
            <p className="text-sm text-white/90 italic mt-1">"{physique.description}"</p>
            <hr className="my-2 border-white/20" />
            <h4 className="font-bold text-amber-300 mb-1">Hiệu Ứng Thể Chất:</h4>
            <ul className="text-xs text-white/80 space-y-1">
                <li>Tốc độ tu luyện: <span className="font-semibold text-green-400">{formatModifier(physique.effects.cultivationSpeedModifier)}</span></li>
                <li>Khí Huyết: <span className="font-semibold text-red-400">{formatModifier(physique.effects.healthModifier)}</span></li>
                <li>Linh Lực: <span className="font-semibold text-blue-400">{formatModifier(physique.effects.manaModifier)}</span></li>
                <li>Tuổi Thọ: <span className="font-semibold text-yellow-400">{formatModifier(physique.effects.lifespanModifier)}</span></li>
                {physique.effects.combatStatModifiers && Object.entries(physique.effects.combatStatModifiers).length > 0 && <li className="pt-1 text-amber-300/80">Chỉ số chiến đấu:</li>}
                {physique.effects.combatStatModifiers && Object.entries(physique.effects.combatStatModifiers).map(([stat, mod]) => 
                    <li key={stat} className="pl-2">{COMBAT_STAT_TRANSLATIONS[stat] || stat}: <span className="font-semibold text-purple-400">{formatModifier(mod as number)}</span></li>
                )}
            </ul>
        </>
    );

    return (
        <div className="flex flex-col h-full p-4 bg-black/20 rounded-lg border border-white/10">
            <div className="flex flex-col items-center border-b-2 border-amber-300/10 pb-4">
                <div className="w-28 h-28 rounded-full bg-stone-700 p-0.5 shadow-lg overflow-hidden border-2" style={{borderColor: character.gender === 'Nam' ? '#60a5fa' : '#f472b6'}}>
                    <AvatarDisplay avatar={character.avatar} />
                </div>
                <h2 id="character-detail-title" className="mt-3 text-3xl font-bold text-[var(--color-gold-light)] text-center" style={{fontFamily: "'Noto Serif SC', serif"}}>{character.name}</h2>
                <p className="text-amber-300 text-lg font-semibold">{character.rank}</p>
                {character.pregnancy && <p className="text-sm font-bold text-pink-400 mt-1 animate-pulse">Mang Thai (còn {character.pregnancy.monthsRemaining} tháng)</p>}
            </div>
            <div className="w-full mt-3 space-y-1 text-sm">
                <InfoRow icon={<HourglassIcon className="w-4 h-4" strokeWidth={2.5} />} label="Tuổi Thọ" value={`${character.age} / ${character.maxAge}`} />
                <InfoRow icon={<GenderIcon className="w-4 h-4"/>} label="Giới Tính" value={character.gender} />
                <InfoRow icon={<RankIcon className="w-4 h-4 text-yellow-300"/>} label="Thân Phận" value={character.rank} />
                <InfoRow icon={<HeartIcon className="w-4 h-4 text-rose-400"/>} label="Trung Thành" value={character.loyalty} />
                <InfoRow icon={<ContributionIcon className="w-4 h-4 text-cyan-400"/>} label="Cống Hiến" value={character.contribution} />
                <InfoRow icon={<PersonalityIcon className="w-4 h-4" />} label="Tính Cách" value={character.personality} />
                <InfoRow icon={<SpiritualRootIcon className="w-4 h-4"/>} label="Linh Căn" value={<div className="flex flex-col items-end"><span className="font-bold text-white">{character.spiritualRoot.type}</span><div className="flex items-center gap-1.5 mt-1">{character.spiritualRoot.elements.map(el => (<ElementIcon key={el} color={ELEMENT_DATA[el].color} className="w-3.5 h-3.5" title={ELEMENT_DATA[el].name} />))}</div></div>}/>
                <InfoRow icon={<PhysiqueIcon className="w-4 h-4"/>} label="Thể Chất" value={<span className={`font-bold ${physiqueTierColor}`}>{character.physiqueName}</span>} tooltip={<PhysiqueTooltip />}/>
            </div>

            <button 
                onClick={onAwardLibraryToken}
                disabled={libraryTokenCount <= 0}
                className="w-full mt-4 p-2 rounded-lg font-bold text-white transition-all duration-300 shadow-md bg-gradient-to-r from-blue-600 to-purple-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed enabled:hover:scale-[1.02]"
                title="Ban thưởng Lệnh Bài Tàng Kinh Các để tộc nhân có thể tự đi học công pháp."
            >
                Ban Thưởng Lệnh Bài (Còn: {Math.floor(libraryTokenCount)})
            </button>

            <div className="mt-auto pt-3">
                <h3 className="font-bold text-lg text-amber-200 mb-2 pl-1" style={{fontFamily: "'Noto Serif SC', serif"}}>Gia Đình</h3>
                <div className="p-3 bg-black/20 rounded-md border border-white/10 space-y-1">
                    <FamilyMemberRow label="Phụ Thân" member={father} onSelect={onSelectCharacter} />
                    <FamilyMemberRow label="Mẫu Thân" member={mother} onSelect={onSelectCharacter} />
                    <FamilyMemberRow label="Đạo Lữ" member={spouse} onSelect={onSelectCharacter} />
                    <div>
                        <span className="text-amber-200/60 text-sm">Hậu Duệ ({children.length}):</span>
                        {children.length > 0 ? (<div className="pl-4 text-sm font-semibold text-white">{children.map(c => <div key={c.id}><button onClick={() => onSelectCharacter(c)} className="hover:text-amber-300 hover:underline">{c.name}</button></div>)}</div>) : <span className="text-sm font-semibold text-gray-500 ml-2">Chưa có</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(CharacterInfoPanel);
