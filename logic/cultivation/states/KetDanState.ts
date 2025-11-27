import { CultivationStage, CombatStats, Character, Clan, Event, CharacterStatus, ItemQuality, Pill } from '../../../types/index.ts';
import type { ICanhGioiState, BreakthroughResult } from '../ICanhGioiState.ts';
import { deepClone } from '../../utils/clone.ts';
import { recalculateAllStats } from '../../character.ts';
import { ALL_ITEMS } from '../../../constants.ts';

export class KetDanState implements ICanhGioiState {
    stage: CultivationStage = CultivationStage.CORE_FORMATION;
    levels: number = 10;
    progressPerLevel: number = 8000;
    upkeep: number = 100;
    baseHealth: number = 50000;
    baseMana: number = 35000;
    baseNguyenKhi: number = 800;
    baseSpeed: number = 30;
    baseMaxAge: number = 600;
    combatStatModifiers: Omit<CombatStats, 'critChance' | 'critDamage'> = { 
        physicalAttack: 8000,
        magicalAttack: 7000,
        physicalDefense: 6000,
        magicalDefense: 5000
    };

    getExpForLevel(level: number): number {
        if (level < 1) return this.progressPerLevel;
        return Math.floor(this.progressPerLevel * Math.pow(1.2, level - 1));
    }

    getBreakthroughSuccessChance(character: Character, clan: Clan): number {
        let baseChance = 0.2 + (character.comprehension / 400); // Base 20% + Comprehension bonus
        const impurityPenalty = (character.bodyImpurity || 0) / 600;
        baseChance -= impurityPenalty;

        const aidBonus = character.breakthroughAid?.successChanceBonus || 0;
        baseChance += aidBonus;

        return Math.max(0.05, baseChance);
    }

