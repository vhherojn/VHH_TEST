
import type { Clan, GameDate, Event, Character, EquippableItem, TechniqueItem, PromotionRule, Formation } from '../../types/index.ts';
import { CultivationStage, CharacterStatus, ItemType, TechniqueMastery, CharacterActivity, RelationshipClass, ItemQuality, TalentType } from '../../types/index.ts';
import {
    LINH_MACH_DATA, PHYSIQUES,
    TASKS, ALL_ITEMS, TECHNIQUE_MASTERY_DATA, ALL_TECHNIQUES, CULTIVATION_STAGES, MASTERY_EXP_REQUIREMENTS, MINOR_BOTTLENECK_DATA,
    LINH_MACH_SUPPORT_CAPACITY
} from '../../constants.ts';
import { recalculateAllStats, createCharacter } from '../character.ts';
import { processCharacterNeeds } from '../characterNeeds.ts';
import { cultivationStateFactory } from '../cultivation/stateFactory.ts';
import { performAutonomousActions } from './autonomousActions.ts';


type CharacterTickResult = {
    updatedClan: Clan;
    newEvents: Omit<Event, 'id' | 'date'>[];
};

const checkAndApplyPromotions = (character: Character, clan: Clan): Omit<Event, 'id' | 'date'> | null => {
    const applicableRule = clan.promotionRules.find(rule => 
        rule.fromRank === character.rank &&
        (!rule.conditions.stage || Object.values(CultivationStage).indexOf(character.cultivationStage) >= Object.values(CultivationStage).indexOf(rule.conditions.stage)) &&
        (!rule.conditions.contribution || character.contribution >= rule.conditions.contribution)
    );

    if (applicableRule) {
        const oldRank = character.rank;
        character.rank = applicableRule.toRank;
        return {
            description: `Do đạt đủ điều kiện, ${character.name} đã được tự động tấn thăng từ ${oldRank} lên ${applicableRule.toRank}!`,
            characterIds: [character.id]
        };
    }

    return null;
}


