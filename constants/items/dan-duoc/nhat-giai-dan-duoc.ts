import { ItemQuality, ItemType, EquipmentQuality, Element } from '../../../types/index.ts';
import type { Pill } from '../../../types/index.ts';

export const NHAT_GIAI_DAN_DUOC: { [key: string]: Pill } = {
    // Tụ Khí Đan
    tu_khi_dan_ha_pham: { id: 'tu_khi_dan_ha_pham', name: 'Tụ Khí Đan - Hạ Phẩm', description: 'Đan dược Nhất Giai, giúp tăng trưởng tu vi cho tu sĩ cấp thấp.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.HA_PHAM, type: ItemType.PILL, effects: { cultivation_progress_gain: 100 }, impurity: 12, },
    tu_khi_dan_trung_pham: { id: 'tu_khi_dan_trung_pham', name: 'Tụ Khí Đan - Trung Phẩm', description: 'Đan dược Nhất Giai, giúp tăng trưởng tu vi cho tu sĩ cấp thấp.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.PILL, effects: { cultivation_progress_gain: 120 }, impurity: 8, },
    tu_khi_dan_thuong_pham: { id: 'tu_khi_dan_thuong_pham', name: 'Tụ Khí Đan - Thượng Phẩm', description: 'Đan dược Nhất Giai, giúp tăng trưởng tu vi cho tu sĩ cấp thấp.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.THUONG_PHAM, type: ItemType.PILL, effects: { cultivation_progress_gain: 150 }, impurity: 5, },
    
    // Hồi Khí Đan
    hoi_khi_dan_ha_pham: { id: 'hoi_khi_dan_ha_pham', name: 'Hồi Khí Đan - Hạ Phẩm', description: 'Đan dược Nhất Giai, giúp hồi phục khí huyết sau khi bị thương.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.HA_PHAM, type: ItemType.PILL, effects: { health_recovery: 80 }, },
    hoi_khi_dan_trung_pham: { id: 'hoi_khi_dan_trung_pham', name: 'Hồi Khí Đan - Trung Phẩm', description: 'Đan dược Nhất Giai, giúp hồi phục khí huyết sau khi bị thương.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.PILL, effects: { health_recovery: 120 }, },
    hoi_khi_dan_thuong_pham: { id: 'hoi_khi_dan_thuong_pham', name: 'Hồi Khí Đan - Thượng Phẩm', description: 'Đan dược Nhất Giai, giúp hồi phục khí huyết sau khi bị thương.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.THUONG_PHAM, type: ItemType.PILL, effects: { health_recovery: 180 }, },

    // Bạo Khí Đan
    bao_khi_dan_ha_pham: { id: 'bao_khi_dan_ha_pham', name: 'Bạo Khí Đan - Hạ Phẩm', description: 'Dùng trong chiến đấu, tăng tạm thời sức chiến đấu. Dùng nhiều sẽ ảnh hưởng căn cơ.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.HA_PHAM, type: ItemType.PILL, effects: { temporary_combat_buff: 1.1 }, impurity: 30, },
    bao_khi_dan_trung_pham: { id: 'bao_khi_dan_trung_pham', name: 'Bạo Khí Đan - Trung Phẩm', description: 'Dùng trong chiến đấu, tăng tạm thời sức chiến đấu. Dùng nhiều sẽ ảnh hưởng căn cơ.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.PILL, effects: { temporary_combat_buff: 1.15 }, impurity: 25, },
    bao_khi_dan_thuong_pham: { id: 'bao_khi_dan_thuong_pham', name: 'Bạo Khí Đan - Thượng Phẩm', description: 'Dùng trong chiến đấu, tăng tạm thời sức chiến đấu. Dùng nhiều sẽ ảnh hưởng căn cơ.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.THUONG_PHAM, type: ItemType.PILL, effects: { temporary_combat_buff: 1.2 }, impurity: 20, },

    // An Mạch Hoàn
    an_mach_hoan_ha_pham: { id: 'an_mach_hoan_ha_pham', name: 'An Mạch Hoàn - Hạ Phẩm', description: 'Ổn định chân khí đang bạo động, dùng khi tu luyện sai sót.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.HA_PHAM, type: ItemType.PILL, effects: { injury_recovery: 3 }, },
    an_mach_hoan_trung_pham: { id: 'an_mach_hoan_trung_pham', name: 'An Mạch Hoàn - Trung Phẩm', description: 'Ổn định chân khí đang bạo động, dùng khi tu luyện sai sót.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.PILL, effects: { injury_recovery: 6 }, },
    an_mach_hoan_thuong_pham: { id: 'an_mach_hoan_thuong_pham', name: 'An Mạch Hoàn - Thượng Phẩm', description: 'Ổn định chân khí đang bạo động, dùng khi tu luyện sai sót.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.THUONG_PHAM, type: ItemType.PILL, effects: { injury_recovery: 9 }, },

    // Hồi Xuân Sinh Cơ Cao
    hoi_xuan_sinh_co_cao_ha_pham: { id: 'hoi_xuan_sinh_co_cao_ha_pham', name: 'Hồi Xuân Sinh Cơ Cao - Hạ Phẩm', description: 'Bôi ngoài vết thương, giúp cầm máu, tái tạo da thịt.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.HA_PHAM, type: ItemType.PILL, effects: { health_recovery: 150 }, },
    hoi_xuan_sinh_co_cao_trung_pham: { id: 'hoi_xuan_sinh_co_cao_trung_pham', name: 'Hồi Xuân Sinh Cơ Cao - Trung Phẩm', description: 'Bôi ngoài vết thương, giúp cầm máu, tái tạo da thịt.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.PILL, effects: { health_recovery: 200 }, },
    hoi_xuan_sinh_co_cao_thuong_pham: { id: 'hoi_xuan_sinh_co_cao_thuong_pham', name: 'Hồi Xuân Sinh Cơ Cao - Thượng Phẩm', description: 'Bôi ngoài vết thương, giúp cầm máu, tái tạo da thịt.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.THUONG_PHAM, type: ItemType.PILL, effects: { health_recovery: 280 }, },

    // Xích Hỏa Tán
    xich_hoa_tan_ha_pham: { id: 'xich_hoa_tan_ha_pham', name: 'Xích Hỏa Tán - Hạ Phẩm', description: 'Dành riêng cho tu sĩ hệ Hỏa, tăng tốc độ chuyển hóa hỏa linh khí.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.HA_PHAM, type: ItemType.PILL, effects: { cultivation_progress_gain: 150, requires_element_fire: 1 }, impurity: 20, },
    xich_hoa_tan_trung_pham: { id: 'xich_hoa_tan_trung_pham', name: 'Xích Hỏa Tán - Trung Phẩm', description: 'Dành riêng cho tu sĩ hệ Hỏa, tăng tốc độ chuyển hóa hỏa linh khí.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.PILL, effects: { cultivation_progress_gain: 200, requires_element_fire: 1 }, impurity: 15, },
    xich_hoa_tan_thuong_pham: { id: 'xich_hoa_tan_thuong_pham', name: 'Xích Hỏa Tán - Thượng Phẩm', description: 'Dành riêng cho tu sĩ hệ Hỏa, tăng tốc độ chuyển hóa hỏa linh khí.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.THUONG_PHAM, type: ItemType.PILL, effects: { cultivation_progress_gain: 250, requires_element_fire: 1 }, impurity: 10, },

    // U Tức Hoàn
    u_tuc_hoan_ha_pham: { id: 'u_tuc_hoan_ha_pham', name: 'U Tức Hoàn - Hạ Phẩm', description: 'Giúp che giấu khí tức tạm thời.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.HA_PHAM, type: ItemType.PILL, effects: { aura_concealment: 1 }, },
    u_tuc_hoan_trung_pham: { id: 'u_tuc_hoan_trung_pham', name: 'U Tức Hoàn - Trung Phẩm', description: 'Giúp che giấu khí tức tạm thời, hiệu quả tốt hơn.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.PILL, effects: { aura_concealment: 2 }, },
    u_tuc_hoan_thuong_pham: { id: 'u_tuc_hoan_thuong_pham', name: 'U Tức Hoàn - Thượng Phẩm', description: 'Giúp che giấu khí tức tạm thời, rất khó bị phát hiện.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.THUONG_PHAM, type: ItemType.PILL, effects: { aura_concealment: 3 }, },
};