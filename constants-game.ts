

import { ItemQuality } from './types/index.ts';

// Game balance constants
export const MARRIAGE_AGE_MIN = 18;
export const MAX_PREGNANCY_AGE = 45;
export const MARRIAGE_CHANCE_PER_MONTH = 0.02; // Chance for two people to get married autonomously
export const PREGNANCY_CHANCE_PER_MONTH = 0.15; // Chance for a couple to conceive
export const PREGNANCY_DURATION_MONTHS = 10;
export const INHERITANCE_CHANCE = 0.47;

export const CRAFTING_DURATIONS: Record<ItemQuality, number> = {
    [ItemQuality.NHAT_GIAI]: 2,
    [ItemQuality.NHI_GIAI]: 4,
    [ItemQuality.TAM_GIAI]: 6,
    [ItemQuality.TU_GIAI]: 8,
    [ItemQuality.NGU_GIAI]: 12,
};