import type { Clan, Event, CultivationStage, Character, WelcomePackageItem, PromotionRule } from '../../types/index.ts';
import { RankType, CharacterStatus, ItemQuality, CultivationStage as CS, RelationshipClass, ItemType } from '../../types/index.ts';
import { LINH_MACH_DATA, ALL_ITEMS, MARRIAGE_AGE_MIN } from '../../constants.ts';
import { getNextTierAndQuality } from '../utils/clone.ts';
import { deepClone } from '../utils/clone.ts';

type ClanActionResult = { updatedClan?: Clan; newEvents?: Omit<Event, 'id' | 'date'>[]; error?: string; };

const unassignCharacterFromAnyRole = (character: Character, clan: Clan) => {
    // Unassign from any building station
    for (const b of Object.values(clan.buildings)) {
        if (b.managerId === character.id) b.managerId = null;
        for (const s of b.stations) {
            if (s.workerId === character.id) {
                s.workerId = null;
                s.isActive = false; // Stop crafting/activity if worker leaves
            }
            const appIndex = s.apprenticeIds.indexOf(character.id);
            if (appIndex !== -1) {
                s.apprenticeIds[appIndex] = null;
            }
        }
    }

    // Clear Linh Mach assignment
    const assignments = clan.linhMach.miningAssignments;
    if (assignments.supervisorId === character.id) assignments.supervisorId = null;
    const minerIndex = assignments.minerIds.indexOf(character.id);
    if (minerIndex > -1) assignments.minerIds[minerIndex] = null;

    character.assignedToBuildingId = undefined;
    character.assignedToSlotIndex = undefined;
    character.assignedToSlotType = undefined;
};


export function upgradeLinhMach(clan: Clan): ClanActionResult {
    const nextLinhMach = getNextTierAndQuality(clan.linhMach.tier, clan.linhMach.quality);
    if (!nextLinhMach) return { error: 'Linh mạch đã đạt cấp tối đa.' };

    const nextInfo = LINH_MACH_DATA[nextLinhMach.tier]?.[nextLinhMach.quality];
    if (!nextInfo) return { error: 'Không có thông tin nâng cấp cho linh mạch.' };

    if ((clan.resources.spirit_stone || 0) < nextInfo.upgradeCost) {
        return { error: 'Không đủ Linh Thạch để nâng cấp Linh Mạch.' };
    }

    const newClan = deepClone(clan);
    newClan.resources.spirit_stone -= nextInfo.upgradeCost;
    newClan.linhMach.tier = nextLinhMach.tier;
    newClan.linhMach.quality = nextLinhMach.quality;
    
    // Add more miner slots on upgrade
    const tierIndex = Object.values(ItemQuality).indexOf(nextLinhMach.tier);
    const newMinerSlotsCount = 2 + tierIndex;
    while (newClan.linhMach.miningAssignments.minerIds.length < newMinerSlotsCount) {
        newClan.linhMach.miningAssignments.minerIds.push(null);
    }


    return {
        updatedClan: newClan,
        newEvents: [{ description: `Linh mạch gia tộc đã được nâng cấp lên ${nextLinhMach.tier} - ${nextLinhMach.quality}!` }]
    };
}

export function assignToLinhMach(clan: Clan, characterId: string | null, role: 'miner' | 'supervisor', slotIndex?: number): ClanActionResult {
    const newClan = deepClone(clan);
    const assignments = newClan.linhMach.miningAssignments;

    // Unassign the character who was previously in the slot
    let oldCharId: string | null = null;
    if (role === 'supervisor') {
        oldCharId = assignments.supervisorId;
    } else if (role === 'miner' && slotIndex !== undefined) {
        oldCharId = assignments.minerIds[slotIndex] ?? null;
    }

    if (oldCharId) {
        const oldChar = newClan.members.find(m => m.id === oldCharId);
        if (oldChar) unassignCharacterFromAnyRole(oldChar, newClan);
    }
    
    if (characterId === oldCharId) return { updatedClan: clan }; // No change

    // If assigning a new character, unassign them from any previous role
    if (characterId) {
        const charToAssign = newClan.members.find(m => m.id === characterId);
        if (!charToAssign) return { error: "Tộc nhân không tồn tại." };
        if (charToAssign.activeTaskId || (charToAssign.assignedToBuildingId && charToAssign.id !== oldCharId)) {
            return { error: `${charToAssign.name} đang bận.` };
        }
        unassignCharacterFromAnyRole(charToAssign, newClan);
        
        // Assign to new role
        charToAssign.assignedToBuildingId = 'linh_mach'; // Use a special ID for linh mach
        charToAssign.assignedToSlotType = role;
        charToAssign.assignedToSlotIndex = role === 'supervisor' ? -1 : slotIndex;
    }
    
    let eventDescription = '';
    const charName = characterId ? clan.members.find(m => m.id === characterId)?.name : 'Không có ai';

    if (role === 'supervisor') {
        assignments.supervisorId = characterId;
        eventDescription = `${charName} đã được bổ nhiệm làm giám sát khai thác linh mạch.`;
    } else if (role === 'miner' && slotIndex !== undefined) {
        assignments.minerIds[slotIndex] = characterId;
        eventDescription = `${charName} đã được phân công vào vị trí khai thác ${slotIndex + 1}.`;
    }

    return { updatedClan: newClan, newEvents: [{ description: eventDescription }] };
}


