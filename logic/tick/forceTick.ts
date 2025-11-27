
import { Clan, Location, Event, GameDate, WorldNews } from '../../types/index.ts';
import { Force } from '../../types/forces.ts';
import { Territory } from '../../types/world.ts';
import { FORCE_RANK_DATA } from '../../constants/constants-forces-ranks.ts';
import { ItemQuality } from '../../types/enums.ts';

// Helper để tạo nội dung tin tức
const createNews = (type: 'war' | 'rumor' | 'treasure' | 'event', content: string, month: number, importance: 'normal' | 'high' | 'critical' = 'normal'): WorldNews => ({
    id: crypto.randomUUID(),
    month,
    type,
    content,
    importance
});

const getPeakIncome = (tier: ItemQuality) => {
    switch(tier) {
        case ItemQuality.NHAT_GIAI: return 50;
        case ItemQuality.NHI_GIAI: return 150;
        case ItemQuality.TAM_GIAI: return 500;
        case ItemQuality.TU_GIAI: return 2000;
        case ItemQuality.NGU_GIAI: return 10000;
        default: return 10;
    }
}

export const processForcesTick = (locations: Location[], date: GameDate): { updatedLocations: Location[], events: Omit<Event, 'id' | 'date'>[], news: WorldNews[] } => {
    const events: Omit<Event, 'id' | 'date'>[] = [];
    const news: WorldNews[] = [];
    
    const updatedLocations = locations.map(loc => {
        const newLoc = { ...loc }; 
        
        newLoc.forces.forEach(force => {
            // 0.20.44: Skip auto-actions for player force
            if (force.id === 'player_clan_force') return;

            // Check HQ (now potentially a Peak ID, but for simplicity we still check if set)
            // In the new map generation, HQ is set to the Location ID if generated there.
            const hasHQ = force.headquartersId !== null;
            
            // 1. Thu thập tài nguyên (Chỉ khi có HQ)
            if (hasHQ) {
                let income = 0;
                
                // Thu từ Địa Bàn (Territories)
                force.territoryIds.forEach(tId => {
                    const territory = newLoc.territories.find(t => t.id === tId);
                    if (territory) {
                        income += territory.quality * 10;
                    }
                });
                
                // Thu từ Sơn Phong (Peaks) - 0.20.50
                if (newLoc.peaks) {
                    newLoc.peaks.filter(p => p.ownerForceId === force.id).forEach(p => {
                        income += getPeakIncome(p.tier);
                    });
                }

                // Thu từ Thành Trì
                if (newLoc.cities) {
                    newLoc.cities.filter(c => c.ownerForceId === force.id).forEach(c => income += c.taxIncome);
                }
                
                // Thu từ Phường Thị
                if (newLoc.markets) {
                    newLoc.markets.filter(m => m.ownerForceId === force.id).forEach(m => income += (m.size === 'large' ? 500 : m.size === 'medium' ? 300 : 100));
                }

                force.resources += income;
            
                // 2. Tăng trưởng sức mạnh & Dân số
                if (force.resources > 1000) {
                    const growthCost = Math.floor(force.resources * 0.1);
                    
                    // Tăng sức mạnh (Power)
                    force.power += growthCost;
                    
                    // Tăng dân số (Population) - Kiểm tra giới hạn 0.20.49
                    const rankData = FORCE_RANK_DATA[force.rank];
                    const popCap = rankData ? rankData.populationCap : 99999;
                    
                    if (force.population < popCap) {
                        const popGrowth = Math.max(1, Math.floor(force.population * 0.01)); // 1% growth
                        force.population = Math.min(popCap, force.population + popGrowth);
                    }

                    force.resources -= growthCost;
                }
            } else {
                // Mất gốc, suy giảm sức mạnh
                force.power = Math.max(0, Math.floor(force.power * 0.98));
                force.population = Math.max(0, Math.floor(force.population * 0.98)); 
            }

            // 3. Hành động quân sự (10% cơ hội mỗi tháng)
            if (hasHQ && Math.random() < 0.1) {
                performMilitaryAction(force, newLoc.forces, newLoc.territories, newLoc.peaks, newLoc.name, events, news, date.month);
            }
        });

        // 4. Flavor News
        if (Math.random() < 0.01) {
             generateFlavorNews(newLoc, news, date.month);
        }

        return newLoc;
    });

    return { updatedLocations, events, news };
};

