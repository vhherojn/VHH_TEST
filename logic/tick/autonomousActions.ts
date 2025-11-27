
import type { Clan, Character, EquippableItem, TechniqueItem, Event, Building, MeritShopItem, GameDate, Talisman } from '../../types/index.ts';
import { ItemType, CultivationStage, EquipmentQuality, ItemQuality, TechniqueMastery, RelationshipClass, CharacterStatus, Gender, ProfessionType, TalentType } from '../../types/index.ts';
import { ALL_ITEMS, ALL_TECHNIQUES, TASKS, MARRIAGE_AGE_MIN, PREGNANCY_CHANCE_PER_MONTH, MAX_PREGNANCY_AGE, PREGNANCY_DURATION_MONTHS, MARRIAGE_CHANCE_PER_MONTH, BUILDINGS, ALL_RECIPES, CULTIVATION_TOWER_CONFIGS } from '../../constants.ts';
import { recalculateAllStats } from '../character.ts';
import { deepClone } from '../utils/clone.ts';
import * as meritShopActions from '../actions/meritShopActions.ts';
import * as taskActions from '../actions/taskActions.ts';
import { NeedType } from '../../types/index.ts';

type AutonomousActionResult = {
    updatedClan: Clan;
    events: Omit<Event, 'id' | 'date'>[];
} | null;

const TALENT_MAP: Partial<Record<TalentType, ProfessionType>> = {
    [TalentType.ALCHEMY]: ProfessionType.ALCHEMIST,
    [TalentType.BLACKSMITHING]: ProfessionType.BLACKSMITH,
    [TalentType.TALISMAN_MAKING]: ProfessionType.TALISMAN_MASTER,
    [TalentType.SPIRIT_FARMING]: ProfessionType.SPIRIT_FARMER,
    [TalentType.FORMATION_MAKING]: ProfessionType.FORMATION_MASTER,
};

const qualityToNumber = (item: { quality: ItemQuality, equipmentQuality: EquipmentQuality }): number => {
    const tierOrder = Object.values(ItemQuality);
    const qualityOrder = Object.values(EquipmentQuality);
    const tierValue = tierOrder.indexOf(item.quality) * 10;
    const qualityValue = qualityOrder.indexOf(item.equipmentQuality);
    
    return tierValue + qualityValue;
}

function autoEquipBestGear(character: Character): { updatedCharacter: Character, event: Omit<Event, 'id' | 'date'> } | null {
    // This function is computationally moderate, so we run it with a chance.
    if (Math.random() > 0.2) return null;

    for (const itemId in character.inventory) {
        if ((character.inventory[itemId] || 0) < 1) continue;

        const newItem = ALL_ITEMS[itemId];
        const isGear = newItem && 'equipmentQuality' in newItem && ![ItemType.CULTIVATION_METHOD, ItemType.SECRET_ART, ItemType.SPELL].includes(newItem.type);
        if (!isGear) continue;


        let slot: keyof Omit<Character['equipment'], 'belt'> | null = null;
        let slotName = '';

        switch(newItem.type) {
            case ItemType.WEAPON: slot = 'weapon'; slotName = 'Vũ Khí'; break;
            case ItemType.HELMET: slot = 'head'; slotName = 'Đầu'; break;
            case ItemType.CHESTPLATE: slot = 'chest'; slotName = 'Thân'; break;
            case ItemType.BOOTS: slot = 'feet'; slotName = 'Chân'; break;
            case ItemType.TALISMAN: 
                const acc1 = character.equipment.accessory1;
                const acc2 = character.equipment.accessory2;
                if (!acc1) { slot = 'accessory1'; }
                else if (!acc2) { slot = 'accessory2'; }
                else if (qualityToNumber(newItem) > qualityToNumber(acc1)) { slot = 'accessory1'; }
                else if (qualityToNumber(newItem) > qualityToNumber(acc2)) { slot = 'accessory2'; }
                slotName = 'Phụ Kiện';
                break;
        }

        if (slot) {
            const currentItem = character.equipment[slot];
            if (!currentItem || qualityToNumber(newItem) > qualityToNumber(currentItem)) {
                if (currentItem) {
                    character.inventory[currentItem.id] = (character.inventory[currentItem.id] || 0) + 1;
                }
                character.equipment[slot] = newItem as any;
                character.inventory[newItem.id] -= 1;
                
                const updatedCharacter = recalculateAllStats(character);
                const event = {
                    description: `Trong lúc rảnh rỗi, ${character.name} đã sắp xếp lại túi đồ và thay [${slotName}] bằng ${newItem.name}, cảm thấy thực lực tăng lên.`,
                    characterIds: [character.id]
                };
                return { updatedCharacter, event };
            }
        }
    }
    return null;
}

