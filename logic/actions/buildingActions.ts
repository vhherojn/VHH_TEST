import type { Clan, Event, Character, Profession, CraftingStation, TechniqueItem, HuntingAssignment, Building } from '../../types/index.ts';
import { ItemQuality, EquipmentQuality, ProfessionType, TalentType, RankType } from '../../types/index.ts';
import { BUILDING_UPGRADE_DATA, BUILDINGS, ALL_ITEMS, ALL_RECIPES, CRAFTING_DURATIONS, PROFESSION_APPRENTICESHIP_DURATIONS, ALL_TECHNIQUES } from '../../constants.ts';
import { getNextTierAndQuality } from '../utils/clone.ts';
import { deepClone } from '../utils/clone.ts';
import { calculateCraftingSuccessChance } from '../professions/crafting.ts';

type BuildingActionResult = { updatedClan?: Clan; newEvents?: Omit<Event, 'id' | 'date'>[]; error?: string; };

const PROFESSION_TO_TALENT_MAP: Partial<Record<ProfessionType, TalentType>> = {
    [ProfessionType.ALCHEMIST]: TalentType.ALCHEMY,
    [ProfessionType.BLACKSMITH]: TalentType.BLACKSMITHING,
    [ProfessionType.TALISMAN_MASTER]: TalentType.TALISMAN_MAKING,
    [ProfessionType.FORMATION_MASTER]: TalentType.FORMATION_MAKING,
    [ProfessionType.SPIRIT_FARMER]: TalentType.SPIRIT_FARMING,
};

const TIME_REDUCTION_BONUS_MAP: Partial<Record<ProfessionType, string>> = {
    [ProfessionType.ALCHEMIST]: 'alchemyTimeReduction',
    [ProfessionType.BLACKSMITH]: 'blacksmithingTimeReduction',
    [ProfessionType.TALISMAN_MASTER]: 'talismanTimeReduction',
    [ProfessionType.FORMATION_MASTER]: 'formationTimeReduction',
};


const unassignCharacterFromAnywhere = (character: Character, newClan: Clan) => {
    // Unassign from any building station
    for (const b of Object.values(newClan.buildings)) {
        if (b.managerId === character.id) b.managerId = null;
        for (const s of b.stations) {
            if (s.workerId === character.id) s.workerId = null;
            const appIndex = s.apprenticeIds.indexOf(character.id);
            if (appIndex !== -1) s.apprenticeIds[appIndex] = null;
        }
        // NEW: Unassign from Hunting Party
        if (b.id === 'tran_yeu_duong' && b.huntingAssignments) {
            for (const party of b.huntingAssignments) {
                const memberIndex = party.memberIds.indexOf(character.id);
                if (memberIndex > -1) {
                    party.memberIds[memberIndex] = null;
                }
            }
        }
    }
    // Unassign from Linh Mach
    const assignments = newClan.linhMach.miningAssignments;
    if (assignments.supervisorId === character.id) assignments.supervisorId = null;
    const minerIndex = assignments.minerIds.indexOf(character.id);
    if (minerIndex > -1) assignments.minerIds[minerIndex] = null;

    character.assignedToBuildingId = undefined;
    character.assignedToSlotIndex = undefined;
    character.assignedToSlotType = undefined;
};

const createStationsForTier = (tier: ItemQuality, count: number): CraftingStation[] => {
    const stations: CraftingStation[] = [];
    for (let i = 0; i < count; i++) {
        stations.push({
            id: `station_${tier}_${crypto.randomUUID()}`, // Use UUID to avoid collisions
            tier: tier,
            workerId: null,
            apprenticeIds: [null, null],
            activeRecipeId: null,
            progress: 0,
            duration: 0,
            isActive: false,
        });
    }
    return stations;
};


