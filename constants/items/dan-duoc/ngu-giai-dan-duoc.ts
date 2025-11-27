import { ItemQuality, ItemType, EquipmentQuality } from '../../../types/index.ts';
import type { Pill } from '../../../types/index.ts';

export const NGU_GIAI_DAN_DUOC: { [key: string]: Pill } = {
    hoa_vi_canh_dan: {
        id: 'hoa_vi_canh_dan',
        name: 'Hoá Vi Cảnh Đan',
        description: 'Đan dược Ngũ Giai Thượng Phẩm. Cung cấp tiên khí khổng lồ và một tia cảm ngộ Đại Đạo, trợ giúp tu sĩ Hóa Thần đột phá tiểu cảnh giới.',
        quality: ItemQuality.NGU_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        type: ItemType.PILL,
        effects: { cultivation_progress_gain: 150000 }, // A large, flat amount
        impurity: 10,
    },
    tien_khi_quy_nguyen_dan: {
        id: 'tien_khi_quy_nguyen_dan',
        name: 'Tiên Khí Quy Nguyên Đan',
        description: 'Đan dược Ngũ Giai Thượng Phẩm. Trong chớp mắt bổ sung lại 3 phần linh lực cho thần hồn, hiệu quả gần như tức thì.',
        quality: ItemQuality.NGU_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        type: ItemType.PILL,
        effects: { instant_mana_recovery: 0.3 }, // Recovers 30% of missing mana
    },
    phuong_tuy_sinh_huyet_dan: {
        id: 'phuong_tuy_sinh_huyet_dan',
        name: 'Phượng Tủy Sinh Huyết Đan',
        description: 'Đan dược Ngũ Giai Thượng Phẩm. Dù nhục thân bị đánh nát, chỉ cần thần hồn chưa diệt, có thể tái tạo lại khí huyết và xương thịt với tốc độ kinh người.',
        quality: ItemQuality.NGU_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        type: ItemType.PILL,
        effects: { instant_health_recovery: 1.0 }, // Recovers 100% of missing health
    },
    truong_sinh_dao_qua_dan: {
        id: 'truong_sinh_dao_qua_dan',
        name: 'Trường Sinh Đạo Quả Đan',
        description: 'Đan dược Ngũ Giai Thượng Phẩm. Nghịch thiên cải mệnh, tăng trực tiếp 3000 năm tuổi thọ. Chỉ có tác dụng lần đầu.',
        quality: ItemQuality.NGU_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        type: ItemType.PILL,
        effects: { lifespan_increase: 3000 },
    },
    huyet_duong_phan_thien_dan: {
        id: 'huyet_duong_phan_thien_dan',
        name: 'Huyết Dương Phần Thiên Đan',
        description: 'Cấm đan Ngũ Giai Hạ Phẩm. Đốt cháy 2000 năm thọ nguyên và một phần tinh huyết, đổi lại một đòn tấn công hủy diệt. Cái giá phải trả là cực lớn.',
        quality: ItemQuality.NGU_GIAI,
        equipmentQuality: EquipmentQuality.HA_PHAM,
        type: ItemType.PILL,
        effects: { lifespan_cost: 2000, temporary_power_burst: 3.0 }, // 3x power for one hit
    },
};