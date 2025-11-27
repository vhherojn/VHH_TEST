import { ItemQuality, EquipmentQuality, LocationData, ProfessionType, CultivationStage } from './types/index.ts';

export const LINH_MACH_DATA: Record<ItemQuality, Record<EquipmentQuality, { linhKhiProduction: number, upgradeCost: number, cultivationModifier: number }>> = {
    [ItemQuality.NHAT_GIAI]: {
        [EquipmentQuality.HA_PHAM]:    { linhKhiProduction: 100, upgradeCost: 1000, cultivationModifier: 1.0 },
        [EquipmentQuality.TRUNG_PHAM]: { linhKhiProduction: 150, upgradeCost: 2000, cultivationModifier: 1.05 },
        [EquipmentQuality.THUONG_PHAM]:{ linhKhiProduction: 200, upgradeCost: 4000, cultivationModifier: 1.1 },
    },
    [ItemQuality.NHI_GIAI]: {
        [EquipmentQuality.HA_PHAM]:    { linhKhiProduction: 500, upgradeCost: 10000, cultivationModifier: 1.2 },
        [EquipmentQuality.TRUNG_PHAM]: { linhKhiProduction: 750, upgradeCost: 20000, cultivationModifier: 1.25 },
        [EquipmentQuality.THUONG_PHAM]:{ linhKhiProduction: 1000, upgradeCost: 40000, cultivationModifier: 1.3 },
    },
    [ItemQuality.TAM_GIAI]: {
        [EquipmentQuality.HA_PHAM]:    { linhKhiProduction: 2000, upgradeCost: 100000, cultivationModifier: 1.4 },
        [EquipmentQuality.TRUNG_PHAM]: { linhKhiProduction: 3000, upgradeCost: 200000, cultivationModifier: 1.5 },
        [EquipmentQuality.THUONG_PHAM]:{ linhKhiProduction: 4000, upgradeCost: 400000, cultivationModifier: 1.6 },
    },
     [ItemQuality.TU_GIAI]: {
        [EquipmentQuality.HA_PHAM]:    { linhKhiProduction: 8000, upgradeCost: 1000000, cultivationModifier: 1.8 },
        [EquipmentQuality.TRUNG_PHAM]: { linhKhiProduction: 12000, upgradeCost: 2000000, cultivationModifier: 2.0 },
        [EquipmentQuality.THUONG_PHAM]:{ linhKhiProduction: 16000, upgradeCost: 4000000, cultivationModifier: 2.2 },
    },
     [ItemQuality.NGU_GIAI]: {
        [EquipmentQuality.HA_PHAM]:    { linhKhiProduction: 20000, upgradeCost: 5000000, cultivationModifier: 2.5 },
        [EquipmentQuality.TRUNG_PHAM]: { linhKhiProduction: 30000, upgradeCost: 10000000, cultivationModifier: 2.8 },
        [EquipmentQuality.THUONG_PHAM]:{ linhKhiProduction: 40000, upgradeCost: 20000000, cultivationModifier: 3.2 },
    },
};

