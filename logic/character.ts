
import {
    Character, SpiritualRoot, Avatar, CombatStats, Gender,
    CultivationStage, SpiritualRootType, Element, CharacterStatus, RankType, EquipmentQuality, Profession, ProfessionType, TechniqueItem, AnyItem, EquippableItem, MasteryProgress, CharacterActivity, TechniqueMastery, Pill, TalentType, Clan
} from '../types/index.ts';
import {
    FIRST_NAMES, PERSONALITIES, SKIN_COLORS,
    PHYSIQUES, INHERITANCE_CHANCE, AVATAR_PARTS,
    SPIRITUAL_ROOT_WEIGHTS, NORMAL_ELEMENTS, MUTATED_ELEMENTS, PHYSIQUE_TIER_WEIGHTS, TALENTS_DATA, ALL_ITEMS, ALL_TECHNIQUES, GENERATION_NAMES
} from '../constants.ts';
import { deepClone } from './utils/clone.ts';
import { ItemType } from '../types/enums.ts';
import { cultivationStateFactory } from './cultivation/stateFactory.ts';

const getAgeGroup = (age: number): 'CHILD' | 'TEEN' | 'ADULT' => {
    if (age <= 6) return 'CHILD'; if (age <= 17) return 'TEEN'; return 'ADULT';
};

const generateAvatar = (gender: Gender, age: number, skinColor: string): Avatar => {
    const ageGroup = getAgeGroup(age);
    const parts = AVATAR_PARTS[gender][ageGroup];
    return {
        base: parts.BASE[Math.floor(Math.random() * parts.BASE.length)],
        eyes: parts.EYES[Math.floor(Math.random() * parts.EYES.length)],
        hair: parts.HAIR[Math.floor(Math.random() * parts.HAIR.length)],
        mouth: parts.MOUTH[Math.floor(Math.random() * parts.MOUTH.length)],
        accessory: parts.ACCESSORY[Math.floor(Math.random() * parts.ACCESSORY.length)],
        skinColor,
    }
};

const generateSpiritualRoot = (): SpiritualRoot => {
    const totalWeight = SPIRITUAL_ROOT_WEIGHTS.reduce((sum, current) => sum + current.weight, 0);
    let random = Math.random() * totalWeight;
    const selectedType = SPIRITUAL_ROOT_WEIGHTS.find(tier => { random -= tier.weight; return random < 0; })!.type;
    let elements: Element[] = [];
    switch (selectedType) {
        case SpiritualRootType.HEAVENLY: elements = [NORMAL_ELEMENTS[Math.floor(Math.random() * NORMAL_ELEMENTS.length)]]; break;
        case SpiritualRootType.DUAL: elements = [...NORMAL_ELEMENTS].sort(() => 0.5 - Math.random()).slice(0, 2); break;
        case SpiritualRootType.TRIPLE: elements = [...NORMAL_ELEMENTS].sort(() => 0.5 - Math.random()).slice(0, 3); break;
        case SpiritualRootType.QUAD: elements = [...NORMAL_ELEMENTS].sort(() => 0.5 - Math.random()).slice(0, 4); break;
        case SpiritualRootType.PENTAD: elements = NORMAL_ELEMENTS; break;
        case SpiritualRootType.MUTATED: elements = [MUTATED_ELEMENTS[Math.floor(Math.random() * MUTATED_ELEMENTS.length)]]; break;
    }
    return { type: selectedType, elements };
};

const generatePhysiqueName = (): string => {
    const totalWeight = PHYSIQUE_TIER_WEIGHTS.reduce((sum, current) => sum + current.weight, 0);
    let random = Math.random() * totalWeight;
    const selectedTier = PHYSIQUE_TIER_WEIGHTS.find(tier => { random -= tier.weight; return random < 0; })!.tier;
    const possiblePhysiqueKeys = Object.keys(PHYSIQUES).filter(key => PHYSIQUES[key as keyof typeof PHYSIQUES].tier === selectedTier);
    return possiblePhysiqueKeys[Math.floor(Math.random() * possiblePhysiqueKeys.length)];
};


