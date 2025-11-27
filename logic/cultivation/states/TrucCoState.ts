import { CultivationStage, CombatStats, Character, Clan, Event, ItemQuality } from '../../../types/index.ts';
import type { ICanhGioiState, BreakthroughResult } from '../ICanhGioiState.ts';
import { deepClone } from '../../utils/clone.ts';
import { recalculateAllStats } from '../../character.ts';
import { ALL_ITEMS } from '../../../constants.ts';

export class TrucCoState implements ICanhGioiState {
    stage: CultivationStage = CultivationStage.FOUNDATION_ESTABLISHMENT;
    levels: number = 10;
    progressPerLevel: number = 800;
    upkeep: number = 20;
    baseHealth: number = 4000;
    baseMana: number = 2000;
    baseNguyenKhi: number = 100;
    baseSpeed: number = 20;
    baseMaxAge: number = 250;
    combatStatModifiers: Omit<CombatStats, 'critChance' | 'critDamage'> = { 
        physicalAttack: 400,
        magicalAttack: 350,
        physicalDefense: 300,
        magicalDefense: 250
    };

    getExpForLevel(level: number): number {
        if (level < 1) return this.progressPerLevel;
        return Math.floor(this.progressPerLevel * Math.pow(1.2, level - 1));
    }

    getBreakthroughSuccessChance(character: Character, clan: Clan): number {
        let baseChance = 0.3 + (character.daoTam / 300); // Base 30% + Dao Tam bonus
        const impurityPenalty = (character.bodyImpurity || 0) / 500;
        baseChance -= impurityPenalty;
        
        const aidBonus = character.breakthroughAid?.successChanceBonus || 0;
        baseChance += aidBonus;

        return Math.max(0.05, baseChance);
    }

