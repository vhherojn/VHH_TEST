
import { Character } from './character.ts';
import { ItemQuality, EquipmentQuality, CultivationStage, ProfessionType, RankType } from './enums.ts';
import { TechniqueItem } from './items.ts';

export interface CraftingStation {
  id: string; // e.g., station_0, station_1
  tier: ItemQuality; // The tier this station operates at
  workerId: string | null;
  apprenticeIds: [string | null, string | null];
  
  // Crafting state
  activeRecipeId: string | null;
  progress: number; // Months elapsed
  duration: number; // Total months required
  isActive: boolean;
  autoCraftRecipeId?: string | null;
}

export interface HuntingAssignment {
  tier: ItemQuality;
  memberIds: (string | null)[];
}

export interface Building {
  id: string;
  name: string;
  level: number;
  tier: ItemQuality;
  quality: EquipmentQuality;
  stations: CraftingStation[];
  managerId?: string | null;
  huntingAssignments?: HuntingAssignment[];
}

export interface Task { 
    id:string; 
    name: string; 
    description: string; 
    duration: number; 
    requirements: { 
        minCultivationStage?: CultivationStage; 
        requiredProfession?: { type: ProfessionType; tier: ItemQuality; }; 
        requiredKhiVan?: number;
        partySize?: { min: number, max: number };
    }; 
    rewards: { 
        spirit_stone?: number; 
        contribution?: number; 
        items?: Record<string, number>; 
    }; 
}
export interface Recipe { 
    id: string; 
    name: string; 
    building: string; 
    requiredTier: ItemQuality; 
    requiredProfessionTier: ItemQuality; 
    cost: Record<string, number>; 
    outputs: { itemId: string, chance: number, amount: number }[];
    requiredBlueprint?: string;
}
export interface MeritShopItem { slotIndex: number; itemId: string; cost: number; stock: number; }
export interface Election {
  isActive: boolean;
  candidates: string[]; // character IDs
  votes: Record<string, string>; // voterId -> candidateId
}

export interface Scandal {
    id: string;
    description: string;
    involved: string[]; // character IDs
    resolved: boolean;
    punishment?: string;
}

export interface DisciplineSettings {
    punishmentLevel: 'light' | 'medium' | 'severe';
}

export interface LinhMach {
    tier: ItemQuality;
    quality: EquipmentQuality;
    miningAssignments: {
        supervisorId: string | null;
        minerIds: (string | null)[];
    }
}

export interface WelcomePackageItem { itemId: string; count: number; }

export interface PromotionRule { 
    id: string; 
    fromRank: RankType; 
    toRank: RankType; 
    conditions: { 
        stage?: CultivationStage; 
        contribution?: number; 
    }; 
}

export interface BreakthroughDecision {
  characterId: string;
  targetStage: CultivationStage;
}

export interface BreakthroughReward {
    stage: CultivationStage;
    items: { itemId: string; count: number }[];
}

// --- STATISTICS STRUCTURES ---
export interface YearlyStatRecord {
    year: number;
    population: number;
    totalCombatPower: number;
    spiritStonesEarned: number; // From all sources (mining, tasks)
    itemsCreated: number; // Total count of items created/found
    births: number;
    deaths: number;
    avgCultivationLevel: number; // A rough score for avg power
}

export interface CurrentYearStats {
    spiritStonesEarned: number;
    itemsCreated: number;
    births: number;
    deaths: number;
}

export interface Clan {
  name: string;
  members: Character[];
  resources: Record<string, number>;
  itemInventory: Record<string, number>;
  linhMach: LinhMach;
  buildings: Record<string, Building>;
  availableTasks: Task[];
  library: Partial<Record<ItemQuality, (string | null)[]>>;
  meritShop: MeritShopItem[];
  rankStipends: Record<RankType, Record<string, number>>;
  welcomePackage: WelcomePackageItem[];
  promotionRules: PromotionRule[];
  breakthroughRewards: Partial<Record<CultivationStage, { itemId: string; count: number }[]>>;
  pendingRecruits: Character[];
  mandatoryQuestFrequency: Record<RankType, number>;
  taskCooldowns: Record<string, number>;
  election: Election | null;
  disciplineSettings: DisciplineSettings;
  scandals: Scandal[];
  activeFormationId: string | null;
  generationNames: string[];
  characterIdFacingLastChance?: string | null;
  breakthroughDecision?: BreakthroughDecision | null;
  knownRecipes: string[];
  
  // New Statistics Fields
  yearlyRecords: YearlyStatRecord[];
  currentYearStats: CurrentYearStats;
}
