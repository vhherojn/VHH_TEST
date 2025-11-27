
import { ItemType, ItemQuality, EquipmentQuality, CultivationStage } from "../../../types/index.ts";
import type { TechniqueItem } from '../../../types/index.ts';

export const NGU_GIAI_CONG_PHAP: { [id: string]: TechniqueItem } = {
    'hon_don_thien_dao_quyet': {
        id: 'hon_don_thien_dao_quyet',
        he: 'Hỗn Độn',
        name: 'Hỗn Độn Thiên Đạo Quyết',
        type: ItemType.CULTIVATION_METHOD,
        quality: ItemQuality.NGU_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        description: "Công pháp trong truyền thuyết, có nguồn gốc từ khí Hỗn Độn sơ khai, có thể tu luyện mọi loại linh khí, vạn pháp quy nhất.",
        effects: { cultivationSpeedModifier: 2.0, physicalAttack: 12000, magicalAttack: 12000, physicalDefense: 7000, magicalDefense: 7000 },
        requirements: {
            comprehension: 98,
            cultivationStage: CultivationStage.SOUL_FORMATION,
        }
    },
};