// New constant for update 0.52
export const LINH_MACH_SUPPORT_CAPACITY: Record<ItemQuality, Record<EquipmentQuality, Partial<Record<CultivationStage, number>>>> = {
    [ItemQuality.NHAT_GIAI]: {
        [EquipmentQuality.HA_PHAM]:    { [CultivationStage.FOUNDATION_ESTABLISHMENT]: 5 },
        [EquipmentQuality.TRUNG_PHAM]: { [CultivationStage.FOUNDATION_ESTABLISHMENT]: 8 },
        [EquipmentQuality.THUONG_PHAM]:{ [CultivationStage.FOUNDATION_ESTABLISHMENT]: 10 },
    },
    [ItemQuality.NHI_GIAI]: {
        [EquipmentQuality.HA_PHAM]:    { [CultivationStage.FOUNDATION_ESTABLISHMENT]: 20, [CultivationStage.CORE_FORMATION]: 0 },
        [EquipmentQuality.TRUNG_PHAM]: { [CultivationStage.FOUNDATION_ESTABLISHMENT]: 30, [CultivationStage.CORE_FORMATION]: 0 },
        [EquipmentQuality.THUONG_PHAM]:{ [CultivationStage.FOUNDATION_ESTABLISHMENT]: 50, [CultivationStage.CORE_FORMATION]: 0 },
    },
    [ItemQuality.TAM_GIAI]: {
        [EquipmentQuality.HA_PHAM]:    { [CultivationStage.CORE_FORMATION]: 1 },
        [EquipmentQuality.TRUNG_PHAM]: { [CultivationStage.CORE_FORMATION]: 2 },
        [EquipmentQuality.THUONG_PHAM]:{ [CultivationStage.CORE_FORMATION]: 3, [CultivationStage.NASCENT_SOUL]: 0 },
    },
     [ItemQuality.TU_GIAI]: {
        [EquipmentQuality.HA_PHAM]:    { [CultivationStage.CORE_FORMATION]: 5, [CultivationStage.NASCENT_SOUL]: 1 },
        [EquipmentQuality.TRUNG_PHAM]: { [CultivationStage.CORE_FORMATION]: 8, [CultivationStage.NASCENT_SOUL]: 2 },
        [EquipmentQuality.THUONG_PHAM]:{ [CultivationStage.CORE_FORMATION]: 10, [CultivationStage.NASCENT_SOUL]: 3, [CultivationStage.SOUL_FORMATION]: 0 },
    },
     [ItemQuality.NGU_GIAI]: {
        [EquipmentQuality.HA_PHAM]:    { [CultivationStage.NASCENT_SOUL]: 5, [CultivationStage.SOUL_FORMATION]: 1 },
        [EquipmentQuality.TRUNG_PHAM]: { [CultivationStage.NASCENT_SOUL]: 8, [CultivationStage.SOUL_FORMATION]: 2 },
        [EquipmentQuality.THUONG_PHAM]:{ [CultivationStage.NASCENT_SOUL]: 10, [CultivationStage.SOUL_FORMATION]: 3 },
    },
};


export const BUILDINGS: Record<string, { id: string; name: string; profession: ProfessionType | null; }> = {
    tu_duong: { id: 'tu_duong', name: 'Từ Đường', profession: null },
    kho_phong: { id: 'kho_phong', name: 'Khố Phòng', profession: null },
    library: { id: 'library', name: 'Tàng Kinh Các', profession: null },
    alchemist_room: { id: 'alchemist_room', name: 'Luyện Đan Phòng', profession: ProfessionType.ALCHEMIST },
    blacksmith_forge: { id: 'blacksmith_forge', name: 'Luyện Khí Các', profession: ProfessionType.BLACKSMITH },
    talisman_house: { id: 'talisman_house', name: 'Luyện Phù Trận', profession: ProfessionType.TALISMAN_MASTER },
    tran_phap_duong: { id: 'tran_phap_duong', name: 'Trận Pháp Đường', profession: ProfessionType.FORMATION_MASTER },
    herb_garden: { id: 'herb_garden', name: 'Dược Điền', profession: ProfessionType.SPIRIT_FARMER },
    vo_dai: { id: 'vo_dai', name: 'Võ Đài', profession: null },
    su_vu_duong: { id: 'su_vu_duong', name: 'Sự Vụ Đường', profession: null },
    tran_yeu_duong: { id: 'tran_yeu_duong', name: 'Trấn Yêu Đường', profession: null },
    huan_cong_duong: { id: 'huan_cong_duong', name: 'Huân Công Đường', profession: null },
    thiet_luat_duong: { id: 'thiet_luat_duong', name: 'Thiết Luật Đường', profession: null },
    thang_tien_dai: { id: 'thang_tien_dai', name: 'Thăng Tiên Đài', profession: null },
    tu_luyen_thap: { id: 'tu_luyen_thap', name: 'Tu Luyện Tháp', profession: null },
};