function autoBuyFromMeritShop(character: Character, clan: Clan): AutonomousActionResult {
    // This is an important decision, so we don't throttle it heavily.
    if (Math.random() > 0.5) return null;

    // Priority 1: Cultivation Need (buy tokens)
    if (character.needs.some(n => n.type === NeedType.CULTIVATION)) {
        const stageTokenMap: Partial<Record<CultivationStage, string>> = {
            [CultivationStage.QI_REFINEMENT]: 'library_token_1',
            [CultivationStage.FOUNDATION_ESTABLISHMENT]: 'library_token_2',
            [CultivationStage.CORE_FORMATION]: 'library_token_3',
            [CultivationStage.NASCENT_SOUL]: 'library_token_4',
            [CultivationStage.SOUL_FORMATION]: 'library_token_5',
        };

        const neededTokenId = stageTokenMap[character.cultivationStage];
        if (neededTokenId) {
            const tokenInShop = clan.meritShop.find(item => item.itemId === neededTokenId && item.stock > 0);
            if (tokenInShop && character.contribution >= tokenInShop.cost) {
                const result = meritShopActions.buyFromMeritShop(clan, character.id, tokenInShop);
                if (result.updatedClan && result.newEvents) {
                    return { updatedClan: result.updatedClan, events: result.newEvents };
                }
            }
        }
    }

    // Priority 2: Equipment Need
    let bestAffordableUpgrade: { shopItem: MeritShopItem; upgradeValue: number } | null = null;
    if (character.needs.some(n => n.type === NeedType.EQUIPMENT)) {
        for (const shopItem of clan.meritShop) {
            if (character.contribution < shopItem.cost) continue;
            const newItem = ALL_ITEMS[shopItem.itemId];
            if (!newItem || !('equipmentQuality' in newItem)) continue;
            
            let targetSlot: keyof Omit<Character['equipment'], 'belt'> | null = null;
            if (newItem.type === ItemType.WEAPON) targetSlot = 'weapon';
            else if (newItem.type === ItemType.CHESTPLATE) targetSlot = 'chest';
            else if (newItem.type === ItemType.HELMET) targetSlot = 'head';
            else if (newItem.type === ItemType.BOOTS) targetSlot = 'feet';

            if (targetSlot) {
                const currentItem = character.equipment[targetSlot];
                const newItemValue = qualityToNumber(newItem);
                const currentItemValue = currentItem ? qualityToNumber(currentItem) : -1;
                if (newItemValue > currentItemValue) {
                    const upgradeValue = newItemValue - currentItemValue;
                    if (!bestAffordableUpgrade || upgradeValue > bestAffordableUpgrade.upgradeValue) {
                        bestAffordableUpgrade = { shopItem, upgradeValue };
                    }
                }
            }
        }
    }
    
    if (bestAffordableUpgrade) {
        const result = meritShopActions.buyFromMeritShop(clan, character.id, bestAffordableUpgrade.shopItem);
        if (result.updatedClan && result.newEvents) {
            return { updatedClan: result.updatedClan, events: result.newEvents };
        }
    }

    return null;
}


