
import { ItemType, ItemQuality, EquipmentQuality, CultivationStage, Element } from "../../../types/index.ts";
import type { TechniqueItem } from '../../../types/index.ts';

export const TAM_GIAI_CONG_PHAP: { [id: string]: TechniqueItem } = {
    'thanh_moc_dieu_hoa_cong': {
        id: 'thanh_moc_dieu_hoa_cong',
        he: 'Mộc',
        name: 'Thanh Mộc Điêu Hoa Công',
        type: ItemType.CULTIVATION_METHOD,
        quality: ItemQuality.TAM_GIAI,
        equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        description: "Công pháp hệ Mộc, sinh cơ nồng đậm, giúp tăng mạnh khí huyết và khả năng hồi phục.",
        effects: { cultivationSpeedModifier: 1.35, maxHealth: 2000, healthModifier: 1.12 },
        requirements: {
            elements: [Element.WOOD],
            cultivationStage: CultivationStage.CORE_FORMATION,
        },
        maxCultivationStage: CultivationStage.NASCENT_SOUL,
    },
    'liet_hoa_phan_thien_quyet': {
        id: 'liet_hoa_phan_thien_quyet',
        he: 'Hoả',
        name: 'Liệt Hỏa Phần Thiên Quyết',
        type: ItemType.CULTIVATION_METHOD,
        quality: ItemQuality.TAM_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        description: "Công pháp hệ Hỏa cực kỳ bá đạo, mỗi một đòn tấn công đều mang theo sức nóng kinh người.",
        effects: { cultivationSpeedModifier: 1.40, magicalAttack: 2500 },
        requirements: {
            elements: [Element.FIRE],
            cultivationStage: CultivationStage.CORE_FORMATION,
        },
        maxCultivationStage: CultivationStage.NASCENT_SOUL,
    },
};