    handleBreakthrough(character: Character, clan: Clan, options?: { isFinal?: boolean }): BreakthroughResult {
        const newClan = deepClone(clan);
        const memberToUpdate = newClan.members.find(m => m.id === character.id)!;

        const tierOrder = Object.values(ItemQuality);
        if (tierOrder.indexOf(clan.linhMach.tier) < tierOrder.indexOf(ItemQuality.TAM_GIAI)) {
            return {
                success: false,
                newEvents: [{
                    description: `Linh mạch gia tộc chưa đủ cấp 3, không thể cung cấp đủ linh khí cho ${character.name} Kết Đan.`,
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
            if (attempts >= 2) {
                memberToUpdate.hasGivenUpCultivation = true;
                memberToUpdate.cultivationProgress -= 10;
                return { success: false, newEvents: [{ description: `Đã dùng hết 2 cơ hội đột phá Kết Đan, ${character.name} tâm cảnh bị ảnh hưởng, tu vi có chút hao tổn, đành từ bỏ ý định.`, characterIds: [character.id] }], clan: newClan };
            }
        }

        if (character.nguyenKhi < character.maxNguyenKhi) {
            return { success: false, newEvents: [{ description: `Nguyên khí của ${character.name} chưa viên mãn, không thể đột phá Kết Đan.`, characterIds: [character.id] }], clan };
        }

        // Trigger the decision modal instead of starting seclusion
        newClan.breakthroughDecision = {
            characterId: character.id,
            targetStage: CultivationStage.CORE_FORMATION
        };
        
        return {
            success: false, // Not a breakthrough yet
            newEvents: [{
                description: `${character.name} đã tu luyện đến đỉnh phong ${this.stage}, chuẩn bị ngưng tụ Kim Đan!`,
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
        
        // Trial 1: Bottleneck
        const bottleneckChance = this.getBreakthroughSuccessChance(character, clan);
        const usedHuyetSatKimDan = memberToUpdate.breakthroughAid?.itemId === 'huyet_sat_kim_dan';
        memberToUpdate.breakthroughAid = null; // Consume aid item
        
        if (Math.random() > bottleneckChance) {
             if (isFinalAttempt) {
                memberToUpdate.cultivationLevel = Math.max(1, memberToUpdate.cultivationLevel - 1);
                memberToUpdate.isPermanentlyBlocked = true;
                newEvents.push({ 
                    description: `Đánh cược thất bại! ${character.name} không thể phá vỡ bình cảnh, tu vi rơi xuống tầng ${memberToUpdate.cultivationLevel}, tiên lộ từ nay đã tuyệt!`,
                    characterIds: [character.id] 
                });
                return { success: false, newEvents, clan: newClan };
            }
            memberToUpdate.injuryTurnsRemaining = 18;
            newEvents.push({ description: `Đột phá Kết Đan thất bại (lần ${memberToUpdate.breakthroughAttempts[this.stage]})! ${character.name} không thể phá vỡ bình cảnh (tỷ lệ ${Math.round(bottleneckChance*100)}%), thân thể bị phản phệ, trọng thương 18 tháng.`, characterIds: [character.id] });
            return { success: false, newEvents, clan: newClan };
        }
        newEvents.push({ description: `Bình cảnh Trúc Cơ đã được ${character.name} phá vỡ!`, characterIds: [character.id] });
        
        // Trial 2: Earth Lightning Tribulation
        const lightningChance = 0.3 + (character.khiVan / 300);
        if (Math.random() > lightningChance) {
             if (isFinalAttempt) {
                memberToUpdate.cultivationLevel = Math.max(1, memberToUpdate.cultivationLevel - 1);
                memberToUpdate.isPermanentlyBlocked = true;
                newEvents.push({ 
                    description: `Đánh cược thất bại! ${character.name} không thể chống lại Địa Lôi Kiếp, tu vi rơi xuống tầng ${memberToUpdate.cultivationLevel}, tiên lộ từ nay đã tuyệt!`,
                    characterIds: [character.id] 
                });
                return { success: false, newEvents, clan: newClan };
            }
             const backlash = Math.random();
            let eventDesc: string;
            if (backlash < 0.7) {
                memberToUpdate.injuryTurnsRemaining = 18;
                eventDesc = `Không thể chống lại Địa Lôi Kiếp (tỷ lệ ${Math.round(lightningChance*100)}%)! ${character.name} bị lôi kiếp đánh trọng thương, tu vi bất ổn!`;
            } else {
                 memberToUpdate.cultivationLevel = Math.max(1, memberToUpdate.cultivationLevel - (Math.floor(Math.random() * 3) + 2)); // Lose 2-4 levels
                 eventDesc = `Địa Lôi Kiếp quá mạnh (tỷ lệ ${Math.round(lightningChance*100)}%)! ${character.name} tuy giữ được mạng nhưng căn cơ sụt giảm, tu vi rơi xuống Tầng ${memberToUpdate.cultivationLevel}.`;
            }
            newEvents.push({ description: eventDesc, characterIds: [character.id] });
            return { success: false, newEvents, clan: newClan };
        }

        // Success
        memberToUpdate.cultivationProgress = 0;
        memberToUpdate.cultivationStage = CultivationStage.CORE_FORMATION;
        memberToUpdate.cultivationLevel = 1;
        memberToUpdate.hasGivenUpCultivation = false;
        
        if (usedHuyetSatKimDan) {
            memberToUpdate.advancementBlockedAt = CultivationStage.CORE_FORMATION;
            newEvents.push({ description: `Sử dụng ma đan, ${character.name} đã thành công ngưng tụ Huyết Sát Kim Đan, nhưng con đường Nguyên Anh từ nay đã đoạn tuyệt!`, characterIds: [character.id] });
        } else {
            newEvents.push({ description: `Vượt qua Địa Lôi Kiếp, ${character.name} thành công ngưng tụ Kim Đan, chính thức bước vào Kết Đan Kỳ!`, characterIds: [character.id] });
        }

        Object.assign(memberToUpdate, recalculateAllStats(memberToUpdate));
        memberToUpdate.health = memberToUpdate.maxHealth;
        memberToUpdate.mana = memberToUpdate.maxMana;
        
        // Grant breakthrough rewards
        const rewards = newClan.breakthroughRewards[CultivationStage.CORE_FORMATION];
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
                    description: `Do lần đầu đột phá Kết Đan, ${memberToUpdate.name} nhận được phần thưởng từ gia tộc: ${rewardsGivenText.slice(0, -2)}.`,
                    characterIds: [memberToUpdate.id] 
                });
            }
        }
        
        return { success: true, newEvents, clan: newClan };
    }
}