function autoLearnTechnique(character: Character): { updatedCharacter: Character, event: Omit<Event, 'id' | 'date'> } | null {
    if (Math.random() > 0.2) return null;

    for (const itemId in character.inventory) {
        if ((character.inventory[itemId] || 0) < 1) continue;

        const technique = ALL_ITEMS[itemId] as TechniqueItem;
        if (!technique || (technique.type !== ItemType.CULTIVATION_METHOD && technique.type !== ItemType.SECRET_ART && technique.type !== ItemType.SPELL)) {
            continue;
        }

        if (character.learnedTechniques.includes(itemId) || character.professionTechniques.includes(itemId) || Object.values(character.techniques).flat().includes(itemId)) {
            continue;
        }

        const { cultivationStage, elements, comprehension, daoTam } = technique.requirements;
        const currentStageIndex = Object.values(CultivationStage).indexOf(character.cultivationStage);
        const requiredStageIndex = cultivationStage ? Object.values(CultivationStage).indexOf(cultivationStage) : -1;
        
        if (requiredStageIndex !== -1 && currentStageIndex < requiredStageIndex) continue;
        if (comprehension && character.comprehension < comprehension) continue;
        if (daoTam && character.daoTam < daoTam) continue;
        if (elements && !elements.some(e => character.spiritualRoot.elements.includes(e))) continue;

        character.inventory[itemId] -= 1;
        if(character.inventory[itemId] <= 0) delete character.inventory[itemId];
        
        if (technique.effects?.professionUnlock) {
            character.professionTechniques.push(itemId);
        } else {
            character.learnedTechniques.push(itemId);
        }
        character.masteredTechniques[itemId] = { mastery: TechniqueMastery.NHAP_MON, exp: 0 };

        const event = {
            description: `${character.name} trong lúc rảnh rỗi đã lấy bí tịch "${technique.name}" ra tham ngộ và lĩnh ngộ thành công.`,
            characterIds: [character.id]
        };
        return { updatedCharacter: character, event };
    }
    return null;
}

// Replaces the old autoEquipTechnique and autoFillEmptyTechniqueSlots
function autoManageAndEquipTechniques(character: Character): { updatedCharacter: Character, event: Omit<Event, 'id' | 'date'> } | null {
    if (Math.random() > 0.3) return null; // Throttle the check

    const qualityToNum = (item: TechniqueItem): number => {
        const tierOrder = Object.values(ItemQuality);
        const qualityOrder = Object.values(EquipmentQuality);
        return tierOrder.indexOf(item.quality) * 10 + qualityOrder.indexOf(item.equipmentQuality);
    };

    const newCharacter = deepClone(character);

    // --- PRIORITY 1: MANAGE MAIN CULTIVATION ---
    const currentMainTechId = newCharacter.techniques.mainCultivation;
    const currentMainTech = currentMainTechId ? ALL_TECHNIQUES[currentMainTechId] as TechniqueItem : null;
    let bestLearnedMainTech: TechniqueItem | null = null;
    
    for (const techId of newCharacter.learnedTechniques) {
        const tech = ALL_TECHNIQUES[techId] as TechniqueItem;
        if (tech && tech.type === ItemType.CULTIVATION_METHOD) {
            if (!bestLearnedMainTech || qualityToNum(tech) > qualityToNum(bestLearnedMainTech)) {
                bestLearnedMainTech = tech;
            }
        }
    }

    if (bestLearnedMainTech && (!currentMainTech || qualityToNum(bestLearnedMainTech) > qualityToNum(currentMainTech))) {
        // Unequip current and equip new best
        if (currentMainTech) {
            newCharacter.learnedTechniques.push(currentMainTech.id);
        }
        newCharacter.learnedTechniques = newCharacter.learnedTechniques.filter(id => id !== bestLearnedMainTech!.id);
        newCharacter.techniques.mainCultivation = bestLearnedMainTech.id;
        
        return {
            updatedCharacter: newCharacter,
            event: {
                description: `Nhận thấy căn cơ chưa vững, ${newCharacter.name} đã quyết định thay đổi công pháp chủ tu thành "${bestLearnedMainTech.name}" để tối ưu hoá con đường tu luyện.`,
                characterIds: [newCharacter.id]
            }
        };
    }

    // --- PRIORITY 2: FILL OTHER EMPTY SLOTS ---
    const slotsToFill: { type: 'subCultivation' | 'secretArts' | 'spells', itemType: ItemType, label: string }[] = [
        { type: 'subCultivation', itemType: ItemType.CULTIVATION_METHOD, label: 'công pháp phụ tu' },
        { type: 'secretArts', itemType: ItemType.SECRET_ART, label: 'bí thuật' },
        { type: 'spells', itemType: ItemType.SPELL, label: 'pháp thuật' },
    ];

    for (const slot of slotsToFill) {
        const emptySlotIndex = newCharacter.techniques[slot.type].indexOf(null);
        if (emptySlotIndex !== -1) {
            const techToEquip = newCharacter.learnedTechniques
                .map(id => ALL_TECHNIQUES[id] as TechniqueItem)
                .filter(tech => tech && tech.type === slot.itemType)
                .sort((a, b) => qualityToNum(b) - qualityToNum(a))[0];
            
            if (techToEquip) {
                newCharacter.learnedTechniques = newCharacter.learnedTechniques.filter(id => id !== techToEquip.id);
                newCharacter.techniques[slot.type][emptySlotIndex] = techToEquip.id;
                return { 
                    updatedCharacter: newCharacter, 
                    event: { 
                        description: `Thấy vị trí trống, ${newCharacter.name} đã trang bị ${slot.label} "${techToEquip.name}".`, 
                        characterIds: [newCharacter.id] 
                    }
                };
            }
        }
    }

    return null; // No changes made
}


