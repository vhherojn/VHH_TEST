import React, {useState} from 'react';
import type { Character } from '../../types/index.ts';
import { CultivationStage } from '../../types/index.ts';
import { CULTIVATION_STAGES, MINOR_BOTTLENECK_DATA } from '../../constants.ts';
import { HealthIcon, ManaIcon, CultivationIcon, NguyenKhiIcon, CombatPowerIcon } from '../Icons.tsx';
import type { GameActions } from '../../hooks/useGameLoop.ts';

const StatBar: React.FC<{ icon: React.ReactNode; value: number; maxValue: number; color: string; label: string }> = ({ icon, value, maxValue, color, label }) => {
    const percentage = maxValue > 0 ? Math.min(100, (value / maxValue) * 100) : 0;
    return (
        <div>
            <div className="flex justify-between items-center text-xs mb-1 text-amber-100/80">
                <div className="flex items-center gap-1.5 font-semibold">
                    {icon}
                    <span>{label}</span>
                </div>
                <span className="font-mono">{Math.floor(Math.min(value, maxValue))} / {Math.floor(maxValue)}</span>
            </div>
            <div className="w-full bg-black/50 rounded-full h-3.5 shadow-inner border border-black/50">
                <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: color,
                        boxShadow: `0 0 8px 1px ${color}`
                    }}
                ></div>
            </div>
        </div>
    );
};


interface CharacterOverviewTabProps {
    character: Character;
    actions: GameActions;
}

const getRequiredExpForLevel = (stage: CultivationStage, level: number): number => {
    const stageData = CULTIVATION_STAGES[stage];
    if (!stageData) return 100; // Fallback
    if (level < 1) return stageData.progressPerLevel;
    // Increase by 20% for each level after the first one.
    return Math.floor(stageData.progressPerLevel * Math.pow(1.2, level - 1));
};


