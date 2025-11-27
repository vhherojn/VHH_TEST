import type { CultivationStage, CombatStats, Clan, Event, Character } from '../../types/index.ts';

export interface BreakthroughResult {
    success: boolean;
    newEvents: Omit<Event, 'id' | 'date'>[];
    clan: Clan; // Return the modified clan (e.g., after consuming a pill)
}

export interface ICanhGioiState {
    stage: CultivationStage;
    levels: number;
    progressPerLevel: number;
    upkeep: number;
    baseHealth: number;
    baseMana: number;
    baseNguyenKhi: number;
    baseSpeed: number;
    baseMaxAge: number;
    combatStatModifiers: Omit<CombatStats, 'critChance' | 'critDamage'>;

    handleBreakthrough(character: Character, clan: Clan, options?: { isFinal?: boolean }): BreakthroughResult;
    resolveBreakthrough(character: Character, clan: Clan): BreakthroughResult;
    getBreakthroughSuccessChance(character: Character, clan: Clan): number;
    getExpForLevel(level: number): number;
}