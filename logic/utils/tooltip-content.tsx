
import React from 'react';
import type { AnyItem, EquippableItem, TechniqueItem, Pill, MasteryProgress } from '../../types/index.ts';
import { ItemType, TechniqueMastery } from '../../types/index.ts';
import { ALL_ITEMS, ITEM_QUALITY_COLORS, TECHNIQUE_MASTERY_DATA, ALL_RECIPES, BUILDINGS, MASTERY_EXP_REQUIREMENTS } from '../../constants.ts';

const StatRow: React.FC<{ label: string; value: string | number; color?: string, originalValue?: string | number }> = ({ label, value, color = 'text-green-400', originalValue }) => (
    <li>{label}: <span className={`font-semibold ${color}`}>{value}</span> {originalValue && <span className='text-gray-400 text-xs'>({originalValue})</span>}</li>
);

const EFFECT_TRANSLATIONS: Record<string, string> = {
    // Stats Modifiers
    healthModifier: 'Tăng Khí Huyết',
    manaModifier: 'Tăng Linh Lực',
    cultivationSpeedModifier: 'Tốc Độ Tu Luyện',
    manaRecoveryRate: 'Tốc Độ Hồi Linh Lực',
    magicalAttackModifier: 'Hệ Số Pháp Lực',
    areaMagicalAttackModifier: 'Hệ Số Pháp Lực (Diện Rộng)',
    physicalAttackModifier: 'Hệ Số Công Kích',
    
    // Stats Flat
    maxHealth: 'Khí Huyết Tối Đa',
    maxMana: 'Linh Lực Tối Đa',
    speed: 'Tốc Độ',
    physicalAttack: 'Công Kích',
    magicalAttack: 'Pháp Lực',
    physicalDefense: 'Phòng Ngự',
    magicalDefense: 'Hộ Thể',
    critChance: 'Tỷ Lệ Bạo Kích',
    critDamage: 'Sát Thương Bạo Kích',
    
    // Generic Combat
    damage: 'Sát Thương',
    shield: 'Lớp Giáp',
    duration: 'Thời Gian (Lượt/Tháng)',

    // Pill Effects
    mana_recovery: 'Hồi Phục Linh Lực',
    cultivation_progress_gain: 'Tăng Tu Vi',
    health_recovery: 'Hồi Phục Khí Huyết',
    injury_recovery: 'Hồi Phục Thương Thế',
    aura_concealment: 'Che Dấu Khí Tức',
    breakthrough_success_chance_bonus: 'Tăng Tỷ Lệ Đột Phá',
    dao_co_vung_chac: 'Vững Chắc Đạo Cơ',
    cuong_hoa_xuong_cot: 'Cường Hóa Xương Cốt',
    illusion_power: 'Sức Mạnh Ảo Ảnh',
    self_harm_buff: 'Kích Thích Tiềm Năng (Tự Tổn)',
    body_impurity_cleanse: 'Thanh Lọc Tạp Chất',
    permanent_health_boost: 'Tăng Vĩnh Viễn Khí Huyết',
    permanent_physical_attack_boost: 'Tăng Vĩnh Viễn Công Kích',
    dao_tam_boost: 'Củng Cố Đạo Tâm',
    demon_tribulation_chance_bonus: 'Tăng Tỷ Lệ Qua Tâm Ma Kiếp',
    lightning_tribulation_chance_bonus: 'Tăng Tỷ Lệ Qua Lôi Kiếp',
    instant_recovery: 'Hồi Phục Tức Thì (Máu/Linh Lực)',
    lifespan_increase: 'Gia Tăng Thọ Nguyên',
    instant_mana_recovery: 'Hồi Phục Tức Thì Linh Lực',
    instant_health_recovery: 'Hồi Phục Tức Thì Khí Huyết',
    temporary_power_burst: 'Bùng Nổ Sức Mạnh Tạm Thời',
    post_battle_injury: 'Thương Tổn Sau Chiến Đấu',
    combat_recovery: 'Hồi Phục Trong Chiến Đấu',
    temporary_combat_buff: 'Tăng Chiến Lực Tạm Thời',
    temporary_fire_buff: 'Bùng Nổ Hỏa Linh Khí',
    temporary_ice_buff: 'Bùng Nổ Hàn Khí',
    full_recovery: 'Tái Tạo Hoàn Toàn',

    // Spell/Secret Art Effects
    manaCost: 'Tiêu hao Linh Lực',
    stunChance: 'Tỷ Lệ Choáng',
    areaSpeedDebuff: 'Làm Chậm (Diện Rộng)',
    damageOverTime: 'Sát Thương Theo Thời Gian',
    speedDebuff: 'Làm Chậm',
    healthCost: 'Tiêu hao Khí Huyết',
    lifespanCost: 'Tiêu hao Tuổi Thọ',
    temporaryDefense: 'Phòng Ngự Tạm Thời',
    temporarySpeed: 'Tốc Độ Tạm Thời',
    temporaryAttack: 'Công Kích Tạm Thời',
    
    // New Effects for Tier 3 Talismans
    damageReflection: 'Phản Hồi Sát Thương',
    attackSpeedDebuff: 'Giảm Tốc Độ Đánh',
    manaBurn: 'Thiêu Đốt Linh Lực',
    
    // Misc
    professionUnlock: 'Mở Khóa Nghề',
    explorationRange: 'Phạm Vi Thăm Dò',
    soulAttack: 'Công Kích Nguyên Thần',
    requires_element_fire: 'Yêu Cầu Hỏa Linh Căn',

    // Profession Bonuses
    alchemySuccessRateBonus: 'Tỷ lệ Luyện Đan thành công',
    alchemyTimeReduction: 'Giảm thời gian Luyện Đan',
    blacksmithingSuccessRateBonus: 'Tỷ lệ Luyện Khí thành công',
    blacksmithingTimeReduction: 'Giảm thời gian Luyện Khí',
    talismanSuccessRateBonus: 'Tỷ lệ Chế Phù thành công',
    talismanTimeReduction: 'Giảm thời gian Chế Phù',
    formationSuccessRateBonus: 'Tỷ lệ Chế Trận thành công',
    formationTimeReduction: 'Giảm thời gian Chế Trận',
};


