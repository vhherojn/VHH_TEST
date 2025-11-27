
import { ItemType, ItemQuality, EquipmentQuality, CultivationStage, Element } from "../../../types/index.ts";
import type { TechniqueItem } from '../../../types/index.ts';

export const NHI_GIAI_CONG_PHAP: { [id: string]: TechniqueItem } = {
    'nguyen_khi_quyet': {
        id: 'nguyen_khi_quyet',
        he: 'Chung',
        name: 'Nguyên Khí Quyết',
        type: ItemType.CULTIVATION_METHOD,
        quality: ItemQuality.NHI_GIAI,
        equipmentQuality: EquipmentQuality.HA_PHAM,
        description: "Công pháp cơ bản giúp dẫn khí nhập thể, nền tảng cho mọi tu sĩ.",
        effects: { cultivationSpeedModifier: 1.15 },
        requirements: {
            cultivationStage: CultivationStage.QI_REFINEMENT
        },
        maxCultivationStage: CultivationStage.CORE_FORMATION,
    },
    'thuy_nguyen_cong': {
        id: 'thuy_nguyen_cong',
        he: 'Thuỷ',
        name: 'Thủy Nguyên Công',
        type: ItemType.CULTIVATION_METHOD,
        quality: ItemQuality.NHI_GIAI,
        equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        description: "Hấp thụ linh khí thuộc tính Thủy, linh lực mềm mại, hồi phục nhanh.",
        effects: { cultivationSpeedModifier: 1.20, manaRecoveryRate: 1.15 },
        requirements: {
            elements: [Element.WATER]
        },
        maxCultivationStage: CultivationStage.CORE_FORMATION,
    },
     'kim_sat_cong': {
        id: 'kim_sat_cong',
        he: 'Kim',
        name: 'Kim Sát Công',
        type: ItemType.CULTIVATION_METHOD,
        quality: ItemQuality.NHI_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        description: "Công pháp hệ Kim bá đạo, lấy sát phạt làm đầu, tăng mạnh ngoại công.",
        effects: { cultivationSpeedModifier: 1.25, physicalAttack: 250, physicalDefense: 100 },
        requirements: {
            elements: [Element.METAL],
            cultivationStage: CultivationStage.FOUNDATION_ESTABLISHMENT
        },
        maxCultivationStage: CultivationStage.CORE_FORMATION,
    },
};