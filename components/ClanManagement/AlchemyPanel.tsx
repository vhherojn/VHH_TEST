import React from 'react';
import type { Clan, Building } from '../../types/index.ts';
import type { GameActions } from '../../hooks/useGameLoop.ts';
import { ProfessionType } from '../../types/index.ts';
import CraftingStationPanel from './CraftingStationPanel.tsx';

interface AlchemyPanelProps {
    building: Building;
    clan: Clan;
    actions: GameActions;
}

const AlchemyPanel: React.FC<AlchemyPanelProps> = ({ building, clan, actions }) => {
    return (
        <CraftingStationPanel
            building={building}
            clan={clan}
            actions={actions}
            professionType={ProfessionType.ALCHEMIST}
        />
    );
};

export default AlchemyPanel;