export function setCharacterRank(clan: Clan, characterId: string, rank: RankType): ClanActionResult {
    const character = clan.members.find(m => m.id === characterId);
    if (!character) return { error: "Không tìm thấy tộc nhân." };

    const newClan = deepClone(clan);
    const memberToUpdate = newClan.members.find((m: any) => m.id === characterId)!;
    
    // Demote old Young Patriarch if a new one is appointed
    if (rank === RankType.THIEU_TOC_TRUONG && character.rank !== RankType.THIEU_TOC_TRUONG) {
        const oldYoungPatriarch = newClan.members.find(m => m.rank === RankType.THIEU_TOC_TRUONG);
        if (oldYoungPatriarch) {
            oldYoungPatriarch.rank = RankType.DE_TU_TINH_ANH;
        }
    }
    
    memberToUpdate.rank = rank;

    return {
        updatedClan: newClan,
        newEvents: [{ description: `Thân phận của ${character.name} đã được đổi thành ${rank}.`, characterIds: [characterId] }]
    };
}

export function setRankStipend(clan: Clan, rank: RankType, itemId: string, amount: number): ClanActionResult {
    const newClan = deepClone(clan);
    if (!newClan.rankStipends[rank]) {
        newClan.rankStipends[rank] = {};
    }
    if (amount > 0) {
        newClan.rankStipends[rank][itemId] = amount;
    } else {
        delete newClan.rankStipends[rank][itemId];
    }
    return { updatedClan: newClan };
}

export function awardLibraryToken(clan: Clan, characterId: string, tokenId: string): ClanActionResult {
    const newClan = deepClone(clan);
    const character = newClan.members.find((m: any) => m.id === characterId);
    const itemInfo = ALL_ITEMS[tokenId];

    if (!character) return { error: "Không tìm thấy tộc nhân." };
    if (!itemInfo) return { error: "Vật phẩm không tồn tại." };
    if ((newClan.itemInventory[tokenId] || 0) < 1) return { error: `Trong kho không có ${itemInfo.name}.` };
    
    newClan.itemInventory[tokenId] -= 1;
    if (newClan.itemInventory[tokenId] <= 0) {
        delete newClan.itemInventory[tokenId];
    }
    character.inventory[tokenId] = (character.inventory[tokenId] || 0) + 1;
    
    return {
        updatedClan: newClan,
        newEvents: [{ description: `Gia tộc đã ban thưởng 1 ${itemInfo.name} cho ${character.name}.`, characterIds: [character.id] }]
    };
}

export function awardToCharacter(clan: Clan, characterId: string, contribution: number, itemId?: string, count?: number): ClanActionResult {
    const newClan = deepClone(clan);
    const character = newClan.members.find(m => m.id === characterId);

    if (!character) return { error: "Không tìm thấy tộc nhân." };

    let eventParts: string[] = [];

    if (contribution > 0) {
        character.contribution += contribution;
        eventParts.push(`${contribution} điểm cống hiến`);
    }

    if (itemId && count && count > 0) {
        const itemInfo = ALL_ITEMS[itemId];
        if (!itemInfo) return { error: "Vật phẩm không tồn tại." };
        if ((newClan.itemInventory[itemId] || 0) < count) return { error: `Trong kho không đủ ${itemInfo.name}.` };

        newClan.itemInventory[itemId] -= count;
        if (newClan.itemInventory[itemId] <= 0) {
            delete newClan.itemInventory[itemId];
        }

        character.inventory[itemId] = (character.inventory[itemId] || 0) + count;
        eventParts.push(`${count} ${itemInfo.name}`);
    }

    if (eventParts.length === 0) {
        return { error: "Không có gì để ban thưởng." };
    }

    return {
        updatedClan: newClan,
        newEvents: [{
            description: `Tộc trưởng đã ban thưởng cho ${character.name}: ${eventParts.join(' và ')}.`,
            characterIds: [characterId]
        }]
    };
}


