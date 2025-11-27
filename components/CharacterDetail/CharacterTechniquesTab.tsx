
import React, { useState } from 'react';
import type { Character, TechniqueItem } from '../../types/index.ts';
import { ItemType, TechniqueMastery } from '../../types/enums.ts';
import { ALL_ITEMS, ALL_TECHNIQUES, ITEM_QUALITY_COLORS, TECHNIQUE_MASTERY_DATA, MASTERY_EXP_REQUIREMENTS } from '../../constants.ts';
import ItemTooltip from '../common/ItemTooltip.tsx';

type SlotType = 'mainCultivation' | 'subCultivation' | 'secretArts' | 'spells';

const TechniqueSlot: React.FC<{
  label: string;
  techniqueId: string | null;
  character: Character;
  onClick: () => void;
  isEquipTarget: boolean;
}> = ({ label, techniqueId, character, onClick, isEquipTarget }) => {
  const technique = techniqueId ? ALL_TECHNIQUES[techniqueId] as TechniqueItem : null;
  const masteryProgress = technique ? character.masteredTechniques[technique.id] : null;
  
  const qualityColor = technique ? ITEM_QUALITY_COLORS[technique.quality] : 'text-gray-500';
  const targetClass = isEquipTarget ? 'ring-2 ring-green-400 animate-pulse' : 'ring-1 ring-transparent';
  
  const masteryData = masteryProgress ? TECHNIQUE_MASTERY_DATA[masteryProgress.mastery] : null;
  const expToNext = (technique && masteryProgress) ? MASTERY_EXP_REQUIREMENTS[technique.quality][masteryProgress.mastery] : 0;
  const expPercentage = expToNext > 0 && expToNext !== Infinity ? (masteryProgress!.exp / expToNext) * 100 : 0;

  const slotContent = (
    <div className={`p-2 bg-black/30 rounded-md border border-white/10 ${targetClass} min-h-[6rem] flex flex-col`}>
      <div className="flex justify-between items-center">
          <div className="text-xs text-amber-200/60">{label}</div>
      </div>
      <button
        onClick={onClick}
        className="w-full text-left mt-1 flex-grow"
        disabled={!technique && !isEquipTarget}
      >
        <p className={`font-semibold text-base truncate ${qualityColor}`}>
          {technique?.name || (isEquipTarget ? '[Chọn vị trí]' : '[Trống]')}
        </p>
         {masteryProgress && masteryData && (
             <div className="mt-1">
                 <p className="text-xs text-purple-300 font-semibold">{masteryData.name}</p>
                 {expToNext > 0 && expToNext !== Infinity && (
                     <div className="w-full bg-black/50 rounded-full h-1.5 mt-1 shadow-inner">
                         <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${expPercentage}%` }}></div>
                     </div>
                 )}
             </div>
         )}
      </button>
    </div>
  );

  return technique ? <ItemTooltip item={technique} masteryProgress={masteryProgress || undefined}>{slotContent}</ItemTooltip> : slotContent;
};


interface CharacterTechniquesTabProps {
    character: Character;
    onEquip: (techniqueId: string, slotType: SlotType, slotIndex: number) => void;
    onUnequip: (techniqueId: string) => void;
}

const CharacterTechniquesTabComponent: React.FC<CharacterTechniquesTabProps> = ({ character, onEquip, onUnequip }) => {
    const [selectedLearnedTechId, setSelectedLearnedTechId] = useState<string | null>(null);

    const handleSelectLearnedTech = (techId: string) => {
        setSelectedLearnedTechId(techId === selectedLearnedTechId ? null : techId);
    };

    const handleSlotClick = (slotType: SlotType, slotIndex: number, currentTechId: string | null) => {
        if (selectedLearnedTechId) {
            onEquip(selectedLearnedTechId, slotType, slotIndex);
            setSelectedLearnedTechId(null);
        } else if (currentTechId) {
            onUnequip(currentTechId);
        }
    };
    
    const isEquipTarget = (targetType: ItemType) => {
        if (!selectedLearnedTechId) return false;
        const selectedTech = ALL_TECHNIQUES[selectedLearnedTechId] as TechniqueItem;
        if (!selectedTech) return false;
        
        if (selectedTech.type === ItemType.CULTIVATION_METHOD) return targetType === ItemType.CULTIVATION_METHOD;
        if (selectedTech.type === ItemType.SECRET_ART) return targetType === ItemType.SECRET_ART;
        if (selectedTech.type === ItemType.SPELL) return targetType === ItemType.SPELL;
        return false;
    };

    return (
        <div className="space-y-4">
            <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:items-start">
                     <div className="lg:col-span-1">
                        <h3 className="font-bold text-xl text-amber-200 mb-2">Công Pháp Chính</h3>
                        <TechniqueSlot
                            label="Chủ Tu"
                            techniqueId={character.techniques.mainCultivation}
                            character={character}
                            onClick={() => handleSlotClick('mainCultivation', 0, character.techniques.mainCultivation)}
                            isEquipTarget={isEquipTarget(ItemType.CULTIVATION_METHOD)}
                        />
                     </div>
                     <div className="lg:col-span-3">
                        <h3 className="font-bold text-xl text-amber-200 mb-2">Công Pháp Phụ Tu</h3>
                        <div className="grid grid-cols-2 gap-2">
                             {character.techniques.subCultivation.map((techId, i) => (
                                <TechniqueSlot
                                    key={i}
                                    label={`Phụ Tu ${i+1}`}
                                    techniqueId={techId}
                                    character={character}
                                    onClick={() => handleSlotClick('subCultivation', i, techId)}
                                    isEquipTarget={isEquipTarget(ItemType.CULTIVATION_METHOD)}
                                />
                             ))}
                        </div>
                     </div>
                </div>
            </div>

            <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                <h3 className="font-bold text-xl text-amber-200 mb-2">Bí Thuật & Thần Thông</h3>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                     {character.techniques.secretArts.map((techId, i) => (
                        <TechniqueSlot
                            key={i}
                            label={`Bí Thuật ${i+1}`}
                            techniqueId={techId}
                            character={character}
                            onClick={() => handleSlotClick('secretArts', i, techId)}
                            isEquipTarget={isEquipTarget(ItemType.SECRET_ART)}
                        />
                    ))}
                </div>
            </div>
            
             <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                <h3 className="font-bold text-xl text-amber-200 mb-2">Pháp Thuật</h3>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                    {character.techniques.spells.map((techId, i) => (
                        <TechniqueSlot
                            key={i}
                            label={`Pháp Thuật ${i+1}`}
                            techniqueId={techId}
                            character={character}
                            onClick={() => handleSlotClick('spells', i, techId)}
                            isEquipTarget={isEquipTarget(ItemType.SPELL)}
                        />
                    ))}
                </div>
            </div>

            <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                <h3 className="font-bold text-xl text-amber-200 mb-2">Công Pháp Đã Học</h3>
                <div className="max-h-48 overflow-y-auto grid grid-cols-2 gap-2 pr-2">
                    {character.learnedTechniques.length > 0 ? character.learnedTechniques.map(techId => {
                        const tech = ALL_TECHNIQUES[techId] as TechniqueItem;
                        if(!tech) return null;
                        const mastery = character.masteredTechniques[techId];
                        return (
                            <ItemTooltip key={tech.id} item={tech} masteryProgress={mastery}>
                                <button
                                    onClick={() => handleSelectLearnedTech(tech.id)}
                                    className={`w-full text-left p-2 rounded-md border transition-all ${selectedLearnedTechId === tech.id ? 'bg-amber-800/50 border-amber-400' : 'bg-black/40 border-white/10 hover:bg-black/60'}`}
                                >
                                    <div className="flex justify-between items-center">
                                        <p className={`font-semibold ${ITEM_QUALITY_COLORS[tech.quality]}`}>{tech.name}</p>
                                        <p className="text-xs text-purple-300">{mastery?.mastery || ''}</p>
                                    </div>
                                </button>
                            </ItemTooltip>
                        )
                    }) : (
                        <p className="text-gray-500 italic text-center col-span-2">Chưa học công pháp nào.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export const CharacterTechniquesTab = React.memo(CharacterTechniquesTabComponent);