function applyEffects(target: any, effects: Record<string, any>, multiplier: number) {
     for (const [key, value] of Object.entries(effects)) {
        if (typeof value !== 'number' || key.endsWith('Modifier')) continue; // Skip non-numbers and modifiers

        if (Object.values(Element).includes(key as Element)) {
            target.attributes[key as Element] = (target.attributes[key as Element] || 0) + value * multiplier;
            continue;
        }
        
        if (key === 'maxHealth' || key === 'maxMana' || key === 'speed') {
            target[key] += value * multiplier;
        } else if (key in target.combatStats) {
             if (key === 'elementalAttack' || key === 'elementalDefense') continue; // Safety guard
            if (typeof (target.combatStats as any)[key] === 'number') {
                (target.combatStats as any)[key] += value * multiplier;
            }
        } else if (['comprehension', 'khiVan', 'daoTam', 'charisma'].includes(key)) {
            if (typeof target[key] === 'number') {
                target[key] += value * multiplier;
            }
        }
    }
}

export const recalculateAllStats = (character: Character): Character => {
    const newChar = deepClone(character);
    
    // 1. Get base stats from cultivation state
    const stageInfo = cultivationStateFactory.getState(newChar.cultivationStage);
    const levelMultiplier = Math.pow(1.2, newChar.cultivationLevel - 1);
    const baseMultiplier = newChar.statModifiers?.baseMultiplier || 1.0;
    
    newChar.maxHealth = stageInfo.baseHealth * levelMultiplier * baseMultiplier;
    newChar.maxMana = stageInfo.baseMana * levelMultiplier * baseMultiplier;
    
    newChar.maxNguyenKhi = stageInfo.baseNguyenKhi * levelMultiplier * baseMultiplier;
    newChar.speed = stageInfo.baseSpeed * levelMultiplier * baseMultiplier;
    
    // Initialize combat stats object from stageInfo
    newChar.combatStats = { ...stageInfo.combatStatModifiers, critChance: 0, critDamage: 1.5 };
    
    // Initialize attributes with random distribution
    newChar.attributes = {};
    const elements = newChar.spiritualRoot.elements;
    if (elements.length > 0) {
        let totalPoints = 100;
        const points: number[] = [];
        for (let i = 0; i < elements.length - 1; i++) {
            const point = Math.floor(Math.random() * (totalPoints + 1));
            points.push(point);
            totalPoints -= point;
        }
        points.push(totalPoints);
        
        for (let i = points.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [points[i], points[j]] = [points[j], points[i] as number];
        }
        
        for (let i = 0; i < elements.length; i++) {
            newChar.attributes[elements[i]] = (newChar.attributes[elements[i]] || 0) + (points[i] as number);
        }
    }
    
    // Apply level and base multipliers to combat stats
    for (const stat of Object.keys(stageInfo.combatStatModifiers)) {
      const key = stat as keyof Omit<CombatStats, 'critChance' | 'critDamage'>;
      const baseStat = stageInfo.combatStatModifiers[key];
      if (typeof baseStat === 'number') {
        (newChar.combatStats as any)[key] = Math.floor(baseStat * levelMultiplier * baseMultiplier);
      }
    }
    
    newChar.combatStats.critChance = 0.05 + (character.khiVan / 2500);

    // 2. Apply Physique
    const physique = PHYSIQUES[newChar.physiqueName as keyof typeof PHYSIQUES];
    if (physique) {
        newChar.maxHealth *= physique.effects.healthModifier;
        newChar.maxMana *= physique.effects.manaModifier;
        newChar.maxAge = Math.floor(stageInfo.baseMaxAge * physique.effects.lifespanModifier);
        if(physique.effects.combatStatModifiers) {
             for (const [stat, modifier] of Object.entries(physique.effects.combatStatModifiers)) {
                if (typeof (newChar.combatStats as any)[stat] === 'number' && typeof modifier === 'number') {
                    (newChar.combatStats as any)[stat] *= modifier;
                }
            }
        }
    }

    // 3. Apply Techniques (Modifiers first, then flat bonuses)
    const allTechs = [
        { id: newChar.techniques.mainCultivation, multiplier: 1.0 },
        ...newChar.techniques.subCultivation.map(id => ({ id, multiplier: 0.6 })),
        ...newChar.techniques.secretArts.map(id => ({ id, multiplier: 1.0 })),
        ...newChar.techniques.spells.map(id => ({ id, multiplier: 1.0 })),
    ];

    for (const { id, multiplier } of allTechs) {
        if (!id) continue;
        const tech = ALL_TECHNIQUES[id] as TechniqueItem;
        if (!tech) continue;
    
        if (tech.effects.healthModifier) newChar.maxHealth *= (1 + (tech.effects.healthModifier - 1) * multiplier);
        if (tech.effects.manaModifier) newChar.maxMana *= (1 + (tech.effects.manaModifier - 1) * multiplier);
        if (tech.effects.magicalAttackModifier) newChar.combatStats.magicalAttack *= (1 + (tech.effects.magicalAttackModifier - 1) * multiplier);
        if (tech.effects.physicalAttackModifier) newChar.combatStats.physicalAttack *= (1 + (tech.effects.physicalAttackModifier - 1) * multiplier);
    
        applyEffects(newChar, tech.effects, multiplier);
    }


    // 4. Apply Equipment
    Object.values(newChar.equipment).forEach(itemOrArray => {
        const items: (AnyItem | null)[] = Array.isArray(itemOrArray) ? itemOrArray : [itemOrArray];
        items.forEach(item => {
            if (item && 'effects' in item && typeof item.effects === 'object' && item.effects !== null) {
                applyEffects(newChar, item.effects, 1.0);
            }
        });
    });

    // 5. Apply Permanent Stat Modifiers (from pills, etc.)
    if (newChar.statModifiers) {
        newChar.maxNguyenKhi += newChar.statModifiers.maxNguyenKhiModifier || 0;
        newChar.combatStats.physicalDefense += newChar.statModifiers.physicalDefenseModifier || 0;
        if (newChar.statModifiers.permanent_health_modifier) {
            newChar.maxHealth += newChar.statModifiers.permanent_health_modifier;
        }
        if (newChar.statModifiers.permanent_physical_attack_modifier) {
            newChar.combatStats.physicalAttack += newChar.statModifiers.permanent_physical_attack_modifier;
        }
    }


    // 6. Calculate Thần Thức
    const stageIndex = Object.values(CultivationStage).indexOf(newChar.cultivationStage);
    if (stageIndex >= 1) { // From Trúc Cơ
        const baseFromAttributes = (newChar.comprehension + newChar.daoTam) / 2;
        const stageMultiplier = 1 + (stageIndex * 0.75); // More linear scaling
        newChar.thanThuc = Math.floor(baseFromAttributes * stageMultiplier * 20);
    } else {
        delete newChar.thanThuc;
    }


    // Floor all stats to be integers
    newChar.maxHealth = Math.floor(newChar.maxHealth);
    newChar.maxMana = Math.floor(newChar.maxMana);
    newChar.maxNguyenKhi = Math.floor(newChar.maxNguyenKhi);
    newChar.speed = Math.floor(newChar.speed);
    
    const numericStatsToFloor: (keyof CombatStats)[] = ['physicalAttack', 'magicalAttack', 'physicalDefense', 'magicalDefense'];
    for(const stat of numericStatsToFloor) {
        const value = newChar.combatStats[stat];
        if (typeof value === 'number') {
            (newChar.combatStats[stat] as number) = Math.floor(value);
        }
    }
    
    // Clamp current health/mana
    newChar.health = Math.min(newChar.health, newChar.maxHealth);
    newChar.mana = Math.min(newChar.mana, newChar.maxMana);
    newChar.nguyenKhi = Math.min(newChar.nguyenKhi, newChar.maxNguyenKhi);

    // Derive elemental combat stats from final attributes
    newChar.combatStats.elementalAttack = {};
    newChar.combatStats.elementalDefense = {};
    for (const elem of Object.values(Element)) {
        const attrValue = newChar.attributes[elem] || 0;
        newChar.combatStats.elementalAttack[elem] = Math.floor(attrValue * 1.2);
        newChar.combatStats.elementalDefense[elem] = Math.floor(attrValue * 0.8);
    }
    
    // Calculate Combat Power
    const elementalPower = Object.values(newChar.combatStats.elementalAttack || {}).reduce((s: number, v) => s + (v || 0), 0) + Object.values(newChar.combatStats.elementalDefense || {}).reduce((s: number, v) => s + (v || 0), 0);

    newChar.combatPower = Math.floor(
        (newChar.maxHealth) + 
        (newChar.maxMana * 2) +
        (newChar.maxNguyenKhi * 3) + 
        ((newChar.combatStats.physicalAttack + newChar.combatStats.magicalAttack) * 5) +
        ((newChar.combatStats.physicalDefense + newChar.combatStats.magicalDefense) * 4) +
        (elementalPower * 3) +
        ((newChar.thanThuc || 0) * 10) // Thần thức contributes to combat power
    );

    // Apply injury penalty
    if (newChar.injuryTurnsRemaining && newChar.injuryTurnsRemaining > 0) {
        newChar.combatPower = Math.floor(newChar.combatPower * 0.5);
    }

    return newChar;
};