export function upgradeBuilding(clan: Clan, buildingId: string): BuildingActionResult {
    const building = clan.buildings[buildingId];
    if (!building) return { error: 'Công trình không tồn tại.' };

    if (building.level === 0) {
        const costData = BUILDING_UPGRADE_DATA[buildingId]?.[ItemQuality.NHAT_GIAI]?.['Hạ Phẩm'];
        if (!costData) return { error: `Không có dữ liệu xây dựng cho ${building.name}.` };
        
        const canAfford = Object.entries(costData).every(([resourceId, cost]) => ((resourceId === 'spirit_stone' ? clan.resources[resourceId] : clan.itemInventory[resourceId]) || 0) >= cost);
        if (!canAfford) return { error: `Không đủ tài nguyên để xây dựng ${building.name}.` };
        
        const newClan = deepClone(clan);
        Object.entries(costData).forEach(([resourceId, cost]) => {
             if (resourceId === 'spirit_stone') newClan.resources[resourceId]! -= cost;
             else newClan.itemInventory[resourceId]! -= cost;
        });
        
        const buildingToUpgrade = newClan.buildings[buildingId];
        buildingToUpgrade.level = 1;
        buildingToUpgrade.tier = ItemQuality.NHAT_GIAI;
        buildingToUpgrade.quality = EquipmentQuality.HA_PHAM;
        
        if (buildingId === 'tran_yeu_duong') {
             buildingToUpgrade.huntingAssignments = [{ tier: ItemQuality.NHAT_GIAI, memberIds: Array(5).fill(null) }];
             buildingToUpgrade.stations = []; // Ensure stations are empty
        } else if (BUILDINGS[buildingId]?.profession) {
            buildingToUpgrade.stations = createStationsForTier(ItemQuality.NHAT_GIAI, 2);
        }
        
        return {
            updatedClan: newClan,
            newEvents: [{ description: `Xây dựng thành công ${building.name}!` }]
        };
    }

    const next = getNextTierAndQuality(building.tier, building.quality);
    if (!next) return { error: `${building.name} đã đạt cấp tối đa.` };

    const upgradeInfo = BUILDING_UPGRADE_DATA[buildingId]?.[next.tier]?.[next.quality];
    if (!upgradeInfo) return { error: `Chưa có thông tin nâng cấp cho ${building.name}.` };
    
    const canAffordUpgrade = Object.entries(upgradeInfo).every(([resourceId, cost]) => ((resourceId === 'spirit_stone' ? clan.resources[resourceId] : clan.itemInventory[resourceId]) || 0) >= cost);
    if (!canAffordUpgrade) return { error: `Không đủ tài nguyên để nâng cấp ${building.name}.` };

    const newClan = deepClone(clan);
    Object.entries(upgradeInfo).forEach(([resourceId, cost]) => { 
        if (resourceId === 'spirit_stone') newClan.resources[resourceId]! -= cost; 
        else newClan.itemInventory[resourceId]! -= cost; 
    });
    
    const buildingToUpgrade = newClan.buildings[buildingId];
    const oldTier = buildingToUpgrade.tier;
    const oldQuality = buildingToUpgrade.quality;
    buildingToUpgrade.tier = next.tier;
    buildingToUpgrade.quality = next.quality;
    buildingToUpgrade.level += 1;

    const tierIncreased = oldTier !== next.tier;
    const qualityIncreased = oldQuality !== next.quality;

    if (tierIncreased && BUILDINGS[buildingId]?.profession) {
        buildingToUpgrade.stations.push(...createStationsForTier(next.tier, 2));
    }
    
    if (buildingId === 'library' && tierIncreased) {
        if (!newClan.library[buildingToUpgrade.tier]) {
            newClan.library[buildingToUpgrade.tier] = Array(100).fill(null);
        }
    }
    
    if (buildingId === 'tu_luyen_thap') {
        if (tierIncreased) {
             buildingToUpgrade.stations.push(...createStationsForTier(next.tier, 10));
        } else if (qualityIncreased) {
             buildingToUpgrade.stations.push(...createStationsForTier(oldTier, 5));
        }
    }

    if (buildingId === 'tran_yeu_duong' && buildingToUpgrade.huntingAssignments) {
        if (tierIncreased) {
             buildingToUpgrade.huntingAssignments.push({ tier: next.tier, memberIds: Array(5).fill(null) });
        } else if (qualityIncreased) {
            const assignmentToExpand = buildingToUpgrade.huntingAssignments.find(a => a.tier === oldTier);
            if(assignmentToExpand) {
                assignmentToExpand.memberIds.push(...Array(5).fill(null));
            }
        }
    }


    return {
        updatedClan: newClan,
        newEvents: [{ description: `${building.name} đã được nâng cấp lên ${next.tier} ${next.quality}!` }]
    };
}


