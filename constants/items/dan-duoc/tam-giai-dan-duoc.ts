import { ItemQuality, ItemType, EquipmentQuality } from '../../../types/index.ts';
import type { Pill } from '../../../types/index.ts';

export const TAM_GIAI_DAN_DUOC: { [key: string]: Pill } = {
    // Tuyết Liên Dưỡng Hồn Đan
    tuyet_lien_duong_hon_dan_ha_pham: { id: 'tuyet_lien_duong_hon_dan_ha_pham', name: 'Tuyết Liên Dưỡng Hồn Đan - Hạ Phẩm', description: 'Chữa trị các thương thế về thần hồn và Kim Đan.', quality: ItemQuality.TAM_GIAI, equipmentQuality: EquipmentQuality.HA_PHAM, type: ItemType.PILL, effects: { injury_recovery: 36 } },
    tuyet_lien_duong_hon_dan_trung_pham: { id: 'tuyet_lien_duong_hon_dan_trung_pham', name: 'Tuyết Liên Dưỡng Hồn Đan - Trung Phẩm', description: 'Chữa trị các thương thế về thần hồn và Kim Đan.', quality: ItemQuality.TAM_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.PILL, effects: { injury_recovery: 48 } },
    tuyet_lien_duong_hon_dan_thuong_pham: { id: 'tuyet_lien_duong_hon_dan_thuong_pham', name: 'Tuyết Liên Dưỡng Hồn Đan - Thượng Phẩm', description: 'Chữa trị các thương thế về thần hồn và Kim Đan.', quality: ItemQuality.TAM_GIAI, equipmentQuality: EquipmentQuality.THUONG_PHAM, type: ItemType.PILL, effects: { injury_recovery: 60 } },

    // Sinh Cơ Tái Tạo Đan
    sinh_co_tai_tao_dan_ha_pham: { id: 'sinh_co_tai_tao_dan_ha_pham', name: 'Sinh Cơ Tái Tạo Đan - Hạ Phẩm', description: 'Có khả năng tái tạo lại tứ chi bị đứt lìa.', quality: ItemQuality.TAM_GIAI, equipmentQuality: EquipmentQuality.HA_PHAM, type: ItemType.PILL, effects: { full_recovery: 1 } },
    sinh_co_tai_tao_dan_trung_pham: { id: 'sinh_co_tai_tao_dan_trung_pham', name: 'Sinh Cơ Tái Tạo Đan - Trung Phẩm', description: 'Có khả năng tái tạo lại tứ chi bị đứt lìa.', quality: ItemQuality.TAM_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.PILL, effects: { full_recovery: 1 } },
    sinh_co_tai_tao_dan_thuong_pham: { id: 'sinh_co_tai_tao_dan_thuong_pham', name: 'Sinh Cơ Tái Tạo Đan - Thượng Phẩm', description: 'Có khả năng tái tạo lại tứ chi bị đứt lìa.', quality: ItemQuality.TAM_GIAI, equipmentQuality: EquipmentQuality.THUONG_PHAM, type: ItemType.PILL, effects: { full_recovery: 1 } },

    // Nghê Thường Mộng Ảo Đan
    nghe_thuong_mong_ao_dan_ha_pham: { id: 'nghe_thuong_mong_ao_dan_ha_pham', name: 'Nghê Thường Mộng Ảo Đan - Hạ Phẩm', description: 'Kéo người khác vào ảo cảnh.', quality: ItemQuality.TAM_GIAI, equipmentQuality: EquipmentQuality.HA_PHAM, type: ItemType.PILL, effects: { illusion_power: 1 } },
    nghe_thuong_mong_ao_dan_trung_pham: { id: 'nghe_thuong_mong_ao_dan_trung_pham', name: 'Nghê Thường Mộng Ảo Đan - Trung Phẩm', description: 'Kéo người khác vào ảo cảnh.', quality: ItemQuality.TAM_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.PILL, effects: { illusion_power: 2 } },
    nghe_thuong_mong_ao_dan_thuong_pham: { id: 'nghe_thuong_mong_ao_dan_thuong_pham', name: 'Nghê Thường Mộng Ảo Đan - Thượng Phẩm', description: 'Kéo người khác vào ảo cảnh.', quality: ItemQuality.TAM_GIAI, equipmentQuality: EquipmentQuality.THUONG_PHAM, type: ItemType.PILL, effects: { illusion_power: 3 } },

    // Huyết Sát Ma Thể Đan
    huyet_sat_ma_the_dan: { id: 'huyet_sat_ma_the_dan', name: 'Huyết Sát Ma Thể Đan', description: 'Cấm đan của ma đạo, đốt cháy Kim Đan để có sức mạnh tiệm cận Nguyên Anh. Sau khi dùng, Kim Đan chắc chắn sẽ bị rạn nứt.', quality: ItemQuality.TAM_GIAI, equipmentQuality: EquipmentQuality.THUONG_PHAM, type: ItemType.PILL, effects: { self_harm_buff: 1 } },

    // Chuyển Kim Đan
    chuyen_kim_dan: { id: 'chuyen_kim_dan', name: 'Chuyển Kim Đan', description: 'Đan dược nghịch thiên, tăng 1 thành tỷ lệ đột phá Kim Đan.', quality: ItemQuality.TAM_GIAI, equipmentQuality: EquipmentQuality.HA_PHAM, type: ItemType.PILL, effects: { breakthrough_success_chance_bonus: 0.1 } },

    // Huyết Sát Kim Đan
    huyet_sat_kim_dan: { id: 'huyet_sat_kim_dan', name: 'Huyết Sát Kim Đan', description: 'Ma đan nghịch thiên, tăng 10 thành tỷ lệ đột phá Kim Đan, đổi lại cả đời không thể tấn thăng Nguyên Anh Kỳ.', quality: ItemQuality.TAM_GIAI, equipmentQuality: EquipmentQuality.THUONG_PHAM, type: ItemType.PILL, effects: { breakthrough_success_chance_bonus: 10.0 } },

    // New Pills for 0.45
    huyet_sam_bao_khi_dan: {
        id: 'huyet_sam_bao_khi_dan',
        name: 'Huyết Sâm Bạo Khí Đan',
        description: 'Đan dược Tam Giai Thượng Phẩm. Bùng nổ dược lực trong chiến đấu, bổ sung 4 phần khí huyết và linh lực đã mất trong 3 hiệp. Sau khi dùng sẽ tổn thương kinh mạch.',
        quality: ItemQuality.TAM_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        type: ItemType.PILL,
        effects: { combat_recovery: 0.4, duration: 3, post_battle_injury: 24 }, // 24 months injury
    },
    dien_tho_hoan: {
        id: 'dien_tho_hoan',
        name: 'Diên Thọ Hoàn',
        description: 'Đan dược Tam Giai Thượng Phẩm. Tăng cường sinh cơ, làm chậm lão hóa, kéo dài tuổi thọ khoảng 70 năm. Hiệu quả giảm dần sau mỗi lần dùng.',
        quality: ItemQuality.TAM_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        type: ItemType.PILL,
        effects: { lifespan_increase: 70 },
        impurity: 5,
    },
};