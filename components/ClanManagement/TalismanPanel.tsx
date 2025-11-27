import React from 'react';
import type { Clan, Building } from '../../types/index.ts';
import { ProfessionType } from '../../types/index.ts';
import type { GameActions } from '../../hooks/useGameLoop.ts';
import CraftingStationPanel from './CraftingStationPanel.tsx';

interface TalismanPanelProps {
    building: Building;
    clan: Clan;
    actions: GameActions;
}

const TalismanPanel: React.FC<TalismanPanelProps> = ({ building, clan, actions }) => {
    return (
        <CraftingStationPanel
            building={building}
            clan={clan}
            actions={actions}
            professionType={ProfessionType.TALISMAN_MASTER}
        />
    );
};

export default TalismanPanel;
