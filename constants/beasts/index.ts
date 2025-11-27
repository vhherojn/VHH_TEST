
import { Beast } from '../../types/index.ts';
import { NHAT_GIAI_BEASTS } from './nhat-giai.ts';

export const ALL_BEASTS: Record<string, Beast> = {};

const registerBeasts = (beasts: Beast[]) => {
    beasts.forEach(beast => {
        ALL_BEASTS[beast.id] = beast;
    });
};

registerBeasts(NHAT_GIAI_BEASTS);
// Future tiers will be registered here
