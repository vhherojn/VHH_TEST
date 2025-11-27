import { CultivationStage, CombatStats, Character, Clan, Event } from '../../../types/index.ts';
import type { ICanhGioiState, BreakthroughResult } from '../ICanhGioiState.ts';

export class HoaThanState implements ICanhGioiState {
    stage: CultivationStage = CultivationStage.SOUL_FORMATION;
    levels: number = 9;
    progressPerLevel: number = 200000;
    upkeep: number = 2500;
    baseHealth: number = 1000000;
    baseMana: number = 750000;
    baseNguyenKhi: number = 10000;
    baseSpeed: number = 70;
    baseMaxAge: number = 2500;
    combatStatModifiers: Omit<CombatStats, 'critChance' | 'critDamage'> = { 
        physicalAttack: 120000,
        magicalAttack: 110000,
        physicalDefense: 90000,
        magicalDefense: 80000
    };

    getExpForLevel(level: number): number {
        if (level < 1) return this.progressPerLevel;
        // Increase by 20% for each level after the first one.
        return Math.floor(this.progressPerLevel * Math.pow(1.2, level - 1));
    }

    getBreakthroughSuccessChance(character: Character, clan: Clan): number {
        return 0; // Cannot break through in the mortal realm
    }

    handleBreakthrough(character: Character, clan: Clan, options?: { isFinal?: boolean }): BreakthroughResult {
        return { 
            success: false, 
            newEvents: [{
                description: `${character.name} đã đạt đến đỉnh phong của Nhân Giới. Muốn tiến thêm một bước, chỉ có thể tìm cách phi thăng Thượng Giới.`,
                characterIds: [character.id]
            }],
            clan,
        };
    }
    
    resolveBreakthrough(character: Character, clan: Clan): BreakthroughResult {
        return { 
            success: false, 
            newEvents: [{
                description: `Hóa Thần Kỳ đã là đỉnh phong, không thể đột phá thêm.`,
                characterIds: [character.id]
            }],
            clan,
        };
    }
}