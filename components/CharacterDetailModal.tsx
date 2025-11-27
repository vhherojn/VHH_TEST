import React, { useState } from 'react';
import type { Clan, Character, Event } from '../types/index.ts';
import { CloseIcon } from './Icons.tsx';
import CharacterInfoPanel from './CharacterDetail/CharacterInfoPanel.tsx';
import CharacterTabs from './CharacterDetail/CharacterTabs.tsx';
import CharacterOverviewTab from './CharacterDetail/CharacterOverviewTab.tsx';
import CharacterAttributesTab from './CharacterDetail/CharacterAttributesTab.tsx';
import CharacterProfessionsTab from './CharacterDetail/CharacterProfessionsTab.tsx';
import CharacterHistoryTab from './CharacterDetail/CharacterHistoryTab.tsx';
import CharacterEquipmentAndInventoryTab from './CharacterDetail/CharacterEquipmentAndInventoryTab.tsx';
import CharacterSocialTab from './CharacterDetail/CharacterSocialTab.tsx';
import { CharacterTechniquesTab } from './CharacterDetail/CharacterTechniquesTab.tsx';
import type { GameActions } from '../../hooks/useGameLoop.ts';

interface CharacterDetailModalComponentProps {
    character: Character;
    clan: Clan;
    events: Event[];
    onClose: () => void;
    onSelectCharacter: (character: Character) => void;
    actions: GameActions;
}

const CharacterDetailModalComponent: React.FC<CharacterDetailModalComponentProps> = (props) => {
    const { character, clan, events, onClose, onSelectCharacter, actions } = props;
    const [activeTab, setActiveTab] = useState<'overview' | 'attributes' | 'techniques' | 'equipment_inventory' | 'professions' | 'history' | 'social'>('overview');

    // Create partially applied functions to simplify prop passing to child components
    const handleUseItem = (itemId: string) => actions.useItem(character.id, itemId);
    const handleEquipItem = (itemId: string) => actions.equipItem(character.id, itemId);
    const handleUnequipItem = (slot: keyof Character['equipment'] | string) => actions.unequipItem(character.id, slot);
    const handleStoreItemToClan = (itemId: string) => actions.storeItemToClan(character.id, itemId);
    const handleUnequipTechnique = (techId: string) => actions.unequipTechnique(character.id, techId);
    const handleEquipTechnique = (techId: string, slotType: 'mainCultivation' | 'subCultivation' | 'secretArts' | 'spells', slotIndex: number) => actions.equipTechnique(character.id, techId, slotType, slotIndex);
    const handleAwardLibraryToken = () => actions.awardLibraryToken(character.id);


    const renderActiveTab = () => {
        switch (activeTab) {
            case 'overview': return <CharacterOverviewTab character={character} actions={actions} />;
            case 'attributes': return <CharacterAttributesTab character={character} />;
            case 'techniques': return <CharacterTechniquesTab character={character} onEquip={handleEquipTechnique} onUnequip={handleUnequipTechnique} />;
            case 'equipment_inventory': return <CharacterEquipmentAndInventoryTab character={character} onUnequipItem={handleUnequipItem} onUseItem={handleUseItem} onEquipItem={handleEquipItem} onStoreItemToClan={handleStoreItemToClan} />;
            case 'professions': return <CharacterProfessionsTab character={character} />;
            case 'history': return <CharacterHistoryTab characterId={character.id} events={events} />;
            case 'social': return <CharacterSocialTab character={character} clan={clan} onSelectCharacter={onSelectCharacter} />;
            default: return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="relative w-full max-w-6xl bg-gradient-to-b from-[var(--color-wood-dark)] to-[#2a201c] rounded-2xl p-2" onClick={(e) => e.stopPropagation()} style={{boxShadow: '0 0 0 3px #1d1d1d, 0 0 0 7px var(--color-wood-medium), 0 25px 60px 15px rgba(0,0,0,0.8)'}}>
                <div className="bg-gradient-to-t from-stone-800/80 to-stone-900/90 rounded-lg p-6 border-2 border-amber-400/20 relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-white bg-black/50 p-1 rounded-full hover:bg-[var(--color-text-accent)] transition-colors z-20" aria-label="Đóng"><CloseIcon /></button>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        
                        <div className="lg:col-span-2">
                             <CharacterInfoPanel character={character} clan={clan} onSelectCharacter={onSelectCharacter} onAwardLibraryToken={handleAwardLibraryToken} />
                        </div>

                        <div className="lg:col-span-3 flex flex-col">
                            <CharacterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                            
                            <div className="flex-grow overflow-y-auto mt-4 pr-2 -mr-4 space-y-4" style={{ maxHeight: 'calc(85vh - 120px)' }}>
                               {renderActiveTab()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const CharacterDetailModal = React.memo(CharacterDetailModalComponent);