const performMilitaryAction = (
    attacker: Force, 
    allForces: Force[], 
    allTerritories: Territory[], 
    allPeaks: any[] | undefined,
    locationName: string,
    events: Omit<Event, 'id' | 'date'>[],
    news: WorldNews[],
    month: number
) => {
    // Priority 1: Claim unowned Peaks (High Value)
    if (allPeaks) {
        const unownedPeaks = allPeaks.filter(p => p.ownerForceId === null);
        if (unownedPeaks.length > 0 && Math.random() < 0.8) {
            const target = unownedPeaks[Math.floor(Math.random() * unownedPeaks.length)];
            target.ownerForceId = attacker.id;
            news.push(createNews('event', `[${locationName}] ${attacker.name} đã chiếm lĩnh ${target.name}, xây dựng phân đà.`, month));
            return;
        }
    }

    // Priority 2: Claim unowned Territories
    const unownedTerritories = allTerritories.filter(t => t.ownerForceId === null);
    if (unownedTerritories.length > 0 && Math.random() < 0.7) {
        const target = unownedTerritories[Math.floor(Math.random() * unownedTerritories.length)];
        target.ownerForceId = attacker.id;
        attacker.territoryIds.push(target.id);
        
        if (attacker.rank !== 'Hạ lưu Thế Lực' && (target.tier === 'Tam Giai' || target.tier === 'Tứ Giai' || target.tier === 'Ngũ Giai')) {
             news.push(createNews('event', `[${locationName}] ${attacker.name} đã tiếp quản ${target.name}, mở rộng phạm vi ảnh hưởng.`, month));
        }
        return;
    }

    // Priority 3: Attack other forces
    const potentialTargets = allForces.filter(f => f.id !== attacker.id && f.territoryIds.length > 0);
    if (potentialTargets.length === 0) return;

    const defender = potentialTargets[Math.floor(Math.random() * potentialTargets.length)];
    const targetTerritoryId = defender.territoryIds[Math.floor(Math.random() * defender.territoryIds.length)];
    const targetTerritory = allTerritories.find(t => t.id === targetTerritoryId);

    if (!targetTerritory) return;

    const attackRoll = attacker.power * (0.8 + Math.random() * 0.4);
    const defenseRoll = defender.power * (0.8 + Math.random() * 0.4);

    if (attackRoll > defenseRoll) {
        // Thắng: Cướp địa bàn
        defender.territoryIds = defender.territoryIds.filter(id => id !== targetTerritoryId);
        attacker.territoryIds.push(targetTerritoryId);
        targetTerritory.ownerForceId = attacker.id;
        
        defender.power = Math.floor(defender.power * 0.9);
        attacker.power = Math.floor(attacker.power * 1.05);

        const isMajorWar = attacker.power > 50000 || defender.power > 50000;
        const importance = isMajorWar ? 'high' : 'normal';
        
        news.push(createNews('war', `[${locationName}] Chiến sự bùng nổ! ${attacker.name} đã đánh bại ${defender.name}, đoạt lấy ${targetTerritory.name}.`, month, importance));

        if (defender.id === 'player_clan_force') {
             events.push({
                description: `[${locationName}] ${attacker.name} đã tấn công và chiếm đoạt ${targetTerritory.name} của gia tộc ta!`
            });
        }
    } else {
        // Thua
        attacker.power = Math.floor(attacker.power * 0.95);
        if (defender.id === 'player_clan_force') {
             events.push({
                description: `[${locationName}] ${attacker.name} đã cố gắng tấn công ${targetTerritory.name} nhưng bị gia tộc ta đẩy lùi.`
            });
        }
    }
};

const generateFlavorNews = (location: Location, news: WorldNews[], month: number) => {
    const templates = [
        { type: 'treasure', text: `Tại ${location.name}, có tin đồn về một di tích thượng cổ vừa xuất thế, thu hút vô số tu sĩ đến thám hiểm.` },
        { type: 'rumor', text: `Nghe đồn tại ${location.name}, linh khí đột nhiên biến động dữ dội, nghi là có dị bảo xuất hiện.` },
        { type: 'event', text: `Một phiên đấu giá lớn vừa được tổ chức tại ${location.name}, nhiều bảo vật hiếm thấy đã lộ diện.` },
        { type: 'rumor', text: `Có tin đồn một cao thủ ẩn thế đang độ kiếp tại ${location.name}, lôi kiếp chấn động ngàn dặm.` },
        { type: 'event', text: `Yêu thú tại ${location.name} có dấu hiệu bạo loạn, các thế lực địa phương đang tăng cường phòng thủ.` },
    ];
    
    if (location.kingdoms && location.kingdoms.length > 0) {
        templates.push({ type: 'event', text: `Hoàng đế của ${location.kingdoms[0].name} tại ${location.name} đang chiêu mộ hiền tài, ban thưởng hậu hĩnh.` });
    }

    const template = templates[Math.floor(Math.random() * templates.length)];
    // @ts-ignore
    news.push(createNews(template.type, template.text, month, 'normal'));
}