export function assignToCraftingStation(clan: Clan, buildingId: string, stationIndex: number, slotType: 'worker' | 'apprentice', characterId: string | null, apprenticeSlotIndex?: 0 | 1): BuildingActionResult {
    const newClan = deepClone(clan);
    const building = newClan.buildings[buildingId];
    const buildingDef = BUILDINGS[buildingId];
    const station = building?.stations[stationIndex];
    if (!building || !station || !buildingDef) return { error: 'Công trình hoặc lò rèn không tồn tại.' };

    let oldCharId: string | null = null;
    if (slotType === 'worker') {
        oldCharId = station.workerId;
    } else if (slotType === 'apprentice' && apprenticeSlotIndex !== undefined) {
        oldCharId = station.apprenticeIds[apprenticeSlotIndex];
        // Prevent unassigning an active apprentice
        if (!characterId && oldCharId) {
             const oldChar = newClan.members.find(m => m.id === oldCharId)!;
             const prof = oldChar.professions.find(p => p.type === buildingDef.profession);
             if (prof?.apprenticeship) {
                 return { error: `Không thể gỡ bỏ ${oldChar.name} khi đang trong quá trình học việc.` };
             }
        }
    }
    
    if (characterId === oldCharId) return { updatedClan: clan };

    if (oldCharId) {
        const oldChar = newClan.members.find(m => m.id === oldCharId)!;
        unassignCharacterFromAnywhere(oldChar, newClan);
        // Clear apprenticeship state if unassigned
        const prof = oldChar.professions.find(p => p.type === buildingDef.profession);
        if (prof) prof.apprenticeship = undefined;
    }
    
    if (characterId) {
        const charToAssign = newClan.members.find(m => m.id === characterId)!;
        if (charToAssign.activeTaskId) return { error: `${charToAssign.name} đang bận làm nhiệm vụ.` };
        
        unassignCharacterFromAnywhere(charToAssign, newClan);

        charToAssign.assignedToBuildingId = buildingId;
        charToAssign.assignedToSlotIndex = stationIndex;
        charToAssign.assignedToSlotType = slotType;

        if (slotType === 'worker') {
            station.workerId = characterId;
        } else if (apprenticeSlotIndex !== undefined) {
            station.apprenticeIds[apprenticeSlotIndex] = characterId;

            // Setup apprenticeship state
            if (buildingDef.profession) {
                const profType = buildingDef.profession;
                let profession = charToAssign.professions.find(p => p.type === profType);

                let targetTier: ItemQuality;
                if (!profession) {
                    // Initiation
                    targetTier = ItemQuality.NHAT_GIAI;
                    profession = {
                        type: profType,
                        tier: ItemQuality.NHAT_GIAI,
                        quality: EquipmentQuality.HA_PHAM,
                        exp: 0,
                        expToNext: 100,
                        apprenticeship: undefined,
                    };
                     // Add the profession but mark it as "learning"
                     // The actual promotion will happen in buildingTick
                } else {
                    // Promotion
                    targetTier = station.tier;
                }

                const durationRange = PROFESSION_APPRENTICESHIP_DURATIONS[targetTier];
                const talentType = PROFESSION_TO_TALENT_MAP[profType];
                const talentValue = talentType ? charToAssign.talents[talentType] || 0 : 0;
                
                let baseDuration = durationRange.min + Math.floor(Math.random() * (durationRange.max - durationRange.min + 1));
                const talentReduction = 1 - (talentValue / 200); // 100 talent = 50% reduction
                const finalDuration = Math.max(1, Math.round(baseDuration * talentReduction));
                
                profession.apprenticeship = {
                    targetTier: targetTier,
                    monthsRemaining: finalDuration,
                };
                
                // If it was a new profession, add it to the character
                if (!charToAssign.professions.some(p => p.type === profType)) {
                     charToAssign.professions.push(profession);
                }
            }
        }
    } else {
        if (slotType === 'worker') {
            station.workerId = null;
        } else if (apprenticeSlotIndex !== undefined) {
            station.apprenticeIds[apprenticeSlotIndex] = null;
        }
    }
    
    const charName = characterId ? clan.members.find(m => m.id === characterId)?.name : 'Không có ai';
    const positionMap = { worker: `Thợ Chính`, apprentice: `Học Việc` };
    const stationName = building.name;
    const eventDesc = `${charName} đã được phân công vào vị trí ${positionMap[slotType]} tại ${stationName} (#${stationIndex + 1}).`;

    return { updatedClan: newClan, newEvents: [{ description: eventDesc }] };
}