const CharacterOverviewTab: React.FC<CharacterOverviewTabProps> = ({ character, actions }) => {
    const stageInfo = CULTIVATION_STAGES[character.cultivationStage];
    const isAtPeakLevel = character.cultivationLevel === stageInfo.levels;
    const requiredExp = getRequiredExpForLevel(character.cultivationStage, character.cultivationLevel);
    
    const maxAttemptsMap: Record<CultivationStage, number> = {
        [CultivationStage.QI_REFINEMENT]: 3, // 3 normal attempts
        [CultivationStage.FOUNDATION_ESTABLISHMENT]: 2,
        [CultivationStage.CORE_FORMATION]: 1,
        [CultivationStage.NASCENT_SOUL]: 1,
        [CultivationStage.SOUL_FORMATION]: 0,
    };
    const maxAttempts = maxAttemptsMap[character.cultivationStage] || 0;
    const currentAttempts = character.breakthroughAttempts?.[character.cultivationStage] || 0;
    
    const minorBottleneckInfo = MINOR_BOTTLENECK_DATA[character.cultivationStage];
    const isAtMinorBottleneck = !isAtPeakLevel && minorBottleneckInfo && minorBottleneckInfo.levels.includes(character.cultivationLevel) && character.cultivationProgress >= requiredExp;

    return (
        <>
            <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-xl text-amber-200" style={{fontFamily: "'Noto Serif SC', serif"}}>Trạng Thái</h3>
                    {character.seclusionState?.type === 'breakthrough' && <p className="font-bold text-cyan-300 animate-pulse">Đang Bế Quan Đột Phá (còn {character.seclusionState.monthsRemaining} tháng)</p>}
                    {character.tribulationState && <p className="font-bold text-red-500 animate-pulse text-xl">ĐANG ĐỘ KIẾP!</p>}
                </div>
                <div className="space-y-3">
                    <StatBar icon={<HealthIcon className="w-5 h-5 text-red-400"/>} label="Khí Huyết" value={character.health} maxValue={character.maxHealth} color="#ef4444" />
                    <StatBar icon={<ManaIcon className="w-5 h-5 text-blue-400"/>} label="Linh Lực" value={character.mana} maxValue={character.maxMana} color="#3b82f6" />
                    <StatBar icon={<NguyenKhiIcon className="w-5 h-5 text-emerald-400"/>} label="Nguyên Khí" value={character.nguyenKhi} maxValue={character.maxNguyenKhi} color="#34d399" />
                    <StatBar icon={<CultivationIcon className="w-5 h-5 text-yellow-400"/>} label="Tu Vi" value={character.cultivationProgress} maxValue={requiredExp} color="#f59e0b" />
                </div>
                 <div className="mt-4 flex justify-between items-center p-2 bg-black/20 rounded">
                    <div>
                        <span className="text-amber-200/70 text-sm">Cảnh Giới: </span>
                        <span className="text-white font-bold text-base">{character.cultivationStage} - {isAtPeakLevel ? 'Đỉnh Phong' : `Tầng ${character.cultivationLevel}`}</span>
                    </div>
                 </div>
                 <div className="mt-3 flex items-center justify-center gap-3 p-3 bg-gradient-to-tr from-rose-900/50 to-black/30 rounded-lg border-2 border-rose-500/30">
                     <CombatPowerIcon className="w-8 h-8 text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.7)]"/>
                     <div>
                        <p className="text-sm font-semibold text-rose-200/80">Chiến Lực</p>
                        <p className="text-2xl font-bold text-white tracking-wider">{character.combatPower.toLocaleString()}</p>
                     </div>
                 </div>
                 {character.injuryTurnsRemaining > 0 && (
                     <div className="mt-3 p-3 bg-red-900/40 rounded-lg border-2 border-red-500/50 text-center">
                         <p className="font-bold text-red-300 animate-pulse">TRỌNG THƯƠNG</p>
                         <p className="text-sm text-red-200/80">Thời gian hồi phục: <span className="font-bold text-lg">{character.injuryTurnsRemaining}</span> tháng</p>
                     </div>
                 )}
                 {isAtMinorBottleneck && minorBottleneckInfo && (
                     <div className="mt-3 p-3 bg-orange-900/40 rounded-lg border-2 border-orange-500/50 text-center space-y-1">
                        <p className="font-bold text-orange-300 animate-pulse">Đối mặt tiểu bình cảnh!</p>
                        <p className="text-sm text-orange-200/80">Tỉ lệ đột phá thành công: <span className="font-bold text-lg">{(minorBottleneckInfo.chance * 100).toFixed(0)}%</span></p>
                        <p className="text-xs text-gray-300">Thất bại sẽ bị trọng thương <span className="font-bold">{minorBottleneckInfo.injury}</span> tháng.</p>
                    </div>
                 )}
                 {isAtPeakLevel && (
                    <div className="mt-3 p-3 bg-purple-900/40 rounded-lg border-2 border-purple-500/50 text-center space-y-1">
                        <p className="font-bold text-purple-300">Đang gặp đại bình cảnh!</p>
                        <p className="text-sm text-purple-200/80">Tỉ lệ đột phá thành công: <span className="font-bold text-lg">{(character.breakthroughSuccessChance * 100).toFixed(0)}%</span></p>
                        {maxAttempts > 0 && <p className="text-xs text-gray-300">Cơ hội còn lại: <span className="font-bold text-base">{maxAttempts - currentAttempts} / {maxAttempts}</span></p>}
                    </div>
                 )}
            </div>
             <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                <h3 className="font-bold text-xl text-amber-200 mb-3" style={{fontFamily: "'Noto Serif SC', serif"}}>Dung Mạo</h3>
                <p className="text-base text-white/90 italic p-3 bg-black/20 rounded-md">"{character.appearanceDescription}"</p>
            </div>
        </>
    );
};

export default React.memo(CharacterOverviewTab);