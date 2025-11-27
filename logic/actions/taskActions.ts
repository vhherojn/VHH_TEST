import type { Clan, Event, GameDate } from '../../types/index.ts';
import { TASKS } from '../../constants.ts';
import { deepClone } from '../utils/clone.ts';
import { ItemQuality } from '../../types/index.ts';

type TaskActionResult = { updatedClan?: Clan; newEvents?: Omit<Event, 'id' | 'date'>[]; error?: string; };

export function assignTask(clan: Clan, characterIds: string[], taskId: string, date: GameDate): TaskActionResult {
    const task = TASKS.find(t => t.id === taskId);
    if (!task) {
        return { error: "Nhiệm vụ không hợp lệ." };
    }

    if (characterIds.length === 0) {
        return { error: "Phải chọn ít nhất một tộc nhân." };
    }

    const characters = characterIds.map(id => clan.members.find(m => m.id === id));
    if (characters.some(c => !c)) {
        return { error: "Một hoặc nhiều tộc nhân không tồn tại." };
    }

    for (const char of characters) {
        if (!char) continue;
        if (char.assignedToBuildingId || char.activeTaskId) {
            return { error: `${char.name} hiện đang bận, không thể nhận nhiệm vụ.` };
        }
        // Check profession requirement including apprenticeship status
        if (task.requirements.requiredProfession) {
            const hasProfession = char.professions.some(p =>
                !p.apprenticeship && // FIX: Character must not be an apprentice
                p.type === task.requirements.requiredProfession!.type &&
                Object.values(ItemQuality).indexOf(p.tier) >= Object.values(ItemQuality).indexOf(task.requirements.requiredProfession!.tier)
            );
            if (!hasProfession) {
                 return { error: `${char.name} chưa đạt yêu cầu nghề nghiệp (${task.requirements.requiredProfession.type}) cho nhiệm vụ này.` };
            }
        }
    }
    
    // Check party size requirements
    if (task.requirements.partySize) {
        if (characterIds.length < task.requirements.partySize.min || characterIds.length > task.requirements.partySize.max) {
            return { error: `Nhiệm vụ yêu cầu từ ${task.requirements.partySize.min} đến ${task.requirements.partySize.max} người.` };
        }
    } else if (characterIds.length > 1) {
        return { error: `Nhiệm vụ này chỉ cho một người.` };
    }

    const newClan = deepClone(clan);
    const characterNames: string[] = [];
    for (const characterId of characterIds) {
        const memberToUpdate = newClan.members.find((m: any) => m.id === characterId)!;
        memberToUpdate.activeTaskId = taskId;
        memberToUpdate.taskProgress = 0;
        characterNames.push(memberToUpdate.name);
    }

    // Add task to cooldown
    const taskIndex = newClan.availableTasks.findIndex((t: any) => t.id === taskId);
    if (taskIndex !== -1) {
        newClan.availableTasks.splice(taskIndex, 1);
        newClan.taskCooldowns[taskId] = date.year + 1;
    }

    return {
        updatedClan: newClan,
        newEvents: [{
            description: `${characterNames.join(', ')} đã bắt đầu thực hiện nhiệm vụ: ${task.name}.`,
            characterIds: characterIds
        }]
    };
}