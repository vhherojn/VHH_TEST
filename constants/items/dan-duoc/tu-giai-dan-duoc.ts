import { ItemQuality, ItemType, EquipmentQuality } from '../../../types/index.ts';
import type { Pill } from '../../../types/index.ts';

export const TU_GIAI_DAN_DUOC: { [key: string]: Pill } = {
    // Đan Dược cho Nguyên Anh Kỳ
    thien_nguyen_tay_anh_dan: {
        id: 'thien_nguyen_tay_anh_dan',
        name: 'Thiên Nguyên Tẩy Anh Đan',
        description: 'Đan dược Tứ Giai Thượng Phẩm. Gột rửa Nguyên Anh, loại bỏ tạp chất, khiến Nguyên Anh trở nên tinh thuần, tăng khả năng cảm ứng với trời đất.',
        quality: ItemQuality.TU_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        type: ItemType.PILL,
        effects: { body_impurity_cleanse: 100 },
        impurity: 0,
    },
    phuong_van_tai_tao_tan: {
        id: 'phuong_van_tai_tao_tan',
        name: 'Phượng Văn Tái Tạo Tán',
        description: 'Đan dược Tứ Giai Thượng Phẩm. Thánh dược chữa thương cho Nguyên Anh. Dù Nguyên Anh bị rạn nứt, suy yếu, dùng bột thuốc này có thể giúp nó từ từ hồi phục.',
        quality: ItemQuality.TU_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        type: ItemType.PILL,
        effects: { injury_recovery: 600 }, // 50 years of healing
    },
    tu_long_hoa_the_hoan: {
        id: 'tu_long_hoa_the_hoan',
        name: 'Tử Long Hóa Thể Hoàn',
        description: 'Đan dược Tứ Giai Thượng Phẩm. Cường hóa nhục thân đến mức cực hạn, khiến cơ thể sánh ngang với yêu thú cấp cao.',
        quality: ItemQuality.TU_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        type: ItemType.PILL,
        effects: { permanent_health_boost: 50000, permanent_physical_attack_boost: 5000 },
        impurity: 50,
    },
    tran_nguc_thanh_tam_dan: {
        id: 'tran_nguc_thanh_tam_dan',
        name: 'Trấn Ngục Thanh Tâm Đan',
        description: 'Đan dược Tứ Giai Thượng Phẩm. Trấn áp tâm ma, giữ cho linh đài thanh tịnh. Dược lực kéo dài ba năm.',
        quality: ItemQuality.TU_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        type: ItemType.PILL,
        effects: { dao_tam_boost: 10 },
        impurity: 5,
    },
    
    // Đan Dược Đặc Biệt cho Kim Đan Kỳ
    hoa_anh_dan: {
        id: 'hoa_anh_dan',
        name: 'Hoá Anh Đan',
        description: 'Đan dược nghịch thiên Tứ Giai. Chìa khóa để phá đan thành anh, tăng tỷ lệ đột phá đại bình cảnh, tâm ma kiếp và lôi kiếp thêm 1 thành.',
        quality: ItemQuality.TU_GIAI,
        equipmentQuality: EquipmentQuality.HA_PHAM, 
        type: ItemType.PILL,
        effects: { 
            breakthrough_success_chance_bonus: 0.1,
            demon_tribulation_chance_bonus: 0.1,
            lightning_tribulation_chance_bonus: 0.1,
        },
    },

    // New Pills for 0.45
    cuu_chuyen_long_hon_dan: {
        id: 'cuu_chuyen_long_hon_dan',
        name: 'Cửu Chuyển Long Hồn Đan',
        description: 'Đan dược Tứ Giai Thượng Phẩm. Uống vào có hiệu quả tức thì, phục hồi 3 phần linh lực của Nguyên Anh và thương thế nhục thân. Bảo vật vô giá.',
        quality: ItemQuality.TU_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        type: ItemType.PILL,
        effects: { instant_recovery: 0.3 }, // Recovers 30% of missing health and mana
    },
    dien_tho_dan: {
        id: 'dien_tho_dan',
        name: 'Diên Thọ Đan',
        description: 'Đan dược Tứ Giai Thượng Phẩm. Nghịch thiên cải mệnh, tăng trực tiếp 500 năm tuổi thọ. Luyện chế sẽ gặp Đan Kiếp. Hiệu quả giảm dần sau mỗi lần dùng.',
        quality: ItemQuality.TU_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        type: ItemType.PILL,
        effects: { lifespan_increase: 500 },
    },
};