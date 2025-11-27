import { ItemQuality } from './types/index.ts';
import type { Recipe } from './types/index.ts';

// Import all item types from the new modular structure
import { MATERIALS } from './constants/items/constants-materials.ts';
import { VAT_LIEU } from './constants/items/vat-lieu.ts';
import { LUYEN_KHI_VAT_LIEU } from './constants/items/vat-lieu-luyen-khi.ts';
import { SEEDS } from './constants/items/constants-seeds.ts';
import { ALL_PILLS } from './constants/items/dan-duoc.ts';
import { WEAPONS } from './constants/items/constants-weapons.ts';
import { EQUIPMENT } from './constants/items/constants-equipment.ts';
import { TALISMANS } from './constants/items/constants-talismans.ts';
import { FORMATIONS } from './constants/items/constants-formations.ts';
import { TOKENS } from './constants/items/constants-tokens.ts';
import { BLUEPRINTS } from './constants/items/constants-blueprints.ts';
import { DAN_PHUONG } from './constants/items/dan-phuong.ts';
import { CULTIVATION_METHODS } from './constants/items/constants-cultivation-methods.ts';
import { SECRET_ARTS } from './constants/items/constants-secret-arts.ts';
import { SPELLS } from './constants/items/constants-spells.ts';

// Import all recipes
import { ALCHEMY_RECIPES } from './constants/items/recipes/recipes-alchemy.ts';
import { BLACKSMITH_RECIPES } from './constants/items/recipes/recipes-blacksmith.ts';
import { TALISMAN_RECIPES } from './constants/items/recipes/recipes-talisman.ts';
import { FORMATION_RECIPES } from './constants/items/recipes/recipes-formation.ts';

// Re-export them for easy access throughout the app
export { MATERIALS, SEEDS, WEAPONS, EQUIPMENT, TALISMANS, FORMATIONS, TOKENS, CULTIVATION_METHODS, SECRET_ARTS, SPELLS };

// Consolidate all predefined items into single objects for easier lookup
export const PREDEFINED_RESOURCES = { ...MATERIALS, ...VAT_LIEU, ...LUYEN_KHI_VAT_LIEU };
export const PREDEFINED_PILLS = { ...ALL_PILLS };
export const PREDEFINED_EQUIPMENT = { ...WEAPONS, ...EQUIPMENT };
export const PREDEFINED_TALISMANS = { ...TALISMANS };
export const PREDEFINED_FORMATIONS = { ...FORMATIONS };
export const ALL_TECHNIQUES = { ...CULTIVATION_METHODS, ...SECRET_ARTS, ...SPELLS };
export const PREDEFINED_SEEDS = { ...SEEDS };
export const PREDEFINED_TOKENS = { ...TOKENS };
export const PREDEFINED_BLUEPRINTS = { ...BLUEPRINTS };
export const PREDEFINED_DAN_PHUONG = { ...DAN_PHUONG };


export const ALL_ITEMS = { 
    ...PREDEFINED_RESOURCES, 
    ...PREDEFINED_PILLS, 
    ...PREDEFINED_EQUIPMENT, 
    ...PREDEFINED_TALISMANS,
    ...PREDEFINED_FORMATIONS,
    ...ALL_TECHNIQUES,
    ...PREDEFINED_SEEDS,
    ...PREDEFINED_TOKENS,
    ...PREDEFINED_BLUEPRINTS,
    ...PREDEFINED_DAN_PHUONG,
};

export const ALL_RECIPES: Record<string, Recipe> = {
    ...ALCHEMY_RECIPES,
    ...BLACKSMITH_RECIPES,
    ...TALISMAN_RECIPES,
    ...FORMATION_RECIPES,
};