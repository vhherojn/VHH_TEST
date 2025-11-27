
import { useState, useCallback, useEffect } from 'react';
import { Clan, GameDate, Event, Location, LocationData, Force, BattleReport, GameState, Character, RankType, ForceRank, CultivationStage, WorldNews, District } from '../types/index.ts';
import { processGameTick } from '../logic/gameTick.ts';
import { generateLocalLocationData } from '../logic/location.ts';
import { generateWorldMap } from '../logic/map/mapGeneration.ts'; // Import mới
import { initializeNewClan } from '../logic/clanSetup.ts';
import { useGameActions } from './useGameActions.ts';
import type { GameActions, ActionResult } from './useGameActions.ts';
import { deepClone } from '../logic/utils/clone.ts';

export type { GameActions };

type NewGameConfig = { ho: string; ten: string; boiPhan: string[]; founder: Character; };

export const useGameLoop = (initialState?: GameState, newGameConfig?: NewGameConfig) => {
    const [locations, setLocations] = useState<Location[]>(() => initialState?.locations || []);
    const [districts, setDistricts] = useState<District[]>(() => initialState?.districts || []); // New State
    const [forces, setForces] = useState<Force[]>([]); // Deprecated global forces, keep empty or remove usage
    const [locationDataCache, setLocationDataCache] = useState<Record<string, LocationData>>(() => initialState?.locationDataCache || {});
    const [clan, setClan] = useState<Clan | null>(() => initialState?.clan || null);
    const [gameDate, setGameDate] = useState<GameDate>(() => initialState?.gameDate || { year: 1, month: 1 });
    const [isRunning, setIsRunning] = useState(false);
    const [gameSpeed, setGameSpeed] = useState(1);
    const [events, setEvents] = useState<Event[]>(() => initialState?.events || []);
    const [battleReports, setBattleReports] = useState<BattleReport[]>(() => initialState?.battleReports || []);
    const [worldNews, setWorldNews] = useState<WorldNews[]>(() => initialState?.worldNews || []);

    const addEvent = useCallback((eventData: Omit<Event, 'id'>) => {
        setEvents(prevEvents => [{ id: crypto.randomUUID(), ...eventData }, ...prevEvents].slice(0, 200));
    }, []);

    const addBattleReport = useCallback((reportData: BattleReport) => {
        setBattleReports(prev => [reportData, ...prev]);
    }, []);

    const executeAction = useCallback((action: (clan: Clan, ...args: any[]) => ActionResult, ...args: any[]) => {
        setClan(currentClan => {
            if (!currentClan) return null;
            const mutableClan = deepClone(currentClan);
            const result = action(mutableClan, ...args);
            
            if (result.error) {
                addEvent({ description: result.error, date: gameDate });
                return currentClan;
            }
            if (result.newEvents) {
                result.newEvents.forEach(e => addEvent({ ...e, date: gameDate }));
            }
            if (result.newBattleReport) {
                addBattleReport(result.newBattleReport);
            }
            return result.updatedClan || currentClan;
        });
    }, [addEvent, gameDate, addBattleReport]);
    
    const actions = useGameActions(executeAction, gameDate);

    useEffect(() => {
        if (!initialState) {
            // Generate World Map using the new system (returns locations AND districts)
            const mapData = generateWorldMap();
            setLocations(mapData.locations);
            setDistricts(mapData.districts);
            setForces([]); 

            const initialCache: Record<string, LocationData> = {};
            for (const loc of mapData.locations) { initialCache[loc.id] = generateLocalLocationData(loc); }
            setLocationDataCache(initialCache);

            addEvent({description: 'Một thế giới mới đầy biến động đang chờ được khám phá.', date: { year: 1, month: 1 }});
        }
    }, [initialState, addEvent]);

    useEffect(() => {
        if (newGameConfig && !clan) {
            const ancestralLand = locations.find(l => l.isAncestral);
            if (ancestralLand) {
                const { ho, ten, boiPhan, founder } = newGameConfig;
                const clanName = `${ho} Gia`;
                
                const finalFounder = founder;
                finalFounder.name = `${ho} ${ten}`;
                finalFounder.isPatriarch = true;
                finalFounder.rank = RankType.TOC_TRUONG;
                finalFounder.loyalty = 100;
                
                const newClan = initializeNewClan(ancestralLand, clanName, finalFounder, boiPhan);
                setClan(newClan);
                
                // Initialize Player Force
                const playerForce: Force = {
                    id: 'player_clan_force',
                    name: clanName,
                    description: 'Một gia tộc tu tiên mới nổi, đang từng bước khẳng định vị thế của mình.',
                    icon: 'righteous',
                    rank: ForceRank.HA_LUU,
                    power: founder.combatPower,
                    resources: newClan.resources.spirit_stone || 0,
                    population: newClan.members.length,
                    experts: newClan.members.filter(m => m.cultivationStage !== CultivationStage.QI_REFINEMENT).length,
                    territoryIds: [],
                    diplomacy: {},
                    headquartersId: ancestralLand.id,
                    leader: {
                        name: finalFounder.name,
                        avatar: finalFounder.avatar,
                        cultivationStage: `${finalFounder.cultivationStage} Tầng ${finalFounder.cultivationLevel}`,
                        title: 'Tộc Trưởng'
                    }
                };
                
                // Add Player Force to Ancestral Land
                setLocations(prevLocations => prevLocations.map(loc => {
                    if (loc.id === ancestralLand.id) {
                        return { ...loc, forces: [playerForce, ...loc.forces] };
                    }
                    return loc;
                }));

                addEvent({description: `'${newClan.name}' đã được kiến lập tại ${ancestralLand.name}, do Lão tộc trưởng ${newClan.members[0].name} dẫn dắt.`, date: gameDate, characterIds: [newClan.members[0].id]});
            }
        }
    }, [newGameConfig, clan, locations, addEvent, gameDate]);

    const gameLoop = useCallback(() => {
        setGameDate(currentDate => {
            const newDate = {
                month: currentDate.month === 12 ? 1 : currentDate.month + 1,
                year: currentDate.month === 12 ? currentDate.year + 1 : currentDate.year,
            };
            
            if (newDate.month === 1) {
                setWorldNews([]);
            }

            let updatedLocations = locations;
            setClan(currentClan => {
                if (!currentClan) return null;
                const mutableClan = deepClone(currentClan);
                const { nextClan, nextLocations, newEvents, newWorldNews } = processGameTick(mutableClan, updatedLocations, newDate);
                
                updatedLocations = nextLocations;
                
                if (newEvents.length > 0) {
                     setEvents(prevEvents => {
                        const allNewEvents = newEvents.map(e => ({ id: crypto.randomUUID(), ...e, date: newDate }));
                        return [...allNewEvents, ...prevEvents].slice(0, 200);
                    });
                }
                
                if (newWorldNews.length > 0) {
                    setWorldNews(prev => [...newWorldNews, ...prev]);
                }

                return nextClan;
            });
            setLocations(updatedLocations);
            
            const twoYearsAgo = { year: newDate.year - 2, month: newDate.month };
            setBattleReports(prev => prev.filter(report => 
                report.date.year > twoYearsAgo.year || 
                (report.date.year === twoYearsAgo.year && report.date.month >= twoYearsAgo.month)
            ));

            const oneYearAgoInMonths = newDate.year * 12 + newDate.month - 12;
            setEvents(prev => prev.filter(event => (event.date.year * 12 + event.date.month) > oneYearAgoInMonths));

            return newDate;
        });
    }, [locations]);

    useEffect(() => {
        if (!isRunning) return;
        const intervalId = setInterval(gameLoop, 2000 / gameSpeed);
        return () => clearInterval(intervalId);
    }, [isRunning, gameSpeed, gameLoop]);

    const handleSelectLocation = useCallback(async (location: Location) => {}, []);
    
    const handleTogglePlay = () => setIsRunning(!isRunning);
    const handleSetSpeed = (speed: number) => setGameSpeed(speed);
    
    const fullGameState: GameState = {
         locations, districts, forces, locationDataCache, clan, gameDate, isRunning, gameSpeed, events, battleReports, worldNews, handleSelectLocation, handleTogglePlay, handleSetSpeed
    };

    return {
        gameState: fullGameState,
        actions,
    };
};