// Cấu trúc chi phí nâng cấp mới cho Công trình
export const BUILDING_UPGRADE_DATA: Record<string, Partial<Record<ItemQuality, Partial<Record<EquipmentQuality, { wood: number, stone: number, spirit_stone: number }>>>>> = {
    'library': {
        [ItemQuality.NHAT_GIAI]: { [EquipmentQuality.HA_PHAM]: {wood: 200, stone: 75, spirit_stone: 100}, [EquipmentQuality.TRUNG_PHAM]: { wood: 400, stone: 150, spirit_stone: 200 }, [EquipmentQuality.THUONG_PHAM]: { wood: 800, stone: 300, spirit_stone: 400 } },
        [ItemQuality.NHI_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 1600, stone: 600, spirit_stone: 800 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 3200, stone: 1200, spirit_stone: 1600 }, [EquipmentQuality.THUONG_PHAM]: { wood: 6400, stone: 2400, spirit_stone: 3200 } },
        [ItemQuality.TAM_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 12800, stone: 4800, spirit_stone: 6400 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 25600, stone: 9600, spirit_stone: 12800 }, [EquipmentQuality.THUONG_PHAM]: { wood: 51200, stone: 19200, spirit_stone: 25600 } },
        [ItemQuality.TU_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 102400, stone: 38400, spirit_stone: 51200 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 204800, stone: 76800, spirit_stone: 102400 }, [EquipmentQuality.THUONG_PHAM]: { wood: 409600, stone: 153600, spirit_stone: 204800 } },
        [ItemQuality.NGU_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 819200, stone: 307200, spirit_stone: 409600 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 1638400, stone: 614400, spirit_stone: 819200 }, [EquipmentQuality.THUONG_PHAM]: { wood: 3276800, stone: 1228800, spirit_stone: 1638400 } },
    },
    'alchemist_room': {
        [ItemQuality.NHAT_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 200, stone: 100, spirit_stone: 150 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 400, stone: 200, spirit_stone: 300 }, [EquipmentQuality.THUONG_PHAM]: { wood: 800, stone: 400, spirit_stone: 600 } },
        [ItemQuality.NHI_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 1600, stone: 800, spirit_stone: 1200 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 3200, stone: 1600, spirit_stone: 2400 }, [EquipmentQuality.THUONG_PHAM]: { wood: 6400, stone: 3200, spirit_stone: 4800 } },
        [ItemQuality.TAM_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 12800, stone: 6400, spirit_stone: 9600 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 25600, stone: 12800, spirit_stone: 19200 }, [EquipmentQuality.THUONG_PHAM]: { wood: 51200, stone: 25600, spirit_stone: 38400 } },
        [ItemQuality.TU_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 102400, stone: 51200, spirit_stone: 76800 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 204800, stone: 102400, spirit_stone: 153600 }, [EquipmentQuality.THUONG_PHAM]: { wood: 409600, stone: 204800, spirit_stone: 307200 } },
        [ItemQuality.NGU_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 819200, stone: 409600, spirit_stone: 614400 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 1638400, stone: 819200, spirit_stone: 1228800 }, [EquipmentQuality.THUONG_PHAM]: { wood: 3276800, stone: 1638400, spirit_stone: 2457600 } },
    },
    'blacksmith_forge': {
        [ItemQuality.NHAT_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 150, stone: 250, spirit_stone: 150 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 300, stone: 500, spirit_stone: 300 }, [EquipmentQuality.THUONG_PHAM]: { wood: 600, stone: 1000, spirit_stone: 600 } },
        [ItemQuality.NHI_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 1200, stone: 2000, spirit_stone: 1200 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 2400, stone: 4000, spirit_stone: 2400 }, [EquipmentQuality.THUONG_PHAM]: { wood: 4800, stone: 8000, spirit_stone: 4800 } },
        [ItemQuality.TAM_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 9600, stone: 16000, spirit_stone: 9600 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 19200, stone: 32000, spirit_stone: 19200 }, [EquipmentQuality.THUONG_PHAM]: { wood: 38400, stone: 64000, spirit_stone: 38400 } },
        [ItemQuality.TU_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 76800, stone: 128000, spirit_stone: 76800 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 153600, stone: 256000, spirit_stone: 153600 }, [EquipmentQuality.THUONG_PHAM]: { wood: 307200, stone: 512000, spirit_stone: 307200 } },
        [ItemQuality.NGU_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 614400, stone: 1024000, spirit_stone: 614400 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 1228800, stone: 2048000, spirit_stone: 1228800 }, [EquipmentQuality.THUONG_PHAM]: { wood: 2457600, stone: 4096000, spirit_stone: 2457600 } },
    },
    'talisman_house': {
        [ItemQuality.NHAT_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 250, stone: 50, spirit_stone: 200 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 500, stone: 100, spirit_stone: 400 }, [EquipmentQuality.THUONG_PHAM]: { wood: 1000, stone: 200, spirit_stone: 800 } },
        [ItemQuality.NHI_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 2000, stone: 400, spirit_stone: 1600 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 4000, stone: 800, spirit_stone: 3200 }, [EquipmentQuality.THUONG_PHAM]: { wood: 8000, stone: 1600, spirit_stone: 6400 } },
        [ItemQuality.TAM_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 16000, stone: 3200, spirit_stone: 12800 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 32000, stone: 6400, spirit_stone: 25600 }, [EquipmentQuality.THUONG_PHAM]: { wood: 64000, stone: 12800, spirit_stone: 51200 } },
        [ItemQuality.TU_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 128000, stone: 25600, spirit_stone: 102400 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 256000, stone: 51200, spirit_stone: 204800 }, [EquipmentQuality.THUONG_PHAM]: { wood: 512000, stone: 102400, spirit_stone: 409600 } },
        [ItemQuality.NGU_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 1024000, stone: 204800, spirit_stone: 819200 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 2048000, stone: 409600, spirit_stone: 1638400 }, [EquipmentQuality.THUONG_PHAM]: { wood: 4096000, stone: 819200, spirit_stone: 3276800 } },
    },
    'tran_phap_duong': {
        [ItemQuality.NHAT_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 300, stone: 300, spirit_stone: 300 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 600, stone: 600, spirit_stone: 600 }, [EquipmentQuality.THUONG_PHAM]: { wood: 1200, stone: 1200, spirit_stone: 1200 } },
        [ItemQuality.NHI_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 2400, stone: 2400, spirit_stone: 2400 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 4800, stone: 4800, spirit_stone: 4800 }, [EquipmentQuality.THUONG_PHAM]: { wood: 9600, stone: 9600, spirit_stone: 9600 } },
        [ItemQuality.TAM_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 19200, stone: 19200, spirit_stone: 19200 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 38400, stone: 38400, spirit_stone: 38400 }, [EquipmentQuality.THUONG_PHAM]: { wood: 76800, stone: 76800, spirit_stone: 76800 } },
        [ItemQuality.TU_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 153600, stone: 153600, spirit_stone: 153600 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 307200, stone: 307200, spirit_stone: 307200 }, [EquipmentQuality.THUONG_PHAM]: { wood: 614400, stone: 614400, spirit_stone: 614400 } },
        [ItemQuality.NGU_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 1228800, stone: 1228800, spirit_stone: 1228800 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 2457600, stone: 2457600, spirit_stone: 2457600 }, [EquipmentQuality.THUONG_PHAM]: { wood: 4915200, stone: 4915200, spirit_stone: 4915200 } },
    },
    'herb_garden': {
        [ItemQuality.NHAT_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 300, stone: 100, spirit_stone: 100 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 600, stone: 200, spirit_stone: 200 }, [EquipmentQuality.THUONG_PHAM]: { wood: 1200, stone: 400, spirit_stone: 400 } },
        [ItemQuality.NHI_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 2400, stone: 800, spirit_stone: 800 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 4800, stone: 1600, spirit_stone: 1600 }, [EquipmentQuality.THUONG_PHAM]: { wood: 9600, stone: 3200, spirit_stone: 3200 } },
        [ItemQuality.TAM_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 19200, stone: 6400, spirit_stone: 6400 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 38400, stone: 12800, spirit_stone: 12800 }, [EquipmentQuality.THUONG_PHAM]: { wood: 76800, stone: 25600, spirit_stone: 25600 } },
        [ItemQuality.TU_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 153600, stone: 51200, spirit_stone: 51200 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 307200, stone: 102400, spirit_stone: 102400 }, [EquipmentQuality.THUONG_PHAM]: { wood: 614400, stone: 204800, spirit_stone: 204800 } },
        [ItemQuality.NGU_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 1228800, stone: 409600, spirit_stone: 409600 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 2457600, stone: 819200, spirit_stone: 819200 }, [EquipmentQuality.THUONG_PHAM]: { wood: 4915200, stone: 1638400, spirit_stone: 1638400 } },
    },
    'vo_dai': {
        [ItemQuality.NHAT_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 50, stone: 400, spirit_stone: 300 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 100, stone: 800, spirit_stone: 600 }, [EquipmentQuality.THUONG_PHAM]: { wood: 200, stone: 1600, spirit_stone: 1200 } },
        [ItemQuality.NHI_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 400, stone: 3200, spirit_stone: 2400 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 800, stone: 6400, spirit_stone: 4800 }, [EquipmentQuality.THUONG_PHAM]: { wood: 1600, stone: 12800, spirit_stone: 9600 } },
        [ItemQuality.TAM_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 3200, stone: 25600, spirit_stone: 19200 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 6400, stone: 51200, spirit_stone: 38400 }, [EquipmentQuality.THUONG_PHAM]: { wood: 12800, stone: 102400, spirit_stone: 76800 } },
    },
    'tran_yeu_duong': {
        [ItemQuality.NHAT_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 500, stone: 500, spirit_stone: 500 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 1000, stone: 1000, spirit_stone: 1000 }, [EquipmentQuality.THUONG_PHAM]: { wood: 2000, stone: 2000, spirit_stone: 2000 } },
        [ItemQuality.NHI_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 4000, stone: 4000, spirit_stone: 4000 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 8000, stone: 8000, spirit_stone: 8000 }, [EquipmentQuality.THUONG_PHAM]: { wood: 16000, stone: 16000, spirit_stone: 16000 } },
    },
    'huan_cong_duong': {
         [ItemQuality.NHAT_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 200, stone: 200, spirit_stone: 400 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 400, stone: 400, spirit_stone: 800 }, [EquipmentQuality.THUONG_PHAM]: { wood: 800, stone: 800, spirit_stone: 1600 } },
    },
    'thiet_luat_duong': {
        [ItemQuality.NHAT_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 200, stone: 200, spirit_stone: 400 } },
    },
    'thang_tien_dai': {
        [ItemQuality.NHAT_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 1000, stone: 1000, spirit_stone: 1000 } },
        [ItemQuality.NHI_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 2000, stone: 2000, spirit_stone: 2000 } },
    },
    'tu_luyen_thap': {
        [ItemQuality.NHAT_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 1000, stone: 500, spirit_stone: 1500 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 2000, stone: 1000, spirit_stone: 3000 }, [EquipmentQuality.THUONG_PHAM]: { wood: 4000, stone: 2000, spirit_stone: 6000 } },
        [ItemQuality.NHI_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 8000, stone: 4000, spirit_stone: 12000 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 16000, stone: 8000, spirit_stone: 24000 }, [EquipmentQuality.THUONG_PHAM]: { wood: 32000, stone: 16000, spirit_stone: 48000 } },
        [ItemQuality.TAM_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 64000, stone: 32000, spirit_stone: 96000 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 128000, stone: 64000, spirit_stone: 192000 }, [EquipmentQuality.THUONG_PHAM]: { wood: 256000, stone: 128000, spirit_stone: 384000 } },
        [ItemQuality.TU_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 512000, stone: 256000, spirit_stone: 768000 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 1024000, stone: 512000, spirit_stone: 1536000 }, [EquipmentQuality.THUONG_PHAM]: { wood: 2048000, stone: 1024000, spirit_stone: 3072000 } },
        [ItemQuality.NGU_GIAI]: { [EquipmentQuality.HA_PHAM]: { wood: 4096000, stone: 2048000, spirit_stone: 6144000 }, [EquipmentQuality.TRUNG_PHAM]: { wood: 8192000, stone: 4096000, spirit_stone: 12288000 }, [EquipmentQuality.THUONG_PHAM]: { wood: 16384000, stone: 8192000, spirit_stone: 24576000 } },
    },
};

