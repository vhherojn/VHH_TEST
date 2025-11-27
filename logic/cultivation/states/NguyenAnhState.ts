import { CultivationStage, CombatStats, Character, Clan, Event, CharacterStatus, ItemQuality } from '../../../types/index.ts';
import type { ICanhGioiState, BreakthroughResult } from '../ICanhGioiState.ts';
import { deepClone } from '../../utils/clone.ts';
import { recalculateAllStats } from '../../character.ts';
import { ALL_ITEMS } from '../../../constants.ts';

export class NguyenAnhState implements ICanhGioiState {
    stage: CultivationStage = CultivationStage.NASCENT_SOUL;
    levels: number = 10;
    progressPerLevel: number = 40000;
    upkeep: number = 500;
    baseHealth: number = 250000;
    baseMana: number = 180000;
    baseNguyenKhi: number = 4000;
    baseSpeed: number = 45;
    baseMaxAge: number = 1200;
    combatStatModifiers: Omit<CombatStats, 'critChance' | 'critDamage'> = { 
        physicalAttack: 30000,
        magicalAttack: 28000,
        physicalDefense: 20000,
        magicalDefense: 18000
    };

    getExpForLevel(level: number): number {
        if (level < 1) return this.progressPerLevel;
        return Math.floor(this.progressPerLevel * Math.pow(1.2, level - 1));
    }

    getBreakthroughSuccessChance(character: Character, clan: Clan): number {
        let baseChance = 0.1; // 1 thành
        baseChance += (character.khiVan / 500); // 100 Khi Van = +20% chance
        const impurityPenalty = (character.bodyImpurity || 0) / 800;
        baseChance -= impurityPenalty;
        
        const aidBonus = character.breakthroughAid?.successChanceBonus || 0;
        baseChance += aidBonus;

        return Math.max(0, baseChance);
    }

    handleBreakthrough(character: Character, clan: Clan, options?: { isFinal?: boolean }): BreakthroughResult {
        const newClan = deepClone(clan);
        const memberToUpdate = newClan.members.find(m => m.id === character.id)!;
        
        const tierOrder = Object.values(ItemQuality);
        if (tierOrder.indexOf(clan.linhMach.tier) < tierOrder.indexOf(ItemQuality.NGU_GIAI)) {
            return {
                success: false,
                newEvents: [{
                    description: `Linh mạch gia tộc chưa đủ cấp 5, ${character.name} không thể cảm ứng pháp tắc, không thể Hóa Thần.`,
                    characterIds: [character.id]
                }],
                clan: newClan,
            };
        }

        if (memberToUpdate.injuryTurnsRemaining && memberToUpdate.injuryTurnsRemaining > 0) {
            return { 
                success: false, 
                newEvents: [{
                    description: `${character.name} đang trọng thương, không thể tập trung tinh thần để bế quan đột phá.`,
                    characterIds: [character.id]
                }],
                clan: newClan,
            };
        }
        
        if (!options?.isFinal) {
            const attempts = memberToUpdate.breakthroughAttempts?.[this.stage] || 0;
            if (attempts >= 1) {
                memberToUpdate.hasGivenUpCultivation = true;
                memberToUpdate.cultivationProgress -= 10;
                return { success: false, newEvents: [{ description: `Đã dùng hết cơ hội đột phá Hóa Thần, ${character.name} tâm cảnh bị ảnh hưởng, tu vi có chút hao tổn, đành từ bỏ ý định.`, characterIds: [character.id] }], clan: newClan };
            }
        }
        
        const hoaThanCount = newClan.members.filter(m => m.status === CharacterStatus.ALIVE && m.cultivationStage === CultivationStage.SOUL_FORMATION).length;
        if (hoaThanCount >= 10) {
            return { success: false, newEvents: [{ description: `Thiên đạo có hạn, thế gian này đã đủ 10 vị Hóa Thần Kỳ. ${character.name} không thể cảm ứng pháp tắc, không thể đột phá.`, characterIds: [character.id] }], clan: newClan };
        }

        if (character.nguyenKhi < character.maxNguyenKhi) {
            return { success: false, newEvents: [{ description: `Nguyên khí của ${character.name} chưa viên mãn, không thể đột phá Hóa Thần.`, characterIds: [character.id] }], clan };
        }
        
        // Trigger the decision modal
        newClan.breakthroughDecision = {
            characterId: character.id,
            targetStage: CultivationStage.SOUL_FORMATION
        };
        
        return {
            success: false,
            newEvents: [{
                description: `${character.name} đã tu luyện đến đỉnh phong ${this.stage}, cảm ứng được một tia thiên cơ, chuẩn bị Hóa Thần!`,
                characterIds: [character.id]
            }],
            clan: newClan
        };
    }

