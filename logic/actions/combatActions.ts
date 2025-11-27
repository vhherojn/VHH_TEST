import type { Clan, Event, Character, GameDate, BattleReport, Combatant } from '../../types/index.ts';
import { deepClone } from '../utils/clone.ts';
import { executeBattle } from '../combat.ts';
import { CharacterStatus } from '../../types/enums.ts';
import { recalculateAllStats } from '../character.ts';

type CombatActionResult = { updatedClan?: Clan; newEvents?: Omit<Event, 'id' | 'date'>[]; newBattleReport?: BattleReport; error?: string; };

const applyPostBattleEffects = (originalChar: Character, finalCombatant: Combatant) => {
    // Apply injury from pills
    if (finalCombatant.postBattleInjuryTurns) {
        originalChar.injuryTurnsRemaining = (originalChar.injuryTurnsRemaining || 0) + finalCombatant.postBattleInjuryTurns;
    }
    // Sync back inventory counts from used items
    originalChar.inventory = finalCombatant.inventory;
};

export function spar(clan: Clan, char1Id: string, char2Id: string, date: GameDate): CombatActionResult {
    const char1 = clan.members.find((c: Character) => c.id === char1Id);
    const char2 = clan.members.find((c: Character) => c.id === char2Id);
    if (!char1 || !char2) return { error: "Không tìm thấy tộc nhân để tỷ thí." };

    const { report: battleReport, finalCombatant1, finalCombatant2 } = executeBattle(char1, char2, 'sparring', date);
    const { winnerId } = battleReport;
    
    const newClan = deepClone(clan);
    const combatant1 = newClan.members.find(m => m.id === char1Id)!;
    const combatant2 = newClan.members.find(m => m.id === char2Id)!;
    
    applyPostBattleEffects(combatant1, finalCombatant1);
    applyPostBattleEffects(combatant2, finalCombatant2);
    
    const newEvents: Omit<Event, 'id' | 'date'>[] = [];

    if (winnerId) {
        const winner = winnerId === combatant1.id ? combatant1 : combatant2;
        const loser = winnerId === combatant1.id ? combatant2 : combatant1;

        const winnerExpGain = 20 + Math.floor(Math.random() * 11); // 20-30
        const loserExpGain = 5 + Math.floor(Math.random() * 6);   // 5-10

        winner.combatExp = (winner.combatExp || 0) + winnerExpGain;
        loser.combatExp = (loser.combatExp || 0) + loserExpGain;
    } else {
        // Draw
        const drawExpGain = 10 + Math.floor(Math.random() * 6); // 10-15
        combatant1.combatExp = (combatant1.combatExp || 0) + drawExpGain;
        combatant2.combatExp = (combatant2.combatExp || 0) + drawExpGain;
    }
    
    [combatant1, combatant2].forEach(char => {
        if (!char.combatExpToNext) char.combatExpToNext = 100;
        if ((char.combatExp || 0) >= char.combatExpToNext) {
            char.combatExp -= char.combatExpToNext;
            char.combatExpToNext = Math.floor(char.combatExpToNext * 1.5);

            const stats: ('physicalAttack' | 'magicalAttack' | 'physicalDefense' | 'magicalDefense')[] = ['physicalAttack', 'magicalAttack', 'physicalDefense', 'magicalDefense'];
            const statToUpgrade = stats[Math.floor(Math.random() * stats.length)];
            
            const increaseAmount = Math.max(1, Math.floor(char.combatStats[statToUpgrade] * 0.05));
            char.combatStats[statToUpgrade] += increaseAmount;
            
            // Recalculate combat power after stat change
            const updatedChar = recalculateAllStats(char);
            char.combatPower = updatedChar.combatPower;

            newEvents.push({
                description: `Sau trận tỷ thí, ${char.name} có điều ngộ ra, thực chiến kinh nghiệm tăng, ${statToUpgrade} tăng ${increaseAmount}!`,
                characterIds: [char.id]
            });
        }
    });
    
    return { updatedClan: newClan, newEvents, newBattleReport: battleReport };
}

export function lifeAndDeathBattle(clan: Clan, char1Id: string, char2Id: string, date: GameDate): CombatActionResult {
    const char1 = clan.members.find((c: Character) => c.id === char1Id);
    const char2 = clan.members.find((c: Character) => c.id === char2Id);
    if (!char1 || !char2) return { error: "Không tìm thấy tộc nhân để sinh tử chiến." };

    const { report: battleReport, finalCombatant1, finalCombatant2 } = executeBattle(char1, char2, 'life_and_death', date);
    const { winnerId } = battleReport;

    if (!winnerId) { // It was a draw, or someone escaped
        return { newBattleReport: battleReport };
    }
    
    const newClan = deepClone(clan);
    const winner = newClan.members.find(m => m.id === winnerId)!;
    const loser = newClan.members.find(m => m.id !== winnerId && (m.id === char1Id || m.id === char2Id))!;
    
    const finalWinnerState = winner.id === finalCombatant1.id ? finalCombatant1 : finalCombatant2;
    applyPostBattleEffects(winner, finalWinnerState);

    loser.status = CharacterStatus.DECEASED;
    winner.combatExp = (winner.combatExp || 0) + 100; // More EXP for a real fight
    
    // Looting logic
    let lootedItems = '';
    for (const [itemId, count] of Object.entries(loser.inventory)) {
        if (count > 0 && Math.random() < 0.5) { // 50% chance to loot each item stack
            winner.inventory[itemId] = (winner.inventory[itemId] || 0) + count;
            lootedItems += `${count} ${itemId}, `;
        }
    }
    loser.inventory = {}; // Loser loses everything
    
    const newEvents: Omit<Event, 'id'|'date'>[] = [{
        description: `Trong trận Sinh Tử Chiến, ${loser.name} đã không địch lại ${winner.name} và bỏ mạng tại Võ Đài.`,
        characterIds: [winner.id, loser.id]
    }];
    if (lootedItems) {
        newEvents.push({
            description: `${winner.name} đã thu được chiến lợi phẩm từ ${loser.name}.`,
            characterIds: [winner.id]
        });
    }

    return { updatedClan: newClan, newEvents, newBattleReport: battleReport };
}