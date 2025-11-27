import { RankType, CultivationStage, Gender, CharacterStatus, RelationshipClass, SpiritualRootType, Element, PhysiqueTier, ProfessionType, ItemQuality, EquipmentQuality, TalentType, TechniqueMastery } from './enums.ts';
import { EquippableItem, TechniqueItem, CombatStats, Pill, Talisman } from './items.ts';
import { CharacterNeed } from './needs.ts';
import { CharacterActivity } from './activity.ts';

export interface CharacterEquipment {
  head: EquippableItem | null;
  chest: EquippableItem | null;
  feet: EquippableItem | null;
  accessory1: (EquippableItem | Talisman) | null;
  accessory2: (EquippableItem | Talisman) | null;
  weapon: EquippableItem | null;
  belt: [Pill | null, Pill | null, Pill | null];
}

export interface MasteryProgress {
    mastery: TechniqueMastery;
    exp: number;
}

export interface TechniqueTrainingState {
    techniqueId: string;
}

export interface CharacterTechniques {
  mainCultivation: string | null;
  subCultivation: (string | null)[]; // 4 slots
  secretArts: (string | null)[]; // 4 slots
  spells: (string | null)[]; // 4 slots
}

export type Personality = string;
export interface Pregnancy { partnerId: string; monthsRemaining: number; }

export interface Relationship {
  characterId: string;
  class: RelationshipClass;
  affinity: number; // 0-100
  description: string; // "Became friends while working in the Forge"
}

export interface Avatar { base: string; eyes: string; hair: string; mouth: string; skinColor: string; accessory?: string; }
export interface SpiritualRoot { type: SpiritualRootType; elements: Element[]; }
export interface Physique { name: string; tier: PhysiqueTier; description: string; effects: { cultivationSpeedModifier: number; healthModifier: number; manaModifier: number; lifespanModifier: number; combatStatModifiers?: Partial<Record<keyof CombatStats, number>>; }; }

export interface ApprenticeshipState {
    targetTier: ItemQuality;
    monthsRemaining: number;
}

export interface PromotionState {
    targetQuality: EquipmentQuality;
    monthsRemaining: number;
}

export interface Profession { 
    type: ProfessionType; 
    tier: ItemQuality; 
    quality: EquipmentQuality; 
    exp: number; 
    expToNext: number; 
    apprenticeship?: ApprenticeshipState;
    promotionState?: PromotionState;
}

export interface TribulationState {
    turnsRemaining: number;
}

export interface SeclusionState {
    type: 'breakthrough' | 'healing';
    monthsRemaining: number;
    targetStage?: CultivationStage;
    isFinal?: boolean;
}

export interface BreakthroughAid {
  itemId: string;
  successChanceBonus: number;
}

export interface StatModifiers {
    baseMultiplier?: number;
    maxNguyenKhiModifier?: number;
    physicalDefenseModifier?: number;
    permanent_health_modifier?: number;
    permanent_physical_attack_modifier?: number;
    lifespanPillsUsed?: Record<string, number>; // pillId -> times used
}

export interface ActiveBuff {
    id: string; // e.g., 'bao_khi_dan' or 'huyet_sam_bao_khi_dan'
    turnsRemaining: number;
    magnitude: number; // e.g., 1.2 for a 20% boost, or 0.4 for 40% recovery
}

export interface Character {
  id: string; name: string; avatar: Avatar; status: CharacterStatus; isPatriarch: boolean; parents?: { fatherId?: string, motherId?: string };
  age: number; maxAge: number; gender: Gender; spiritualRoot: SpiritualRoot; physiqueName: string;
  generation: number;
  attributes: Partial<Record<Element, number>>;
  comprehension: number; khiVan: number; daoTam: number; personality: Personality; appearanceDescription: string; charisma: number;
  thanThuc?: number; // Thần Thức
  loyalty: number; contribution: number; rank: RankType;
  cultivationStage: CultivationStage; cultivationLevel: number; cultivationProgress: number;
  health: number; maxHealth: number; mana: number; maxMana: number; speed: number; combatStats: CombatStats;
  nguyenKhi: number; maxNguyenKhi: number; combatPower: number;
  breakthroughSuccessChance: number;
  breakthroughAttempts: Partial<Record<CultivationStage, number>>;
  statModifiers?: StatModifiers;
  hasGivenUpCultivation?: boolean;
  isPermanentlyBlocked?: boolean;
  advancementBlockedAt?: CultivationStage;
  seclusionState: SeclusionState | null;
  isCultivationBlocked?: boolean;
  isFacingMinorBottleneck?: boolean;
  activity: CharacterActivity;
  bodyImpurity?: number;
  injuryTurnsRemaining?: number;
  
  relationships: Relationship[]; pregnancy: Pregnancy | null;
  
  masterId?: string;
  discipleIds: string[];

  techniques: CharacterTechniques;
  learnedTechniques: string[];
  professionTechniques: string[];
  masteredTechniques: Record<string, MasteryProgress>; // Key is techniqueId
  techniqueTrainingState: TechniqueTrainingState | null;

  equipment: CharacterEquipment;
  professions: Profession[];
  inventory: Record<string, number>;
  assignedToBuildingId?: string;
  assignedToSlotIndex?: number;
  assignedToSlotType?: 'worker' | 'apprentice' | 'manager' | 'miner' | 'supervisor';
  activeTaskId?: string | null;
  taskProgress?: number;
  talents: Record<TalentType, number>;
  cultivationTowerState: CultivationTowerState | null;
  tribulationState: TribulationState | null;
  combatExp: number;
  combatExpToNext: number;
  needs: CharacterNeed[];
  breakthroughAid?: BreakthroughAid | null;
  activeBuffs?: ActiveBuff[];
}

export interface CultivationTowerState {
    turnsRemaining: number;
}