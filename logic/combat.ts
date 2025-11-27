import type { Character, BattleReport, BattleTurn, GameDate, Pill, ActiveBuff, Combatant } from '../types/index.ts';
import { deepClone } from './utils/clone.ts';
import { ALL_ITEMS } from '../constants.ts';
import { ItemType, CultivationStage } from '../types/enums.ts';

// Add a type for combatants to track changing stats and buffs - MOVED TO types/battle.ts

const calculateDodgeChance = (attacker: Combatant, defender: Combatant): number => {
    if (attacker.speed >= defender.speed) return 0.05; // Base 5% dodge chance even if slower
    const speedDiff = defender.speed - attacker.speed;
    // Dodge chance increases with speed difference, capped at 50%
    return Math.min(0.5, 0.05 + (speedDiff / defender.speed) * 0.45);
};

const calculateDamage = (baseDamage: number, attacker: Combatant): number => {
    let totalDamage = baseDamage;
    
    // Apply buffs
    const buffMultiplier = attacker.activeBuffs
        .filter(b => b.id.includes('bao_khi_dan') || b.id.includes('phan_thien_dan'))
        .reduce((mult, buff) => mult * buff.magnitude, 1);
    totalDamage *= buffMultiplier;

    // Critical Hit
    if (Math.random() < attacker.combatStats.critChance) {
        totalDamage *= attacker.combatStats.critDamage;
    }
    // Add some randomness
    totalDamage *= (0.9 + Math.random() * 0.2); // 90% to 110% of final damage
    return Math.floor(totalDamage);
};

const usePill = (attacker: Combatant, pill: Pill) => {
    attacker.inventory[pill.id]--;
    if (!attacker.pillsUsedInCombat) attacker.pillsUsedInCombat = {};
    attacker.pillsUsedInCombat[pill.id] = (attacker.pillsUsedInCombat[pill.id] || 0) + 1;
};