export const processCharactersTick = (clan: Clan, newDate: GameDate): CharacterTickResult => {
    const newEvents: Omit<Event, 'id' | 'date'>[] = [];
    let membersToAdd: Character[] = [];

    const linhMachInfo = LINH_MACH_DATA[clan.linhMach.tier]?.[clan.linhMach.quality];
    const linhMachModifier = linhMachInfo?.cultivationModifier || 1.0;
    
    let formationModifier = 1.0;
    if (clan.activeFormationId) {
        const formation = ALL_ITEMS[clan.activeFormationId] as Formation;
        if (formation && formation.effects.clanCultivationSpeedModifier) {
            formationModifier = formation.effects.clanCultivationSpeedModifier;
        }
    }

    const activeMembers = clan.members.filter(m => m.status === CharacterStatus.ALIVE);

    // --- OPTIMIZATION: Social interactions (marriage, etc.) are expensive. ---
    const socialCheckCount = Math.max(1, Math.floor(activeMembers.length / 10)); 
    for (let i = 0; i < socialCheckCount; i++) {
        const randomIndex = Math.floor(Math.random() * activeMembers.length);
        const member = activeMembers[randomIndex];
        if (member) {
            const autonomousResult = performAutonomousActions(member, clan, newDate, false);
            if (autonomousResult) {
                clan = autonomousResult.updatedClan;
                newEvents.push(...autonomousResult.events);
            }
        }
    }

    // --- NEW: Linh Mach Support Logic ---
    const supportedCultivators = new Set<string>();
    const capacity = LINH_MACH_SUPPORT_CAPACITY[clan.linhMach.tier][clan.linhMach.quality];
    const cultivationStagesWithLimits = [CultivationStage.SOUL_FORMATION, CultivationStage.NASCENT_SOUL, CultivationStage.CORE_FORMATION, CultivationStage.FOUNDATION_ESTABLISHMENT];

    for (const stage of cultivationStagesWithLimits) {
        const stageCapacity = capacity[stage];
        if (stageCapacity !== undefined) {
            const cultivatorsInStage = activeMembers
                .filter(m => m.cultivationStage === stage)
                .sort((a, b) => b.cultivationLevel - a.cultivationLevel || b.comprehension - a.comprehension); // Priority

            const supported = cultivatorsInStage.slice(0, stageCapacity);
            supported.forEach(c => supportedCultivators.add(c.id));

            if (cultivatorsInStage.length > stageCapacity) {
                const unsupported = cultivatorsInStage.slice(stageCapacity);
                unsupported.forEach(c => {
                    // Tộc trưởng không bị ảnh hưởng bởi giới hạn linh mạch
                    if (!c.isPatriarch) {
                        newEvents.push({
                            description: `Linh mạch gia tộc không đủ để cung cấp cho quá nhiều cao thủ, tu vi của ${c.name} bị đình trệ.`,
                            characterIds: [c.id]
                        });
                    }
                });
            }
        }
    }


    for (let i = 0; i < clan.members.length; i++) {
        let member = clan.members[i];
        
        if (member.status !== CharacterStatus.ALIVE) continue;

        // Check for death due to old age
        if (member.age >= member.maxAge) {
            member.status = CharacterStatus.DECEASED;
            // --- UPDATE STATISTICS ---
            if (clan.currentYearStats) {
                clan.currentYearStats.deaths += 1;
            }
            
            newEvents.push({
                description: `Thọ nguyên đã cạn, ${member.name} đã tọa hóa tại gia tộc, hưởng thọ ${member.age} tuổi.`,
                characterIds: [member.id]
            });
            continue; 
        }

        const isLastChanceCandidate = member.hasGivenUpCultivation && !member.isPermanentlyBlocked && (member.maxAge - member.age <= 10) && !clan.characterIdFacingLastChance && !member.seclusionState;
        if (isLastChanceCandidate) {
            clan.characterIdFacingLastChance = member.id;
            continue; 
        }
        
        if (member.isFacingMinorBottleneck) {
            member.isFacingMinorBottleneck = false; 
            
            const currentState = cultivationStateFactory.getState(member.cultivationStage);
            const bottleneckData = MINOR_BOTTLENECK_DATA[member.cultivationStage]!;
            const requiredExp = currentState.getExpForLevel(member.cultivationLevel);

            const successChance = bottleneckData.chance;
            if (Math.random() < successChance) {
                member.cultivationProgress -= requiredExp;
                member.cultivationLevel += 1;
                Object.assign(member, recalculateAllStats(member));
                member.health = member.maxHealth;
                member.mana = member.maxMana;
                newEvents.push({
                    description: `Vượt qua tiểu bình cảnh thành công, ${member.name} đột phá lên ${member.cultivationStage} tầng ${member.cultivationLevel}! Linh lực và khí huyết đã hoàn toàn hồi phục.`,
                    characterIds: [member.id]
                });
            } else {
                member.injuryTurnsRemaining = (member.injuryTurnsRemaining || 0) + bottleneckData.injury;
                member.cultivationProgress = requiredExp - 1; 
                newEvents.push({
                    description: `Đột phá tiểu bình cảnh thất bại! ${member.name} bị phản phệ, trọng thương ${bottleneckData.injury} tháng.`,
                    characterIds: [member.id]
                });
                Object.assign(member, recalculateAllStats(member));
            }
        }
        
        if (member.injuryTurnsRemaining && member.injuryTurnsRemaining > 0) {
            member.injuryTurnsRemaining -= 1;
            if (member.injuryTurnsRemaining <= 0) {
                newEvents.push({ description: `${member.name} đã hoàn toàn bình phục sau thời gian dài dưỡng thương.`, characterIds: [member.id] });
                Object.assign(member, recalculateAllStats(member)); 
            }
        }

        if (member.pregnancy) {
            member.pregnancy.monthsRemaining -= 1;
            if (member.pregnancy.monthsRemaining <= 0) {
                const mother = member;
                const father = clan.members.find(m => m.id === mother.pregnancy!.partnerId);
                
                if (father && father.status === CharacterStatus.ALIVE) {
                    const newChild = createCharacter({
                        familyName: father.name.split(' ')[0],
                        age: 0,
                        isPatriarch: false,
                        cultivationStage: CultivationStage.QI_REFINEMENT,
                        cultivationLevel: 1,
                        parents: { father, mother },
                        clan: clan,
                    });
                    
                    newChild.relationships.push({ class: RelationshipClass.FAMILY_CLOSE, characterId: mother.id, affinity: 100, description: "Mẫu thân" });
                    newChild.relationships.push({ class: RelationshipClass.FAMILY_CLOSE, characterId: father.id, affinity: 100, description: "Phụ thân" });

                    mother.relationships.push({ class: RelationshipClass.FAMILY_CLOSE, characterId: newChild.id, affinity: 100, description: "Hậu duệ" });
                    father.relationships.push({ class: RelationshipClass.FAMILY_CLOSE, characterId: newChild.id, affinity: 100, description: "Hậu duệ" });
                    
                    membersToAdd.push(newChild);

                    // --- UPDATE STATISTICS ---
                    if (clan.currentYearStats) {
                        clan.currentYearStats.births += 1;
                    }
                    
                    newEvents.push({
                        description: `${mother.name} đã hạ sinh một hài nhi kháu khỉnh, đặt tên là ${newChild.name}. Chúc phúc cho gia tộc lại có thêm nhân tài!`,
                        characterIds: [mother.id, father.id, newChild.id]
                    });
                }
                mother.pregnancy = null;
            }
        }
        
        if (member.seclusionState?.type === 'breakthrough') {
            member.seclusionState.monthsRemaining -= 1;
            if (member.seclusionState.monthsRemaining <= 0) {
                const currentState = cultivationStateFactory.getState(member.cultivationStage);
                const breakthroughResult = currentState.resolveBreakthrough(member, clan);
                clan = breakthroughResult.clan;
                newEvents.push(...breakthroughResult.newEvents);
                
                // Update reference to the member in the updated clan
                member = clan.members[i];

                // Important: If death occurred during breakthrough, record it.
                if (member.status === CharacterStatus.DECEASED && clan.currentYearStats) {
                    clan.currentYearStats.deaths += 1;
                }
            }
            continue; 
        }

        if (member.activeTaskId) {
            member.taskProgress = (member.taskProgress || 0) + 1;
            const task = TASKS.find(t => t.id === member.activeTaskId);
            if (task && member.taskProgress >= task.duration) {
                if(task.rewards.spirit_stone) {
                    clan.resources.spirit_stone = (clan.resources.spirit_stone || 0) + task.rewards.spirit_stone;
                    if (clan.currentYearStats) clan.currentYearStats.spiritStonesEarned += task.rewards.spirit_stone;
                }
                if(task.rewards.contribution) member.contribution += task.rewards.contribution;
                if(task.rewards.items) {
                    let totalItems = 0;
                    for(const [itemId, count] of Object.entries(task.rewards.items)) {
                        clan.itemInventory[itemId] = (clan.itemInventory[itemId] || 0) + count;
                        totalItems += count;
                    }
                    if (clan.currentYearStats) clan.currentYearStats.itemsCreated += totalItems;
                }
                newEvents.push({ description: `${member.name} đã hoàn thành nhiệm vụ "${task.name}", nhận được ${task.rewards.contribution || 0} điểm cống hiến.`, characterIds: [member.id] });
                member.activeTaskId = null;
                member.taskProgress = 0;
            }
        }
        
        const tuLuyenThap = clan.buildings['tu_luyen_thap'];
        if (member.cultivationTowerState && tuLuyenThap) {
            member.cultivationTowerState.turnsRemaining -= 1;
            if (member.cultivationTowerState.turnsRemaining <= 0) {
                newEvents.push({ description: `${member.name} đã kết thúc tu luyện tại Tu Luyện Tháp.`, characterIds: [member.id] });
                member.cultivationTowerState = null;
                for (const station of tuLuyenThap.stations) {
                    if (station.workerId === member.id) {
                        station.workerId = null;
                        break;
                    }
                }
                member.assignedToBuildingId = undefined;
            }
        }

        if (newDate.month === 1) { 
            member.age += 1;
            const promotionEvent = checkAndApplyPromotions(member, clan);
            if (promotionEvent) newEvents.push(promotionEvent);
        }
        member.nguyenKhi = Math.min(member.maxNguyenKhi, member.nguyenKhi + member.maxNguyenKhi * 0.1);
        
        if (newDate.month % 3 === 0) {
            member.needs = processCharacterNeeds(member, clan);
        }
        
        const isWorking = !!(member.activeTaskId || member.assignedToBuildingId);
        member.activity = isWorking ? CharacterActivity.WORKING : (member.seclusionState ? CharacterActivity.SECLUDED : (member.techniqueTrainingState ? CharacterActivity.CULTIVATING : (member.tribulationState ? CharacterActivity.TRIBULATION : CharacterActivity.IDLE)));
        
        
        // --- CULTIVATION LOGIC ---
        const mainCultivationId = member.techniques.mainCultivation;
        const mainCultivation = mainCultivationId ? ALL_TECHNIQUES[mainCultivationId] as TechniqueItem : null;
        let isBlockedByCultivationMethod = false;
        if (!mainCultivation) {
             isBlockedByCultivationMethod = true;
        } else if (mainCultivation && mainCultivation.maxCultivationStage) {
            const stageOrder = Object.values(CultivationStage);
            const currentStageIndex = stageOrder.indexOf(member.cultivationStage);
            const maxStageIndex = stageOrder.indexOf(mainCultivation.maxCultivationStage);
            if (currentStageIndex >= maxStageIndex) isBlockedByCultivationMethod = true;
        }
        member.isCultivationBlocked = isBlockedByCultivationMethod;

        // --- FIX 0.20.19: Thêm điều kiện member.isPatriarch để Tộc Trưởng luôn tu luyện được ---
        const canCultivate = !member.isCultivationBlocked && 
                             !member.hasGivenUpCultivation && 
                             !member.isPermanentlyBlocked && 
                             (!member.injuryTurnsRemaining || member.injuryTurnsRemaining <= 0) &&
                             (member.cultivationStage === CultivationStage.QI_REFINEMENT || supportedCultivators.has(member.id) || member.isPatriarch);


        if (canCultivate) {
            const currentState = cultivationStateFactory.getState(member.cultivationStage);
            const physique = PHYSIQUES[member.physiqueName as keyof typeof PHYSIQUES];
            let totalCultivationModifier = physique.effects.cultivationSpeedModifier;
            if (mainCultivation?.effects.cultivationSpeedModifier) totalCultivationModifier *= mainCultivation.effects.cultivationSpeedModifier;
            
            let elementalAffinityModifier = 1.0;
            if (mainCultivation?.requirements.elements && mainCultivation.requirements.elements.length > 0) {
                const requiredElements = mainCultivation.requirements.elements;
                const totalAttributePoints = requiredElements.reduce((sum, el) => sum + (member.attributes[el] || 0), 0);
                const averageAttribute = totalAttributePoints / requiredElements.length;
                elementalAffinityModifier = Math.max(0.1, 1 + (averageAttribute - 25) / 100);
            }

            let specializedTalentModifier = 1.0;
            const techniqueSystem = mainCultivation?.he;
            if (techniqueSystem) {
                let relevantTalent: TalentType | null = null;
                if (techniqueSystem.includes('Kiếm')) relevantTalent = TalentType.KIEM_DAO;
                else if (techniqueSystem.includes('Thể')) relevantTalent = TalentType.THE_DAO;
                else if (['Huyết', 'Độc', 'Tâm', 'Ám', 'Sát'].includes(techniqueSystem)) relevantTalent = TalentType.MA_DAO;
                if (relevantTalent) {
                    const talentValue = member.talents[relevantTalent] || 0;
                    specializedTalentModifier = 1 + (talentValue / 200);
                }
            }
            
            let activityModifier = 1.0;
            if (isWorking) activityModifier = 0.5;
    
            let potentialCultivationGain = 10 * totalCultivationModifier * elementalAffinityModifier * specializedTalentModifier * (1 + member.comprehension / 200) * linhMachModifier * activityModifier * formationModifier;
            
            if (member.cultivationTowerState && tuLuyenThap) {
                const towerBonus = 0.5 + (tuLuyenThap.level * 0.5); 
                potentialCultivationGain *= (1 + towerBonus);
            }
            
            member.cultivationProgress += potentialCultivationGain;

        } else if (newDate.month % 6 === 0 && !member.seclusionState && !member.hasGivenUpCultivation && member.cultivationStage !== CultivationStage.QI_REFINEMENT) {
            if (member.isCultivationBlocked) {
                const reason = mainCultivation ? `công pháp "${mainCultivation.name}" đã đạt đến giới hạn` : "chưa có công pháp chủ tu";
                newEvents.push({ description: `Tu vi của ${member.name} bị đình trệ do ${reason}.`, characterIds: [member.id] });
            } else if ((member.injuryTurnsRemaining || 0) > 0) {
                 newEvents.push({ description: `Do đang trọng thương, ${member.name} không thể tĩnh tâm tu luyện, tu vi tạm thời đình trệ.`, characterIds: [member.id] });
            }
        }

        const currentState = cultivationStateFactory.getState(member.cultivationStage);
        const requiredExpForLevelUp = currentState.getExpForLevel(member.cultivationLevel);
        const minorBottleneckData = MINOR_BOTTLENECK_DATA[member.cultivationStage];
        const isAtMinorBottleneck = minorBottleneckData && minorBottleneckData.levels.includes(member.cultivationLevel);
        
        if (isAtMinorBottleneck && member.cultivationProgress >= requiredExpForLevelUp) {
            member.isFacingMinorBottleneck = true;
            continue;
        }

        let hasLeveledUp = false;
        while (member.cultivationLevel < currentState.levels && member.cultivationProgress >= currentState.getExpForLevel(member.cultivationLevel)) {
            const requiredExp = currentState.getExpForLevel(member.cultivationLevel);
            member.cultivationProgress -= requiredExp;
            member.cultivationLevel += 1;
            hasLeveledUp = true;
        }

        if (hasLeveledUp) {
            Object.assign(member, recalculateAllStats(member));
            member.health = member.maxHealth;
            member.mana = member.maxMana;
            newEvents.push({ description: `Sau khi đột phá tiểu cảnh giới lên ${member.cultivationStage} tầng ${member.cultivationLevel}, linh lực và khí huyết của ${member.name} đã hoàn toàn hồi phục.`, characterIds: [member.id] });
        }
        
        const requiredExpForPeak = currentState.getExpForLevel(currentState.levels);
        if (member.cultivationLevel === currentState.levels && member.cultivationProgress >= requiredExpForPeak && !member.seclusionState && !member.hasGivenUpCultivation) {
            const breakthroughInitResult = currentState.handleBreakthrough(member, clan);
            clan = breakthroughInitResult.clan;
            newEvents.push(...breakthroughInitResult.newEvents);
            member = clan.members[i];
            continue;
        } else {
            member.breakthroughSuccessChance = (member.cultivationLevel === currentState.levels) ? currentState.getBreakthroughSuccessChance(member, clan) : 0;
        }

        const allEquippedTechIds = [ member.techniques.mainCultivation, ...member.techniques.subCultivation, ...member.techniques.secretArts, ...member.techniques.spells ].filter((id): id is string => !!id);
        const uniqueEquippedTechIds = [...new Set(allEquippedTechIds)];
        const cultivationTalentModifier = 1 + ((member.talents[TalentType.CULTIVATION] || 0) / 100);

        if (!member.hasGivenUpCultivation && !member.isPermanentlyBlocked) {
            for (const techId of uniqueEquippedTechIds) {
                const progress = member.masteredTechniques[techId];
                if (!progress || progress.mastery === TechniqueMastery.VIEN_MAN) continue;
                const technique = ALL_TECHNIQUES[techId] as TechniqueItem | undefined;
                if (!technique) continue;

                let specializedTalentModifier = 1.0;
                const techniqueSystem = technique?.he;
                if (techniqueSystem) {
                    let relevantTalent: TalentType | null = null;
                    if (techniqueSystem.includes('Kiếm')) relevantTalent = TalentType.KIEM_DAO;
                    else if (techniqueSystem.includes('Thể')) relevantTalent = TalentType.THE_DAO;
                    else if (['Huyết', 'Độc', 'Tâm', 'Ám', 'Sát'].includes(techniqueSystem)) relevantTalent = TalentType.MA_DAO;
                    if (relevantTalent) {
                        const talentValue = member.talents[relevantTalent] || 0;
                        specializedTalentModifier = 1 + (talentValue / 200);
                    }
                }
                const techniqueTier = technique.quality as ItemQuality;
                const expRequirements = MASTERY_EXP_REQUIREMENTS[techniqueTier];
                if (!expRequirements) continue;
                const expToNext = expRequirements[progress.mastery];
                if (expToNext === Infinity) continue;
                progress.exp += 1 * cultivationTalentModifier * specializedTalentModifier;
                if (progress.exp >= expToNext) {
                    const masteryLevels = Object.values(TechniqueMastery);
                    const currentLevelIndex = masteryLevels.indexOf(progress.mastery);
                    if (currentLevelIndex < masteryLevels.length - 1) {
                        const newMastery = masteryLevels[currentLevelIndex + 1];
                        progress.mastery = newMastery;
                        progress.exp = 0;
                        const techName = technique.name;
                        newEvents.push({ description: `Nhờ chăm chỉ tu hành, ${member.name} đã lĩnh ngộ "${techName}" đến cảnh giới ${newMastery}!`, characterIds: [member.id] });
                    }
                }
            }
        }
    }

    if (membersToAdd.length > 0) clan.members.push(...membersToAdd);
    return { updatedClan: clan, newEvents };
};
