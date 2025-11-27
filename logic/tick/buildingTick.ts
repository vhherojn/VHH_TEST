
import type { Clan, GameDate, Event, Character, Profession } from '../../types/index.ts';
import { ProfessionType, RelationshipClass, TalentType, ItemQuality, EquipmentQuality } from '../../types/index.ts';
import { BUILDINGS, ALL_RECIPES, ALL_ITEMS, ALL_TECHNIQUES, CRAFTING_DURATIONS, PROFESSION_PROMOTION_DURATIONS, ALL_BEASTS } from '../../constants.ts';
import { getNextTierAndQuality } from '../utils/clone.ts';
import { calculateCraftingSuccessChance } from '../professions/crafting.ts';


type BuildingTickResult = {
    updatedClan: Clan;
    newEvents: Omit<Event, 'id' | 'date'>[];
};

const addProfessionExp = (character: Character, profType: ProfessionType, amount: number) => {
    const prof = character.professions.find(p => p.type === profType);
    if (prof && !prof.promotionState) { // Không tăng kinh nghiệm khi đang trong trạng thái lĩnh ngộ
        prof.exp += amount;
        
        const nextLevel = getNextTierAndQuality(prof.tier, prof.quality);
        const isTierPromotion = nextLevel && nextLevel.tier !== prof.tier;

        // Nếu đủ kinh nghiệm và không phải là thăng Giai -> bắt đầu trạng thái Lĩnh Ngộ
        if (prof.exp >= prof.expToNext && nextLevel && !isTierPromotion) {
            prof.exp = prof.expToNext; // Giới hạn kinh nghiệm ở mức tối đa
            const duration = PROFESSION_PROMOTION_DURATIONS[prof.tier]?.[prof.quality];
            if (duration && duration !== Infinity) {
                prof.promotionState = {
                    targetQuality: nextLevel.quality,
                    monthsRemaining: duration,
                };
            }
        }
    }
};


