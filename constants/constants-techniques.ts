import { TechniqueMastery, ItemQuality } from "../types/index.ts";

export const TECHNIQUE_MASTERY_DATA: Record<TechniqueMastery, { name: string; effectMultiplier: number; costMultiplier: number; }> = {
    [TechniqueMastery.NHAP_MON]: {
        name: 'Nhập Môn',
        effectMultiplier: 1.0,
        costMultiplier: 1.0,
    },
    [TechniqueMastery.TIEU_THANH]: {
        name: 'Tiểu Thành',
        effectMultiplier: 1.0,
        costMultiplier: 0.85, // 15% cost reduction
    },
    [TechniqueMastery.DAI_THANH]: {
        name: 'Đại Thành',
        effectMultiplier: 1.125, // 12.5% effect increase (nerfed from 1.25)
        costMultiplier: 0.85,
    },
    [TechniqueMastery.VIEN_MAN]: {
        name: 'Viên Mãn',
        effectMultiplier: 1.25, // Total 25% effect increase (nerfed from 1.5)
        costMultiplier: 0.6, // Total 40% cost reduction
    },
};

export const MASTERY_EXP_REQUIREMENTS: Record<ItemQuality, Record<TechniqueMastery, number>> = {
    [ItemQuality.NHAT_GIAI]: {
        [TechniqueMastery.NHAP_MON]: 12,    // to Tieu Thanh (was 6)
        [TechniqueMastery.TIEU_THANH]: 24,   // to Dai Thanh (was 12)
        [TechniqueMastery.DAI_THANH]: 48,   // to Vien Man (was 24)
        [TechniqueMastery.VIEN_MAN]: Infinity,
    },
    [ItemQuality.NHI_GIAI]: {
        [TechniqueMastery.NHAP_MON]: 48,    // was 12
        [TechniqueMastery.TIEU_THANH]: 96,   // was 24
        [TechniqueMastery.DAI_THANH]: 192,  // was 48
        [TechniqueMastery.VIEN_MAN]: Infinity,
    },
    [ItemQuality.TAM_GIAI]: {
        [TechniqueMastery.NHAP_MON]: 240,   // was 48
        [TechniqueMastery.TIEU_THANH]: 480,  // was 96
        [TechniqueMastery.DAI_THANH]: 960,  // was 192
        [TechniqueMastery.VIEN_MAN]: Infinity,
    },
    [ItemQuality.TU_GIAI]: {
        [TechniqueMastery.NHAP_MON]: 600,   // was 600
        [TechniqueMastery.TIEU_THANH]: 1200, // was 1200
        [TechniqueMastery.DAI_THANH]: 2400, // was 2400
        [TechniqueMastery.VIEN_MAN]: Infinity,
    },
    [ItemQuality.NGU_GIAI]: {
        [TechniqueMastery.NHAP_MON]: 1200,  // was 1200
        [TechniqueMastery.TIEU_THANH]: 2400, // was 2400
        [TechniqueMastery.DAI_THANH]: 4800, // was 4800
        [TechniqueMastery.VIEN_MAN]: Infinity,
    },
};