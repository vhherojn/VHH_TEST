import { ItemQuality, ItemType, EquipmentQuality, CultivationStage, Element, WeaponType } from './enums.ts';

export interface BaseItem { id: string; name: string; description: string; quality: ItemQuality; type: ItemType; }
export interface Resource extends BaseItem { type: ItemType.RESOURCE | ItemType.MATERIAL | ItemType.HERB | ItemType.SEED | ItemType.TOKEN; value: number; }
export interface CombatStats { 
    physicalAttack: number; 
    magicalAttack: number; 
    physicalDefense: number; 
    magicalDefense: number; 
    critChance: number; 
    critDamage: number; 
    elementalAttack?: Partial<Record<Element, number>>;
    elementalDefense?: Partial<Record<Element, number>>;
}
export interface EquippableItem extends BaseItem {
    type: ItemType.WEAPON | ItemType.HELMET | ItemType.CHESTPLATE | ItemType.BOOTS;
    equipmentQuality: EquipmentQuality;
    history?: string;
    effects: Partial<Record<keyof CombatStats | 'healthModifier' | 'manaModifier' | 'maxHealth' | 'maxMana' | 'speed' | 'manaRecoveryRate' | 'mapSpeed' | 'comprehension' | 'khiVan' | 'daoTam' | 'charisma', number | Partial<Record<Element, number>>>>;
    requiredCultivation?: CultivationStage;
    elements?: Element[];
    weaponType?: WeaponType;
    growthExp?: number;
    growthExpToNext?: number;
}

export interface Talisman extends BaseItem {
    type: ItemType.TALISMAN;
    equipmentQuality: EquipmentQuality;
    effects: {
        shield?: number;
        damage?: number;
        duration?: number;
        damageOverTime?: number;
        mana_recovery?: number;
        damageReflection?: number;
        aura_concealment?: number;
        speedDebuff?: number;
        stunChance?: number;
        manaBurn?: number;
        critChance?: number;
    };
}

export interface Formation extends BaseItem {
    type: ItemType.FORMATION;
    effects: {
        clanCultivationSpeedModifier?: number;
    };
}

export interface TechniqueItem extends BaseItem { type: ItemType.CULTIVATION_METHOD | ItemType.SECRET_ART | ItemType.SPELL; equipmentQuality: EquipmentQuality; he?: string; effects: Record<string, any>; requirements: { cultivationStage?: CultivationStage; elements?: Element[]; comprehension?: number; daoTam?: number; }; maxCultivationStage?: CultivationStage; }
export interface Pill extends BaseItem { type: ItemType.PILL; equipmentQuality: EquipmentQuality; effects: Record<string, number>; impurity?: number; }
export interface Blueprint extends BaseItem { type: ItemType.BLUEPRINT; recipeId: string; }
export interface DanPhuong extends BaseItem { type: ItemType.DAN_PHUONG; recipeId: string; }

export type AnyItem = Resource | EquippableItem | Pill | TechniqueItem | Blueprint | Talisman | Formation | DanPhuong;