function autoUseLibraryToken(character: Character, clan: Clan): { updatedCharacter: Character, event: Omit<Event, 'id' | 'date'> } | null {
    if (!character.isCultivationBlocked) {
        return null;
    }

    const tokenTiers: { tokenId: string; tier: ItemQuality }[] = [
        { tokenId: 'library_token_5', tier: ItemQuality.NGU_GIAI },
        { tokenId: 'library_token_4', tier: ItemQuality.TU_GIAI },
        { tokenId: 'library_token_3', tier: ItemQuality.TAM_GIAI },
        { tokenId: 'library_token_2', tier: ItemQuality.NHI_GIAI },
        { tokenId: 'library_token_1', tier: ItemQuality.NHAT_GIAI },
    ];

    for (const { tokenId, tier } of tokenTiers) {
        if ((character.inventory[tokenId] || 0) < 1) continue;

        const libraryFloor = clan.library[tier];
        if (!libraryFloor) continue;

        const suitableTechniques = libraryFloor.filter((techId): techId is string => {
            if (!techId) return false;
            const technique = ALL_TECHNIQUES[techId] as TechniqueItem;
            if (!technique) return false;
            if (character.learnedTechniques.includes(techId) || character.professionTechniques.includes(techId) || Object.values(character.techniques).flat().includes(techId)) return false;
            const { cultivationStage, elements, comprehension, daoTam } = technique.requirements;
            const currentStageIndex = Object.values(CultivationStage).indexOf(character.cultivationStage);
            const requiredStageIndex = cultivationStage ? Object.values(CultivationStage).indexOf(cultivationStage) : -1;
            if (requiredStageIndex !== -1 && currentStageIndex < requiredStageIndex) return false;
            if (comprehension && character.comprehension < comprehension) return false;
            if (daoTam && character.daoTam < daoTam) return false;
            if (elements && !elements.some(e => character.spiritualRoot.elements.includes(e))) return false;
            return true;
        });

        if (suitableTechniques.length > 0) {
            const chosenTechId = suitableTechniques[Math.floor(Math.random() * suitableTechniques.length)];
            const chosenTechnique = ALL_TECHNIQUES[chosenTechId] as TechniqueItem;
            character.inventory[tokenId]! -= 1;
            if (character.inventory[tokenId] === 0) delete character.inventory[tokenId];
            if (chosenTechnique.effects?.professionUnlock) character.professionTechniques.push(chosenTechId);
            else character.learnedTechniques.push(chosenTechId);
            character.masteredTechniques[chosenTechId] = { mastery: TechniqueMastery.NHAP_MON, exp: 0 };
            const event = { description: `${character.name} đã sử dụng ${ALL_ITEMS[tokenId]?.name}, tiến vào Tàng Kinh Các và lĩnh ngộ được "${chosenTechnique.name}"!`, characterIds: [character.id] };
            return { updatedCharacter: character, event };
        }
    }
    return null;
}

