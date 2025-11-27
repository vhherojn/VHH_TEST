
import React, { useState, useCallback, useEffect } from 'react';
import GameMap from './components/GameMap.tsx';
import LocationModal from './components/LocationModal.tsx';
import DistrictModal from './components/DistrictModal.tsx'; // Import DistrictModal
import EventLog from './components/EventLog.tsx';
import FamilyPanel from './components/FamilyPanel.tsx';
import { CharacterDetailModal } from './components/CharacterDetailModal.tsx';
import { ClanManagementModal } from './components/ClanManagementModal.tsx';
import { useGameLoop } from './hooks/useGameLoop.ts';
import type { Location, Character, Force, BattleReport, GameState, District } from './types/index.ts';
import SecretRecordsModal from './components/SecretRecordsModal.tsx';
import ForceModal from './components/ForceModal.tsx';
import BattleLogPanel from './components/BattleLogPanel.tsx';
import BattleDetailModal from './components/BattleDetailModal.tsx';
import OverviewPanel from './components/OverviewPanel.tsx';
import WorldNewsModal from './components/WorldNewsModal.tsx';

// Import new screens
import MainMenu from './components/MainMenu.tsx';
import FounderSetup from './components/FounderSetup.tsx';
import LoadingScreen from './components/LoadingScreen.tsx';
import LastChanceModal from './components/LastChanceModal.tsx';
import BreakthroughModal from './components/BreakthroughModal.tsx';

// Import new HUD components
import TopBar from './components/TopBar.tsx';
import BottomBar from './components/BottomBar.tsx';


const SAVE_KEY = 'tu_tien_gia_toc_save_0.22'; // Updated Version Key

interface GameScreenProps {
  initialGameState?: GameState;
  newGameConfig?: { ho: string; ten: string; boiPhan: string[]; founder: Character };
  onGameSave: () => void;
}

