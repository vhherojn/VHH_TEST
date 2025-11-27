
import { useCallback } from 'react';
import { CultivationStage, RankType, ItemQuality } from '../types/index.ts';
import type { Clan, Event, GameDate, Character, MeritShopItem, WelcomePackageItem, PromotionRule, Formation, BattleReport, Location } from '../types/index.ts';

// Import all action functions
import * as buildingActions from '../logic/actions/buildingActions.ts';
import * as clanActions from '../logic/actions/clanActions.ts';
import * as itemActions from '../logic/actions/itemActions.ts';
import * as taskActions from '../logic/actions/taskActions.ts';
import * as techniqueActions from '../logic/actions/techniqueActions.ts';
import * as equipmentActions from '../logic/actions/equipmentActions.ts';
import * as meritShopActions from '../logic/actions/meritShopActions.ts';
import * as recruitmentActions from '../logic/actions/recruitmentActions.ts';
import * as combatActions from '../logic/actions/combatActions.ts';
import * as cultivationActions from '../logic/actions/cultivationActions.ts';
import * as subBranchActions from '../logic/actions/subBranchActions.ts';

export interface ActionResult { 
  updatedClan?: Clan; 
  newEvents?: Omit<Event, 'id'|'date'>[]; 
  newBattleReport?: BattleReport;
  error?: string; 
};

export interface GameActions {
    upgradeLinhMach: () => void;
    upgradeBuilding: (buildingId: string) => void;
    assignToBuilding: (buildingId: string, characterId: string | null, slotType: 'worker' | 'apprentice', tier: ItemQuality, slotIndex: number, apprenticeSlotIndex?: 0 | 1) => void;
    assignToHuntingParty: (characterId: string | null, tier: ItemQuality, slotIndex: number) => void;
    startCrafting: (buildingId: string, stationIndex: number, recipeId: string) => void;
    setBuildingRecipe: (buildingId: string, recipeId: string | null) => void;
    sparring: (char1Id: string, char2Id: string) => void;
    lifeAndDeathBattle: (char1Id: string, char2Id: string) => void;
    assignTask: (characterIds: string[], taskId: string) => void;
    setCharacterRank: (characterId: string, rank: RankType) => void;
    setRankStipend: (rank: RankType, itemId: string, amount: number) => void;
    storeTechnique: (techniqueId: string) => void;
    patriarchLearnTechnique: (techniqueId: string) => void;
    equipItem: (characterId: string, itemId: string) => void;
    unequipItem: (characterId: string, equipmentSlot: keyof Character['equipment'] | string) => void;
    useItem: (characterId: string, itemId: string) => void;
    storeToMeritShop: (itemId: string, count: number, cost: number) => void;
    buyFromMeritShop: (characterId: string, meritShopItem: MeritShopItem) => void;
    storeItemToClan: (characterId: string, itemId: string) => void;
    unequipTechnique: (characterId: string, techniqueId: string) => void;
    discoverRecruits: () => void;
    confirmRecruitment: (recruitId: string) => void;
    awardLibraryToken: (characterId: string) => void;
    setMandatoryQuestFrequency: (rank: RankType, frequency: number) => void;
    startElection: () => void;
    castVote: (voterId: string, candidateId: string) => void;
    endElection: () => void;
    assignToLinhMach: (characterId: string | null, role: "miner" | "supervisor", slotIndex?: number | undefined) => void;
    equipTechnique: (characterId: string, techniqueId: string, slotType: "mainCultivation" | "subCultivation" | "secretArts" | "spells", slotIndex: number) => void;
    setWelcomePackage: (items: WelcomePackageItem[]) => void;
    addPromotionRule: (rule: Omit<PromotionRule, 'id'>) => void;
    removePromotionRule: (ruleId: string) => void;
    arrangeMarriage: (char1Id: string, char2Id: string) => void;
    deployFormation: (formationId: string) => void;
    undeployFormation: () => void;
    awardToCharacter: (characterId: string, contribution: number, itemId?: string, count?: number) => void;
    attemptFinalBreakthrough: (characterId: string) => void;
    declineFinalBreakthrough: (characterId: string) => void;
    startSeclusionForBreakthrough: (characterId: string, aidItemId?: string) => void;
    postponeBreakthrough: (characterId: string) => void;
    setBreakthroughReward: (stage: CultivationStage, items: { itemId: string; count: number }[]) => void;
    assignManagerToBuilding: (buildingId: string, characterId: string | null) => void;
    setStationAutoCraft: (buildingId: string, stationIndex: number, recipeId: string | null) => void;
    // SubBranch actions
    establishSubBranch: (location: Location) => void;
    appointSubBranchMaster: (location: Location, characterId: string) => void;
    investigateSubBranch: (location: Location) => void;
}

type ExecuteActionFunc = (action: (clan: Clan, ...args: any[]) => ActionResult, ...args: any[]) => void;

