
import type { Clan, GameDate, Event, Character, Task } from '../../types/index.ts';
import { CultivationStage, CharacterStatus, RankType, ItemQuality } from '../../types/index.ts';
import { LINH_MACH_DATA, TASKS } from '../../constants.ts';

type ClanTickResult = {
    updatedClan: Clan;
    newEvents: Omit<Event, 'id' | 'date'>[];
};

const handleStipends = (clan: Clan): { clan: Clan, newEvents: Omit<Event, 'id'|'date'>[] } => {
    const newEvents: Omit<Event, 'id'|'date'>[] = [];
    const membersToReceiveStipend = clan.members.filter(m => m.status === CharacterStatus.ALIVE);

    // First, calculate total required resources
    const totalRequiredResources: Record<string, number> = {};
    for (const member of membersToReceiveStipend) {
        const stipendItems = clan.rankStipends[member.rank];
        if (stipendItems) {
            for (const [itemId, amount] of Object.entries(stipendItems)) {
                totalRequiredResources[itemId] = (totalRequiredResources[itemId] || 0) + amount;
            }
        }
    }

    // Check if clan can afford ALL stipends
    const canAfford = Object.entries(totalRequiredResources).every(([itemId, requiredAmount]) => {
        const availableAmount = itemId === 'spirit_stone' ? (clan.resources.spirit_stone || 0) : (clan.itemInventory[itemId] || 0);
        return availableAmount >= requiredAmount;
    });

    if (canAfford) {
        // Deduct resources from clan
        Object.entries(totalRequiredResources).forEach(([itemId, requiredAmount]) => {
            if (itemId === 'spirit_stone') {
                clan.resources.spirit_stone -= requiredAmount;
            } else {
                clan.itemInventory[itemId] -= requiredAmount;
            }
        });

        // Grant items to members
        for (const member of membersToReceiveStipend) {
            const stipendItems = clan.rankStipends[member.rank];
            if (stipendItems) {
                for (const [itemId, amount] of Object.entries(stipendItems)) {
                    member.inventory[itemId] = (member.inventory[itemId] || 0) + amount;
                }
            }
        }
        
        if (Object.keys(totalRequiredResources).length > 0 && Object.values(totalRequiredResources).some(v => v > 0)) {
            newEvents.push({ description: `Gia tộc đã phát bổng lộc tháng cho các tộc nhân.` });
        }
    } else if (Object.keys(totalRequiredResources).length > 0) {
        newEvents.push({ description: `Tài nguyên gia tộc không đủ để phát bổng lộc tháng này. Lòng trung thành của toàn tộc giảm sút.` });
        clan.members.forEach(m => {
            if (m.status === CharacterStatus.ALIVE) {
                m.loyalty = Math.max(0, m.loyalty - 5);
            }
        });
    }

    return { clan, newEvents };
};


const handleTasks = (clan: Clan, newDate: GameDate): { clan: Clan, newEvents: Omit<Event, 'id'|'date'>[] } => {
    const newEvents: Omit<Event, 'id'|'date'>[] = [];

    // Task Cooldown Management
    for (const [taskId, availableYear] of Object.entries(clan.taskCooldowns)) {
        if (newDate.year >= availableYear) {
            const taskToAdd = TASKS.find(t => t.id === taskId);
            if (taskToAdd && !clan.availableTasks.find(t => t.id === taskId)) {
                clan.availableTasks.push(taskToAdd);
            }
            delete clan.taskCooldowns[taskId];
        }
    }

    // Task Generation
    if (newDate.month % 6 === 0) {
        if (clan.availableTasks.length < 10) {
            const potentialTasks = TASKS.filter(t => !clan.availableTasks.some(at => at.id === t.id) && !clan.taskCooldowns[t.id]);
            if(potentialTasks.length > 0) {
                const newTask = potentialTasks[Math.floor(Math.random() * potentialTasks.length)];
                clan.availableTasks.push(newTask);
                newEvents.push({ description: `Sự Vụ Đường có nhiệm vụ mới: ${newTask.name}`});
            }
        }
    }

    // Mandatory Quest based on Rank Frequency
    const ranksDueForQuest = Object.entries(clan.mandatoryQuestFrequency)
        .filter(([, freq]) => freq > 0 && newDate.month % freq === 0)
        .map(([rank]) => rank as RankType);

    if (ranksDueForQuest.length > 0) {
        const candidates = clan.members.filter(m =>
            ranksDueForQuest.includes(m.rank) &&
            m.status === CharacterStatus.ALIVE &&
            !m.activeTaskId && 
            !m.assignedToBuildingId && 
            !m.cultivationTowerState && 
            !m.techniqueTrainingState &&
            !m.seclusionState
        );
        
        if (candidates.length > 0 && clan.availableTasks.length > 0) {
            const memberToAssign = candidates[Math.floor(Math.random() * candidates.length)];
            const taskIndex = Math.floor(Math.random() * clan.availableTasks.length);
            const randomTask = clan.availableTasks[taskIndex];
            
            memberToAssign.activeTaskId = randomTask.id;
            memberToAssign.taskProgress = 0;
            newEvents.push({ description: `Theo quy định gia tộc, ${memberToAssign.name} phải nhận nhiệm vụ bắt buộc: "${randomTask.name}".`, characterIds: [memberToAssign.id] });

            clan.availableTasks.splice(taskIndex, 1);
            clan.taskCooldowns[randomTask.id] = newDate.year + 1;
        }
    }

    return { clan, newEvents };
};

const handleLinhMach = (clan: Clan): { clan: Clan, newEvents: Omit<Event, 'id'|'date'>[] } => {
    const newEvents: Omit<Event, 'id'|'date'>[] = [];
    
    // Spirit Stone Mining
    const { supervisorId, minerIds } = clan.linhMach.miningAssignments;
    const supervisor = supervisorId ? clan.members.find(m => m.id === supervisorId) : null;
    const miners = minerIds.map(id => id ? clan.members.find(m => m.id === id) : null).filter(Boolean) as Character[];

    if (miners.length > 0) {
        let totalMined = 0;
        const supervisorBonus = supervisor ? 1 + Object.values(CultivationStage).indexOf(supervisor.cultivationStage) * 0.1 : 1;
        miners.forEach(miner => {
            const miningPower = 1 + Object.values(CultivationStage).indexOf(miner.cultivationStage);
            totalMined += Math.floor(miningPower * supervisorBonus) * 10;
        });
        clan.resources.spirit_stone = (clan.resources.spirit_stone || 0) + totalMined;
        
        // --- UPDATE STATISTICS ---
        if (clan.currentYearStats) {
            clan.currentYearStats.spiritStonesEarned += totalMined;
        }

        if (totalMined > 0) {
            newEvents.push({ description: `Các tộc nhân đã khai thác được ${totalMined} Linh Thạch từ linh mạch.` });
        }
    }
    return { clan, newEvents };
};

export const processClanTick = (clan: Clan, newDate: GameDate): ClanTickResult => {
    let updatedClan = clan;
    let allNewEvents: Omit<Event, 'id' | 'date'>[] = [];

    const stipendResult = handleStipends(updatedClan);
    updatedClan = stipendResult.clan;
    allNewEvents.push(...stipendResult.newEvents);

    const taskResult = handleTasks(updatedClan, newDate);
    updatedClan = taskResult.clan;
    allNewEvents.push(...taskResult.newEvents);
    
    const linhMachResult = handleLinhMach(updatedClan);
    updatedClan = linhMachResult.clan;
    allNewEvents.push(...linhMachResult.newEvents);

    return { updatedClan, newEvents: allNewEvents };
};
