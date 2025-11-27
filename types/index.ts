
export * from './enums.ts';
export * from './world.ts';
export * from './items.ts';
export * from './needs.ts';
export * from './character.ts';
export * from './clan.ts';
export * from './activity.ts';
export * from './forces.ts';
export * from './battle.ts';
export * from './beast.ts';

import type { Clan } from './clan.ts';
import type { GameDate, Event, Location, LocationData, WorldNews, District } from './world.ts';
import type { Force } from './forces.ts';
import type { BattleReport } from './battle.ts';

// Represents the full savable state of the game
export interface GameState {
    locations: Location[];
    districts: District[]; // New
    forces: Force[];
    locationDataCache: Record<string, LocationData>;
    clan: Clan | null;
    gameDate: GameDate;
    isRunning: boolean;
    gameSpeed: number;
    events: Event[];
    battleReports: BattleReport[];
    worldNews: WorldNews[];
    handleSelectLocation: (location: Location) => void;
    handleTogglePlay: () => void;
    handleSetSpeed: (speed: number) => void;
}
