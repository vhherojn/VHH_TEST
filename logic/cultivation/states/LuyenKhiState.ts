import { CultivationStage, CombatStats, Character, Clan, Event } from '../../../types/index.ts';
import type { ICanhGioiState, BreakthroughResult } from '../ICanhGioiState.ts';
import { deepClone } from '../../utils/clone.ts';
import { recalculateAllStats } from '../../character.ts';
import { ALL_ITEMS } from '../../../constants.ts';

const TRUC_CO_BASE_SUCCESS_CHANCE = 0.4; // 4 Thành (40%)

export class LuyenKhiState implements ICanhGioiState {
    stage: CultivationStage = CultivationStage.QI_REFINEMENT;
    levels: number = 13;
    progressPerLevel: number = 100;
    upkeep: number = 5;
    baseHealth: number = 100;
    baseMana: number = 50;
    baseNguyenKhi: number = 10;
    baseSpeed: number = 10;
    baseMaxAge: number = 150;
    combatStatModifiers: Omit<CombatStats, 'critChance' | 'critDamage'> = { 
        physicalAttack: 10, 
        magicalAttack: 5, 
        physicalDefense: 8, 
        magicalDefense: 4 
    };

    getExpForLevel(level: number): number {
        if (level < 1) return this.progressPerLevel;
        return Math.floor(this.progressPerLevel * Math.pow(1.2, level - 1));
    }

    getBreakthroughSuccessChance(character: Character, clan: Clan): number {
        const hasPill = (character.inventory['truc_co_dan'] || 0) > 0;
        let baseChance = TRUC_CO_BASE_SUCCESS_CHANCE;
        if (hasPill) baseChance += 0.3;
        
        const impurityPenalty = (character.bodyImpurity || 0) / 400;
        baseChance -= impurityPenalty;
        
        if (character.age > 65) baseChance *= 0.1;
    
        return Math.max(0.01, baseChance);
    }

    handleBreakthrough(character: Character, clan: Clan, options?: { isFinal?: boolean }): BreakthroughResult {
        const newClan = deepClone(clan);
        const memberToUpdate = newClan.members.find(m => m.id === character.id)!;
        
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
            if (attempts >= 3) {
                 memberToUpdate.hasGivenUpCultivation = true;
                 memberToUpdate.cultivationProgress -= 10;
                 return { 
                    success: false, 
                    newEvents: [{
                        description: `Đã dùng hết 3 cơ hội đột phá, ${character.name} tâm cảnh bị ảnh hưởng, tu vi có chút hao tổn, đành từ bỏ ý định đột phá.`,
                        characterIds: [character.id]
                    }],
                    clan: newClan,
                };
            }
        }

        if (character.nguyenKhi < character.maxNguyenKhi) {
             return { success: false, newEvents: [{ description: `Nguyên khí của ${character.name} chưa viên mãn, không thể bắt đầu đột phá Trúc Cơ.`, characterIds: [character.id] }], clan };
        }
        
        memberToUpdate.seclusionState = {
            type: 'breakthrough',
            monthsRemaining: 6,
            targetStage: CultivationStage.FOUNDATION_ESTABLISHMENT,
            isFinal: options?.isFinal,
        };
        
        const eventText = options?.isFinal
            ? `${character.name} thọ nguyên không còn nhiều, quyết định đánh cược lần cuối, bế quan 6 tháng để đột phá Trúc Cơ!`
            : `${character.name} đã đạt đến đỉnh phong ${this.stage}, bắt đầu bế quan 6 tháng để đột phá Trúc Cơ.`;

