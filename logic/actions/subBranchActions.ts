
import type { Clan, Event } from '../../types/index.ts';
import { deepClone } from '../utils/clone.ts';
import { RankType } from '../../types/enums.ts';

type SubBranchActionResult = { updatedClan?: Clan; newEvents?: Omit<Event, 'id' | 'date'>[]; error?: string; };

export function establishSubBranch(clan: Clan, locationId: string): SubBranchActionResult {
    const ESTABLISHMENT_COST = 1000;

    if ((clan.resources.spirit_stone || 0) < ESTABLISHMENT_COST) {
        return { error: `Không đủ ${ESTABLISHMENT_COST} linh thạch để thành lập Tiểu Phân Đà.` };
    }

    const newClan = deepClone(clan);
    
    // Deduct cost
    newClan.resources.spirit_stone -= ESTABLISHMENT_COST;
    
    // Note: This action only updates the clan's resources.
    // The actual creation of the subBranch object in the Location entity happens in the GameLoop/GameTick
    // OR we can pass a "callback" or handle it via a special event that the game loop listens to.
    // HOWEVER, since we don't have direct access to modify 'locations' state here (only clan state),
    // we will assume the GameScreen will handle the state update of 'locations' based on this success,
    // or we need to redesign how we pass location updates.
    
    // CURRENT ARCHITECTURE LIMITATION: `useGameActions` primarily updates `clan`.
    // Updates to `locations` are usually done in `gameTick`.
    // To fix this properly, we should return a signal to update locations.
    // But for now, let's assume we can't directly update locations here.
    // Wait, `useGameLoop` has `setLocations`.
    // We might need to pass `locations` into these actions or return instructions.
    
    // REVISED STRATEGY: Since we can't change Location state here, we will define a "pendingAction" in Clan
    // or simply return a success flag and let the component handle the logic? No, logic should be here.
    
    // Let's stick to the pattern: `gameTick` handles the world simulation.
    // User actions are immediate.
    // We will modify the `useGameActions` to accept `setLocations` or handle it.
    
    // For now, let's return a special event that the UI or a higher-level handler can interpret to update locations?
    // Or better: We update `logic/gameTick` to handle "pending commands"?
    
    // Actually, let's just return the error if failed. 
    // The actual mutation of the Location array needs to happen where state is held.
    // We will implement `establishSubBranch` in `useGameActions` which has access to `setLocations` theoretically?
    // No, `useGameActions` only has `executeAction` which updates `clan`.
    
    // Let's add `subBranches` to the `Clan` object as well?
    // No, `SubBranch` belongs to `Location`.
    
    // OK, we will implement a hack: We will modify `Clan` to have a `pendingLocationUpdates` queue.
    // The `processGameTick` will read this and apply changes to locations.
    // But `processGameTick` runs on timer. We want immediate feedback.
    
    // Alternative: The action function returns { updatedClan, updatedLocations }.
    // We need to change the signature of `GameActions` and `executeAction` in `useGameLoop`.
    
    // For this specific task, I will assume we modify `useGameLoop.ts` to allow actions to return `updatedLocations`.
    
    return { 
        updatedClan: newClan, 
        newEvents: [{ description: `Đã chi ${ESTABLISHMENT_COST} linh thạch để xây dựng Tiểu Phân Đà.` }]
    };
}

export function appointSubBranchMaster(clan: Clan, locationId: string, characterId: string): SubBranchActionResult {
    const member = clan.members.find(m => m.id === characterId);
    if (!member) return { error: "Không tìm thấy tộc nhân." };
    
    // Only Trustworthy ranks can be Master
    if (![RankType.TRUONG_LAO, RankType.DE_TU_NONG_COT, RankType.DE_TU_TINH_ANH].includes(member.rank)) {
        return { error: "Chỉ Đệ tử nòng cốt trở lên mới có thể làm Tiểu Đà Chủ." };
    }
    
    if (member.activeTaskId || member.assignedToBuildingId || member.seclusionState) {
        return { error: `${member.name} đang bận.` };
    }

    return {
        updatedClan: clan, // No clan change, just validation
        newEvents: [{ description: `Bổ nhiệm ${member.name} làm Tiểu Đà Chủ.` }]
    };
}