function autoEnterCultivationTower(character: Character, clan: Clan): AutonomousActionResult | null {
    const tower = clan.buildings['tu_luyen_thap'];
    if (!tower || tower.level === 0 || character.cultivationTowerState) return null;

    if (Math.random() > 0.1) return null; // 10% chance per month to try

    const targetTier = (Object.entries(CULTIVATION_TOWER_CONFIGS).find(([, config]) => config.stage === character.cultivationStage)?.[0]) as ItemQuality | undefined;
    if (!targetTier) return null;
    
    const config = CULTIVATION_TOWER_CONFIGS[targetTier];
    
    // Check cost
    if (config.costType === 'contribution') {
        if ((character.contribution || 0) < config.cost) return null;
    } else {
        if ((character.inventory[config.costType] || 0) < config.cost) return null;
    }

    // Find available slot
    const availableSlot = tower.stations.find(s => s.tier === targetTier && s.workerId === null);
    if (!availableSlot) return null;

    const newClan = deepClone(clan);
    const charToUpdate = newClan.members.find(m => m.id === character.id)!;
    const towerToUpdate = newClan.buildings['tu_luyen_thap']!;
    const slotToUpdate = towerToUpdate.stations.find(s => s.id === availableSlot.id)!;
    
    let costText = '';
    // Deduct cost
    if (config.costType === 'contribution') {
        charToUpdate.contribution -= config.cost;
        costText = `${config.cost} điểm cống hiến`;
    } else {
        charToUpdate.inventory[config.costType] -= config.cost;
        if(charToUpdate.inventory[config.costType] <= 0) delete charToUpdate.inventory[config.costType];
        costText = `1 ${ALL_ITEMS[config.costType]?.name}`;
    }

    // Assign character
    charToUpdate.cultivationTowerState = { turnsRemaining: 1 };
    charToUpdate.assignedToBuildingId = tower.id;
    charToUpdate.assignedToSlotIndex = towerToUpdate.stations.findIndex(s => s.id === slotToUpdate.id);
    slotToUpdate.workerId = charToUpdate.id;
    
    const event = {
        description: `Cảm thấy tu vi đình trệ, ${character.name} đã dùng ${costText} để vào Tu Luyện Tháp tầng ${targetTier.split(' ')[0]} bế quan 1 tháng.`,
        characterIds: [character.id]
    };
    return { updatedClan: newClan, events: [event] };
}


function autoAcceptQuest(character: Character, clan: Clan, date: GameDate): AutonomousActionResult | null {
    if (Math.random() > 0.4) return null;

    if ((character.contribution || 0) >= 50) {
        return null;
    }
    if (clan.availableTasks.length === 0) {
        return null;
    }

    const suitableTasks = clan.availableTasks.filter(task => {
        if (task.requirements.minCultivationStage) {
            const currentStageIndex = Object.values(CultivationStage).indexOf(character.cultivationStage);
            const requiredStageIndex = Object.values(CultivationStage).indexOf(task.requirements.minCultivationStage);
            if (currentStageIndex < requiredStageIndex) {
                return false;
            }
        }
        if (task.requirements.requiredProfession) {
            const hasProfession = character.professions.some(p =>
                !p.apprenticeship &&
                p.type === task.requirements.requiredProfession!.type &&
                Object.values(ItemQuality).indexOf(p.tier) >= Object.values(ItemQuality).indexOf(task.requirements.requiredProfession!.tier)
            );
            if (!hasProfession) {
                return false;
            }
        }
        if (task.requirements.partySize) {
            return false;
        }
        return true;
    });

    if (suitableTasks.length === 0) {
        return null;
    }

    const chosenTask = suitableTasks[Math.floor(Math.random() * suitableTasks.length)];

    // Use the existing action to assign the task
    const result = taskActions.assignTask(clan, [character.id], chosenTask.id, date);

    if (result.error || !result.updatedClan || !result.newEvents) {
        return null;
    }

    return {
        updatedClan: result.updatedClan,
        events: result.newEvents,
    };
}