        return {
            success: false,
            newEvents: [{ description: eventText, characterIds: [character.id] }],
            clan: newClan
        };
    }

    resolveBreakthrough(character: Character, clan: Clan): BreakthroughResult {
        const newClan = deepClone(clan);
        const memberToUpdate = newClan.members.find(m => m.id === character.id)!;
        
        const isFinalAttempt = memberToUpdate.seclusionState?.isFinal || false;
        memberToUpdate.seclusionState = null;

        const hasPill = (memberToUpdate.inventory['truc_co_dan'] || 0) > 0;
        if (hasPill) {
            memberToUpdate.inventory['truc_co_dan'] -= 1;
            if (memberToUpdate.inventory['truc_co_dan'] <= 0) delete memberToUpdate.inventory['truc_co_dan'];
        }
        
        if (!isFinalAttempt) {
            memberToUpdate.breakthroughAttempts = memberToUpdate.breakthroughAttempts || {};
            const newAttemptsCount = (memberToUpdate.breakthroughAttempts[this.stage] || 0) + 1;
            memberToUpdate.breakthroughAttempts[this.stage] = newAttemptsCount;
        }
        
        const successChance = this.getBreakthroughSuccessChance(character, clan);
        const isSuccess = Math.random() < successChance;
        
        memberToUpdate.nguyenKhi = 0;

        const newEvents: Omit<Event, 'id' | 'date'>[] = [];

        if (isSuccess) {
            memberToUpdate.cultivationProgress = 0;
            memberToUpdate.cultivationStage = CultivationStage.FOUNDATION_ESTABLISHMENT;
            memberToUpdate.cultivationLevel = 1;
            memberToUpdate.thanThuc = 10;
            memberToUpdate.hasGivenUpCultivation = false;
            
            let eventDesc = hasPill ? `${character.name} đã sử dụng Trúc Cơ Đan, thành công đột phá bình cảnh, tiến vào Trúc Cơ Kỳ!` : `Thiên địa chúc phúc! ${character.name} đã dựa vào căn cơ của bản thân để Trúc Cơ thành công, căn cơ trở nên vô cùng vững chắc!`;
            if (!hasPill) memberToUpdate.statModifiers = { ...(memberToUpdate.statModifiers || {}), baseMultiplier: 1.4 };
            
            Object.assign(memberToUpdate, recalculateAllStats(memberToUpdate));
            memberToUpdate.health = memberToUpdate.maxHealth;
            memberToUpdate.mana = memberToUpdate.maxMana;
            newEvents.push({ description: eventDesc, characterIds: [character.id] });
            
            // Grant breakthrough rewards
            const rewards = newClan.breakthroughRewards[CultivationStage.FOUNDATION_ESTABLISHMENT];
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
                        description: `Do lần đầu đột phá Trúc Cơ, ${memberToUpdate.name} nhận được phần thưởng từ gia tộc: ${rewardsGivenText.slice(0, -2)}.`,
                        characterIds: [memberToUpdate.id] 
                    });
                }
            }

            return { success: true, newEvents, clan: newClan };
        } else {
             if (isFinalAttempt) {
                memberToUpdate.cultivationLevel = Math.max(1, memberToUpdate.cultivationLevel - 1);
                memberToUpdate.isPermanentlyBlocked = true;
                newEvents.push({ 
                    description: `Đánh cược thất bại! ${character.name} không thể đột phá, bị phản phệ, tu vi rơi xuống tầng ${memberToUpdate.cultivationLevel}, tiên lộ từ nay đã tuyệt!`,
                    characterIds: [character.id] 
                });
                return { success: false, newEvents, clan: newClan };
            }

            const attempts = memberToUpdate.breakthroughAttempts?.[this.stage] || 1;
            const backlash = Math.random();
            let eventDesc: string;
            if (backlash < 0.6) { // 60% chance of injury
                memberToUpdate.injuryTurnsRemaining = 12;
                eventDesc = `Đột phá Trúc Cơ Kỳ thất bại (lần ${attempts}, tỷ lệ ${Math.round(successChance*100)}%)! ${character.name} bị phản phệ, rơi vào trạng thái Trọng Thương, cần 12 tháng để hồi phục.`;
            } else { // 40% chance of cultivation drop
                memberToUpdate.cultivationLevel = Math.max(1, memberToUpdate.cultivationLevel - (Math.floor(Math.random() * 2) + 1));
                eventDesc = `Đột phá Trúc Cơ Kỳ thất bại (lần ${attempts}, tỷ lệ ${Math.round(successChance*100)}%)! ${character.name} bị phản phệ, căn cơ sụt giảm, tu vi rơi xuống Tầng ${memberToUpdate.cultivationLevel}.`;
            }
            newEvents.push({ description: eventDesc, characterIds: [character.id] });
            return { success: false, newEvents, clan: newClan };
        }
    }
}