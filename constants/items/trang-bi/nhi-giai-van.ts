import { ItemQuality, EquipmentQuality, ItemType, Element, CultivationStage } from '../../../types/index.ts';
import type { EquippableItem } from '../../../types/index.ts';

export const NHI_GIAI_VAN: { [key: string]: EquippableItem } = {
    'nhi_giai_van_hoa_diem_tat_anh_van': { 
        id: 'nhi_giai_van_hoa_diem_tat_anh_van', name: 'Hỏa Diễm Tật Ảnh Vân', 
        description: 'Khi di chuyển sẽ để lại một vệt lửa, tốc độ cực nhanh như một bóng hình chớp lửa.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { speed: 25 }, 
        elements: [Element.FIRE], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_van_lam_quang_lang_hu_van': { 
        id: 'nhi_giai_van_lam_quang_lang_hu_van', name: 'Lam Quang Lăng Hư Vân', 
        description: 'Cho phép người mang bước đi trên không trung trong thời gian ngắn như có bậc thang vô hình.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { speed: 20 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_van_thanh_kim_lac_vu_van': { 
        id: 'nhi_giai_van_thanh_kim_lac_vu_van', name: 'Thanh Kim Lạc Vũ Vân', 
        description: 'Giày nhẹ như lông vũ, giúp người mang di chuyển không gây ra bất kỳ tiếng động nào.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { speed: 22 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_van_tu_kim_truy_dien_van': { 
        id: 'nhi_giai_van_tu_kim_truy_dien_van', name: 'Tử Kim Truy Điện Vân', 
        description: 'Tốc độ bộc phát kinh người, nhanh như tia chớp, chuyên dùng để đột kích hoặc thoát thân.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { speed: 35 }, 
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_van_khuong_hoang_ban_thach_van': { 
        id: 'nhi_giai_van_khuong_hoang_ban_thach_van', name: 'Khương Hoàng Bàn Thạch Vân', 
        description: 'Không tăng tốc độ, nhưng giúp người mang bám chặt vào mọi địa hình, hạ bàn vững như đá, khó bị đánh ngã.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { physicalDefense: 150 }, 
        elements: [Element.EARTH], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_van_phong_sat_vo_anh_van': { 
        id: 'nhi_giai_van_phong_sat_vo_anh_van', name: 'Phong Sát Vô Ảnh Vân', 
        description: 'Khi di chuyển đến tốc độ cực hạn sẽ trở nên vô hình trong mắt kẻ địch.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { speed: 30 }, 
        elements: [Element.WIND], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_van_loi_van_dap_nguyet_van': { 
        id: 'nhi_giai_van_loi_van_dap_nguyet_van', name: 'Lôi Vân Đạp Nguyệt Vân', 
        description: 'Cho phép người mang dậm nhảy lên không trung nhiều lần, di chuyển trên trời như đi trên đất bằng.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { speed: 28 }, 
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_van_bach_ngoc_lang_tieu_van': { 
        id: 'nhi_giai_van_bach_ngoc_lang_tieu_van', name: 'Bạch Ngọc Lăng Tiêu Vân', 
        description: 'Thanh khiết và nhẹ nhàng, giúp thân pháp trở nên phiêu dật, thoát tục.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { speed: 24, daoTam: 3 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_van_bang_tam_lang_ba_van': { 
        id: 'nhi_giai_van_bang_tam_lang_ba_van', name: 'Băng Tàm Lăng Ba Vân', 
        description: 'Có thể đóng băng mặt nước khi dẫm lên, cho phép người mang chạy trên mặt nước hoặc thậm chí là các bề mặt thẳng đứng bị đóng băng.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { speed: 20 }, 
        elements: [Element.ICE], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_van_pha_nham_dap_dia_van': { 
        id: 'nhi_giai_van_pha_nham_dap_dia_van', name: 'Phá Nham Đạp Địa Vân', 
        description: 'Đế giày được gia trì trận pháp, cho phép người mang dồn lực xuống chân và dậm mạnh xuống đất để gây ra một cơn chấn động nhỏ, làm mất thăng bằng đối thủ.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { physicalAttack: 100, speed: 5 }, 
        elements: [Element.EARTH], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_van_yeu_bi_tung_anh_van': { 
        id: 'nhi_giai_van_yeu_bi_tung_anh_van', name: 'Yêu Bì Túng Ảnh Vân', 
        description: 'Chuyên dùng để bật nhảy. Có thể tích tụ năng lượng để tạo ra một cú nhảy vọt lên không trung hoặc lao về phía trước với khoảng cách cực xa.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { speed: 26 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_van_huyen_thiet_phu_trong_van': { 
        id: 'nhi_giai_van_huyen_thiet_phu_trong_van', name: 'Huyền Thiết Phụ Trọng Vân', 
        description: 'Đôi giày luyện công, có thể điều chỉnh trọng lượng nặng hơn gấp nhiều lần bình thường để người mang rèn luyện thân pháp và sức bền.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { physicalDefense: 50, speed: -20 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_van_ma_cot_phi_tich_van': { 
        id: 'nhi_giai_van_ma_cot_phi_tich_van', name: 'Ma Cốt Phi Tích Vân', 
        description: 'Khi di chuyển nhanh, sẽ để lại những dấu chân ma hỏa trên mặt đất, những dấu chân này sẽ phát nổ nhẹ nếu có người khác dẫm phải.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { speed: 23 }, 
        elements: [Element.FIRE], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
};