    handleBreakthrough(character: Character, clan: Clan, options?: { isFinal?: boolean }): BreakthroughResult {
        const newClan = deepClone(clan);
        const memberToUpdate = newClan.members.find(m => m.id === character.id)!;
        
        const tierOrder = Object.values(ItemQuality);
        if (tierOrder.indexOf(clan.linhMach.tier) < tierOrder.indexOf(ItemQuality.TU_GIAI)) {
            return {
                success: false,
                newEvents: [{
                    description: `Linh mạch gia tộc chưa đủ cấp 4, thiên địa linh khí không đủ để ${character.name} ngưng tụ Nguyên Anh.`,
                    characterIds: [character.id]
                }],
                clan: newClan,
            };
        }
        
        if (memberToUpdate.advancementBlockedAt === CultivationStage.CORE_FORMATION) {
             return {
                success: false,
                newEvents: [{
                    description: `Do sử dụng ma công, con đường đại đạo của ${character.name} đã bị khóa lại ở Kết Đan Kỳ, không thể đột phá Nguyên Anh.`,
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
                return { success: false, newEvents: [{ description: `Đã dùng hết cơ hội đột phá Nguyên Anh, ${character.name} tâm cảnh bị ảnh hưởng, tu vi có chút hao tổn, đành từ bỏ ý định.`, characterIds: [character.id] }], clan: newClan };
            }
        }

        if (character.nguyenKhi < character.maxNguyenKhi) {
            return { success: false, newEvents: [{ description: `Nguyên khí của ${character.name} chưa viên mãn, không thể đột phá Nguyên Anh.`, characterIds: [character.id] }], clan };
        }
        
        // Trigger the decision modal
        newClan.breakthroughDecision = {
            characterId: character.id,
            targetStage: CultivationStage.NASCENT_SOUL
        };

        return {
            success: false,
            newEvents: [{
                description: `${character.name} đã tu luyện đến đỉnh phong ${this.stage}, chuẩn bị đối mặt với thử thách sinh tử, phá đan thành anh!`,
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
        const aidItem = memberToUpdate.breakthroughAid ? ALL_ITEMS[memberToUpdate.breakthroughAid.itemId] as Pill : null;
        memberToUpdate.breakthroughAid = null; // Consume aid item

        if (Math.random() > bottleneckChance) {
            if (isFinalAttempt) return handleFinalFailure(`không thể phá vỡ bình cảnh`);
            memberToUpdate.injuryTurnsRemaining = 36;
            newEvents.push({ description: `Đột phá Nguyên Anh thất bại (lần ${attempts})! ${character.name} không thể phá vỡ bình cảnh (tỷ lệ ${Math.round(bottleneckChance*100)}%), trọng thương 36 tháng.`, characterIds: [character.id] });
            return { success: false, newEvents, clan: newClan };
        }
        newEvents.push({ description: `Bình cảnh Kết Đan đã được ${character.name} phá vỡ!`, characterIds: [character.id] });
        
        // Trial 2: Heavenly Lightning Tribulation & Trial 3: Inner Demon Tribulation
        let lightningChance = 0.3 + (character.khiVan / 300);
        let demonChance = 0.3 + (character.daoTam / 300);

        if (aidItem) {
            const aidItemEffects = aidItem.effects as any;
            if (aidItemEffects?.lightning_tribulation_chance_bonus) {
                lightningChance += aidItemEffects.lightning_tribulation_chance_bonus;
            }
            if (aidItemEffects?.demon_tribulation_chance_bonus) {
                demonChance += aidItemEffects.demon_tribulation_chance_bonus;
            }
        }

        if (Math.random() > lightningChance) {
            if (isFinalAttempt) return handleFinalFailure(`không thể chống lại Thiên Lôi Kiếp`);
            memberToUpdate.status = CharacterStatus.DECEASED;
            newEvents.push({ description: `Không thể chống lại Thiên Lôi Kiếp (tỷ lệ ${Math.round(lightningChance*100)}%)! ${character.name} đã hình thần câu diệt, hoá thành tro bụi giữa đất trời!`, characterIds: [character.id] });
            return { success: false, newEvents, clan: newClan };
        }
        newEvents.push({ description: `${character.name} đã thành công vượt qua Thiên Lôi Kiếp!`, characterIds: [character.id] });

        if (Math.random() > demonChance) {
            if (isFinalAttempt) return handleFinalFailure(`thất bại trước Tâm Ma Kiếp`);
            const backlash = Math.random();
            if (backlash < 0.5) {
                memberToUpdate.status = CharacterStatus.DECEASED;
                newEvents.push({ description: `Thất bại trước Tâm Ma Kiếp (tỷ lệ ${Math.round(demonChance*100)}%)! ${character.name} đã bị tâm ma thôn phệ, tẩu hỏa nhập ma, thân tử đạo tiêu!`, characterIds: [character.id] });
            } else {
                memberToUpdate.cultivationLevel = Math.max(1, memberToUpdate.cultivationLevel - (Math.floor(Math.random() * 5) + 3));
                newEvents.push({ description: `Tâm ma phản phệ (tỷ lệ ${Math.round(demonChance*100)}%)! ${character.name} may mắn giữ được mạng nhưng tu vi đại tổn, rơi xuống Tầng ${memberToUpdate.cultivationLevel}.`, characterIds: [character.id] });
            }
            return { success: false, newEvents, clan: newClan };
        }
        
        // Success
        memberToUpdate.cultivationProgress = 0;
        memberToUpdate.cultivationStage = CultivationStage.NASCENT_SOUL;
        memberToUpdate.cultivationLevel = 1;
        memberToUpdate.hasGivenUpCultivation = false;
        Object.assign(memberToUpdate, recalculateAllStats(memberToUpdate));
        memberToUpdate.health = memberToUpdate.maxHealth;
        memberToUpdate.mana = memberToUpdate.maxMana;
        
        newEvents.push({ description: `Vượt qua Lôi Kiếp, chém chết Tâm Ma, ${character.name} đã phá đan thành công, Nguyên Anh thành hình!`, characterIds: [character.id] });
        
        // Grant breakthrough rewards
        const rewards = newClan.breakthroughRewards[CultivationStage.NASCENT_SOUL];
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
                    description: `Do lần đầu đột phá Nguyên Anh, ${memberToUpdate.name} nhận được phần thưởng từ gia tộc: ${rewardsGivenText.slice(0, -2)}.`,
                    characterIds: [memberToUpdate.id] 
                });
            }
        }

        return { success: true, newEvents, clan: newClan };
    }
}