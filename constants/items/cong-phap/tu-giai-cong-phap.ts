
import { ItemType, ItemQuality, EquipmentQuality, CultivationStage } from "../../../types/index.ts";
import type { TechniqueItem } from '../../../types/index.ts';

export const TU_GIAI_CONG_PHAP: { [id: string]: TechniqueItem } = {
    'van_kiem_trieu_tong': {
        id: 'van_kiem_trieu_tong',
        he: 'Kiếm',
        name: 'Vạn Kiếm Triều Tông',
        type: ItemType.CULTIVATION_METHOD,
        quality: ItemQuality.TU_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        description: "Công pháp kiếm tu tối thượng, tu luyện đến đại thành có thể điều khiển vạn kiếm, uy lực kinh thiên.",
        effects: { cultivationSpeedModifier: 1.70, physicalAttack: 8000, critChance: 0.12 },
        requirements: {
            comprehension: 85,
            cultivationStage: CultivationStage.NASCENT_SOUL,
        },
        maxCultivationStage: CultivationStage.SOUL_FORMATION,
    },
};