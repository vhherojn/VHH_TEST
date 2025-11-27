
import { Clan, Location, Event, SubBranch, WorldNews } from '../../types/index.ts';
import { Force } from '../../types/forces.ts';

export const processSubBranchesTick = (clan: Clan, locations: Location[], month: number): { updatedLocations: Location[], newEvents: Omit<Event, 'id' | 'date'>[], newNews: WorldNews[] } => {
    const newEvents: Omit<Event, 'id' | 'date'>[] = [];
    const newNews: WorldNews[] = [];
    const updatedLocations = [...locations];

    updatedLocations.forEach(loc => {
        // Check if player has a sub-branch here
        const subBranch = loc.subBranches['player_clan_force'];
        if (!subBranch) return;

        // 1. Cost & Maintenance
        const UPKEEP = 50;
        if ((clan.resources.spirit_stone || 0) >= UPKEEP) {
            clan.resources.spirit_stone -= UPKEEP;
        } else {
            // Not enough money, loyalty drops
            subBranch.loyalty = Math.max(0, subBranch.loyalty - 5);
             if (subBranch.loyalty < 30 && Math.random() < 0.1) {
                // Rebellion due to poverty
                subBranch.isRevolting = true;
                newEvents.push({ description: `Tiểu Phân Đà tại ${loc.name} đã làm phản do thiếu kinh phí hoạt động!` });
             }
        }

        // 2. Resource Collection (from owned territories)
        // Find territories owned by player
        const playerTerritories = loc.territories.filter(t => t.ownerForceId === 'player_clan_force');
        let income = 0;
        playerTerritories.forEach(t => {
            // Base income based on quality
            let amount = Math.floor(t.quality * 0.5);
            
            // Multiplier based on Tier
            if (t.tier === 'Nhị Giai') amount *= 2;
            if (t.tier === 'Tam Giai') amount *= 5;
            if (t.tier === 'Tứ Giai') amount *= 20;
            
            income += amount;
        });

        // Corruption Check
        if (subBranch.masterId) {
            const master = clan.members.find(m => m.id === subBranch.masterId);
            if (master) {
                // Corruption based on Master's traits (e.g., Greedy personality?)
                // For now, random accumulation
                if (Math.random() < 0.2) {
                    subBranch.corruption = Math.min(100, subBranch.corruption + 5);
                }
            } else {
                // Master died or left?
                subBranch.masterId = null;
            }
        } else {
            // No master, high inefficiency/corruption growth
             if (Math.random() < 0.3) {
                subBranch.corruption = Math.min(100, subBranch.corruption + 2);
            }
        }

        // Apply Corruption Penalty
        const corruptedAmount = Math.floor(income * (subBranch.corruption / 100));
        const actualIncome = Math.max(0, income - corruptedAmount);

        clan.resources.spirit_stone = (clan.resources.spirit_stone || 0) + actualIncome;
        
        if (subBranch.corruption > 80 && !subBranch.isRevolting) {
            if (Math.random() < 0.05) {
                subBranch.isRevolting = true;
                newEvents.push({ description: `Tiểu Đà Chủ tại ${loc.name} đã tham ô quá độ và quyết định làm phản, chiếm đoạt tài sản!` });
                newNews.push({
                    id: crypto.randomUUID(),
                    month,
                    type: 'rumor',
                    content: `Nghe đồn Phân đà của ${clan.name} tại ${loc.name} đang có biến động lớn.`,
                    importance: 'high'
                });
            }
        }

        // Rebellion Handling
        if (subBranch.isRevolting) {
            // Lose control of territories
            playerTerritories.forEach(t => {
                t.ownerForceId = null; // Becomes neutral or could be assigned to a 'Rebel' force
            });
            delete loc.subBranches['player_clan_force'];
            newEvents.push({ description: `Gia tộc đã mất quyền kiểm soát tại ${loc.name} do phản loạn.` });
        }
    });

    return { updatedLocations, newEvents, newNews };
};