export const useGameActions = (executeAction: ExecuteActionFunc, gameDate: GameDate): GameActions => {
    // Special handler to update Location state directly (bypassing the standard executeAction for location-specific mutations if needed)
    // Note: In this architecture, we are actually modifying the Location object reference passed from the UI, 
    // but since state is held in useGameLoop, we need a way to trigger a re-render or state update.
    // For now, we will mutate the clan resources via executeAction, and mutate the location object directly
    // assuming React will pick up changes if the location array is shallow copied in gameTick.
    // Ideally, we should pass setLocations here, but to keep it simple we'll rely on the next tick to persist heavy changes.
    
    // However, for immediate UI updates, we can pass the location object and mutate it.
    
    return {
        upgradeLinhMach: useCallback(() => executeAction(clanActions.upgradeLinhMach), [executeAction]),
        upgradeBuilding: useCallback((buildingId: string) => executeAction(buildingActions.upgradeBuilding, buildingId), [executeAction]),
        assignToBuilding: useCallback((buildingId: string, characterId: string | null, slotType: 'worker' | 'apprentice', tier: ItemQuality, slotIndex: number, apprenticeSlotIndex?: 0 | 1) => {
             executeAction(buildingActions.assignToCraftingStation, buildingId, slotIndex, slotType, characterId, apprenticeSlotIndex);
        }, [executeAction]),
        assignToHuntingParty: useCallback((characterId: string | null, tier: ItemQuality, slotIndex: number) => executeAction(buildingActions.assignToHuntingParty, characterId, tier, slotIndex), [executeAction]),
        startCrafting: useCallback((buildingId: string, stationIndex: number, recipeId: string) => executeAction(buildingActions.startCrafting, buildingId, stationIndex, recipeId), [executeAction]),
        setBuildingRecipe: useCallback((buildingId: string, recipeId: string | null) => {
             if (buildingId === 'herb_garden') {
                executeAction(buildingActions.setGardenPlanting, buildingId, recipeId);
            }
        }, [executeAction]),
        assignTask: useCallback((characterIds: string[], taskId: string) => executeAction(taskActions.assignTask, characterIds, taskId, gameDate), [executeAction, gameDate]),
        setCharacterRank: useCallback((characterId: string, rank: RankType) => executeAction(clanActions.setCharacterRank, characterId, rank), [executeAction]),
        setRankStipend: useCallback((rank: RankType, itemId: string, amount: number) => executeAction(clanActions.setRankStipend, rank, itemId, amount), [executeAction]),
        storeTechnique: useCallback((techniqueId: string) => executeAction(techniqueActions.storeTechnique, techniqueId), [executeAction]),
        patriarchLearnTechnique: useCallback((techniqueId: string) => executeAction(techniqueActions.patriarchLearnTechnique, techniqueId), [executeAction]),
        equipItem: useCallback((characterId: string, itemId: string) => executeAction(equipmentActions.equipItem, characterId, itemId), [executeAction]),
        unequipItem: useCallback((characterId: string, equipmentSlot: keyof Character['equipment'] | string) => executeAction(equipmentActions.unequipItem, characterId, equipmentSlot), [executeAction]),
        useItem: useCallback((characterId: string, itemId: string) => executeAction(itemActions.useItem, characterId, itemId), [executeAction]),
        storeToMeritShop: useCallback((itemId: string, count: number, cost: number) => executeAction(meritShopActions.storeToMeritShop, itemId, count, cost), [executeAction]),
        buyFromMeritShop: useCallback((characterId: string, meritShopItem: MeritShopItem) => executeAction(meritShopActions.buyFromMeritShop, characterId, meritShopItem), [executeAction]),
        storeItemToClan: useCallback((characterId: string, itemId: string) => executeAction(itemActions.storeItemToClan, characterId, itemId), [executeAction]),
        unequipTechnique: useCallback((characterId: string, techniqueId: string) => executeAction(techniqueActions.unequipTechnique, characterId, techniqueId), [executeAction]),
        discoverRecruits: useCallback(() => executeAction(recruitmentActions.discoverNewTalent), [executeAction]),
        confirmRecruitment: useCallback((recruitId: string) => executeAction(recruitmentActions.recruitNewMember, recruitId), [executeAction]),
        awardLibraryToken: useCallback((characterId: string) => executeAction(clanActions.awardLibraryToken, characterId, 'library_token_1'), [executeAction]),
        setMandatoryQuestFrequency: useCallback((rank: RankType, frequency: number) => executeAction(clanActions.setMandatoryQuestFrequency, rank, frequency), [executeAction]),
        sparring: useCallback((char1Id: string, char2Id: string) => executeAction(combatActions.spar, char1Id, char2Id, gameDate), [executeAction, gameDate]),
        lifeAndDeathBattle: useCallback((char1Id: string, char2Id: string) => executeAction(combatActions.lifeAndDeathBattle, char1Id, char2Id, gameDate), [executeAction, gameDate]),
        assignToLinhMach: useCallback((characterId: string | null, role: 'miner' | 'supervisor', slotIndex?: number) => executeAction(clanActions.assignToLinhMach, characterId, role, slotIndex), [executeAction]),
        equipTechnique: useCallback((characterId: string, techniqueId: string, slotType: 'mainCultivation' | 'subCultivation' | 'secretArts' | 'spells', slotIndex: number) => executeAction(techniqueActions.equipTechnique, characterId, techniqueId, slotType, slotIndex), [executeAction]),
        startElection: useCallback(() => executeAction(clanActions.startElection), [executeAction]),
        castVote: useCallback((voterId: string, candidateId: string) => executeAction(clanActions.castVote, voterId, candidateId), [executeAction]),
        endElection: useCallback(() => executeAction(clanActions.endElection), [executeAction]),
        setWelcomePackage: useCallback((items: WelcomePackageItem[]) => executeAction(clanActions.setWelcomePackage, items), [executeAction]),
        addPromotionRule: useCallback((rule: Omit<PromotionRule, 'id'>) => executeAction(clanActions.addPromotionRule, rule), [executeAction]),
        removePromotionRule: useCallback((ruleId: string) => executeAction(clanActions.removePromotionRule, ruleId), [executeAction]),
        arrangeMarriage: useCallback((char1Id: string, char2Id: string) => executeAction(clanActions.arrangeMarriage, char1Id, char2Id), [executeAction]),
        deployFormation: useCallback((formationId: string) => executeAction(clanActions.deployFormation, formationId), [executeAction]),
        undeployFormation: useCallback(() => executeAction(clanActions.undeployFormation), [executeAction]),
        awardToCharacter: useCallback((characterId: string, contribution: number, itemId?: string, count?: number) => executeAction(clanActions.awardToCharacter, characterId, contribution, itemId, count), [executeAction]),
        attemptFinalBreakthrough: useCallback((characterId: string) => executeAction(cultivationActions.attemptFinalBreakthrough, characterId), [executeAction]),
        declineFinalBreakthrough: useCallback((characterId: string) => executeAction(cultivationActions.declineFinalBreakthrough, characterId), [executeAction]),
        startSeclusionForBreakthrough: useCallback((characterId: string, aidItemId?: string) => executeAction(cultivationActions.startSeclusionForBreakthrough, characterId, aidItemId), [executeAction]),
        postponeBreakthrough: useCallback((characterId: string) => executeAction(cultivationActions.postponeBreakthrough, characterId), [executeAction]),
        setBreakthroughReward: useCallback((stage: CultivationStage, items: { itemId: string; count: number }[]) => executeAction(clanActions.setBreakthroughReward, stage, items), [executeAction]),
        assignManagerToBuilding: useCallback((buildingId: string, characterId: string | null) => executeAction(buildingActions.assignManagerToBuilding, buildingId, characterId), [executeAction]),
        setStationAutoCraft: useCallback((buildingId: string, stationIndex: number, recipeId: string | null) => executeAction(buildingActions.setStationAutoCraft, buildingId, stationIndex, recipeId), [executeAction]),
        
        establishSubBranch: useCallback((location: Location) => {
            // This is a bit tricky as we need to update Location state.
            // We will update clan resources first.
            executeAction((clan) => {
                const result = subBranchActions.establishSubBranch(clan, location.id);
                if (!result.error) {
                    // Mutate location directly (dirty but effective for now given the architecture)
                    location.subBranches['player_clan_force'] = {
                        forceId: 'player_clan_force',
                        masterId: null,
                        budget: 0,
                        corruption: 0,
                        loyalty: 100,
                        lastInvestigation: gameDate.year * 12 + gameDate.month
                    };
                }
                return result;
            });
        }, [executeAction, gameDate]),
        
        appointSubBranchMaster: useCallback((location: Location, characterId: string) => {
            executeAction((clan) => {
                const result = subBranchActions.appointSubBranchMaster(clan, location.id, characterId);
                if (!result.error) {
                    const subBranch = location.subBranches['player_clan_force'];
                    if (subBranch) subBranch.masterId = characterId;
                }
                return result;
            });
        }, [executeAction]),
        
        investigateSubBranch: useCallback((location: Location) => {
             executeAction((clan) => {
                const subBranch = location.subBranches['player_clan_force'];
                if (subBranch) {
                    // Reset corruption partly
                    subBranch.corruption = Math.max(0, subBranch.corruption - 30);
                    subBranch.lastInvestigation = gameDate.year * 12 + gameDate.month;
                    return { updatedClan: clan, newEvents: [{ description: `Đã tiến hành điều tra Tiểu Phân Đà tại ${location.name}, chấn chỉnh kỷ cương.` }] };
                }
                return { error: "Không có phân đà tại đây." };
            });
        }, [executeAction, gameDate]),
    };
}
