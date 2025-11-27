import React from 'react';
import type { Clan, Building } from '../../types/index.ts';
import { ProfessionType } from '../../types/index.ts';
import type { GameActions } from '../../hooks/useGameLoop.ts';
import CraftingStationPanel from './CraftingStationPanel.tsx';

interface BlacksmithPanelProps {
    building: Building;
    clan: Clan;
    actions: GameActions;
}

const BlacksmithPanel: React.FC<BlacksmithPanelProps> = ({ building, clan, actions }) => {
    return (
        <CraftingStationPanel
            building={building}
            clan={clan}
            actions={actions}
            professionType={ProfessionType.BLACKSMITH}
        />
    );
};

export default BlacksmithPanel;
