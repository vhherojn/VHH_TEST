import type { GameDate } from './world.ts';
import type { Character, ActiveBuff } from './character.ts';

export type BattleActionType = 'attack' | 'spell' | 'dodge' | 'escape' | 'start' | 'end';

export interface BattleTurn {
    turnNumber: number;
    description: string;
}

export interface BattleReport {
    id: string;
    date: GameDate;
    type: 'sparring' | 'life_and_death';
    participants: { id: string; name: string }[];
    winnerId: string | null;
    log: BattleTurn[];
}

// Add a type for combatants to track changing stats and buffs
export interface Combatant extends Character {
    currentHealth: number;
    currentMana: number;
    activeBuffs: ActiveBuff[];
    pillsUsedInCombat?: Record<string, number>; // pillId -> count
    postBattleInjuryTurns?: number;
}