export function generateTooltipContent(item: AnyItem, masteryProgress?: MasteryProgress): React.ReactNode {
    const qualityColor = ITEM_QUALITY_COLORS[item.quality] || 'text-white';
    const masteryData = masteryProgress ? TECHNIQUE_MASTERY_DATA[masteryProgress.mastery] : null;
    const recipe = Object.values(ALL_RECIPES).find(r => r.outputs.some(o => o.itemId === item.id));

    const renderBaseInfo = () => (
        <>
            <p className={`font-bold text-lg ${qualityColor}`}>{item.name}</p>
             {masteryData && <p className="text-md font-bold text-purple-300">Cảnh giới: {masteryData.name}</p>}
            {'equipmentQuality' in item && <p className="text-sm text-gray-400 mb-2">{item.type} - {item.quality} - {item.equipmentQuality}</p>}
            {!('equipmentQuality' in item) && ![ItemType.RESOURCE, ItemType.BLUEPRINT, ItemType.DAN_PHUONG].includes(item.type) && <p className="text-sm text-gray-400 mb-2">{item.type} - {item.quality}</p>}
            <p className="text-sm text-white/90 italic p-3 bg-black/20 rounded-md mb-4">"{item.description}"</p>
             {'history' in item && item.history && <p className="text-xs text-amber-200/70 italic mb-3">"{item.history}"</p>}
        </>
    );

    const renderEffects = (effects: Record<string, any>) => (
        <>
            <h4 className="font-bold text-amber-300 mb-1">Hiệu ứng:</h4>
            <ul className="text-xs text-white/80 list-disc list-inside space-y-1">
                {Object.entries(effects).map(([key, baseValue]) => {
                    const formattedKey = EFFECT_TRANSLATIONS[key] || key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/^./, str => str.toUpperCase());
                    
                    let finalValue = baseValue;
                    let originalValueStr: string | null = null;
                    
                    if (masteryData && typeof baseValue === 'number') {
                        if (key.toLowerCase().includes('cost')) {
                            finalValue = Math.round(baseValue * masteryData.costMultiplier);
                        } else if (key !== 'professionUnlock') { // Don't multiply non-stat effects
                             finalValue = baseValue * masteryData.effectMultiplier;
                        }
                        if (Math.abs(finalValue - baseValue) > 0.01) {
                             originalValueStr = baseValue.toFixed(0);
                        }
                    }

                    // Group for Percentage Displays (Modifiers + Specific Recovery stats)
                    const isPercentageStat = key.includes('Modifier') || 
                                             key.includes('Reduction') || 
                                             key.includes('Bonus') || 
                                             key.includes('_buff') ||
                                             key === 'damageReflection' ||
                                             key === 'speedDebuff' ||
                                             key === 'attackSpeedDebuff' ||
                                             key === 'instant_recovery' || // Added instant_recovery here just in case
                                             ['combat_recovery', 'instant_recovery', 'instant_mana_recovery', 'instant_health_recovery'].includes(key);

                    if (isPercentageStat) {
                        // If it's a modifier (like 1.2), subtract 1. If it's a raw percentage (like 0.4), keep it.
                        // Modifiers usually start with 1.0 base. Recovery/Bonus/Reflection usually start with 0.0 base.
                        const isAdditiveModifier = key.includes('Modifier'); 
                        const valueToFormat = isAdditiveModifier ? finalValue - 1 : finalValue;
                        
                        const originalValueToFormat = originalValueStr ? (isAdditiveModifier ? baseValue - 1 : baseValue) : null;
                        
                        const percentage = Math.round(valueToFormat * 100);
                        const originalPercentage = originalValueToFormat !== null ? `${Math.round(originalValueToFormat * 100)}%` : null;

                        const sign = percentage > 0 ? '+' : '';
                        const color = key.includes('Reduction') ? 'text-green-400' : (percentage > 0 ? 'text-green-400' : 'text-red-400');

                        return <StatRow key={key} label={formattedKey} value={`${sign}${percentage}%`} color={color} originalValue={originalPercentage}/>;
                    }
                    
                    if (key === 'critChance' || key === 'stunChance') {
                        return <StatRow key={key} label={formattedKey} value={`${(finalValue * 100).toFixed(0)}%`} originalValue={originalValueStr ? `${(baseValue * 100).toFixed(0)}%` : null}/>;
                    }
                    if (key === 'critDamage' || key === 'manaRecoveryRate') {
                        return <StatRow key={key} label={formattedKey} value={`x${finalValue.toFixed(2)}`} originalValue={originalValueStr ? `x${baseValue.toFixed(2)}` : null}/>;
                    }
                    
                    // For other numeric values (Flat stats)
                    if (typeof finalValue === 'number' && finalValue > 0) {
                        // Special check for full_recovery to not show "+1"
                        if (key === 'full_recovery') {
                             return <StatRow key={key} label={formattedKey} value="Có" color="text-purple-400" />;
                        }
                        return <StatRow key={key} label={formattedKey} value={`+${Math.floor(finalValue)}`} originalValue={originalValueStr ? `+${originalValueStr}` : null} />;
                    }
                     if (typeof finalValue === 'number' && finalValue < 0) {
                        return <StatRow key={key} label={formattedKey} value={`${Math.floor(finalValue)}`} color="text-red-400" originalValue={originalValueStr} />;
                    }
                    return <li key={key}>{formattedKey}: {JSON.stringify(finalValue)}</li>;
                })}
            </ul>
        </>
    );

    const renderRequirements = (requirements: TechniqueItem['requirements'], he?: string) => (
        <>
            <h4 className="font-bold text-amber-300 mt-2 mb-1">Thông Tin</h4>
            <ul className="text-xs text-white/80 list-disc list-inside space-y-1">
                {he && <StatRow label="Hệ" value={he} color="text-yellow-400" />}
                {requirements.cultivationStage && <StatRow label="Cảnh giới Yêu Cầu" value={requirements.cultivationStage} color="text-yellow-400" />}
                {requirements.comprehension && <StatRow label="Ngộ tính Yêu Cầu" value={requirements.comprehension} color="text-yellow-400" />}
                {requirements.elements && <StatRow label="Linh căn Yêu Cầu" value={requirements.elements.join(', ')} color="text-yellow-400" />}
                {requirements.daoTam && <StatRow label="Đạo tâm Yêu Cầu" value={requirements.daoTam} color="text-yellow-400" />}
            </ul>
        </>
    );

    const mainContent = () => {
        switch (item.type) {
            case ItemType.WEAPON:
            case ItemType.HELMET:
            case ItemType.CHESTPLATE:
            case ItemType.BOOTS:
            case ItemType.TALISMAN:
                const equip = item as EquippableItem;
                return renderEffects(equip.effects);
            
            case ItemType.CULTIVATION_METHOD:
            case ItemType.SECRET_ART:
            case ItemType.SPELL:
                const tech = item as TechniqueItem;
                return (
                    <>
                        {Object.keys(tech.effects).length > 0 && renderEffects(tech.effects)}
                        {(Object.keys(tech.requirements).length > 0 || tech.he) && renderRequirements(tech.requirements, tech.he)}
                    </>
                );

            case ItemType.PILL:
                const pill = item as Pill;
                return (
                     <>
                        {renderEffects(pill.effects)}
                        {pill.impurity && pill.impurity > 0 && (
                            <div className='mt-2'>
                                <h4 className="font-bold text-red-400/80 mb-1 text-xs">Tác Dụng Phụ:</h4>
                                <ul className="text-xs text-white/80 list-disc list-inside space-y-1">
                                     <li>Tăng Tạp Chất: <span className="font-semibold text-red-400">{pill.impurity}</span></li>
                                </ul>
                            </div>
                        )}
                    </>
                );

            default:
                return null;
        }
    };
    
    const renderRecipe = () => {
        if (!recipe) return null;
        const building = BUILDINGS[recipe.building];
        const blueprint = recipe.requiredBlueprint ? ALL_ITEMS[recipe.requiredBlueprint] : null;

        return (
            <div className='mt-2 pt-2 border-t border-amber-400/20'>
                <h4 className="font-bold text-amber-300 mb-1">Công Thức Chế Tạo:</h4>
                <ul className="text-xs text-white/80 list-disc list-inside space-y-1">
                    <li>Nơi chế tạo: <span className="font-semibold text-cyan-300">{building.name}</span></li>
                    {blueprint && <li>Yêu cầu: <span className="font-semibold text-yellow-300">{blueprint.name}</span></li>}
                    <li>Nguyên liệu:</li>
                    <ul className="pl-6 list-['-_']">
                        {Object.entries(recipe.cost).map(([id, count]) => {
                            const material = ALL_ITEMS[id];
                            return <li key={id}>{material?.name || id}: {count}</li>;
                        })}
                    </ul>
                </ul>
            </div>
        );
    };

    return (
        <div>
            {renderBaseInfo()}
            {mainContent()}
            {renderRecipe()}
        </div>
    );
}