export const createCharacter = (params: { familyName: string, age: number, isPatriarch: boolean, cultivationStage: CultivationStage, cultivationLevel: number, generation?: number, gender?: Gender, parents?: { father: Character, mother: Character }, personality?: string, appearanceDescription?: string, skinColor?: string, learnedTechniques?: string[], professionTechniques?: string[], professions?: Profession[], clan?: Clan }): Character => {
    const gender = params.gender || (Math.random() > 0.5 ? Gender.MALE : Gender.FEMALE);
    const randomFirstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const familyName = params.familyName;
    let skinColor: string, spiritualRoot: SpiritualRoot, physiqueName: string, comprehension: number, charisma: number, appearanceDescription: string, khiVan: number, daoTam: number;
    const talents: Record<TalentType, number> = {} as any;
    
    let generation: number;

    if (params.parents) {
        const { father, mother } = params.parents;
        generation = Math.max(father.generation || 0, mother.generation || 0) + 1;
        skinColor = Math.random() < 0.5 ? father.avatar.skinColor : mother.avatar.skinColor;
        const roll = Math.random();
        spiritualRoot = roll < INHERITANCE_CHANCE ? father.spiritualRoot : (roll < (INHERITANCE_CHANCE * 2) ? mother.spiritualRoot : generateSpiritualRoot());
        physiqueName = roll < INHERITANCE_CHANCE ? father.physiqueName : (roll < (INHERITANCE_CHANCE * 2) ? mother.physiqueName : generatePhysiqueName());
        comprehension = Math.max(1, Math.min(100, Math.round((father.comprehension + mother.comprehension) / 2) + Math.floor(Math.random() * 21) - 10));
        charisma = Math.max(1, Math.min(100, Math.round((father.charisma + mother.charisma) / 2) + Math.floor(Math.random() * 21) - 10));
        khiVan = Math.max(1, Math.min(100, Math.round((father.khiVan + mother.khiVan) / 2) + Math.floor(Math.random() * 21) - 10));
        daoTam = Math.max(1, Math.min(100, Math.round((father.daoTam + mother.daoTam) / 2) + Math.floor(Math.random() * 21) - 10));
        for (const talentKey of Object.values(TalentType)) {
            const key = talentKey as TalentType;
            const fatherTalent = father.talents[key] || 30;
            const motherTalent = mother.talents[key] || 30;
            talents[key] = Math.max(1, Math.min(100, Math.round((fatherTalent + motherTalent) / 2) + Math.floor(Math.random() * 21) - 10));
        }
        appearanceDescription = "Dung mạo được thừa hưởng từ cha mẹ.";
    } else {
        generation = params.generation !== undefined ? params.generation : 1;
        skinColor = params.skinColor || SKIN_COLORS[Math.floor(Math.random() * SKIN_COLORS.length)];
        spiritualRoot = generateSpiritualRoot();
        physiqueName = generatePhysiqueName();
        comprehension = 10 + Math.floor(Math.random() * 71);
        charisma = 10 + Math.floor(Math.random() * 71);
        khiVan = 10 + Math.floor(Math.random() * 71);
        daoTam = 10 + Math.floor(Math.random() * 71);
        for (const talentKey of Object.values(TalentType)) {
             const key = talentKey as TalentType;
             talents[key] = 10 + Math.floor(Math.random() * 41);
        }
        appearanceDescription = params.appearanceDescription || "Dung mạo bình thường.";
    }
    
    const generationNames = params.clan ? params.clan.generationNames : GENERATION_NAMES;
    let finalName = `${familyName} ${randomFirstName}`;
    if (generation > 0 && generationNames && generationNames.length > 0) {
        const generationName = generationNames[(generation - 1) % generationNames.length];
        if (generationName) {
            finalName = `${familyName} ${generationName} ${randomFirstName}`;
        }
    }
    
    const masteredTechniques: Record<string, MasteryProgress> = {};
    const allTechniques = [...(params.learnedTechniques || []), ...(params.professionTechniques || [])];
    for (const techId of allTechniques) {
        masteredTechniques[techId] = { mastery: TechniqueMastery.NHAP_MON, exp: 0 };
    }

    const newMemberBase: Omit<Character, 'maxHealth' | 'maxMana' | 'speed' | 'combatStats' | 'health' | 'mana' | 'nguyenKhi' | 'maxNguyenKhi' | 'combatPower' | 'breakthroughSuccessChance'> = {
        id: crypto.randomUUID(), name: finalName, avatar: generateAvatar(gender, params.age, skinColor), status: CharacterStatus.ALIVE,
        gender, isPatriarch: params.isPatriarch, age: params.age, maxAge: 120, spiritualRoot, physiqueName, comprehension, khiVan, daoTam, talents,
        personality: params.personality || PERSONALITIES[Math.floor(Math.random() * PERSONALITIES.length)],
        attributes: {},
        generation: generation,
        appearanceDescription, charisma, cultivationStage: params.cultivationStage, cultivationLevel: params.cultivationLevel,
        cultivationProgress: 0, relationships: [], pregnancy: null,
        parents: params.parents ? { fatherId: params.parents.father.id, motherId: params.parents.mother.id } : undefined,
        masterId: undefined,
        discipleIds: [],
        techniques: { 
            mainCultivation: null,
            subCultivation: Array(4).fill(null),
            secretArts: Array(4).fill(null),
            spells: Array(4).fill(null),
        },
        learnedTechniques: params.learnedTechniques || [],
        professionTechniques: params.professionTechniques || [],
        masteredTechniques,
        techniqueTrainingState: null,
        equipment: {
            head: null, chest: null, feet: null, accessory1: null, accessory2: null,
            weapon: null, belt: [null, null, null] as [Pill | null, Pill | null, Pill | null],
        },
        professions: params.professions || [],
        inventory: {},
        loyalty: 80, contribution: 0,
        rank: RankType.DE_TU_NOI_TOC,
        activity: CharacterActivity.IDLE,
        bodyImpurity: 0,
        injuryTurnsRemaining: 0,
        assignedToSlotType: undefined,
        cultivationTowerState: null,
        tribulationState: null,
        combatExp: 0, combatExpToNext: 100,
        needs: [],
        breakthroughAttempts: {},
        statModifiers: { baseMultiplier: 1.0 },
        hasGivenUpCultivation: false,
        isPermanentlyBlocked: false,
        seclusionState: null,
        isCultivationBlocked: false,
        isFacingMinorBottleneck: false,
    };
    
    // Initial stat calculation
    const initialStats = recalculateAllStats(newMemberBase as Character);

    const newMember: Character = { 
        ...newMemberBase, 
        ...initialStats, 
        health: initialStats.maxHealth, 
        mana: initialStats.maxMana,
        nguyenKhi: 0,
        breakthroughSuccessChance: 0,
    };

    return recalculateAllStats(newMember); // Run again to set combat power based on new stats
};
