
import type { Clan, GameDate, Event, WorldNews } from '../types/index.ts';
import { processClanTick } from './tick/clanTick.ts';
import { processBuildingsTick } from './tick/buildingTick.ts';
import { processCharactersTick } from './tick/characterTick.ts';
import { processForcesTick } from './tick/forceTick.ts';
import { processSubBranchesTick } from './tick/subBranchTick.ts';
import { CharacterStatus, Location } from '../types/index.ts';
import { deepClone } from './utils/clone.ts';

// Cập nhật return type để bao gồm worldNews
export const processGameTick = (
    clan: Clan, 
    locations: Location[], 
    newDate: GameDate
): { nextClan: Clan, nextLocations: Location[], newEvents: Omit<Event, 'id' | 'date'>[], newWorldNews: WorldNews[] } => {
    
    let nextClan: Clan = clan;
    // Clone locations để xử lý immutable state trong React
    let nextLocations: Location[] = deepClone(locations); 
    
    const allNewEvents: Omit<Event, 'id' | 'date'>[] = [];
    const allNewWorldNews: WorldNews[] = [];
    
    // Check if a year has passed (Month 12 -> 1)
    const isNewYear = newDate.month === 1;

    if (isNewYear) {
        // ... (Logic thống kê năm giữ nguyên) ...
        if (!nextClan.yearlyRecords) nextClan.yearlyRecords = [];
        if (!nextClan.currentYearStats) {
            nextClan.currentYearStats = { spiritStonesEarned: 0, itemsCreated: 0, births: 0, deaths: 0 };
        }

        const activeMembers = nextClan.members.filter(m => m.status === CharacterStatus.ALIVE);
        const totalCombatPower = activeMembers.reduce((sum, m) => sum + m.combatPower, 0);
        
        const stageWeights = { 'Luyện Khí Kỳ': 0, 'Trúc Cơ Kỳ': 10, 'Kết Đan Kỳ': 20, 'Nguyên Anh Kỳ': 30, 'Hóa Thần Kỳ': 40 };
        const totalCultivationScore = activeMembers.reduce((sum, m) => sum + (stageWeights[m.cultivationStage] || 0) + m.cultivationLevel, 0);
        const avgCultivationLevel = activeMembers.length > 0 ? totalCultivationScore / activeMembers.length : 0;

        nextClan.yearlyRecords.push({
            year: newDate.year - 1,
            population: activeMembers.length,
            totalCombatPower: totalCombatPower,
            spiritStonesEarned: nextClan.currentYearStats.spiritStonesEarned,
            itemsCreated: nextClan.currentYearStats.itemsCreated,
            births: nextClan.currentYearStats.births,
            deaths: nextClan.currentYearStats.deaths,
            avgCultivationLevel: parseFloat(avgCultivationLevel.toFixed(1)),
        });

        if (nextClan.yearlyRecords.length > 100) {
            nextClan.yearlyRecords.shift();
        }

        nextClan.currentYearStats = {
            spiritStonesEarned: 0,
            itemsCreated: 0,
            births: 0,
            deaths: 0,
        };
    }

    // 1. Clan Tick
    const clanResult = processClanTick(nextClan, newDate);
    nextClan = clanResult.updatedClan;
    allNewEvents.push(...clanResult.newEvents);
    
    // 2. Building Tick
    const buildingResult = processBuildingsTick(nextClan, newDate);
    nextClan = buildingResult.updatedClan;
    allNewEvents.push(...buildingResult.newEvents);

    // 3. Character Tick
    const characterResult = processCharactersTick(nextClan, newDate);
    nextClan = characterResult.updatedClan;
    allNewEvents.push(...characterResult.newEvents);

    // --- 0.20.33 SYNC PLAYER CLAN TO FORCE ---
    // Tính tổng sức mạnh hiện tại của gia tộc
    const activeMembers = nextClan.members.filter(m => m.status === CharacterStatus.ALIVE);
    const totalClanPower = activeMembers.reduce((sum, m) => sum + m.combatPower, 0);
    
    // Tìm và cập nhật Force đại diện cho người chơi trên bản đồ
    for (const loc of nextLocations) {
        if (loc.isAncestral) { // Assuming player force is always at ancestral location
            const playerForce = loc.forces.find(f => f.id === 'player_clan_force');
            if (playerForce) {
                playerForce.power = totalClanPower;
                playerForce.resources = nextClan.resources.spirit_stone || 0;
                playerForce.name = nextClan.name; // Sync name in case it changes (unlikely but good practice)
            }
            break;
        }
    }

    // 4. Forces & World Tick
    const forceResult = processForcesTick(nextLocations, newDate);
    nextLocations = forceResult.updatedLocations;
    allNewEvents.push(...forceResult.events);
    // Add generated news
    allNewWorldNews.push(...forceResult.news);
    
    // 5. Sub-Branch Tick (New 0.20.48)
    const subBranchResult = processSubBranchesTick(nextClan, nextLocations, newDate.month);
    nextLocations = subBranchResult.updatedLocations;
    allNewEvents.push(...subBranchResult.newEvents);
    allNewWorldNews.push(...subBranchResult.newNews);

    return { nextClan, nextLocations, newEvents: allNewEvents, newWorldNews: allNewWorldNews };
};