export function executeBattle(char1: Character, char2: Character, type: 'sparring' | 'life_and_death', date: GameDate): { report: BattleReport, finalCombatant1: Combatant, finalCombatant2: Combatant } {
    // Create copies of characters to modify stats during battle
    let combatant1: Combatant = { ...deepClone(char1), currentHealth: char1.health, currentMana: char1.mana, activeBuffs: [] };
    let combatant2: Combatant = { ...deepClone(char2), currentHealth: char2.health, currentMana: char2.mana, activeBuffs: [] };
    const log: BattleTurn[] = [];
    let turn = 0;

    log.push({ turnNumber: turn++, description: `Trận chiến giữa ${char1.name} và ${char2.name} bắt đầu!` });

    // Determine who goes first based on speed
    let attacker = combatant1.speed >= combatant2.speed ? combatant1 : combatant2;
    let defender = attacker.id === combatant1.id ? combatant2 : combatant1;

    while (combatant1.currentHealth > 0 && combatant2.currentHealth > 0 && turn < 50) { // turn limit to prevent infinite loops
        let actionTaken = false;

        // Pill Phase
        // Low Health
        if (attacker.currentHealth / attacker.maxHealth < 0.4) {
            const recoveryPills = Object.keys(attacker.inventory)
                .map(id => ALL_ITEMS[id] as Pill)
                .filter(p => p && p.type === ItemType.PILL && (p.effects.health_recovery || p.effects.injury_recovery || p.effects.instant_recovery || p.effects.combat_recovery || p.effects.instant_health_recovery))
                .sort((a,b) => (b.effects.health_recovery || 0) - (a.effects.health_recovery || 0));
            
            if (recoveryPills.length > 0) {
                const pillToUse = recoveryPills[0];
                if ( (pillToUse.id === 'phuong_tuy_sinh_huyet_dan' && attacker.cultivationStage === CultivationStage.SOUL_FORMATION) ||
                     (pillToUse.id === 'cuu_chuyen_long_hon_dan' && attacker.cultivationStage === CultivationStage.NASCENT_SOUL) ||
                     (pillToUse.id === 'huyet_sam_bao_khi_dan' && attacker.cultivationStage === CultivationStage.CORE_FORMATION) ||
                     (!pillToUse.effects.instant_recovery && !pillToUse.effects.combat_recovery) // Standard healing pills
                ) {
                    usePill(attacker, pillToUse);
                    if (pillToUse.effects.instant_recovery || pillToUse.effects.instant_health_recovery) {
                        const recoveryAmount = pillToUse.effects.instant_recovery || pillToUse.effects.instant_health_recovery || 0;
                        const healthHeal = (attacker.maxHealth - attacker.currentHealth) * recoveryAmount;
                        attacker.currentHealth += Math.floor(healthHeal);
                        
                        if (pillToUse.effects.instant_recovery) { // Only some pills recover mana too
                             const manaHeal = (attacker.maxMana - attacker.currentMana) * recoveryAmount;
                             attacker.currentMana += Math.floor(manaHeal);
                        }
                        log.push({ turnNumber: turn, description: `${attacker.name} uống ${pillToUse.name}, thương thế và linh lực lập tức hồi phục!` });
                    } else if (pillToUse.effects.combat_recovery) {
                        attacker.activeBuffs.push({ id: pillToUse.id, turnsRemaining: pillToUse.effects.duration || 3, magnitude: pillToUse.effects.combat_recovery });
                        log.push({ turnNumber: turn, description: `${attacker.name} uống ${pillToUse.name}, dược lực bắt đầu lan tỏa!` });
                    } else {
                        const healAmount = pillToUse.effects.health_recovery || 0;
                        attacker.currentHealth = Math.min(attacker.maxHealth, attacker.currentHealth + healAmount);
                        log.push({ turnNumber: turn, description: `${attacker.name} tình thế nguy cấp, vội vàng sử dụng ${pillToUse.name}, hồi phục ${healAmount} khí huyết!` });
                    }
                    actionTaken = true;
                }
            }
        }

        // Low Mana
        if (!actionTaken && attacker.currentMana / attacker.maxMana < 0.2) {
            const manaPill = Object.keys(attacker.inventory)
                .map(id => ALL_ITEMS[id] as Pill)
                .find(p => p && p.id === 'tien_khi_quy_nguyen_dan' && attacker.cultivationStage === CultivationStage.SOUL_FORMATION);
            
            if (manaPill) {
                usePill(attacker, manaPill);
                const recoveryAmount = manaPill.effects.instant_mana_recovery || 0;
                const manaHeal = (attacker.maxMana - attacker.currentMana) * recoveryAmount;
                attacker.currentMana += Math.floor(manaHeal);
                log.push({ turnNumber: turn, description: `${attacker.name} uống ${manaPill.name}, linh lực được bổ sung!` });
                actionTaken = true;
            }
        }
        
        // Buff Pill / Cấm Đan
        if (!actionTaken && Math.random() < 0.15) {
             const buffPills = Object.keys(attacker.inventory)
                .map(id => ALL_ITEMS[id] as Pill)
                .filter(p => p && p.type === ItemType.PILL && (p.id.includes('bao_khi_dan') || p.effects.lifespan_cost));
            
            if (buffPills.length > 0) {
                const pillToUse = buffPills[0];
                usePill(attacker, pillToUse);

                if (pillToUse.effects.lifespan_cost) {
                    attacker.maxAge -= pillToUse.effects.lifespan_cost;
                    attacker.activeBuffs.push({ id: pillToUse.id, turnsRemaining: 1, magnitude: pillToUse.effects.temporary_power_burst || 3.0 });
                    log.push({ turnNumber: turn, description: `${attacker.name} không còn đường lui, uống vào cấm đan ${pillToUse.name}, đốt cháy thọ nguyên, khí thế bùng nổ hủy diệt!` });
                } else {
                    attacker.activeBuffs.push({ id: pillToUse.id, turnsRemaining: 3, magnitude: pillToUse.effects.temporary_combat_buff || 1.1 });
                    log.push({ turnNumber: turn, description: `${attacker.name} quyết định dùng cấm đan ${pillToUse.name}, khí thế tăng vọt!` });
                }
                actionTaken = true;
            }
        }

        // Attack Phase
        if (!actionTaken) {
            const dodgeChance = calculateDodgeChance(attacker, defender);
            if (Math.random() < dodgeChance) {
                log.push({ turnNumber: turn, description: `${defender.name} thân pháp nhanh nhẹn, né được đòn tấn công của ${attacker.name}!` });
            } else {
                const manaCost = attacker.maxMana * 0.15;
                if (attacker.currentMana >= manaCost) {
                    attacker.currentMana -= manaCost;
                    const baseDamage = Math.max(1, attacker.combatStats.magicalAttack - defender.combatStats.magicalDefense);
                    const damage = calculateDamage(baseDamage, attacker);
                    defender.currentHealth -= damage;
                    log.push({ turnNumber: turn, description: `${attacker.name} vận dụng linh lực, dùng pháp thuật tấn công, gây cho ${defender.name} ${damage} sát thương!` });
                } else {
                    const baseDamage = Math.max(1, attacker.combatStats.physicalAttack - defender.combatStats.physicalDefense);
                    const damage = calculateDamage(baseDamage, attacker);
                    defender.currentHealth -= damage;
                    const manaRecovery = attacker.maxMana * 0.10;
                    attacker.currentMana = Math.min(attacker.maxMana, attacker.currentMana + manaRecovery);
                    log.push({ turnNumber: turn, description: `${attacker.name} linh lực cạn kiệt, chuyển sang cận chiến, gây cho ${defender.name} ${damage} sát thương và hồi phục linh lực.` });
                }
            }
        }
        
        // End of Turn: Update buffs
        attacker.activeBuffs.forEach(b => {
            if (b.id === 'huyet_sam_bao_khi_dan') {
                const recoveryAmount = b.magnitude;
                const healthHeal = (attacker.maxHealth - attacker.currentHealth) * (recoveryAmount / (b.turnsRemaining + 1)); // Diminishing recovery
                const manaHeal = (attacker.maxMana - attacker.currentMana) * (recoveryAmount / (b.turnsRemaining + 1));
                attacker.currentHealth = Math.min(attacker.maxHealth, attacker.currentHealth + Math.floor(healthHeal));
                attacker.currentMana = Math.min(attacker.maxMana, attacker.currentMana + Math.floor(manaHeal));
                log.push({ turnNumber: turn, description: `Dược lực của Huyết Sâm Bạo Khí Đan phát tác, ${attacker.name} hồi phục khí huyết và linh lực!` });
            }
            b.turnsRemaining--;
        });
        attacker.activeBuffs = attacker.activeBuffs.filter(b => b.turnsRemaining > 0);
        if (attacker.activeBuffs.length === 0 && log[log.length-1].description.includes('khí thế')) {
             log.push({ turnNumber: turn, description: `Dược hiệu của ${attacker.name} đã qua, khí thế trở lại bình thường.` });
        }

        // Swap roles
        [attacker, defender] = [defender, attacker];
        turn++;
    }

    let winnerId: string | null = null;
    if (combatant1.currentHealth <= 0) {
        winnerId = combatant2.id;
        log.push({ turnNumber: turn, description: `${combatant2.name} đã đánh bại ${combatant1.name}!` });
    } else if (combatant2.currentHealth <= 0) {
        winnerId = combatant1.id;
        log.push({ turnNumber: turn, description: `${combatant1.name} đã đánh bại ${combatant2.name}!` });
    } else {
        log.push({ turnNumber: turn, description: `Sau nhiều hiệp đấu, cả hai bất phân thắng bại, trận đấu kết thúc hòa!` });
    }

    const checkPostBattleEffects = (combatant: Combatant) => {
        if (!combatant.pillsUsedInCombat) return;
        for (const pillId in combatant.pillsUsedInCombat) {
            const pill = ALL_ITEMS[pillId] as Pill;
            if (pill.effects.post_battle_injury) {
                combatant.postBattleInjuryTurns = (combatant.postBattleInjuryTurns || 0) + pill.effects.post_battle_injury;
            }
        }
    };
    checkPostBattleEffects(combatant1);
    checkPostBattleEffects(combatant2);

    return {
        report: {
            id: crypto.randomUUID(),
            date,
            type,
            participants: [{ id: char1.id, name: char1.name }, { id: char2.id, name: char2.name }],
            winnerId,
            log
        },
        finalCombatant1: combatant1,
        finalCombatant2: combatant2
    };
}