function seekMaster(character: Character, clan: Clan): AutonomousActionResult {
    if (character.masterId || character.age > 25 || character.cultivationStage !== CultivationStage.QI_REFINEMENT) return null;
    if (Math.random() > 0.05) return null; // 5% chance per month

    const potentialMasters = clan.members.filter(m => 
        m.status === CharacterStatus.ALIVE &&
        m.id !== character.id &&
        Object.values(CultivationStage).indexOf(m.cultivationStage) > Object.values(CultivationStage).indexOf(character.cultivationStage) + 1 && // At least 2 stages higher
        (m.discipleIds || []).length < 3 // Max 3 disciples
    );
    if (potentialMasters.length === 0) return null;

    const master = potentialMasters[Math.floor(Math.random() * potentialMasters.length)];
    const newClan = deepClone(clan);
    const charToUpdate = newClan.members.find(m => m.id === character.id)!;
    const masterToUpdate = newClan.members.find(m => m.id === master.id)!;
    
    charToUpdate.masterId = masterToUpdate.id;
    if (!masterToUpdate.discipleIds) masterToUpdate.discipleIds = [];
    masterToUpdate.discipleIds.push(charToUpdate.id);

    charToUpdate.relationships.push({ class: RelationshipClass.MASTER, characterId: masterToUpdate.id, affinity: 60, description: `Bái ${masterToUpdate.name} làm sư phụ.` });
    masterToUpdate.relationships.push({ class: RelationshipClass.DISCIPLE, characterId: charToUpdate.name, affinity: 60, description: `Nhận ${charToUpdate.name} làm đệ tử.` });

    const event = {
        description: `Thấy ${charToUpdate.name} tư chất không tồi, ${masterToUpdate.name} đã nhận y làm đệ tử chân truyền.`,
        characterIds: [charToUpdate.id, masterToUpdate.id]
    };
    return { updatedClan: newClan, events: [event] };
}

function seekApprenticeship(character: Character, clan: Clan): AutonomousActionResult {
    if (character.professions.length > 0 || character.assignedToBuildingId) return null;
    if (Math.random() > 0.1) return null;

    const TALENT_THRESHOLD = 60;
    let bestTalent: TalentType | null = null;
    let maxTalentValue = 0;

    Object.values(TalentType).forEach(talent => {
        if (talent !== TalentType.CULTIVATION && talent !== TalentType.COMPREHENSION) {
            const value = character.talents[talent] || 0;
            if (value > maxTalentValue) {
                maxTalentValue = value;
                bestTalent = talent;
            }
        }
    });

    if (!bestTalent || maxTalentValue < TALENT_THRESHOLD) return null;

    const profType = TALENT_MAP[bestTalent];
    if (!profType) return null;

    const buildingId = Object.keys(BUILDINGS).find(id => BUILDINGS[id].profession === profType);
    if (!buildingId) return null;

    const building = clan.buildings[buildingId];
    if (!building || building.level === 0) return null;

    let emptyApprenticeSlotIndex: number | null = null;
    let emptyStationIndex: number | null = null;
    
    for (let i = 0; i < building.stations.length; i++) {
        const station = building.stations[i];
        const emptyIndex = station.apprenticeIds.indexOf(null);
        if (emptyIndex !== -1) {
            emptyStationIndex = i;
            emptyApprenticeSlotIndex = emptyIndex;
            break;
        }
    }

    if (emptyApprenticeSlotIndex === null || emptyStationIndex === null) return null;

    const newClan = deepClone(clan);
    const charToUpdate = newClan.members.find(m => m.id === character.id)!;
    const buildingToUpdate = newClan.buildings[buildingId]!;
    const stationToUpdate = buildingToUpdate.stations[emptyStationIndex];

    stationToUpdate.apprenticeIds[emptyApprenticeSlotIndex] = charToUpdate.id;
    charToUpdate.assignedToBuildingId = buildingId;
    charToUpdate.assignedToSlotIndex = emptyStationIndex;
    charToUpdate.assignedToSlotType = 'apprentice';
    
    const event = {
        description: `Thấy mình có thiên phú về ${profType}, ${character.name} đã chủ động xin vào ${building.name} để học việc.`,
        characterIds: [character.id]
    };

    return { updatedClan: newClan, events: [event] };
}