function GameScreen({ initialGameState, newGameConfig, onGameSave }: GameScreenProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedForce, setSelectedForce] = useState<Force | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null); // New State for District
  const [isEventLogOpen, setIsEventLogOpen] = useState(true);
  const [isFamilyPanelOpen, setIsFamilyPanelOpen] = useState(false);
  const [isClanManagementOpen, setIsClanManagementOpen] = useState(false);
  const [isSecretRecordsOpen, setIsSecretRecordsOpen] = useState(false);
  const [isBattleLogOpen, setIsBattleLogOpen] = useState(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isWorldNewsOpen, setIsWorldNewsOpen] = useState(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [selectedBattleReport, setSelectedBattleReport] = useState<BattleReport | null>(null);
  const [isPausedForModal, setIsPausedForModal] = useState(false);
  const [characterFacingLastChance, setCharacterFacingLastChance] = useState<Character | null>(null);
  const [characterForBreakthrough, setCharacterForBreakthrough] = useState<Character | null>(null);

  const {
    gameState,
    actions
  } = useGameLoop(initialGameState, newGameConfig);

  const { locations, forces, districts, locationDataCache, clan, gameDate, isRunning, gameSpeed, events, battleReports, worldNews, handleSelectLocation, handleTogglePlay, handleSetSpeed } = gameState;
  
  // Auto-save logic
  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (isRunning && clan) {
        localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
        onGameSave();
      }
    }, 30000); // Save every 30 seconds

    return () => clearInterval(saveInterval);
  }, [gameState, isRunning, clan, onGameSave]);
  
  const handleOpenLocationModal = useCallback((location: Location) => {
    setSelectedLocation(location);
    handleSelectLocation(location);
  }, [handleSelectLocation]);

  const handleOpenDistrictModal = useCallback((district: District) => {
      setSelectedDistrict(district);
  }, []);

  const handleOpenForceModal = useCallback((force: Force) => {
    setSelectedForce(force);
  }, []);

  const handleCloseLocationModal = () => { setSelectedLocation(null); };
  const handleCloseForceModal = () => { setSelectedForce(null); };
  const handleCloseDistrictModal = () => { setSelectedDistrict(null); };
  const handleToggleEventLog = () => setIsEventLogOpen(!isEventLogOpen);
  const handleToggleFamilyPanel = () => setIsFamilyPanelOpen(!isFamilyPanelOpen);
  const handleToggleClanManagement = () => setIsClanManagementOpen(!isClanManagementOpen);
  const handleToggleSecretRecords = () => setIsSecretRecordsOpen(!isSecretRecordsOpen);
  const handleToggleBattleLog = () => setIsBattleLogOpen(!isBattleLogOpen);
  const handleToggleOverview = () => setIsOverviewOpen(!isOverviewOpen);
  const handleToggleWorldNews = () => setIsWorldNewsOpen(!isWorldNewsOpen);
  
  const handleSelectCharacter = useCallback((character: Character) => { setSelectedCharacterId(character.id); }, []);
  const handleDeselectCharacter = useCallback(() => { setSelectedCharacterId(null); }, []);
  const handleSelectBattle = useCallback((report: BattleReport) => { setSelectedBattleReport(report); }, []);
  const handleDeselectBattle = useCallback(() => { setSelectedBattleReport(null); }, []);
  
  const selectedCharacter = clan && selectedCharacterId ? clan.members.find(m => m.id === selectedCharacterId) || null : null;

  // Last Chance Modal Logic
  useEffect(() => {
    if (clan?.characterIdFacingLastChance) {
        const character = clan.members.find(m => m.id === clan.characterIdFacingLastChance);
        if (character) {
            setCharacterFacingLastChance(character);
        }
    } else {
        setCharacterFacingLastChance(null);
    }
  }, [clan?.characterIdFacingLastChance, clan?.members]);
  
  // Breakthrough Modal Logic
  useEffect(() => {
    if (clan?.breakthroughDecision) {
        const character = clan.members.find(m => m.id === clan.breakthroughDecision!.characterId);
        if (character) {
            setCharacterForBreakthrough(character);
        }
    } else {
        setCharacterForBreakthrough(null);
    }
  }, [clan?.breakthroughDecision, clan?.members]);


  useEffect(() => {
    const isModalOpen = isFamilyPanelOpen || isClanManagementOpen || !!selectedCharacter || isSecretRecordsOpen || isOverviewOpen || !!selectedLocation || !!selectedForce || !!selectedDistrict || !!selectedBattleReport || !!characterFacingLastChance || !!characterForBreakthrough || isWorldNewsOpen;
    if (isModalOpen) {
      if (isRunning) {
        handleTogglePlay();
        setIsPausedForModal(true);
      }
    } else {
      if (isPausedForModal) {
        handleTogglePlay();
        setIsPausedForModal(false);
      }
    }
  }, [isFamilyPanelOpen, isClanManagementOpen, selectedCharacter, isSecretRecordsOpen, isOverviewOpen, selectedLocation, selectedForce, selectedDistrict, selectedBattleReport, characterFacingLastChance, characterForBreakthrough, isWorldNewsOpen, isRunning, isPausedForModal, handleTogglePlay]);


  return (
    <div className="relative w-screen h-screen overflow-hidden bg-stone-900">
        <div className="absolute inset-0 bg-repeat opacity-20" style={{backgroundImage: 'url(https://www.transparenttextures.com/patterns/old-map.png)'}}></div>
        <GameMap 
            locations={locations} 
            forces={forces}
            districts={districts}
            onSelectLocation={handleOpenLocationModal} 
            onSelectForce={handleOpenForceModal}
            onSelectDistrict={handleOpenDistrictModal}
        />
        
        {/* NEW UNIFIED HUD */}
        <TopBar clan={clan} date={gameDate} />
        <BottomBar 
            clanExists={!!clan}
            isRunning={isRunning}
            speed={gameSpeed}
            onTogglePlay={handleTogglePlay}
            onSetSpeed={handleSetSpeed}
            onToggleEventLog={handleToggleEventLog}
            onToggleBattleLog={handleToggleBattleLog}
            onToggleFamilyPanel={handleToggleFamilyPanel}
            onToggleClanManagement={handleToggleClanManagement}
            onToggleSecretRecords={handleToggleSecretRecords}
            onToggleOverview={handleToggleOverview}
            onToggleWorldNews={handleToggleWorldNews}
        />

        {/* SIDE PANELS */}
        <EventLog events={events} isOpen={isEventLogOpen} />
        <BattleLogPanel reports={battleReports} isOpen={isBattleLogOpen} onSelectBattle={handleSelectBattle} />
        {clan && <FamilyPanel clan={clan} isOpen={isFamilyPanelOpen} onClose={handleToggleFamilyPanel} onSelectCharacter={handleSelectCharacter} />}
        
        {/* MODALS */}
        {characterFacingLastChance && (
             <LastChanceModal 
                character={characterFacingLastChance}
                onConfirm={() => actions.attemptFinalBreakthrough(characterFacingLastChance.id)}
                onDecline={() => actions.declineFinalBreakthrough(characterFacingLastChance.id)}
            />
        )}
        
        {characterForBreakthrough && clan && (
            <BreakthroughModal 
                character={characterForBreakthrough}
                clan={clan}
                onConfirm={(aidItemId) => actions.startSeclusionForBreakthrough(characterForBreakthrough.id, aidItemId)}
                onDecline={() => actions.postponeBreakthrough(characterForBreakthrough.id)}
            />
        )}
        
        {selectedCharacter && clan && 
            <CharacterDetailModal 
                character={selectedCharacter} 
                clan={clan} 
                onClose={handleDeselectCharacter} 
                events={events} 
                onSelectCharacter={handleSelectCharacter}
                actions={actions}
            />}
        
        {clan && 
            <ClanManagementModal 
                clan={clan} 
                isOpen={isClanManagementOpen} 
                onClose={handleToggleClanManagement} 
                actions={actions}
            />}

        {isSecretRecordsOpen && <SecretRecordsModal isOpen={isSecretRecordsOpen} onClose={handleToggleSecretRecords} />}
        
        {clan && isOverviewOpen && <OverviewPanel clan={clan} isOpen={isOverviewOpen} onClose={handleToggleOverview} />}
        
        {/* World News Modal */}
        <WorldNewsModal news={worldNews} date={gameDate} isOpen={isWorldNewsOpen} onClose={handleToggleWorldNews} />

        {selectedBattleReport && clan && <BattleDetailModal report={selectedBattleReport} clan={clan} onClose={handleDeselectBattle} />}

        {selectedDistrict && (
            <DistrictModal
                district={selectedDistrict}
                locations={locations}
                isOpen={!!selectedDistrict}
                onClose={handleCloseDistrictModal}
                onSelectLocation={handleOpenLocationModal}
            />
        )}

        {selectedLocation && (
            <LocationModal 
                location={selectedLocation} 
                onClose={handleCloseLocationModal}
                data={locationDataCache[selectedLocation.id]}
                isLoading={false}
                error={null}
                clanName={clan?.name}
            />
        )}
        {selectedForce && (
            <ForceModal force={selectedForce} onClose={handleCloseForceModal} />
        )}
    </div>
  );
}