export function setMandatoryQuestFrequency(clan: Clan, rank: RankType, frequency: number): ClanActionResult {
    if (frequency < 0) return { error: "Tần suất không hợp lệ." };
    const newClan = deepClone(clan);
    newClan.mandatoryQuestFrequency[rank] = frequency;
    const freqText = frequency > 0 ? `${frequency} tháng/lần` : 'Không có';
    return {
        updatedClan: newClan,
        newEvents: [{ description: `Tần suất nhiệm vụ bắt buộc cho cấp bậc ${rank} đã được đổi thành ${freqText}.` }]
    };
}

export function startElection(clan: Clan): ClanActionResult {
    if (clan.election?.isActive) {
        return { error: "Một cuộc bầu cử đã đang diễn ra." };
    }

    const candidates = clan.members.filter(m => 
        m.rank === RankType.DE_TU_TINH_ANH && 
        m.status === CharacterStatus.ALIVE &&
        m.cultivationStage !== CS.QI_REFINEMENT
    );
    if (candidates.length === 0) {
        return { error: "Không có ứng cử viên Tinh Anh (Trúc Cơ trở lên) nào để bắt đầu bầu cử." };
    }

    const newClan = deepClone(clan);
    newClan.election = {
        isActive: true,
        candidates: candidates.map(c => c.id),
        votes: {}
    };

    return {
        updatedClan: newClan,
        newEvents: [{ description: `Cuộc họp gia tộc bắt đầu! Các Trưởng Lão sẽ bỏ phiếu bầu chọn Thiếu Tộc Trưởng.` }]
    };
}

export function castVote(clan: Clan, voterId: string, candidateId: string): ClanActionResult {
    if (!clan.election?.isActive) {
        return { error: "Không có cuộc bầu cử nào đang diễn ra." };
    }

    const voter = clan.members.find(m => m.id === voterId);
    if (!voter || (voter.rank !== RankType.TRUONG_LAO && voter.rank !== RankType.DAI_TRUONG_LAO)) {
        return { error: "Chỉ Trưởng Lão mới có quyền bỏ phiếu." };
    }
    
    if (!clan.election.candidates.includes(candidateId)) {
        return { error: "Ứng cử viên không hợp lệ." };
    }

    const newClan = deepClone(clan);
    newClan.election.votes[voterId] = candidateId;
    
    return { updatedClan: newClan }; // No event for casting a vote to keep it private until the end
}

export function endElection(clan: Clan): ClanActionResult {
    if (!clan.election?.isActive) {
        return { error: "Không có cuộc bầu cử nào đang diễn ra." };
    }

    const votes = clan.election.votes;
    if (Object.keys(votes).length === 0) {
        const newClan = deepClone(clan);
        newClan.election = null;
        return {
             updatedClan: newClan,
             newEvents: [{ description: `Cuộc bầu cử kết thúc mà không có phiếu bầu nào, không ai được bổ nhiệm.` }]
        };
    }

    const voteCounts: Record<string, number> = {};
    for (const candidateId of Object.values(votes)) {
        voteCounts[candidateId] = (voteCounts[candidateId] || 0) + 1;
    }
    
    let winnerId = '';
    let maxVotes = 0;
    for (const [candidateId, count] of Object.entries(voteCounts)) {
        if (count > maxVotes) {
            maxVotes = count;
            winnerId = candidateId;
        }
    }
    
    const winners = Object.entries(voteCounts).filter(([_, count]) => count === maxVotes).map(([id, _]) => id);
    if (winners.length > 1) {
        winnerId = winners[Math.floor(Math.random() * winners.length)];
    }
    
    if (!winnerId) {
        const newClan = deepClone(clan);
        newClan.election = null;
        return { updatedClan: newClan, newEvents: [{ description: "Bỏ phiếu không thành công, không ai được chọn." }]};
    }
    
    const newClan = deepClone(clan);
    const winner = newClan.members.find((m: any) => m.id === winnerId)!;
    
    // Demote old Young Patriarch
    const oldYoungPatriarch = newClan.members.find((m: any) => m.rank === RankType.THIEU_TOC_TRUONG);
    if (oldYoungPatriarch) {
        oldYoungPatriarch.rank = RankType.DE_TU_TINH_ANH;
    }

    winner.rank = RankType.THIEU_TOC_TRUONG;
    newClan.election = null;

    return {
        updatedClan: newClan,
        newEvents: [{ description: `Sau cuộc bỏ phiếu của các Trưởng Lão, ${winner.name} đã được bầu làm Thiếu Tộc Trưởng mới!`, characterIds: [winner.id] }]
    };
}

export function setWelcomePackage(clan: Clan, items: WelcomePackageItem[]): ClanActionResult {
    const newClan = deepClone(clan);
    newClan.welcomePackage = items;
    return { updatedClan: newClan, newEvents: [{ description: "Phúc lợi gia nhập gia tộc đã được cập nhật." }] };
}

