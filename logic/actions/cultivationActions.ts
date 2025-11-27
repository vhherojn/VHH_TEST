
import type { Clan, Event, Character, CultivationStage } from '../../types/index.ts';
import { deepClone } from '../utils/clone.ts';
import { cultivationStateFactory } from '../cultivation/stateFactory.ts';
import { ALL_ITEMS } from '../../constants.ts';

type CultivationActionResult = { updatedClan?: Clan; newEvents?: Omit<Event, 'id' | 'date'>[]; error?: string; };

export function attemptFinalBreakthrough(clan: Clan, characterId: string): CultivationActionResult {
    const newClan = deepClone(clan);
    const member = newClan.members.find(m => m.id === characterId);
    if (!member) return { error: "Không tìm thấy tộc nhân." };

    if (!member.hasGivenUpCultivation) return { error: `${member.name} vẫn còn cơ hội đột phá thường.` };
    if (member.isPermanentlyBlocked) return { error: `${member.name} tiên lộ đã tuyệt, không thể đột phá.` };
    if (member.maxAge - member.age > 10) return { error: `Chỉ khi thọ nguyên còn dưới 10 năm mới có thể đánh cược lần cuối.` };
    if (member.injuryTurnsRemaining && member.injuryTurnsRemaining > 0) return { error: `${member.name} đang trọng thương, không thể đột phá.` };
    if (member.seclusionState) return { error: `${member.name} đang bận, không thể đột phá.` };
    
    const currentState = cultivationStateFactory.getState(member.cultivationStage);
    const result = currentState.handleBreakthrough(member, newClan, { isFinal: true });
    
    // Clear the flag regardless of whether seclusion starts or not
    result.clan.characterIdFacingLastChance = null;

    return { updatedClan: result.clan, newEvents: result.newEvents };
}

export function declineFinalBreakthrough(clan: Clan, characterId: string): CultivationActionResult {
    const newClan = deepClone(clan);
    const member = newClan.members.find(m => m.id === characterId);
    if (!member) {
        return { error: "Không tìm thấy tộc nhân." };
    }

    member.isPermanentlyBlocked = true;
    newClan.characterIdFacingLastChance = null; // Clear the flag

    return {
        updatedClan: newClan,
        newEvents: [{
            description: `${member.name} đã quyết định từ bỏ cơ hội cuối cùng, an dưỡng tuổi già. Tiên lộ từ nay đã tuyệt.`,
            characterIds: [characterId]
        }]
    };
}

export function startSeclusionForBreakthrough(clan: Clan, characterId: string, aidItemId?: string): CultivationActionResult {
    const newClan = deepClone(clan);
    const member = newClan.members.find(m => m.id === characterId);
    if (!member) return { error: "Không tìm thấy tộc nhân." };

    const decision = newClan.breakthroughDecision;
    if (!decision || decision.characterId !== characterId) {
        return { error: "Trạng thái đột phá không hợp lệ." };
    }

    const targetStage = decision.targetStage;
    let eventText = `${member.name} đã chuẩn bị xong, bắt đầu bế quan đột phá ${targetStage}.`;
    let duration = 12; // Default for TrucCo -> KetDan

    if (aidItemId) {
        const item = ALL_ITEMS[aidItemId];
        // @ts-ignore
        const bonus = item?.effects?.breakthrough_success_chance_bonus;

        if (!item || (newClan.itemInventory[aidItemId] || 0) < 1 || bonus === undefined) {
            return { error: "Vật phẩm hỗ trợ không hợp lệ hoặc không có trong kho." };
        }
        newClan.itemInventory[aidItemId] -= 1;
        member.breakthroughAid = { itemId: aidItemId, successChanceBonus: bonus };
        eventText = `${member.name} đã sử dụng ${item.name} làm vật hỗ trợ, bắt đầu bế quan đột phá ${targetStage}.`;
    }

    if (targetStage === "Kết Đan Kỳ") duration = 12;
    if (targetStage === "Nguyên Anh Kỳ") duration = 24;
    if (targetStage === "Hóa Thần Kỳ") duration = 120;

    member.seclusionState = { type: 'breakthrough', monthsRemaining: duration, targetStage: targetStage };
    newClan.breakthroughDecision = null;

    return { updatedClan: newClan, newEvents: [{ description: eventText, characterIds: [characterId] }] };
}

export function postponeBreakthrough(clan: Clan, characterId: string): CultivationActionResult {
    const newClan = deepClone(clan);
    const member = newClan.members.find(m => m.id === characterId);
    if (!member) return { error: "Không tìm thấy tộc nhân." };
    
    const decision = newClan.breakthroughDecision;
    if (!decision || decision.characterId !== characterId) {
        return { error: "Trạng thái đột phá không hợp lệ." };
    }

    const currentState = cultivationStateFactory.getState(member.cultivationStage);
    const requiredExp = currentState.getExpForLevel(member.cultivationLevel);
    member.cultivationProgress = requiredExp - 1;

    newClan.breakthroughDecision = null;

    return {
        updatedClan: newClan,
        newEvents: [{
            description: `Cảm thấy chưa phải thời cơ tốt nhất, ${member.name} đã quyết định tạm hoãn việc đột phá.`,
            characterIds: [characterId]
        }]
    };
}