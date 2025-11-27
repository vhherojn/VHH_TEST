import { CultivationStage } from '../types/index.ts';
import type { CombatStats } from '../types/index.ts';

type CultivationStageData = {
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
};

export const CULTIVATION_STAGES: Record<CultivationStage, CultivationStageData> = {
    [CultivationStage.QI_REFINEMENT]: {
        stage: CultivationStage.QI_REFINEMENT,
        levels: 13,
        progressPerLevel: 100,
        upkeep: 5,
        baseHealth: 100,
        baseMana: 50,
        baseNguyenKhi: 10,
        baseSpeed: 10,
        baseMaxAge: 150,
        combatStatModifiers: { physicalAttack: 10, magicalAttack: 5, physicalDefense: 8, magicalDefense: 4 }
    },
    [CultivationStage.FOUNDATION_ESTABLISHMENT]: {
        stage: CultivationStage.FOUNDATION_ESTABLISHMENT,
        levels: 10,
        progressPerLevel: 800,
        upkeep: 20,
        baseHealth: 4000,
        baseMana: 2000,
        baseNguyenKhi: 100,
        baseSpeed: 20,
        baseMaxAge: 250,
        combatStatModifiers: { physicalAttack: 400, magicalAttack: 350, physicalDefense: 300, magicalDefense: 250 }
    },
    [CultivationStage.CORE_FORMATION]: {
        stage: CultivationStage.CORE_FORMATION,
        levels: 10,
        progressPerLevel: 8000,
        upkeep: 100,
        baseHealth: 50000,
        baseMana: 35000,
        baseNguyenKhi: 800,
        baseSpeed: 30,
        baseMaxAge: 600,
        combatStatModifiers: { physicalAttack: 8000, magicalAttack: 7000, physicalDefense: 6000, magicalDefense: 5000 }
    },
    [CultivationStage.NASCENT_SOUL]: {
        stage: CultivationStage.NASCENT_SOUL,
        levels: 10,
        progressPerLevel: 40000,
        upkeep: 500,
        baseHealth: 250000,
        baseMana: 180000,
        baseNguyenKhi: 4000,
        baseSpeed: 45,
        baseMaxAge: 1200,
        combatStatModifiers: { physicalAttack: 30000, magicalAttack: 28000, physicalDefense: 20000, magicalDefense: 18000 }
    },
    [CultivationStage.SOUL_FORMATION]: {
        stage: CultivationStage.SOUL_FORMATION,
        levels: 9,
        progressPerLevel: 200000,
        upkeep: 2500,
        baseHealth: 1000000,
        baseMana: 750000,
        baseNguyenKhi: 10000,
        baseSpeed: 70,
        baseMaxAge: 2500,
        combatStatModifiers: { physicalAttack: 120000, magicalAttack: 110000, physicalDefense: 90000, magicalDefense: 80000 }
    }
};


export const MINOR_BOTTLENECK_DATA: Partial<Record<CultivationStage, { levels: number[], chance: number, injury: number }>> = {
    [CultivationStage.QI_REFINEMENT]: { levels: [3, 6, 9], chance: 0.6, injury: 6 },
    [CultivationStage.FOUNDATION_ESTABLISHMENT]: { levels: [3, 6], chance: 0.5, injury: 12 },
    [CultivationStage.CORE_FORMATION]: { levels: [3, 6], chance: 0.4, injury: 24 },
    [CultivationStage.NASCENT_SOUL]: { levels: [3, 6], chance: 0.2, injury: 60 },
    [CultivationStage.SOUL_FORMATION]: { levels: [3, 6], chance: 0.05, injury: 600 },
};