export function addPromotionRule(clan: Clan, rule: Omit<PromotionRule, 'id'>): ClanActionResult {
    const newClan = deepClone(clan);
    newClan.promotionRules = [...newClan.promotionRules, { id: crypto.randomUUID(), ...rule }];
    return { updatedClan: newClan, newEvents: [{ description: `Đã thêm quy tắc tấn thăng mới.` }] };
}

export function removePromotionRule(clan: Clan, ruleId: string): ClanActionResult {
    const newClan = deepClone(clan);
    newClan.promotionRules = newClan.promotionRules.filter(r => r.id !== ruleId);
    return { updatedClan: newClan, newEvents: [{ description: `Đã xóa một quy tắc tấn thăng.` }] };
}

export function arrangeMarriage(clan: Clan, char1Id: string, char2Id: string): ClanActionResult {
    const char1 = clan.members.find(m => m.id === char1Id);
    const char2 = clan.members.find(m => m.id === char2Id);

    if (!char1 || !char2) return { error: "Không tìm thấy tộc nhân." };
    if (char1.gender === char2.gender) return { error: "Hai người phải khác giới tính để kết hôn." };
    if (char1.age < MARRIAGE_AGE_MIN || char2.age < MARRIAGE_AGE_MIN) return { error: `Tộc nhân phải đủ ${MARRIAGE_AGE_MIN} tuổi để kết hôn.` };
    if (char1.relationships.some(r => r.class === RelationshipClass.SPOUSE) || char2.relationships.some(r => r.class === RelationshipClass.SPOUSE)) {
        return { error: "Một trong hai người đã có đạo lữ." };
    }

    const newClan = deepClone(clan);
    const member1 = newClan.members.find(m => m.id === char1Id)!;
    const member2 = newClan.members.find(m => m.id === char2Id)!;
    
    const marriageDesc = `Được gia tộc chứng giám, trở thành đạo lữ.`;
    member1.relationships.push({ class: RelationshipClass.SPOUSE, characterId: char2Id, affinity: 70, description: marriageDesc });
    member2.relationships.push({ class: RelationshipClass.SPOUSE, characterId: char1Id, affinity: 70, description: marriageDesc });
    
    return {
        updatedClan: newClan,
        newEvents: [{
            description: `Dưới sự chủ trì của tộc trưởng, ${member1.name} và ${member2.name} đã chính thức kết thành đạo lữ, chúc phúc cho đôi tân nhân!`,
            characterIds: [member1.id, member2.id]
        }]
    };
}

export function deployFormation(clan: Clan, formationId: string): ClanActionResult {
    const newClan = deepClone(clan);
    const formationItem = ALL_ITEMS[formationId];
    if (!formationItem || formationItem.type !== ItemType.FORMATION) {
        return { error: 'Vật phẩm không phải là trận pháp.' };
    }
    if ((newClan.itemInventory[formationId] || 0) < 1) {
        return { error: 'Không có trận pháp này trong kho.' };
    }

    // Undeploy current formation if exists
    if (newClan.activeFormationId) {
        const oldFormationId = newClan.activeFormationId;
        newClan.itemInventory[oldFormationId] = (newClan.itemInventory[oldFormationId] || 0) + 1;
    }
    
    // Deploy new one
    newClan.itemInventory[formationId] -= 1;
    if (newClan.itemInventory[formationId] === 0) {
        delete newClan.itemInventory[formationId];
    }
    newClan.activeFormationId = formationId;
    
    return {
        updatedClan: newClan,
        newEvents: [{ description: `${formationItem.name} đã được kích hoạt làm trận pháp hộ tộc!` }]
    };
}

export function undeployFormation(clan: Clan): ClanActionResult {
    const newClan = deepClone(clan);
    if (!newClan.activeFormationId) {
        return { error: 'Chưa có trận pháp nào được bố trí.' };
    }
    
    const oldFormationId = newClan.activeFormationId;
    const oldFormationItem = ALL_ITEMS[oldFormationId];
    
    newClan.itemInventory[oldFormationId] = (newClan.itemInventory[oldFormationId] || 0) + 1;
    newClan.activeFormationId = null;

    return {
        updatedClan: newClan,
        newEvents: [{ description: `Đã thu hồi ${oldFormationItem.name}.` }]
    };
}

export function setBreakthroughReward(clan: Clan, stage: CultivationStage, items: { itemId: string; count: number }[]): ClanActionResult {
    const newClan = deepClone(clan);
    if (items.length === 0) {
        delete newClan.breakthroughRewards[stage];
    } else {
        newClan.breakthroughRewards[stage] = items;
    }
    return {
        updatedClan: newClan,
        newEvents: [{ description: `Đã cập nhật phần thưởng đột phá cho cảnh giới ${stage}.` }]
    };
}