function tryToFormMarriage(character: Character, clan: Clan): AutonomousActionResult {
    if (character.age < MARRIAGE_AGE_MIN || Math.random() > MARRIAGE_CHANCE_PER_MONTH) {
        return null;
    }
    const isMarried = character.relationships.some(r => r.class === RelationshipClass.SPOUSE);
    if (isMarried) return null;

    const potentialPartners = clan.members.filter(m => 
        m.status === CharacterStatus.ALIVE &&
        m.id !== character.id &&
        m.gender !== character.gender &&
        m.age >= MARRIAGE_AGE_MIN &&
        !m.relationships.some(r => r.class === RelationshipClass.SPOUSE) &&
        !character.relationships.some(r => r.characterId === m.id && r.class === RelationshipClass.FAMILY_CLOSE)
    );
    if (potentialPartners.length === 0) return null;

    const partner = potentialPartners[Math.floor(Math.random() * potentialPartners.length)];
    
    const newClan = deepClone(clan);
    const charToUpdate = newClan.members.find(m => m.id === character.id)!;
    const partnerToUpdate = newClan.members.find(m => m.id === partner.id)!;

    const marriageDesc = `Tình đầu ý hợp, tự nguyện kết thành đạo lữ.`;
    charToUpdate.relationships.push({ class: RelationshipClass.SPOUSE, characterId: partnerToUpdate.id, affinity: 70, description: marriageDesc });
    partnerToUpdate.relationships.push({ class: RelationshipClass.SPOUSE, characterId: charToUpdate.id, affinity: 70, description: marriageDesc });

    const event = {
        description: `Tình trong như đã, mặt ngoài còn e. ${charToUpdate.name} và ${partnerToUpdate.name} đã tự nguyện kết thành đạo lữ.`,
        characterIds: [charToUpdate.id, partnerToUpdate.id],
    };
    return { updatedClan: newClan, events: [event] };
}


function tryToConceive(character: Character, clan: Clan): AutonomousActionResult {
    if (character.gender !== Gender.FEMALE || character.pregnancy || character.age > MAX_PREGNANCY_AGE || character.age < MARRIAGE_AGE_MIN) {
        return null;
    }
    const spouseRel = character.relationships.find(r => r.class === RelationshipClass.SPOUSE);
    if (!spouseRel) return null;
    const spouse = clan.members.find(m => m.id === spouseRel.characterId);
    if (!spouse || spouse.status !== CharacterStatus.ALIVE) return null;
    
    if (Math.random() < PREGNANCY_CHANCE_PER_MONTH) {
        const newClan = deepClone(clan);
        const charToUpdate = newClan.members.find(m => m.id === character.id)!;
        charToUpdate.pregnancy = {
            partnerId: spouse.id,
            monthsRemaining: PREGNANCY_DURATION_MONTHS,
        };
        const event = {
            description: `Tin vui! ${character.name} đã mang trong mình giọt máu của gia tộc.`,
            characterIds: [character.id, spouse.id],
        };
        return { updatedClan: newClan, events: [event] };
    }
    return null;
}

