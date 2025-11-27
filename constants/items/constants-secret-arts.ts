import { ItemType, ItemQuality, EquipmentQuality, CultivationStage, Element, ProfessionType } from "../../types/index.ts";
import type { TechniqueItem } from '../../types/index.ts';

export const SECRET_ARTS: { [id: string]: TechniqueItem } = {
    // Standard Secret Arts
    'huyet_lau_chi_thuong': {
        id: 'huyet_lau_chi_thuong',
        he: 'Huyết',
        name: 'Huyết Lão Chi Thuẫn',
        type: ItemType.SECRET_ART,
        quality: ItemQuality.NHI_GIAI,
        equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        description: "Bí thuật phòng ngự, tiêu hao một lượng lớn khí huyết để tạo ra một tấm khiên máu chặn sát thương chí mạng.",
        effects: { healthCost: 0.2, temporaryDefense: 500 }, // 20% HP cost
        requirements: {
            cultivationStage: CultivationStage.FOUNDATION_ESTABLISHMENT
        }
    },
    'than_phong_buoc': {
        id: 'than_phong_buoc',
        he: 'Phong',
        name: 'Thần Phong Bộ',
        type: ItemType.SECRET_ART,
        quality: ItemQuality.NHI_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        description: "Thân pháp bí thuật, giúp tốc độ tăng vọt trong một thời gian ngắn, dùng để truy kích hoặc đào thoát.",
        effects: { temporarySpeed: 200, manaCost: 50 },
        requirements: {
            elements: [Element.WIND, Element.LIGHTNING]
        }
    },
    'sinh_menh_thieu_dot': {
        id: 'sinh_menh_thieu_dot',
        he: 'Huyết',
        name: 'Sinh Mệnh Thiêu Đốt',
        type: ItemType.SECRET_ART,
        quality: ItemQuality.TAM_GIAI,
        equipmentQuality: EquipmentQuality.HA_PHAM,
        description: "Bí thuật cấm kỵ, thiêu đốt một phần tuổi thọ để đổi lấy sức mạnh bùng nổ trong thời gian ngắn.",
        effects: { lifespanCost: 1, temporaryAttack: 2000 },
        requirements: {
            cultivationStage: CultivationStage.CORE_FORMATION,
            daoTam: 60
        }
    },
    'nguyen_than_xuat_khieu': {
        id: 'nguyen_than_xuat_khieu',
        he: 'Thần Thức',
        name: 'Nguyên Thần Xuất Khiếu',
        type: ItemType.SECRET_ART,
        quality: ItemQuality.TU_GIAI,
        equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        description: "Bí thuật của Nguyên Anh tu sĩ, cho phép nguyên thần tạm thời rời khỏi cơ thể để tấn công hoặc thăm dò.",
        effects: { explorationRange: 2, soulAttack: 5000 },
        requirements: {
            cultivationStage: CultivationStage.NASCENT_SOUL
        }
    },

    // Profession Unlock Arts
    'luyen_dan_co_so': {
        id: 'luyen_dan_co_so',
        he: 'Phụ Trợ',
        name: 'Luyện Đan Cơ Sở',
        type: ItemType.SECRET_ART,
        quality: ItemQuality.NHAT_GIAI,
        equipmentQuality: EquipmentQuality.HA_PHAM,
        description: "Kiến thức nhập môn về dược lý và đan hỏa, là chìa khóa để trở thành Luyện Đan Sư.",
        effects: { professionUnlock: ProfessionType.ALCHEMIST },
        requirements: {}
    },
    'luyen_khi_nhap_mon': {
        id: 'luyen_khi_nhap_mon',
        he: 'Phụ Trợ',
        name: 'Luyện Khí Nhập Môn',
        type: ItemType.SECRET_ART,
        quality: ItemQuality.NHAT_GIAI,
        equipmentQuality: EquipmentQuality.HA_PHAM,
        description: "Kiến thức vỡ lòng về các loại linh khoáng và cách thức rèn đúc pháp khí.",
        effects: { professionUnlock: ProfessionType.BLACKSMITH },
        requirements: {}
    },
    'luyen_phu_nhap_mon': {
        id: 'luyen_phu_nhap_mon',
        he: 'Phụ Trợ',
        name: 'Luyện Phù Nhập Môn',
        type: ItemType.SECRET_ART,
        quality: ItemQuality.NHAT_GIAI,
        equipmentQuality: EquipmentQuality.HA_PHAM,
        description: "Dạy cách dẫn linh khí vào giấy bút, vẽ nên những đạo phù cơ bản nhất.",
        effects: { professionUnlock: ProfessionType.TALISMAN_MASTER },
        requirements: {}
    },
    'tran_phap_nhap_mon': {
        id: 'tran_phap_nhap_mon',
        he: 'Phụ Trợ',
        name: 'Trận Pháp Nhập Môn',
        type: ItemType.SECRET_ART,
        quality: ItemQuality.NHAT_GIAI,
        equipmentQuality: EquipmentQuality.HA_PHAM,
        description: 'Kiến thức cơ bản về trận pháp, là bí tịch không thể thiếu để trở thành Trận Pháp Sư.',
        effects: { professionUnlock: ProfessionType.FORMATION_MASTER },
        requirements: {},
    },
    'linh_thuc_co_so': {
        id: 'linh_thuc_co_so',
        he: 'Phụ Trợ',
        name: 'Linh Thực Cơ Sở',
        type: ItemType.SECRET_ART,
        quality: ItemQuality.NHAT_GIAI,
        equipmentQuality: EquipmentQuality.HA_PHAM,
        description: "Ghi lại những kiến thức cơ bản về việc vun trồng linh thảo, là bí tịch nhập môn của Linh Thực Sư.",
        effects: { professionUnlock: ProfessionType.SPIRIT_FARMER },
        requirements: {}
    },

    // Profession Boost Arts
    'dan_hoa_tam_dac': {
        id: 'dan_hoa_tam_dac',
        he: 'Phụ Trợ',
        name: 'Đan Hỏa Tâm Đắc',
        type: ItemType.SECRET_ART,
        quality: ItemQuality.NHI_GIAI,
        equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        description: "Ghi lại những kinh nghiệm quý báu về việc khống chế đan hỏa, giúp tăng tỷ lệ thành công và giảm thời gian luyện đan.",
        effects: { alchemySuccessRateBonus: 0.10, alchemyTimeReduction: 0.15 },
        requirements: { cultivationStage: CultivationStage.FOUNDATION_ESTABLISHMENT }
    },
    'thien_cong_luyen_khi_thuong': {
        id: 'thien_cong_luyen_khi_thuong',
        he: 'Phụ Trợ',
        name: 'Thiên Công Luyện Khí (Thượng)',
        type: ItemType.SECRET_ART,
        quality: ItemQuality.NHI_GIAI,
        equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        description: "Kỹ xảo luyện khí tinh diệu, giúp tăng tỷ lệ thành công và rút ngắn thời gian rèn đúc.",
        effects: { blacksmithingSuccessRateBonus: 0.10, blacksmithingTimeReduction: 0.15 },
        requirements: { cultivationStage: CultivationStage.FOUNDATION_ESTABLISHMENT }
    },
    'than_but_phu_luc_kinh': {
        id: 'than_but_phu_luc_kinh',
        he: 'Phụ Trợ',
        name: 'Thần Bút Phù Lục Kinh',
        type: ItemType.SECRET_ART,
        quality: ItemQuality.NHI_GIAI,
        equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        description: "Bí pháp vận bút, giúp Chế Phù Sư vẽ phù nhanh và hiệu quả hơn.",
        effects: { talismanSuccessRateBonus: 0.10, talismanTimeReduction: 0.15 },
        requirements: { cultivationStage: CultivationStage.FOUNDATION_ESTABLISHMENT }
    },
    'ky_mon_tran_phap_luoc': {
        id: 'ky_mon_tran_phap_luoc',
        he: 'Phụ Trợ',
        name: 'Kỳ Môn Trận Pháp Lược',
        type: ItemType.SECRET_ART,
        quality: ItemQuality.NHI_GIAI,
        equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        description: "Hiểu biết sâu hơn về cách bố trí trận pháp, tăng tỷ lệ thành công và giảm thời gian khi chế tác trận bàn.",
        effects: { formationSuccessRateBonus: 0.10, formationTimeReduction: 0.15 },
        requirements: { cultivationStage: CultivationStage.FOUNDATION_ESTABLISHMENT }
    },
};