export const CULTIVATION_TOWER_CONFIGS = {
    [ItemQuality.NHAT_GIAI]: { stage: CultivationStage.QI_REFINEMENT, cost: 100, costType: 'contribution', bonus: 0.2 },
    [ItemQuality.NHI_GIAI]: { stage: CultivationStage.FOUNDATION_ESTABLISHMENT, cost: 500, costType: 'contribution', bonus: 0.4 },
    [ItemQuality.TAM_GIAI]: { stage: CultivationStage.CORE_FORMATION, cost: 2000, costType: 'contribution', bonus: 0.6 },
    [ItemQuality.TU_GIAI]: { stage: CultivationStage.NASCENT_SOUL, cost: 1, costType: 'tu_luyen_thap_token_4', bonus: 0.8 },
    [ItemQuality.NGU_GIAI]: { stage: CultivationStage.SOUL_FORMATION, cost: 1, costType: 'tu_luyen_thap_token_5', bonus: 1.0 },
};


// Số lượng vị trí (slot) theo Giai của công trình
export const BUILDING_SLOTS_PER_TIER: Record<ItemQuality, number> = {
    [ItemQuality.NHAT_GIAI]: 1,
    [ItemQuality.NHI_GIAI]: 2,
    [ItemQuality.TAM_GIAI]: 3,
    [ItemQuality.TU_GIAI]: 4,
    [ItemQuality.NGU_GIAI]: 5,
};

