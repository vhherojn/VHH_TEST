
import { ItemType, ItemQuality, EquipmentQuality, CultivationStage, Element } from "../../types/index.ts";
import type { TechniqueItem } from '../../types/index.ts';

export const SPELLS: { [id: string]: TechniqueItem } = {
    // ========== NHẤT GIAI ==========
    'kim_quang_quyet': {
        id: 'kim_quang_quyet',
        he: 'Kim',
        name: 'Kim Quang Quyết',
        type: ItemType.SPELL,
        quality: ItemQuality.NHAT_GIAI,
        equipmentQuality: EquipmentQuality.HA_PHAM,
        description: "Pháp quyết hệ Kim cơ bản, tạo ra một luồng kim quang sắc bén tấn công kẻ địch.",
        effects: { manaCost: 20, magicalAttackModifier: 1.2 },
        requirements: {
            elements: [Element.METAL]
        }
    },
    'hoa_cau_thuat': {
        id: 'hoa_cau_thuat',
        he: 'Hoả',
        name: 'Hỏa Cầu Thuật',
        type: ItemType.SPELL,
        quality: ItemQuality.NHAT_GIAI,
        equipmentQuality: EquipmentQuality.HA_PHAM,
        description: "Pháp quyết hệ Hỏa sơ cấp, ngưng tụ một quả cầu lửa tấn công đối phương.",
        effects: { manaCost: 25, magicalAttackModifier: 1.3 },
        requirements: {
            elements: [Element.FIRE]
        }
    },
    'thuy_tien_thuat': {
        id: 'thuy_tien_thuat',
        he: 'Thuỷ',
        name: 'Thủy Tiễn Thuật',
        type: ItemType.SPELL,
        quality: ItemQuality.NHAT_GIAI,
        equipmentQuality: EquipmentQuality.HA_PHAM,
        description: "Pháp quyết hệ Thủy, bắn ra một mũi tên nước có lực xuyên thấu nhất định.",
        effects: { manaCost: 15, magicalAttackModifier: 1.1 },
        requirements: {
            elements: [Element.WATER, Element.ICE]
        }
    },

    // ========== NHỊ GIAI ==========
    'dia_thich_thuat': {
        id: 'dia_thich_thuat',
        he: 'Thổ',
        name: 'Địa Thích Thuật',
        type: ItemType.SPELL,
        quality: ItemQuality.NHI_GIAI,
        equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        description: "Điều khiển mặt đất, tạo ra những mũi gai nhọn bất ngờ tấn công kẻ địch từ bên dưới.",
        effects: { manaCost: 100, areaMagicalAttackModifier: 1.5 },
        requirements: {
            elements: [Element.EARTH],
            cultivationStage: CultivationStage.FOUNDATION_ESTABLISHMENT
        }
    },
    'phong_dao_thuat': {
        id: 'phong_dao_thuat',
        he: 'Phong',
        name: 'Phong Đao Thuật',
        type: ItemType.SPELL,
        quality: ItemQuality.NHI_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        description: "Ngưng tụ gió thành những lưỡi đao sắc bén, tấn công với tốc độ cực nhanh.",
        effects: { manaCost: 80, magicalAttackModifier: 1.4, speedDebuff: 0.2 },
        requirements: {
            elements: [Element.WIND]
        }
    },

    // ========== TAM GIAI ==========
    '落_雷_術': {
        id: 'lac_loi_thuat',
        he: 'Lôi',
        name: 'Lạc Lôi Thuật',
        type: ItemType.SPELL,
        quality: ItemQuality.TAM_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        description: "Dẫn Cửu Thiên Thần Lôi, triệu hồi một tia sét đánh thẳng xuống mục tiêu, uy lực kinh người.",
        effects: { manaCost: 500, magicalAttackModifier: 3.0, stunChance: 0.3 },
        requirements: {
            elements: [Element.LIGHTNING],
            cultivationStage: CultivationStage.CORE_FORMATION
        }
    },
    'bang_phong_thuat': {
        id: 'bang_phong_thuat',
        he: 'Băng',
        name: 'Băng Phong Thuật',
        type: ItemType.SPELL,
        quality: ItemQuality.TAM_GIAI,
        equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        description: "Tạo ra một vùng hàn khí, đóng băng và làm chậm mọi kẻ địch trong phạm vi.",
        effects: { manaCost: 400, areaSpeedDebuff: 0.5, damageOverTime: 100 },
        requirements: {
            elements: [Element.ICE, Element.WATER],
            cultivationStage: CultivationStage.CORE_FORMATION
        }
    }
};