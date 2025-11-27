import { ItemQuality, ItemType, EquipmentQuality } from '../../../types/index.ts';
import type { Pill } from '../../../types/index.ts';

export const NHI_GIAI_DAN_DUOC: { [key: string]: Pill } = {
    // Trúc Cơ Đan
    truc_co_dan_ha_pham: { id: 'truc_co_dan_ha_pham', name: 'Trúc Cơ Đan - Hạ Phẩm', description: 'Tăng 2 thành tỷ lệ đột phá Trúc Cơ. Thất bại có thể khiến đạo cơ bất ổn.', quality: ItemQuality.NHI_GIAI, equipmentQuality: EquipmentQuality.HA_PHAM, type: ItemType.PILL, effects: { breakthrough_success_chance_bonus: 0.2 }, impurity: 50 },
    truc_co_dan_trung_pham: { id: 'truc_co_dan_trung_pham', name: 'Trúc Cơ Đan - Trung Phẩm', description: 'Tăng 3 thành tỷ lệ đột phá Trúc Cơ. Dược lực ổn định.', quality: ItemQuality.NHI_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.PILL, effects: { breakthrough_success_chance_bonus: 0.3 }, impurity: 30 },
    truc_co_dan_thuong_pham: { id: 'truc_co_dan_thuong_pham', name: 'Trúc Cơ Đan - Thượng Phẩm', description: 'Tăng 4 thành tỷ lệ đột phá Trúc Cơ. Giúp xây dựng đạo cơ vững chắc.', quality: ItemQuality.NHI_GIAI, equipmentQuality: EquipmentQuality.THUONG_PHAM, type: ItemType.PILL, effects: { breakthrough_success_chance_bonus: 0.4 }, impurity: 10 },

    // Chân Nguyên Đan
    chan_nguyen_dan_ha_pham: { id: 'chan_nguyen_dan_ha_pham', name: 'Chân Nguyên Đan - Hạ Phẩm', description: 'Giúp tinh luyện chân nguyên, chuẩn bị cho việc kết đan.', quality: ItemQuality.NHI_GIAI, equipmentQuality: EquipmentQuality.HA_PHAM, type: ItemType.PILL, effects: { dao_co_vung_chac: 200 }, impurity: 20 },
    chan_nguyen_dan_trung_pham: { id: 'chan_nguyen_dan_trung_pham', name: 'Chân Nguyên Đan - Trung Phẩm', description: 'Giúp tinh luyện chân nguyên, chuẩn bị cho việc kết đan.', quality: ItemQuality.NHI_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.PILL, effects: { dao_co_vung_chac: 350 }, impurity: 10 },
    chan_nguyen_dan_thuong_pham: { id: 'chan_nguyen_dan_thuong_pham', name: 'Chân Nguyên Đan - Thượng Phẩm', description: 'Giúp tinh luyện chân nguyên đến mức thuần khiết nhất, khiến đạo cơ vững chắc phi thường.', quality: ItemQuality.NHI_GIAI, equipmentQuality: EquipmentQuality.THUONG_PHAM, type: ItemType.PILL, effects: { dao_co_vung_chac: 500 }, impurity: 5 },

    // Bích Huyết Dưỡng Thương Hoàn
    bich_huyet_duong_thuong_hoan_ha_pham: { id: 'bich_huyet_duong_thuong_hoan_ha_pham', name: 'Bích Huyết Dưỡng Thương Hoàn - Hạ Phẩm', description: 'Chữa trị nội thương cho tu sĩ Trúc Cơ.', quality: ItemQuality.NHI_GIAI, equipmentQuality: EquipmentQuality.HA_PHAM, type: ItemType.PILL, effects: { injury_recovery: 12 }, },
    bich_huyet_duong_thuong_hoan_trung_pham: { id: 'bich_huyet_duong_thuong_hoan_trung_pham', name: 'Bích Huyết Dưỡng Thương Hoàn - Trung Phẩm', description: 'Chữa trị nội thương cho tu sĩ Trúc Cơ.', quality: ItemQuality.NHI_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.PILL, effects: { injury_recovery: 18 }, },
    bich_huyet_duong_thuong_hoan_thuong_pham: { id: 'bich_huyet_duong_thuong_hoan_thuong_pham', name: 'Bích Huyết Dưỡng Thương Hoàn - Thượng Phẩm', description: 'Chữa trị nội thương cho tu sĩ Trúc Cơ. Dược lực ôn hòa nhưng hiệu quả.', quality: ItemQuality.NHI_GIAI, equipmentQuality: EquipmentQuality.THUONG_PHAM, type: ItemType.PILL, effects: { injury_recovery: 24 }, },

    // Đoán Cốt Hoàn
    doan_cot_hoan_ha_pham: { id: 'doan_cot_hoan_ha_pham', name: 'Đoán Cốt Hoàn - Hạ Phẩm', description: 'Tăng cường độ cứng và dẻo dai cho xương cốt.', quality: ItemQuality.NHI_GIAI, equipmentQuality: EquipmentQuality.HA_PHAM, type: ItemType.PILL, effects: { cuong_hoa_xuong_cot: 150 }, },
    doan_cot_hoan_trung_pham: { id: 'doan_cot_hoan_trung_pham', name: 'Đoán Cốt Hoàn - Trung Phẩm', description: 'Tăng cường độ cứng và dẻo dai cho xương cốt.', quality: ItemQuality.NHI_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.PILL, effects: { cuong_hoa_xuong_cot: 250 }, },
    doan_cot_hoan_thuong_pham: { id: 'doan_cot_hoan_thuong_pham', name: 'Đoán Cốt Hoàn - Thượng Phẩm', description: 'Tập trung tăng cường độ cứng và dẻo dai cho xương cốt.', quality: ItemQuality.NHI_GIAI, equipmentQuality: EquipmentQuality.THUONG_PHAM, type: ItemType.PILL, effects: { cuong_hoa_xuong_cot: 400 }, },

    // Dương Viêm Đan
    duong_viem_dan: { id: 'duong_viem_dan', name: 'Dương Viêm Đan', description: 'Cung cấp một luồng hỏa linh khí cực mạnh và tinh thuần. Cực kỳ nguy hiểm.', quality: ItemQuality.NHI_GIAI, equipmentQuality: EquipmentQuality.HA_PHAM, type: ItemType.PILL, effects: { temporary_fire_buff: 1 }, impurity: 80, },

    // Hàn Ngưng Tán
    han_ngung_tan: { id: 'han_ngung_tan', name: 'Hàn Ngưng Tán', description: 'Tạo ra một luồng hàn khí cực độ. Vô cùng khó khống chế.', quality: ItemQuality.NHI_GIAI, equipmentQuality: EquipmentQuality.HA_PHAM, type: ItemType.PILL, effects: { temporary_ice_buff: 1 }, impurity: 80, },
};