function App() {
  type GameView = 'main_menu' | 'founder_setup' | 'loading' | 'playing';
  const [gameView, setGameView] = useState<GameView>('main_menu');
  const [saveDataExists, setSaveDataExists] = useState(false);
  const [initialGameState, setInitialGameState] = useState<GameState | undefined>(undefined);
  const [newGameConfig, setNewGameConfig] = useState<{ ho: string; ten: string; boiPhan: string[]; founder: Character } | undefined>(undefined);

  useEffect(() => {
    const savedData = localStorage.getItem(SAVE_KEY);
    if (savedData) {
      setSaveDataExists(true);
    }
  }, []);

  const handleNewGame = () => {
    setGameView('founder_setup');
  };

  const handleContinueGame = () => {
    const savedData = localStorage.getItem(SAVE_KEY);
    if (savedData) {
      try {
        setInitialGameState(JSON.parse(savedData));
        setNewGameConfig(undefined);
        setGameView('loading');
      } catch (error) {
        console.error("Failed to parse save data:", error);
        localStorage.removeItem(SAVE_KEY);
        setSaveDataExists(false);
        setGameView('main_menu');
      }
    }
  };

  const handleStartGame = (ho: string, ten: string, boiPhan: string[], founder: Character) => {
    setInitialGameState(undefined);
    setNewGameConfig({ ho, ten, boiPhan, founder });
    setGameView('playing');
  };

  const onGameLoaded = useCallback(() => {
    setGameView('playing');
  }, []);
  
  const onGameSave = useCallback(() => {
    if (!saveDataExists) {
        setSaveDataExists(true);
    }
  }, [saveDataExists]);


  switch (gameView) {
    case 'main_menu':
      return <MainMenu onNewGame={handleNewGame} onContinueGame={handleContinueGame} saveDataExists={saveDataExists} />;
    case 'founder_setup':
      return <FounderSetup onStartGame={handleStartGame} />;
    case 'loading':
        return <LoadingScreen onLoaded={onGameLoaded} />;
    case 'playing':
      return <GameScreen initialGameState={initialGameState} newGameConfig={newGameConfig} onGameSave={onGameSave} />;
    default:
      return <MainMenu onNewGame={handleNewGame} onContinueGame={handleContinueGame} saveDataExists={saveDataExists} />;
  }
}


export default App;