export function assignToHuntingParty(clan: Clan, characterId: string | null, tier: ItemQuality, slotIndex: number): BuildingActionResult {
    const newClan = deepClone(clan);
    const building = newClan.buildings['tran_yeu_duong'];
    if (!building || !building.huntingAssignments) return { error: "Trấn Yêu Đường chưa được xây dựng." };

    const assignment = building.huntingAssignments.find(a => a.tier === tier);
    if (!assignment || slotIndex >= assignment.memberIds.length) return { error: "Vị trí không hợp lệ." };

    const oldCharId = assignment.memberIds[slotIndex];
    if (oldCharId === characterId) return { updatedClan: clan }; // No change

    // Unassign old character if there was one
    if (oldCharId) {
        const oldChar = newClan.members.find(m => m.id === oldCharId)!;
        unassignCharacterFromAnywhere(oldChar, newClan);
    }
    
    // Assign new character
    if (characterId) {
        const charToAssign = newClan.members.find(m => m.id === characterId)!;
        if (charToAssign.activeTaskId) return { error: `${charToAssign.name} đang bận làm nhiệm vụ.` };

        unassignCharacterFromAnywhere(charToAssign, newClan);
        
        assignment.memberIds[slotIndex] = characterId;
        charToAssign.assignedToBuildingId = building.id;
        charToAssign.assignedToSlotIndex = slotIndex;
        charToAssign.assignedToSlotType = 'worker'; // Generic type for hunting
    } else {
        assignment.memberIds[slotIndex] = null;
    }

    const charName = characterId ? clan.members.find(m => m.id === characterId)?.name : 'Không có ai';
    const eventDesc = `${charName} đã được phân công vào đội săn yêu thú ${tier} tại vị trí ${slotIndex + 1}.`;

    return { updatedClan: newClan, newEvents: [{ description: eventDesc }] };
}


export function startCrafting(clan: Clan, buildingId: string, stationIndex: number, recipeId: string): BuildingActionResult {
    const newClan = deepClone(clan);
    const building = newClan.buildings[buildingId];
    const station = building?.stations[stationIndex];
    const recipe = ALL_RECIPES[recipeId];
    
    if (!station || !recipe) return { error: "Không tìm thấy lò hoặc công thức." };
    if (station.isActive) return { error: "Lò này đang bận." };
    
    const worker = station.workerId ? newClan.members.find(m => m.id === station.workerId) : null;
    if (!worker) return { error: "Cần có Thợ Chính để bắt đầu." };

    if (recipe.requiredBlueprint && !(newClan.knownRecipes || []).includes(recipe.id)) {
        const requiredItem = ALL_ITEMS[recipe.requiredBlueprint];
        return { error: `Cần học "${requiredItem?.name || 'Bản vẽ/Đan phương'}" trước.` };
    }

    const buildingDef = BUILDINGS[building.id];
    if (!buildingDef || !buildingDef.profession) return { error: "Lỗi công trình." };
    
    const professionType = buildingDef.profession;
    const successChance = calculateCraftingSuccessChance(worker, recipe, professionType, building);
    const isSuccess = Math.random() < successChance;

    const canAfford = Object.entries(recipe.cost).every(([resourceId, cost]) => ((resourceId === 'spirit_stone' ? newClan.resources[resourceId] : newClan.itemInventory[resourceId]) || 0) >= (cost as number));
    if (!canAfford) return { error: "Không đủ tài nguyên." };
    
    // Deduct resources
    Object.entries(recipe.cost).forEach(([id, cost]) => {
        if(id === 'spirit_stone') newClan.resources[id]! -= (cost as number);
        else newClan.itemInventory[id] -= (cost as number);
    });

    if (!isSuccess) {
         return { updatedClan: newClan, newEvents: [{ description: `Luyện chế ${recipe.name} thất bại! Tổn thất toàn bộ nguyên liệu. (Tỷ lệ: ${(successChance*100).toFixed(0)}%)`, characterIds: [worker.id] }] };
    }

    // Activate station
    station.isActive = true;
    station.activeRecipeId = recipeId;
    const primaryOutput = recipe.outputs[0]; // Assume the first output determines quality for duration
    if (!primaryOutput) return { error: "Công thức không có thành phẩm." };
    const craftedItem = ALL_ITEMS[primaryOutput.itemId];
    
    let duration = CRAFTING_DURATIONS[craftedItem.quality as ItemQuality] || 2;
    
    // Apply time reduction from techniques
    const timeReductionKey = TIME_REDUCTION_BONUS_MAP[professionType];
    let totalTimeReduction = 0;
    if (timeReductionKey) {
        const allTechs = [...Object.values(worker.techniques).flat().filter(Boolean), ...worker.learnedTechniques, ...worker.professionTechniques];
        const uniqueTechIds = [...new Set(allTechs)];
        for (const techId of uniqueTechIds) {
            const tech = ALL_TECHNIQUES[techId] as TechniqueItem;
            if (tech && tech.effects && typeof (tech.effects as any)[timeReductionKey] === 'number') {
                totalTimeReduction += (tech.effects as any)[timeReductionKey];
            }
        }
    }
    duration *= (1 - totalTimeReduction);

    // Apply manager reduction
    if (building.managerId) {
        duration *= 0.9; // 10% reduction
    }
    
    station.duration = Math.max(1, Math.round(duration));
    station.progress = 0;

    const eventDesc = `${worker.name} tại ${building.name} bắt đầu luyện chế ${recipe.name}. Dự kiến hoàn thành sau ${station.duration} tháng. (Tỷ lệ: ${(successChance*100).toFixed(0)}%)`;

    return { updatedClan: newClan, newEvents: [{ description: eventDesc, characterIds: [worker.id] }] };
}