export const LOCATION_PREFABS_DATA: Record<string, Partial<LocationData>[]> = {
    mountains: [
        { type: "Thiên Hiểm Chi Địa", description: "Dãy núi sừng sững như một bức tường thành của trời đất, mây mù bao phủ quanh năm. Người thường khó lòng trèo tới đỉnh.", linh_khi: "Nồng đậm nhưng hỗn loạn", tai_nguyen: ["Linh thạch khoáng mạch", "Huyết Sâm ngàn năm"] },
        { type: "Yêu Thú Sơn Mạch", description: "Nơi đây là lãnh địa của yêu thú, tiếng gầm rú vang vọng không ngớt. Nghe đồn có yêu vương đang chiếm cứ nơi sâu nhất.", linh_khi: "Yêu khí và Linh khí hỗn tạp", tai_nguyen: ["Yêu đan các loại", "Xương cốt yêu thú", "Huyết văn thảo"] },
        { type: "Vô Danh Sơn Mạch", description: "Một dãy núi bình thường không có gì đặc biệt, linh khí mỏng manh, chỉ có vài loại khoáng thạch cấp thấp.", linh_khi: "Bạc nhược", tai_nguyen: ["Thiết khoáng", "Cỏ dại"] },
    ],
    city: [
        { type: "Tiên Gia Cự Thành", description: "Một thành trì sầm uất do nhiều gia tộc tu tiên cùng nhau quản lý. Các cửa hàng, tửu lầu, đấu giá hội san sát nhau, là trung tâm giao thương của cả vùng.", linh_khi: "Bình thường", tai_nguyen: ["Thông tin tình báo", "Cơ hội giao dịch"] },
        { type: "Phàm Nhân Thị Trấn", description: "Một thị trấn nhỏ nằm dưới chân núi, người dân sống cuộc sống bình dị. Thỉnh thoảng có tu sĩ ghé qua để bổ sung vật tư.", linh_khi: "Cực kỳ bạc nhược", tai_nguyen: ["Lương thực", "Vải vóc"] },
    ],
    forest: [
        { type: "Mê Vụ Chi Lâm", description: "Khu rừng rậm này bị bao phủ bởi một loại sương mù kỳ lạ có thể làm mất phương hướng. Nhiều người đi vào nhưng không bao giờ trở ra.", linh_khi: "Ẩm ướt và lạnh lẽo", tai_nguyen: ["Uẩn hồn hoa", "Mê tâm quả"] },
        { type: "Vạn Thú Lâm", description: "Khu rừng này là nhà của vô số loài mãnh thú và côn trùng độc. Nguy hiểm rình rập sau mỗi gốc cây.", linh_khi: "Yêu khí nồng đậm", tai_nguyen: ["Nọc độc", "Linh mộc trăm năm"] },
    ],
    ruins: [
        { type: "Thượng Cổ Di Tích", description: "Tàn tích của một tông môn hùng mạnh từ thời thượng cổ. Dù đã hoang phế nhưng vẫn còn sót lại những cấm chế và cơ duyên kinh người.", linh_khi: "Thuần khiết nhưng đang tiêu tán", tai_nguyen: ["Công pháp tàn quyển", "Pháp bảo vô chủ", "Cổ dược"] },
        { type: "Cổ Chiến Trường", description: "Nơi này từng diễn ra một trận đại chiến kinh thiên động địa. Sát khí và oán niệm ngưng tụ không tan, cực kỳ nguy hiểm.", linh_khi: "Hỗn loạn và hung bạo", tai_nguyen: ["Vũ khí tàn phá", "Bí bảo của binh sĩ"] },
    ],
    palace: [
        { type: "Tiên Cung Phế Tích", description: "Một cung điện nguy nga từng là nơi ở của một đại năng tu sĩ. Dù đã bị bỏ hoang, linh khí nơi đây vẫn thuần khiết hơn bên ngoài rất nhiều.", linh_khi: "Thuần khiết", tai_nguyen: ["Gạch linh ngọc", "Trận pháp còn sót lại"] },
    ]
};