function dualCultivation(character: Character, clan: Clan): AutonomousActionResult {
    const spouseRel = character.relationships.find(r => r.class === RelationshipClass.SPOUSE);
    if (!spouseRel) return null;
    if (Math.random() > 0.1) return null; // 10% chance

    const newClan = deepClone(clan);
    const charToUpdate = newClan.members.find(m => m.id === character.id)!;
    const spouse = newClan.members.find(m => m.id === spouseRel.characterId);
    
    if (!spouse || spouse.status !== CharacterStatus.ALIVE || spouse.seclusionState || spouse.activeTaskId || spouse.assignedToBuildingId) {
        return null;
    }

    const cultivationGain = 100 * (1 + Object.values(CultivationStage).indexOf(spouse.cultivationStage) * 0.1);
    charToUpdate.cultivationProgress += cultivationGain;
    spouse.cultivationProgress += cultivationGain;

    const charSpouseRel = charToUpdate.relationships.find(r => r.characterId === spouse.id);
    if(charSpouseRel) charSpouseRel.affinity = Math.min(100, charSpouseRel.affinity + 1);

    const spouseCharRel = spouse.relationships.find(r => r.characterId === charToUpdate.id);
    if (spouseCharRel) spouseCharRel.affinity = Math.min(100, spouseCharRel.affinity + 1);

    const event = {
        description: `Trời đêm tĩnh lặng, ${charToUpdate.name} và ${spouse.name} cùng nhau song tu, tu vi cả hai đều có chút tinh tiến.`,
        characterIds: [charToUpdate.id, spouse.id]
    };
    return { updatedClan: newClan, events: [event] };
}


export function performAutonomousActions(character: Character, clan: Clan, date: GameDate, isWorking: boolean): AutonomousActionResult {
    let currentClan = clan; // Work on the mutable clan object
    let member = character;
    const allEvents: Omit<Event, 'id' | 'date'>[] = [];
    
    const actionResult = (result: any) => {
        if (result) {
            if (result.event) allEvents.push(result.event);
            if (result.events) allEvents.push(...result.events);
            if (result.updatedClan) {
                currentClan = result.updatedClan;
                member = currentClan.members.find(m => m.id === character.id)!;
            } 
            if (result.updatedCharacter) {
                member = result.updatedCharacter;
            }
            return true;
        }
        return false;
    };

    if (isWorking) {
        // Reduced set of actions for working members, less frequent
        if (Math.random() < 0.2) { // 20% chance to do anything if working
            if (actionResult(autoUseLibraryToken(member, currentClan))) {}
            else if (actionResult(dualCultivation(member, currentClan))) {}
        }
    } else {
        // Actions for idle members
        if (actionResult(autoBuyFromMeritShop(member, currentClan))) {}
        else if (actionResult(autoUseLibraryToken(member, currentClan))) {}
        else if (actionResult(autoEquipBestGear(member))) {}
        else if (actionResult(autoLearnTechnique(member))) {}
        else if (actionResult(autoManageAndEquipTechniques(member))) {} // Changed from autoEquipTechnique
        else if (actionResult(tryToConceive(member, currentClan))) {}
        else if (actionResult(seekMaster(member, currentClan))) {}
        else if (actionResult(tryToFormMarriage(member, currentClan))) {}
        else if (actionResult(dualCultivation(member, currentClan))) {}
        else if (actionResult(autoEnterCultivationTower(member, currentClan))) {}
        else if (actionResult(seekApprenticeship(member, currentClan))) {}
        else if (actionResult(autoAcceptQuest(member, currentClan, date))) {}
    }

    if (allEvents.length > 0) {
        const memberIndex = currentClan.members.findIndex(m => m.id === member.id);
        if (memberIndex !== -1) {
            currentClan.members[memberIndex] = recalculateAllStats(member);
        }
        return { updatedClan: currentClan, events: allEvents };
    }
    
    return null;
}
