
import { ItemQuality, ItemType, Resource } from '../../types/index.ts';
import { NHI_GIAI_LUYEN_KHI_VAT_LIEU } from './vat-lieu/nhi-giai.ts';
import { TAM_GIAI_LUYEN_KHI_VAT_LIEU } from './vat-lieu/tam-giai.ts';
import { TU_GIAI_VAT_LIEU } from './vat-lieu/tu-giai.ts';

export const VAT_LIEU: { [key: string]: Resource } = {
    // Khoáng Thạch
    ...NHI_GIAI_LUYEN_KHI_VAT_LIEU,
    ...TAM_GIAI_LUYEN_KHI_VAT_LIEU,
    ...TU_GIAI_VAT_LIEU,

    // --- LINH MẠCH (Mới 0.20.49) ---
    // Nhất Giai
    'linh_mach_nhat_giai_ha_pham': { id: 'spirit_stone', name: 'Nhất Giai Linh Mạch (Hạ Phẩm)', description: 'Mạch khoáng linh thạch cấp thấp nhất.', quality: ItemQuality.NHAT_GIAI, type: ItemType.MATERIAL, value: 0 },
    'linh_mach_nhat_giai_trung_pham': { id: 'linh_mach_nhat_giai_trung_pham', name: 'Nhất Giai Linh Mạch (Trung Phẩm)', description: 'Mạch khoáng linh thạch cấp thấp, chất lượng trung bình.', quality: ItemQuality.NHAT_GIAI, type: ItemType.MATERIAL, value: 0 },
    'linh_mach_nhat_giai_thuong_pham': { id: 'linh_mach_nhat_giai_thuong_pham', name: 'Nhất Giai Linh Mạch (Thượng Phẩm)', description: 'Mạch khoáng linh thạch cấp thấp, chất lượng cao.', quality: ItemQuality.NHAT_GIAI, type: ItemType.MATERIAL, value: 0 },

    // Nhị Giai
    'linh_mach_nhi_giai_ha_pham': { id: 'linh_mach_nhi_giai_ha_pham', name: 'Nhị Giai Linh Mạch (Hạ Phẩm)', description: 'Mạch khoáng linh thạch Nhị Giai.', quality: ItemQuality.NHI_GIAI, type: ItemType.MATERIAL, value: 0 },
    'linh_mach_nhi_giai_trung_pham': { id: 'linh_mach_nhi_giai_trung_pham', name: 'Nhị Giai Linh Mạch (Trung Phẩm)', description: 'Mạch khoáng linh thạch Nhị Giai chất lượng tốt.', quality: ItemQuality.NHI_GIAI, type: ItemType.MATERIAL, value: 0 },
    'linh_mach_nhi_giai_thuong_pham': { id: 'linh_mach_nhi_giai_thuong_pham', name: 'Nhị Giai Linh Mạch (Thượng Phẩm)', description: 'Mạch khoáng linh thạch Nhị Giai dồi dào.', quality: ItemQuality.NHI_GIAI, type: ItemType.MATERIAL, value: 0 },

    // Tam Giai
    'linh_mach_tam_giai_ha_pham': { id: 'linh_mach_tam_giai_ha_pham', name: 'Tam Giai Linh Mạch (Hạ Phẩm)', description: 'Mạch khoáng lớn, đủ nuôi sống một gia tộc Tam Giai.', quality: ItemQuality.TAM_GIAI, type: ItemType.MATERIAL, value: 0 },
    'linh_mach_tam_giai_trung_pham': { id: 'linh_mach_tam_giai_trung_pham', name: 'Tam Giai Linh Mạch (Trung Phẩm)', description: 'Mạch khoáng lớn, linh khí nồng đậm.', quality: ItemQuality.TAM_GIAI, type: ItemType.MATERIAL, value: 0 },
    'linh_mach_tam_giai_thuong_pham': { id: 'linh_mach_tam_giai_thuong_pham', name: 'Tam Giai Linh Mạch (Thượng Phẩm)', description: 'Mạch khoáng lớn, linh khí cực kỳ nồng đậm.', quality: ItemQuality.TAM_GIAI, type: ItemType.MATERIAL, value: 0 },

    // Tứ Giai
    'linh_mach_tu_giai_ha_pham': { id: 'linh_mach_tu_giai_ha_pham', name: 'Tứ Giai Linh Mạch (Hạ Phẩm)', description: 'Mạch khoáng khổng lồ, nền tảng của Nguyên Anh tông môn.', quality: ItemQuality.TU_GIAI, type: ItemType.MATERIAL, value: 0 },
    'linh_mach_tu_giai_trung_pham': { id: 'linh_mach_tu_giai_trung_pham', name: 'Tứ Giai Linh Mạch (Trung Phẩm)', description: 'Mạch khoáng khổng lồ, linh khí hóa vụ.', quality: ItemQuality.TU_GIAI, type: ItemType.MATERIAL, value: 0 },
    'linh_mach_tu_giai_thuong_pham': { id: 'linh_mach_tu_giai_thuong_pham', name: 'Tứ Giai Linh Mạch (Thượng Phẩm)', description: 'Mạch khoáng khổng lồ, linh khí như rồng.', quality: ItemQuality.TU_GIAI, type: ItemType.MATERIAL, value: 0 },

    // Ngũ Giai
    'linh_mach_ngu_giai_ha_pham': { id: 'linh_mach_ngu_giai_ha_pham', name: 'Ngũ Giai Linh Mạch (Hạ Phẩm)', description: 'Thánh địa tu hành, linh khí hóa lỏng.', quality: ItemQuality.NGU_GIAI, type: ItemType.MATERIAL, value: 0 },
    'linh_mach_ngu_giai_trung_pham': { id: 'linh_mach_ngu_giai_trung_pham', name: 'Ngũ Giai Linh Mạch (Trung Phẩm)', description: 'Thánh địa tu hành, vạn năm hiếm gặp.', quality: ItemQuality.NGU_GIAI, type: ItemType.MATERIAL, value: 0 },
    'linh_mach_ngu_giai_thuong_pham': { id: 'linh_mach_ngu_giai_thuong_pham', name: 'Ngũ Giai Linh Mạch (Thượng Phẩm)', description: 'Tổ mạch của thiên địa, chỉ có trong truyền thuyết.', quality: ItemQuality.NGU_GIAI, type: ItemType.MATERIAL, value: 0 },

    // Yêu Thú - Yêu Đan
    yeu_dan_nhat_giai: { id: 'yeu_dan_nhat_giai', name: 'Yêu Đan Nhất Giai', description: 'Nội đan của yêu thú Nhất Giai.', quality: ItemQuality.NHAT_GIAI, type: ItemType.MATERIAL, value: 5 },
    yeu_dan_nhi_giai: { id: 'yeu_dan_nhi_giai', name: 'Yêu Đan Nhị Giai', description: 'Nội đan của yêu thú Nhị Giai.', quality: ItemQuality.NHI_GIAI, type: ItemType.MATERIAL, value: 25 },
    yeu_dan_tam_giai: { id: 'yeu_dan_tam_giai', name: 'Yêu Đan Tam Giai', description: 'Nội đan của yêu thú Tam Giai.', quality: ItemQuality.TAM_GIAI, type: ItemType.MATERIAL, value: 120 },
    yeu_dan_tu_giai: { id: 'yeu_dan_tu_giai', name: 'Yêu Đan Tứ Giai', description: 'Nội đan của yêu thú Tứ Giai.', quality: ItemQuality.TU_GIAI, type: ItemType.MATERIAL, value: 600 },
    yeu_dan_ngu_giai: { id: 'yeu_dan_ngu_giai', name: 'Yêu Đan Ngũ Giai', description: 'Nội đan của yêu thú Ngũ Giai.', quality: ItemQuality.NGU_GIAI, type: ItemType.MATERIAL, value: 3000 },

    // Yêu Thú - Yêu Cốt
    yeu_cot_nhat_giai: { id: 'yeu_cot_nhat_giai', name: 'Yêu Cốt Nhất Giai', description: 'Xương cốt của yêu thú Nhất Giai, dùng để luyện khí.', quality: ItemQuality.NHAT_GIAI, type: ItemType.MATERIAL, value: 2 },
    yeu_cot_nhi_giai: { id: 'yeu_cot_nhi_giai', name: 'Yêu Cốt Nhị Giai', description: 'Xương cốt của yêu thú Nhị Giai, dùng để luyện khí.', quality: ItemQuality.NHI_GIAI, type: ItemType.MATERIAL, value: 10 },
    yeu_cot_tam_giai: { id: 'yeu_cot_tam_giai', name: 'Yêu Cốt Tam Giai', description: 'Xương cốt của yêu thú Tam Giai, dùng để luyện khí.', quality: ItemQuality.TAM_GIAI, type: ItemType.MATERIAL, value: 40 },
    yeu_cot_tu_giai: { id: 'yeu_cot_tu_giai', name: 'Yêu Cốt Tứ Giai', description: 'Xương cốt của yêu thú Tứ Giai, dùng để luyện khí.', quality: ItemQuality.TU_GIAI, type: ItemType.MATERIAL, value: 180 },
    yeu_cot_ngu_giai: { id: 'yeu_cot_ngu_giai', name: 'Yêu Cốt Ngũ Giai', description: 'Xương cốt của yêu thú Ngũ Giai, dùng để luyện khí.', quality: ItemQuality.NGU_GIAI, type: ItemType.MATERIAL, value: 900 },

    // Yêu Thú - Yêu Bì
    yeu_bi_nhat_giai: { id: 'yeu_bi_nhat_giai', name: 'Yêu Bì Nhất Giai', description: 'Da của yêu thú Nhất Giai, dùng để chế phù.', quality: ItemQuality.NHAT_GIAI, type: ItemType.MATERIAL, value: 2 },
    yeu_bi_nhi_giai: { id: 'yeu_bi_nhi_giai', name: 'Yêu Bì Nhị Giai', description: 'Da của yêu thú Nhị Giai, dùng để chế phù.', quality: ItemQuality.NHI_GIAI, type: ItemType.MATERIAL, value: 10 },
    yeu_bi_tam_giai: { id: 'yeu_bi_tam_giai', name: 'Yêu Bì Tam Giai', description: 'Da của yêu thú Tam Giai, dùng để chế phù.', quality: ItemQuality.TAM_GIAI, type: ItemType.MATERIAL, value: 40 },
    yeu_bi_tu_giai: { id: 'yeu_bi_tu_giai', name: 'Yêu Bì Tứ Giai', description: 'Da của yêu thú Tứ Giai, dùng để chế phù.', quality: ItemQuality.TU_GIAI, type: ItemType.MATERIAL, value: 180 },
    yeu_bi_ngu_giai: { id: 'yeu_bi_ngu_giai', name: 'Yêu Bì Ngũ Giai', description: 'Da của yêu thú Ngũ Giai, dùng để chế phù.', quality: ItemQuality.NGU_GIAI, type: ItemType.MATERIAL, value: 900 },

    // Chế Phù - Chu Sa
    chu_sa_nhat_giai: { id: 'chu_sa_nhat_giai', name: 'Chu Sa Nhất Giai', description: 'Khoáng vật màu đỏ, dùng làm mực vẽ phù.', quality: ItemQuality.NHAT_GIAI, type: ItemType.MATERIAL, value: 3 },
    chu_sa_nhi_giai: { id: 'chu_sa_nhi_giai', name: 'Chu Sa Nhị Giai', description: 'Khoáng vật màu đỏ, dùng làm mực vẽ phù.', quality: ItemQuality.NHI_GIAI, type: ItemType.MATERIAL, value: 15 },
    chu_sa_tam_giai: { id: 'chu_sa_tam_giai', name: 'Chu Sa Tam Giai', description: 'Khoáng vật màu đỏ, dùng làm mực vẽ phù.', quality: ItemQuality.TAM_GIAI, type: ItemType.MATERIAL, value: 60 },
    chu_sa_tu_giai: { id: 'chu_sa_tu_giai', name: 'Chu Sa Tứ Giai', description: 'Khoáng vật màu đỏ, dùng làm mực vẽ phù.', quality: ItemQuality.TU_GIAI, type: ItemType.MATERIAL, value: 250 },
    chu_sa_ngu_giai: { id: 'chu_sa_ngu_giai', name: 'Chu Sa Ngũ Giai', description: 'Khoáng vật màu đỏ, dùng làm mực vẽ phù.', quality: ItemQuality.NGU_GIAI, type: ItemType.MATERIAL, value: 1200 },

    // Chế Phù - Lá Bùa
    la_bua_nhi_giai: { id: 'la_bua_nhi_giai', name: 'Nhị Giai Lá Bùa', description: 'Dùng để chế tác các loại Phù Nhị Giai.', quality: ItemQuality.NHI_GIAI, type: ItemType.MATERIAL, value: 20 },
};
