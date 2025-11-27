import React from 'react';
import type { Character, Element } from '../../types/index.ts';
import { ComprehensionIcon, DestinyIcon, DaoHeartIcon, StarIcon, SpeedIcon, SwordIcon, WandIcon, ShieldIcon, CritIcon, ImpurityIcon, ElementIcon, ThanThucIcon } from '../Icons.tsx';
import { TALENTS_DATA, ELEMENT_DATA } from '../../constants.ts';
import { TalentType } from '../../types/index.ts';

const InfoRow: React.FC<{icon: React.ReactNode; label: string; value: React.ReactNode;}> = ({ icon, label, value }) => (
    <div className="flex items-start justify-between py-2 border-b border-white/10">
        <div className="flex items-center gap-2 text-amber-200/80 font-semibold">{icon} {label}</div>
        <div className="text-right text-white font-semibold">{value}</div>
    </div>
);

const CombatStatRow: React.FC<{icon: React.ReactNode, label: string, value: string | number}> = ({icon, label, value}) => (
    <div className="flex items-center justify-between text-sm p-2 bg-black/20 rounded">
        <div className="flex items-center gap-2 text-amber-200/80 font-semibold">{icon} {label}</div>
        <span className="font-mono font-bold text-white">{value}</span>
    </div>
);

const CULTIVATION_TALENTS = [TalentType.CULTIVATION, TalentType.COMPREHENSION, TalentType.KIEM_DAO, TalentType.THE_DAO, TalentType.MA_DAO];
const PROFESSION_TALENTS = [TalentType.ALCHEMY, TalentType.BLACKSMITHING, TalentType.TALISMAN_MAKING, TalentType.FORMATION_MAKING, TalentType.SPIRIT_FARMING];

interface CharacterAttributesTabProps {
    character: Character;
}

const CharacterAttributesTab: React.FC<CharacterAttributesTabProps> = ({ character }) => {
    const combatStats = character.combatStats;

    const renderTalentSection = (title: string, talentTypes: TalentType[]) => {
        const relevantTalents = Object.entries(character.talents).filter(([talent]) => talentTypes.includes(talent as TalentType));
        if (relevantTalents.length === 0) return null;

        return (
            <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                <h3 className="font-bold text-xl text-amber-200 mb-3" style={{fontFamily: "'Noto Serif SC', serif"}}>{title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {relevantTalents.map(([talent, value]) => (
                         <CombatStatRow 
                            key={talent}
                            icon={<StarIcon className="w-4 h-4 text-cyan-400"/>} 
                            label={TALENTS_DATA[talent as keyof typeof TALENTS_DATA].name} 
                            value={value} />
                    ))}
                </div>
            </div>
        );
    }


    return (
        <>
            <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                <h3 className="font-bold text-xl text-amber-200 mb-3" style={{fontFamily: "'Noto Serif SC', serif"}}>Thiên Phú Bẩm Sinh</h3>
                <div className="w-full mt-3 space-y-1 text-base">
                    <InfoRow icon={<ComprehensionIcon className="w-5 h-5"/>} label="Ngộ Tính" value={character.comprehension} />
                    <InfoRow icon={<DestinyIcon className="w-5 h-5 text-yellow-300"/>} label="Khí Vận" value={character.khiVan} />
                    <InfoRow icon={<DaoHeartIcon className="w-5 h-5 text-rose-300"/>} label="Đạo Tâm" value={character.daoTam} />
                    <InfoRow icon={<StarIcon className="w-5 h-5 text-fuchsia-300"/>} label="Khí Chất" value={character.charisma} />
                    {character.thanThuc && <InfoRow icon={<ThanThucIcon className="w-5 h-5 text-teal-300"/>} label="Thần Thức" value={character.thanThuc} />}
                    <InfoRow icon={<ImpurityIcon className="w-5 h-5 text-lime-400"/>} label="Tạp Chất" value={character.bodyImpurity || 0} />
                </div>
            </div>

            <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                <h3 className="font-bold text-xl text-amber-200 mb-3" style={{fontFamily: "'Noto Serif SC', serif"}}>Thuộc Tính Nguyên Tố</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {Object.entries(character.attributes || {}).sort(([, a], [, b]) => b - a).map(([element, value]) => (
                        <CombatStatRow 
                            key={element}
                            icon={<ElementIcon color={ELEMENT_DATA[element as Element]?.color} className="w-4 h-4"/>} 
                            label={ELEMENT_DATA[element as Element]?.name} 
                            value={Math.floor(value)} />
                    ))}
                </div>
            </div>
            
            {renderTalentSection("Thiên Phú Tu Luyện", CULTIVATION_TALENTS)}
            {renderTalentSection("Thiên Phú Bách Nghệ", PROFESSION_TALENTS)}

            <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                <h3 className="font-bold text-xl text-amber-200 mb-3" style={{fontFamily: "'Noto Serif SC', serif"}}>Chỉ Số Chiến Đấu</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <CombatStatRow icon={<SpeedIcon className="w-4 h-4 text-gray-300"/>} label="Tốc Độ" value={character.speed} />
                    <CombatStatRow icon={<SwordIcon className="w-4 h-4 text-red-400"/>} label="Công Kích" value={Math.floor(combatStats.physicalAttack)} />
                    <CombatStatRow icon={<WandIcon className="w-4 h-4 text-blue-400"/>} label="Pháp Lực" value={Math.floor(combatStats.magicalAttack)} />
                    <CombatStatRow icon={<ShieldIcon className="w-4 h-4 text-green-400"/>} label="Phòng Ngự" value={Math.floor(combatStats.physicalDefense)} />
                    <CombatStatRow icon={<ShieldIcon className="w-4 h-4 text-indigo-400"/>} label="Hộ Thể" value={Math.floor(combatStats.magicalDefense)} />
                    <CombatStatRow icon={<CritIcon className="w-4 h-4 text-yellow-400"/>} label="Bạo Kích" value={`${(combatStats.critChance * 100).toFixed(0)}%`} />
                    <CombatStatRow icon={<CritIcon className="w-4 h-4 text-orange-400"/>} label="Sát Thương Bạo" value={`x${combatStats.critDamage.toFixed(2)}`} />
                </div>
            </div>
        </>
    );
};

export default React.memo(CharacterAttributesTab);