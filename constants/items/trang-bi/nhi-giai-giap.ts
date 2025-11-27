import { ItemQuality, EquipmentQuality, ItemType, Element, CultivationStage } from '../../../types/index.ts';
import type { EquippableItem } from '../../../types/index.ts';

export const NHI_GIAI_GIAP: { [key: string]: EquippableItem } = {
    'nhi_giai_giap_huyen_thiet_tran_nhac_giap': { 
        id: 'nhi_giai_giap_huyen_thiet_tran_nhac_giap', name: 'Huyền Thiết Trấn Nhạc Giáp', 
        description: 'Phòng ngự vật lý gần như tuyệt đối, vững chắc như núi, nhưng cực kỳ nặng.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { physicalDefense: 800, speed: -10 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_giap_ma_lan_bi_giap': { 
        id: 'nhi_giai_giap_ma_lan_bi_giap', name: 'Ma Lân Bì Giáp', 
        description: 'Kết hợp sự dẻo dai của da và sự cứng rắn của vảy, phòng ngự toàn diện và linh hoạt.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { physicalDefense: 550, magicalDefense: 200 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_giap_bat_dong_hoang_thach_giap': { 
        id: 'nhi_giai_giap_bat_dong_hoang_thach_giap', name: 'Bất Động Hoàng Thạch Giáp', 
        description: 'Hấp thụ và hóa giải các đòn tấn công vật lý, giúp người mặc đứng vững như bàn thạch.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { physicalDefense: 700 }, 
        elements: [Element.EARTH], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_giap_lam_quang_kinh_giap': { 
        id: 'nhi_giai_giap_lam_quang_kinh_giap', name: 'Lam Quang Kính Giáp', 
        description: 'Bề mặt giáp nhẵn như gương, có thể phản lại một phần các đòn tấn công bằng pháp thuật và ánh sáng.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { magicalDefense: 600 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_giap_thanh_kim_luu_van_giap': { 
        id: 'nhi_giai_giap_thanh_kim_luu_van_giap', name: 'Thanh Kim Lưu Vân Giáp', 
        description: 'Vừa cứng rắn vừa nhẹ nhàng, trên áo giáp có các trận pháp giúp giảm sức cản của gió, tăng tốc độ di chuyển.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { physicalDefense: 450, speed: 8 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_giap_tu_kim_bat_hoai_giap': { 
        id: 'nhi_giai_giap_tu_kim_bat_hoai_giap', name: 'Tử Kim Bất Hoại Giáp', 
        description: 'Khả năng tự phục hồi các vết nứt và hư hỏng nhỏ, độ bền cực cao.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { physicalDefense: 600, magicalDefense: 250 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_giap_yeu_cot_hung_than_giap': { 
        id: 'nhi_giai_giap_yeu_cot_hung_than_giap', name: 'Yêu Cốt Hung Thần Giáp', 
        description: 'Giáp trụ có hình thù dữ tợn, mang theo hung khí của yêu thú, khiến kẻ địch yếu bóng vía phải khiếp sợ.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { physicalDefense: 620 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_giap_phong_sat_tan_anh_giap': { 
        id: 'nhi_giai_giap_phong_sat_tan_anh_giap', name: 'Phong Sát Tàn Ảnh Giáp', 
        description: 'Áo giáp có khả năng tạo ra tàn ảnh khi người mặc di chuyển, gây khó khăn cho việc nhắm bắn và tấn công của đối thủ.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { physicalDefense: 400, speed: 10 }, 
        elements: [Element.WIND], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_giap_lam_quang_ngung_thuy_giap': { 
        id: 'nhi_giai_giap_lam_quang_ngung_thuy_giap', name: 'Lam Quang Ngưng Thủy Giáp', 
        description: 'Luôn có một lớp màng nước mỏng bao bọc, có thể hóa giải các đòn tấn công hệ hỏa và làm chậm các đòn tấn công vật lý.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { physicalDefense: 300, magicalDefense: 400 }, 
        elements: [Element.WATER], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_giap_khuong_hoang_hau_tho_giap': { 
        id: 'nhi_giai_giap_khuong_hoang_hau_tho_giap', name: 'Khương Hoàng Hậu Thổ Giáp', 
        description: 'Có khả năng kết nối với đại địa, hấp thụ địa khí để tăng cường sức phòng ngự và hồi phục cho người mặc.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { physicalDefense: 750 }, 
        elements: [Element.EARTH], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_giap_bach_dien_tinh_the_giap': { 
        id: 'nhi_giai_giap_bach_dien_tinh_the_giap', name: 'Bạch Điền Tịnh Thể Giáp', 
        description: 'Ngoài phòng ngự, lớp ngọc này còn liên tục tỏa ra linh khí tinh khiết, giúp thanh lọc tạp chất và độc tố nhẹ trong cơ thể người mặc.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { physicalDefense: 350, magicalDefense: 350 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_giap_loi_van_tu_quang_giap': { 
        id: 'nhi_giai_giap_loi_van_tu_quang_giap', name: 'Lôi Vân Từ Quang Giáp', 
        description: 'Tạo ra một trường điện từ yếu xung quanh người mặc, có khả năng làm chệch hướng các loại vũ khí bằng kim loại và gây nhiễu loạn các pháp thuật hệ kim, lôi.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { magicalDefense: 550 }, 
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_giap_thanh_kim_phan_chan_giap': { 
        id: 'nhi_giai_giap_thanh_kim_phan_chan_giap', name: 'Thanh Kim Phản Chấn Giáp', 
        description: 'Bề mặt áo giáp được rèn theo một cách đặc biệt, có thể phản lại một phần lực tấn công vật lý ngược trở lại kẻ tấn công.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { physicalDefense: 600 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_giap_ma_bi_dich_hinh_giap': { 
        id: 'nhi_giai_giap_ma_bi_dich_hinh_giap', name: 'Ma Bì Dịch Hình Giáp', 
        description: 'Một lớp áo giáp da có thể thay đổi hình dạng ở mức độ nhỏ, có thể mọc ra gai nhọn khi phòng thủ hoặc trở nên vừa vặn tuyệt đối với cơ thể.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { physicalDefense: 580 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_giap_huyen_thiet_van_tai_giap': { 
        id: 'nhi_giai_giap_huyen_thiet_van_tai_giap', name: 'Huyền Thiết Vạn Tải Giáp', 
        description: 'Một bộ giáp toàn thân với sức nặng kinh người. Hy sinh toàn bộ tốc độ để đổi lấy sức phòng ngự vật lý gần như không thể bị phá vỡ ở cùng cấp.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { physicalDefense: 1000, speed: -15 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
};
