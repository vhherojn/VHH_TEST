import { ItemQuality, EquipmentQuality } from '../../types/index.ts';

// Thời gian (tháng) cần thiết để hoàn thành học việc cho một cấp bậc nghề nghiệp
export const PROFESSION_APPRENTICESHIP_DURATIONS: Record<ItemQuality, { min: number, max: number }> = {
    [ItemQuality.NHAT_GIAI]: { min: 6, max: 8 },      // Nhập môn
    [ItemQuality.NHI_GIAI]: { min: 12, max: 24 },    // Lên Nhị Giai
    [ItemQuality.TAM_GIAI]: { min: 36, max: 48 },    // Lên Tam Giai
    [ItemQuality.TU_GIAI]: { min: 120, max: 240 },   // Lên Tứ Giai
    [ItemQuality.NGU_GIAI]: { min: 1200, max: 2400 }, // Lên Ngũ Giai
};

// Thời gian (tháng) cần thiết để lĩnh ngộ, thăng phẩm chất trong cùng 1 Giai
export const PROFESSION_PROMOTION_DURATIONS: Record<ItemQuality, Record<EquipmentQuality, number>> = {
    [ItemQuality.NHAT_GIAI]: {
        [EquipmentQuality.HA_PHAM]: 6,
        [EquipmentQuality.TRUNG_PHAM]: 12,
        [EquipmentQuality.THUONG_PHAM]: Infinity,
    },
    [ItemQuality.NHI_GIAI]: {
        [EquipmentQuality.HA_PHAM]: 24,
        [EquipmentQuality.TRUNG_PHAM]: 48,
        [EquipmentQuality.THUONG_PHAM]: Infinity,
    },
    [ItemQuality.TAM_GIAI]: {
        [EquipmentQuality.HA_PHAM]: 96,
        [EquipmentQuality.TRUNG_PHAM]: 192,
        [EquipmentQuality.THUONG_PHAM]: Infinity,
    },
    [ItemQuality.TU_GIAI]: {
        [EquipmentQuality.HA_PHAM]: 1200,
        [EquipmentQuality.TRUNG_PHAM]: 2400,
        [EquipmentQuality.THUONG_PHAM]: Infinity,
    },
    [ItemQuality.NGU_GIAI]: {
        [EquipmentQuality.HA_PHAM]: 12000,
        [EquipmentQuality.TRUNG_PHAM]: 24000,
        [EquipmentQuality.THUONG_PHAM]: Infinity,
    },
};


// Tỷ lệ thành công cơ bản khi chế tạo, dựa trên cấp bậc và phẩm chất của nghề VÀ của vật phẩm
export const PROFESSION_CRAFTING_SUCCESS_RATES: Record<ItemQuality, Record<EquipmentQuality, Partial<Record<ItemQuality, Partial<Record<EquipmentQuality, number>>>>>> = {
    [ItemQuality.NHAT_GIAI]: {
        [EquipmentQuality.HA_PHAM]:    { [ItemQuality.NHAT_GIAI]: { [EquipmentQuality.HA_PHAM]: 0.4, [EquipmentQuality.TRUNG_PHAM]: 0.2 } },
        [EquipmentQuality.TRUNG_PHAM]: { [ItemQuality.NHAT_GIAI]: { [EquipmentQuality.HA_PHAM]: 0.6, [EquipmentQuality.TRUNG_PHAM]: 0.4, [EquipmentQuality.THUONG_PHAM]: 0.2 } },
        [EquipmentQuality.THUONG_PHAM]:{ [ItemQuality.NHAT_GIAI]: { [EquipmentQuality.HA_PHAM]: 0.8, [EquipmentQuality.TRUNG_PHAM]: 0.6, [EquipmentQuality.THUONG_PHAM]: 0.4 } },
    },
    [ItemQuality.NHI_GIAI]: {
        [EquipmentQuality.HA_PHAM]:    { [ItemQuality.NHI_GIAI]: { [EquipmentQuality.HA_PHAM]: 0.4, [EquipmentQuality.TRUNG_PHAM]: 0.2 } },
        [EquipmentQuality.TRUNG_PHAM]: { [ItemQuality.NHI_GIAI]: { [EquipmentQuality.HA_PHAM]: 0.6, [EquipmentQuality.TRUNG_PHAM]: 0.4, [EquipmentQuality.THUONG_PHAM]: 0.2 } },
        [EquipmentQuality.THUONG_PHAM]:{ [ItemQuality.NHI_GIAI]: { [EquipmentQuality.HA_PHAM]: 0.8, [EquipmentQuality.TRUNG_PHAM]: 0.6, [EquipmentQuality.THUONG_PHAM]: 0.4 } },
    },
    [ItemQuality.TAM_GIAI]: {
        [EquipmentQuality.HA_PHAM]:    { [ItemQuality.TAM_GIAI]: { [EquipmentQuality.HA_PHAM]: 0.4, [EquipmentQuality.TRUNG_PHAM]: 0.2 } },
        [EquipmentQuality.TRUNG_PHAM]: { [ItemQuality.TAM_GIAI]: { [EquipmentQuality.HA_PHAM]: 0.6, [EquipmentQuality.TRUNG_PHAM]: 0.4, [EquipmentQuality.THUONG_PHAM]: 0.2 } },
        [EquipmentQuality.THUONG_PHAM]:{ [ItemQuality.TAM_GIAI]: { [EquipmentQuality.HA_PHAM]: 0.8, [EquipmentQuality.TRUNG_PHAM]: 0.6, [EquipmentQuality.THUONG_PHAM]: 0.4 } },
    },
     [ItemQuality.TU_GIAI]: {
        [EquipmentQuality.HA_PHAM]:    { [ItemQuality.TU_GIAI]: { [EquipmentQuality.HA_PHAM]: 0.3, [EquipmentQuality.TRUNG_PHAM]: 0.1 } },
        [EquipmentQuality.TRUNG_PHAM]: { [ItemQuality.TU_GIAI]: { [EquipmentQuality.HA_PHAM]: 0.5, [EquipmentQuality.TRUNG_PHAM]: 0.2, [EquipmentQuality.THUONG_PHAM]: 0.1 } },
        [EquipmentQuality.THUONG_PHAM]:{ [ItemQuality.TU_GIAI]: { [EquipmentQuality.HA_PHAM]: 0.6, [EquipmentQuality.TRUNG_PHAM]: 0.3, [EquipmentQuality.THUONG_PHAM]: 0.2 } },
    },
     [ItemQuality.NGU_GIAI]: {
        [EquipmentQuality.HA_PHAM]:    { [ItemQuality.NGU_GIAI]: { [EquipmentQuality.HA_PHAM]: 0.2, [EquipmentQuality.TRUNG_PHAM]: 0.1 } },
        [EquipmentQuality.TRUNG_PHAM]: { [ItemQuality.NGU_GIAI]: { [EquipmentQuality.HA_PHAM]: 0.3, [EquipmentQuality.TRUNG_PHAM]: 0.2, [EquipmentQuality.THUONG_PHAM]: 0.1 } },
        [EquipmentQuality.THUONG_PHAM]:{ [ItemQuality.NGU_GIAI]: { [EquipmentQuality.HA_PHAM]: 0.4, [EquipmentQuality.TRUNG_PHAM]: 0.3, [EquipmentQuality.THUONG_PHAM]: 0.2 } },
    },
};