export const processBuildingsTick = (clan: Clan, newDate: GameDate): BuildingTickResult => {
    const newEvents: Omit<Event, 'id' | 'date'>[] = [];

    for (const building of Object.values(clan.buildings)) {
        if (building.level === 0) continue;
        const buildingDef = BUILDINGS[building.id];

        // Handle Hunting Parties for Tran Yeu Duong
        if (building.id === 'tran_yeu_duong' && building.huntingAssignments) {
            for (const assignment of building.huntingAssignments) {
                const partyMembers = assignment.memberIds.map(id => id ? clan.members.find(m => m.id === id) : null).filter(Boolean) as Character[];
                if (partyMembers.length === 0) continue;

                const tierIndex = Object.values(ItemQuality).indexOf(assignment.tier);
                const totalCombatPower = partyMembers.reduce((sum, m) => sum + m.combatPower, 0);
                
                // Base 5% chance, plus bonus from combat power. 100k CP = +10%
                const lootChance = 0.05 + (totalCombatPower / 1000000);
                
                if (Math.random() < lootChance) {
                    // --- NEW BEAST SYSTEM LOGIC ---
                    const availableBeasts = Object.values(ALL_BEASTS).filter(b => b.tier === assignment.tier);
                    
                    if (availableBeasts.length > 0) {
                        // Pick a random beast from the pool
                        const targetBeast = availableBeasts[Math.floor(Math.random() * availableBeasts.length)];
                        const itemsFound: Record<string, number> = {};
                        let totalLootCount = 0;

                        // Determine drops
                        for (const drop of targetBeast.drops) {
                            if (Math.random() < drop.chance) {
                                const quantity = drop.min + Math.floor(Math.random() * (drop.max - drop.min + 1));
                                if (quantity > 0) {
                                    itemsFound[drop.itemId] = (itemsFound[drop.itemId] || 0) + quantity;
                                    totalLootCount += quantity;
                                }
                            }
                        }

                        // Only create event if items were actually dropped
                        if (totalLootCount > 0) {
                            // --- UPDATE STATISTICS ---
                            if (clan.currentYearStats) {
                                clan.currentYearStats.itemsCreated += totalLootCount;
                            }

                            let lootString = '';
                            for (const [itemId, count] of Object.entries(itemsFound)) {
                                clan.itemInventory[itemId] = (clan.itemInventory[itemId] || 0) + count;
                                const itemName = ALL_ITEMS[itemId]?.name || itemId;
                                lootString += `${count} ${itemName}, `;
                            }
                            lootString = lootString.slice(0, -2);
                            
                            const leaderName = partyMembers[0].name;
                            newEvents.push({ 
                                description: `Tổ đội của ${leaderName} đã chạm trán và tiêu diệt ${targetBeast.name} (${targetBeast.stage}), thu được: ${lootString}.` 
                            });
                            
                            partyMembers.forEach(member => {
                                member.contribution += (5 * (tierIndex + 1));
                                member.combatExp = (member.combatExp || 0) + (15 * (tierIndex + 1));
                            });
                        }
                    } else {
                        // FALLBACK FOR TIERS WITHOUT SPECIFIC BEASTS YET (Using old generic logic)
                        const lootTable: {[key in ItemQuality]: {dan: string, cot: string, bi: string}} = {
                            [ItemQuality.NHAT_GIAI]: {dan: 'yeu_dan_nhat_giai', cot: 'yeu_cot_nhat_giai', bi: 'yeu_bi_nhat_giai'},
                            [ItemQuality.NHI_GIAI]: {dan: 'yeu_dan_nhi_giai', cot: 'yeu_cot_nhi_giai', bi: 'yeu_bi_nhi_giai'},
                            [ItemQuality.TAM_GIAI]: {dan: 'yeu_dan_tam_giai', cot: 'yeu_cot_tam_giai', bi: 'yeu_bi_tam_giai'},
                            [ItemQuality.TU_GIAI]: {dan: 'yeu_dan_tu_giai', cot: 'yeu_cot_tu_giai', bi: 'yeu_bi_tu_giai'},
                            [ItemQuality.NGU_GIAI]: {dan: 'yeu_dan_ngu_giai', cot: 'yeu_cot_ngu_giai', bi: 'yeu_bi_ngu_giai'},
                        };
                        
                        const tierLoot = lootTable[assignment.tier];
                        if (tierLoot) {
                            const itemsFound: Record<string, number> = {};
                            const lootAmount = Math.max(1, Math.floor(partyMembers.length / 2));
                            
                            itemsFound[tierLoot.dan] = (itemsFound[tierLoot.dan] || 0) + lootAmount;
                            itemsFound[tierLoot.cot] = (itemsFound[tierLoot.cot] || 0) + lootAmount;
                            itemsFound[tierLoot.bi] = (itemsFound[tierLoot.bi] || 0) + lootAmount;
    
                            // --- UPDATE STATISTICS ---
                            if (clan.currentYearStats) {
                                clan.currentYearStats.itemsCreated += (lootAmount * 3);
                            }

                            let lootString = '';
                            for (const [itemId, count] of Object.entries(itemsFound)) {
                                clan.itemInventory[itemId] = (clan.itemInventory[itemId] || 0) + count;
                                const itemName = ALL_ITEMS[itemId]?.name || itemId;
                                lootString += `${count} ${itemName}, `;
                            }
                            lootString = lootString.slice(0, -2);
                            
                            const leaderName = partyMembers[0].name;
                            newEvents.push({ description: `Tổ đội của ${leaderName} đã săn giết thành công yêu thú ${assignment.tier}, thu được ${lootString}.` });
                            
                            partyMembers.forEach(member => {
                                member.contribution += (5 * (tierIndex + 1));
                                member.combatExp = (member.combatExp || 0) + (10 * (tierIndex + 1));
                            });
                        }
                    }
                }
            }
        }


        if (!building.stations) continue;

        building.stations.forEach((station, stationIndex) => {
            const worker = station.workerId ? clan.members.find(m => m.id === station.workerId) : null;
            
            // Handle crafting progress
            if (station.isActive && station.activeRecipeId) {
                station.progress += 1;
                
                if (station.progress >= station.duration) {
                    const recipe = ALL_RECIPES[station.activeRecipeId];
                    if (!recipe) {
                        station.isActive = false;
                        return; 
                    }
                    
                    let itemsAddedString = '';
                    let totalContributionGain = 0;
                    
                    for (const output of recipe.outputs) {
                        if (Math.random() < output.chance) {
                            clan.itemInventory[output.itemId] = (clan.itemInventory[output.itemId] || 0) + output.amount;
                            const itemInfo = ALL_ITEMS[output.itemId];
                            itemsAddedString += `${output.amount} ${itemInfo.name}, `;
                             if (worker && buildingDef?.profession) {
                                totalContributionGain += (5 * Object.values(ItemQuality).indexOf(itemInfo.quality) + 5) * output.amount;
                            }
                             // --- UPDATE STATISTICS ---
                            if (clan.currentYearStats) {
                                clan.currentYearStats.itemsCreated += output.amount;
                            }
                        }
                    }

                    if (itemsAddedString) {
                        itemsAddedString = itemsAddedString.slice(0, -2);
                        newEvents.push({ description: `Lò #${stationIndex + 1} tại ${building.name} đã luyện chế xong, thu được: ${itemsAddedString}.` });
                    } else {
                        newEvents.push({ description: `Luyện chế ${recipe.name} tại lò #${stationIndex + 1} tuy thành công nhưng không thu được thành phẩm nào.` });
                    }

                    if (worker && buildingDef?.profession) {
                        worker.contribution += totalContributionGain;
                        addProfessionExp(worker, buildingDef.profession, 20); // Flat exp per batch
                    }

                    // Handle auto-crafting
                    if (station.autoCraftRecipeId) {
                        const autoRecipe = ALL_RECIPES[station.autoCraftRecipeId];
                        
                        if (worker && buildingDef?.profession) {
                            const canAfford = Object.entries(autoRecipe.cost).every(([id, cost]) => ((id === 'spirit_stone' ? clan.resources[id] : clan.itemInventory[id]) || 0) >= (cost as number));

                            if (canAfford) {
                                const successChance = calculateCraftingSuccessChance(worker, autoRecipe, buildingDef.profession, building);
                                const isSuccess = Math.random() < successChance;

                                Object.entries(autoRecipe.cost).forEach(([id, cost]) => {
                                    if (id === 'spirit_stone') clan.resources[id]! -= (cost as number);
                                    else clan.itemInventory[id] -= (cost as number);
                                });

                                if (isSuccess) {
                                    station.activeRecipeId = station.autoCraftRecipeId;
                                    station.progress = 0;
                                    station.duration = CRAFTING_DURATIONS[autoRecipe.requiredTier] || 2; 
                                    newEvents.push({ description: `Lò #${stationIndex + 1} tại ${building.name} tự động bắt đầu luyện chế ${autoRecipe.name}.` });
                                } else {
                                    station.isActive = false;
                                    station.progress = 0;
                                    station.activeRecipeId = null;
                                    station.duration = 0;
                                    newEvents.push({ description: `Luyện chế tự động ${autoRecipe.name} tại lò #${stationIndex + 1} thất bại! Tổn thất toàn bộ nguyên liệu.` });
                                }
                            } else {
                                station.isActive = false;
                                station.progress = 0;
                                station.activeRecipeId = null;
                                station.duration = 0;
                                newEvents.push({ description: `Không đủ nguyên liệu, lò #${stationIndex + 1} tại ${building.name} đã ngừng chế tạo tự động.` });
                            }
                        } else {
                            station.isActive = false;
                            station.progress = 0;
                            station.activeRecipeId = null;
                            station.duration = 0;
                            newEvents.push({ description: `Không có Thợ Chính, lò #${stationIndex + 1} tại ${building.name} đã ngừng chế tạo tự động.` });
                        }
                    } else if (building.id !== 'herb_garden') {
                        station.isActive = false;
                        station.progress = 0;
                        station.activeRecipeId = null;
                        station.duration = 0;
                    } else {
                        // For herb garden, just reset progress to continue growing
                        station.progress = 0;
                    }
                }
            }
            
            if (buildingDef?.profession) {
                 // Handle promotion progress for worker
                if (worker) {
                    const prof = worker.professions.find(p => p.type === buildingDef!.profession);
                    if (prof?.promotionState) {
                        prof.promotionState.monthsRemaining--;
                        if (prof.promotionState.monthsRemaining <= 0) {
                            const oldQuality = prof.quality;
                            prof.quality = prof.promotionState.targetQuality;
                            prof.exp = 0;
                            prof.expToNext = Math.floor(prof.expToNext * 1.5);
                            prof.promotionState = undefined;
                            newEvents.push({
                                description: `${worker.name} đã lĩnh ngộ thành công, ${prof.type} từ ${oldQuality} thăng lên ${prof.quality}!`,
                                characterIds: [worker.id]
                            });
                        }
                    }
                }

                // Handle apprenticeship progress
                for (const apprenticeId of station.apprenticeIds) {
                    if (!apprenticeId) continue;
                    const apprentice = clan.members.find(m => m.id === apprenticeId)!;
                    const prof = apprentice.professions.find(p => p.type === buildingDef.profession);

                    if (prof?.apprenticeship) {
                        prof.apprenticeship.monthsRemaining--;

                        if (prof.apprenticeship.monthsRemaining <= 0) {
                            prof.tier = prof.apprenticeship.targetTier;
                            prof.quality = EquipmentQuality.HA_PHAM;
                            prof.exp = 0;
                            prof.expToNext = 100 * Math.pow(5, Object.values(ItemQuality).indexOf(prof.tier));
                            prof.apprenticeship = undefined;

                            newEvents.push({
                                description: `Sau một thời gian học việc, ${apprentice.name} đã học nghệ thành công, chính thức trở thành ${prof.type} ${prof.tier}!`,
                                characterIds: [apprentice.id]
                            });
                        }
                    }
                }

                // Handle auto-promotion for apprentices
                if (!station.workerId) {
                    for (let i = 0; i < station.apprenticeIds.length; i++) {
                        const apprenticeId = station.apprenticeIds[i];
                        if (!apprenticeId) continue;

                        const apprentice = clan.members.find(m => m.id === apprenticeId)!;
                        const prof = apprentice.professions.find(p => p.type === buildingDef.profession);

                        if (prof && !prof.apprenticeship && prof.tier === station.tier) {
                            station.workerId = apprenticeId;
                            station.apprenticeIds[i] = null;
                            
                            apprentice.assignedToSlotType = 'worker';
                            
                            newEvents.push({ 
                                description: `Do vị trí Thợ Chính tại ${building.name} bị trống, ${apprentice.name} đã được tự động đề bạt lên thay thế.`,
                                characterIds: [apprentice.id]
                            });
                            break; // Only promote one person per tick
                        }
                    }
                }
            }
        });
    }

    return { updatedClan: clan, newEvents };
};