export function setGardenPlanting(clan: Clan, buildingId: string, recipeId: string | null): BuildingActionResult {
    const newClan = deepClone(clan);
    const building = newClan.buildings[buildingId];
    if (!building || building.id !== 'herb_garden') return { error: 'Công trình không hợp lệ.' };
    
    const recipe = recipeId ? ALL_RECIPES[recipeId] : null;
    const plantedSeedName = recipe && recipe.outputs.length > 0 ? ALL_ITEMS[recipe.outputs[0].itemId]?.name : 'Không có gì';

    for (const station of building.stations) {
        // Only plant in empty, inactive plots
        if (!station.isActive) {
            station.activeRecipeId = recipeId;
            if (recipeId && recipe && recipe.outputs.length > 0) {
                const craftedItem = ALL_ITEMS[recipe.outputs[0].itemId];
                station.duration = CRAFTING_DURATIONS[craftedItem.quality as ItemQuality] || 2;
                station.progress = 0;
                station.isActive = true; // Start "growing"
            } else {
                // Clearing the planting
                station.activeRecipeId = null;
                station.duration = 0;
                station.progress = 0;
                station.isActive = false;
            }
        }
    }

    return {
        updatedClan: newClan,
        newEvents: [{ description: `Dược Điền đã được gieo trồng hạt giống: ${plantedSeedName}.` }]
    };
}


export function assignManagerToBuilding(clan: Clan, buildingId: string, characterId: string | null): BuildingActionResult {
    const newClan = deepClone(clan);
    const building = newClan.buildings[buildingId];
    if (!building) return { error: 'Công trình không tồn tại.' };

    // Unassign old manager
    if (building.managerId) {
        const oldManager = newClan.members.find(m => m.id === building.managerId);
        if (oldManager) {
            unassignCharacterFromAnywhere(oldManager, newClan);
        }
    }

    // Assign new manager
    if (characterId) {
        const charToAssign = newClan.members.find(m => m.id === characterId);
        if (!charToAssign) return { error: 'Tộc nhân không tồn tại.' };
        if (charToAssign.rank !== RankType.TRUONG_LAO_SU_VU) return { error: 'Chỉ Trưởng Lão Sự Vụ mới có thể quản lý công trình.' };
        if (charToAssign.activeTaskId) return { error: `${charToAssign.name} đang bận làm nhiệm vụ.` };
        
        // Unassign from any other role they might have
        unassignCharacterFromAnywhere(charToAssign, newClan);

        building.managerId = characterId;
        charToAssign.assignedToBuildingId = buildingId;
        charToAssign.assignedToSlotType = 'manager';
        
        return { updatedClan: newClan, newEvents: [{ description: `${charToAssign.name} đã được bổ nhiệm làm quản lý tại ${building.name}.`, characterIds: [characterId] }] };

    } else { // Unassigning
        building.managerId = null;
        return { updatedClan: newClan, newEvents: [{ description: `Đã gỡ bỏ quản lý tại ${building.name}.` }] };
    }
}

export function setStationAutoCraft(clan: Clan, buildingId: string, stationIndex: number, recipeId: string | null): BuildingActionResult {
    const newClan = deepClone(clan);
    const building = newClan.buildings[buildingId];
    const station = building?.stations[stationIndex];
    if (!station) return { error: 'Lò không tồn tại.' };

    station.autoCraftRecipeId = recipeId || undefined;
    
    const recipeName = recipeId ? ALL_RECIPES[recipeId]?.name : 'Không';
    const eventDesc = `Lò #${stationIndex + 1} tại ${building.name} đã được đặt chế tạo tự động: ${recipeName}.`;

    return { updatedClan: newClan, newEvents: [{ description: eventDesc }] };
}