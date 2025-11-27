
import React from 'react';
import type { AnyItem, MasteryProgress } from '../../types/index.ts';
import Tooltip from './Tooltip.tsx';
import { generateTooltipContent } from '../../logic/utils/tooltip-content.tsx';

interface ItemTooltipProps {
    item: AnyItem | null | undefined;
    children: React.ReactNode;
    masteryProgress?: MasteryProgress;
}

const ItemTooltip: React.FC<ItemTooltipProps> = ({ item, children, masteryProgress }) => {
    // If there's no item, don't render a tooltip.
    // This prevents the "Cannot read properties of null" error.
    if (!item) {
        return <>{children}</>;
    }
    
    const tooltipContent = generateTooltipContent(item, masteryProgress);

    return (
        <Tooltip content={tooltipContent}>
            {children}
        </Tooltip>
    );
};

export default ItemTooltip;