    resolveBreakthrough(character: Character, clan: Clan): BreakthroughResult {
        const newClan = deepClone(clan);
        const memberToUpdate = newClan.members.find(m => m.id === character.id)!;

        const isFinalAttempt = memberToUpdate.seclusionState?.isFinal || false;
        memberToUpdate.seclusionState = null;

        if (!isFinalAttempt) {
            memberToUpdate.breakthroughAttempts = memberToUpdate.breakthroughAttempts || {};
            const newAttemptsCount = (memberToUpdate.breakthroughAttempts[this.stage] || 0) + 1;
            memberToUpdate.breakthroughAttempts[this.stage] = newAttemptsCount;
        }

        const newEvents: Omit<Event, 'id' | 'date'>[] = [];
        const attempts = memberToUpdate.breakthroughAttempts?.[this.stage] || 1;

        const handleFinalFailure = (reason: string) => {
            memberToUpdate.cultivationLevel = Math.max(1, memberToUpdate.cultivationLevel - 1);
            memberToUpdate.isPermanentlyBlocked = true;
            newEvents.push({ 
                description: `Đánh cược thất bại! ${character.name} ${reason}, tu vi rơi xuống tầng ${memberToUpdate.cultivationLevel}, tiên lộ từ nay đã tuyệt!`,
                characterIds: [character.id] 
            });
            return { success: false, newEvents, clan: newClan };
        };

        // Trial 1: Bottleneck
        const bottleneckChance = this.getBreakthroughSuccessChance(character, clan);
        memberToUpdate.breakthroughAid = null; // Consume aid item
        
        if (Math.random() > bottleneckChance) {
            if (isFinalAttempt) return handleFinalFailure(`không thể phá vỡ bình cảnh`);
            memberToUpdate.injuryTurnsRemaining = 60;
            newEvents.push({ description: `Đột phá Hóa Thần thất bại (lần ${attempts})! ${character.name} không thể phá vỡ bình cảnh (tỷ lệ ${Math.round(bottleneckChance*100)}%), trọng thương 60 tháng.`, characterIds: [character.id] });
            return { success: false, newEvents, clan: newClan };
        }
        
        // Trial 2: Comprehension
        const comprehensionChance = 0.1 + (character.comprehension / 500); // Base 10%
        if (Math.random() > comprehensionChance) {
            if (isFinalAttempt) return handleFinalFailure(`cảm ngộ thiên địa thất bại`);
            const backlash = Math.random();
            if (backlash < 0.5) {
                memberToUpdate.status = CharacterStatus.DECEASED;
                newEvents.push({ description: `Cảm ngộ thiên địa thất bại (tỷ lệ ${Math.round(comprehensionChance*100)}%)! ${character.name} bị pháp tắc phản phệ, nguyên thần vỡ nát, thân tử đạo tiêu!`, characterIds: [character.id] });
            } else {
                memberToUpdate.cultivationStage = CultivationStage.CORE_FORMATION;
                memberToUpdate.cultivationLevel = 1;
                memberToUpdate.hasGivenUpCultivation = true;
                newEvents.push({ description: `Cảm ngộ thất bại (tỷ lệ ${Math.round(comprehensionChance*100)}%)! ${character.name} bị pháp tắc phản phệ, tu vi rơi rớt về Kết Đan Kỳ, đạo tâm tan vỡ, từ nay không thể tu luyện.`, characterIds: [character.id] });
            }
            return { success: false, newEvents, clan: newClan };
        }

        // Success
        memberToUpdate.cultivationProgress = 0;
        memberToUpdate.cultivationStage = CultivationStage.SOUL_FORMATION;
        memberToUpdate.cultivationLevel = 1;
        memberToUpdate.hasGivenUpCultivation = false;
        Object.assign(memberToUpdate, recalculateAllStats(memberToUpdate));
        memberToUpdate.health = memberToUpdate.maxHealth;
        memberToUpdate.mana = memberToUpdate.maxMana;
        
        newEvents.push({ description: `Trong lúc nguy nan, ${character.name} đã thành công cảm ngộ được một tia thiên địa pháp tắc! Nguyên Anh dung hợp, chính thức bước vào Hóa Thần Kỳ!`, characterIds: [character.id] });
        
        // Grant breakthrough rewards
        const rewards = newClan.breakthroughRewards[CultivationStage.SOUL_FORMATION];
        if (rewards && rewards.length > 0) {
            let rewardsGivenText = '';
            for (const reward of rewards) {
                if ((newClan.itemInventory[reward.itemId] || 0) >= reward.count) {
                    newClan.itemInventory[reward.itemId] -= reward.count;
                    if (newClan.itemInventory[reward.itemId] <= 0) delete newClan.itemInventory[reward.itemId];
                    memberToUpdate.inventory[reward.itemId] = (memberToUpdate.inventory[reward.itemId] || 0) + reward.count;
                    rewardsGivenText += `${reward.count} ${ALL_ITEMS[reward.itemId]?.name}, `;
                }
            }
            if (rewardsGivenText) {
                newEvents.push({ 
                    description: `Do lần đầu đột phá Hóa Thần, ${memberToUpdate.name} nhận được phần thưởng từ gia tộc: ${rewardsGivenText.slice(0, -2)}.`,
                    characterIds: [memberToUpdate.id] 
                });
            }
        }

        return { success: true, newEvents, clan: newClan };
    }
}