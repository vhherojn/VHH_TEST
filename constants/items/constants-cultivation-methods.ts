
import { ItemType, ItemQuality, EquipmentQuality, CultivationStage, Element, ProfessionType } from "../../types/index.ts";
import type { TechniqueItem } from '../../types/index.ts';

// Import all the new modules
import { NHAP_MON_CONG_PHAP } from './cong-phap/nhap-mon-cong-phap.ts';
import { NHI_GIAI_CONG_PHAP } from './cong-phap/nhi-giai-cong-phap.ts';
import { TAM_GIAI_CONG_PHAP } from './cong-phap/tam-giai-cong-phap.ts';
import { TU_GIAI_CONG_PHAP } from './cong-phap/tu-giai-cong-phap.ts';
import { NGU_GIAI_CONG_PHAP } from './cong-phap/ngu-giai-cong-phap.ts';

export const CULTIVATION_METHODS: { [id: string]: TechniqueItem } = {
    ...NHAP_MON_CONG_PHAP,
    ...NHI_GIAI_CONG_PHAP,
    ...TAM_GIAI_CONG_PHAP,
    ...TU_GIAI_CONG_PHAP,
    ...NGU_GIAI_CONG_PHAP,
};
