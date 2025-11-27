
import { NHAT_GIAI_PHU } from './phu-bao/nhat-giai-phu.ts';
import { NHI_GIAI_PHU } from './phu-bao/nhi-giai-phu.ts';
import { TAM_GIAI_PHU } from './phu-bao/tam-giai-phu.ts';
import type { Talisman } from '../../types/index.ts';

export const TALISMANS: { [key: string]: Talisman } = {
    ...NHAT_GIAI_PHU,
    ...NHI_GIAI_PHU,
    ...TAM_GIAI_PHU,
};
