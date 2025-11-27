import { NHAT_GIAI_DAN_DUOC } from './dan-duoc/nhat-giai-dan-duoc.ts';
import { NHI_GIAI_DAN_DUOC } from './dan-duoc/nhi-giai-dan-duoc.ts';
import { TAM_GIAI_DAN_DUOC } from './dan-duoc/tam-giai-dan-duoc.ts';
import { TU_GIAI_DAN_DUOC } from './dan-duoc/tu-giai-dan-duoc.ts';
import { NGU_GIAI_DAN_DUOC } from './dan-duoc/ngu-giai-dan-duoc.ts';

export const ALL_PILLS = {
    ...NHAT_GIAI_DAN_DUOC,
    ...NHI_GIAI_DAN_DUOC,
    ...TAM_GIAI_DAN_DUOC,
    ...TU_GIAI_DAN_DUOC,
    ...NGU_GIAI_DAN_DUOC,
};