
import { ItemQuality } from '../../../types/index.ts';
import { Recipe } from '../../../types/index.ts';

export const TALISMAN_RECIPES: Record<string, Recipe> = {
    // Tấn Công
    'craft_hoa_tien_phu': { id: 'craft_hoa_tien_phu', name: 'Chế tác Hỏa Tiễn Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 4, 'chu_sa_nhat_giai': 7 }, outputs: [{ itemId: 'hoa_tien_phu', chance: 1, amount: 1 }] },
    'craft_bao_liet_hoa_cau_phu': { id: 'craft_bao_liet_hoa_cau_phu', name: 'Chế tác Bạo Liệt Hỏa Cầu Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 3, 'chu_sa_nhat_giai': 6, 'spirit_stone': 1 }, outputs: [{ itemId: 'bao_liet_hoa_cau_phu', chance: 1, amount: 1 }] },
    'craft_thuy_kiem_phu': { id: 'craft_thuy_kiem_phu', name: 'Chế tác Thuỷ Kiếm Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 2, 'chu_sa_nhat_giai': 5, 'spirit_stone': 10 }, outputs: [{ itemId: 'thuy_kiem_phu', chance: 1, amount: 1 }] },
    'craft_hoa_thuong_phu': { id: 'craft_hoa_thuong_phu', name: 'Chế tác Hỏa Thương Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 4, 'chu_sa_nhat_giai': 7 }, outputs: [{ itemId: 'hoa_thuong_phu', chance: 1, amount: 1 }] },
    'craft_viem_boc_phu': { id: 'craft_viem_boc_phu', name: 'Chế tác Viêm Bộc Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 3, 'chu_sa_nhat_giai': 6, 'spirit_stone': 1 }, outputs: [{ itemId: 'viem_boc_phu', chance: 1, amount: 1 }] },
    'craft_thien_loi_phu': { id: 'craft_thien_loi_phu', name: 'Chế tác Thiên Lôi Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 2, 'chu_sa_nhat_giai': 5, 'spirit_stone': 10 }, outputs: [{ itemId: 'thien_loi_phu', chance: 1, amount: 1 }] },
    'craft_dia_ham_phu': { id: 'craft_dia_ham_phu', name: 'Chế tác Địa Hãm Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 4, 'chu_sa_nhat_giai': 7 }, outputs: [{ itemId: 'dia_ham_phu', chance: 1, amount: 1 }] },
    'craft_doc_vu_phu': { id: 'craft_doc_vu_phu', name: 'Chế tác Độc Vụ Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 3, 'chu_sa_nhat_giai': 6, 'spirit_stone': 1 }, outputs: [{ itemId: 'doc_vu_phu', chance: 1, amount: 1 }] },
    'craft_phu_trong_phu': { id: 'craft_phu_trong_phu', name: 'Chế tác Phụ Trọng Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 2, 'chu_sa_nhat_giai': 5, 'spirit_stone': 10 }, outputs: [{ itemId: 'phu_trong_phu', chance: 1, amount: 1 }] },
    // Bảo Vệ
    'craft_thuy_mac_thuan_phu': { id: 'craft_thuy_mac_thuan_phu', name: 'Chế tác Thủy Mạc Thuẫn Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 4, 'chu_sa_nhat_giai': 7 }, outputs: [{ itemId: 'thuy_mac_thuan_phu', chance: 1, amount: 1 }] },
    'craft_hau_tho_thuan_phu': { id: 'craft_hau_tho_thuan_phu', name: 'Chế tác Hậu Thổ Thuẫn Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 3, 'chu_sa_nhat_giai': 6, 'spirit_stone': 1 }, outputs: [{ itemId: 'hau_tho_thuan_phu', chance: 1, amount: 1 }] },
    'craft_kim_quang_tran_phu': { id: 'craft_kim_quang_tran_phu', name: 'Chế tác Kim Quang Trận Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 2, 'chu_sa_nhat_giai': 5, 'spirit_stone': 10 }, outputs: [{ itemId: 'kim_quang_tran_phu', chance: 1, amount: 1 }] },
    'craft_thuy_liem_phu': { id: 'craft_thuy_liem_phu', name: 'Chế tác Thủy Liêm Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 4, 'chu_sa_nhat_giai': 7 }, outputs: [{ itemId: 'thuy_liem_phu', chance: 1, amount: 1 }] },
    'craft_nham_thuan_phu': { id: 'craft_nham_thuan_phu', name: 'Chế tác Nham Thuẫn Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 3, 'chu_sa_nhat_giai': 6, 'spirit_stone': 1 }, outputs: [{ itemId: 'nham_thuan_phu', chance: 1, amount: 1 }] },
    'craft_kim_cang_phu': { id: 'craft_kim_cang_phu', name: 'Chế tác Kim Cang Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 2, 'chu_sa_nhat_giai': 5, 'spirit_stone': 10 }, outputs: [{ itemId: 'kim_cang_phu', chance: 1, amount: 1 }] },
    'craft_huyen_quang_thuan_phu': { id: 'craft_huyen_quang_thuan_phu', name: 'Chế tác Huyễn Quang Thuẫn Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 4, 'chu_sa_nhat_giai': 7 }, outputs: [{ itemId: 'huyen_quang_thuan_phu', chance: 1, amount: 1 }] },
    'craft_kinh_moc_giap_phu': { id: 'craft_kinh_moc_giap_phu', name: 'Chế tác Kinh Mộc Giáp Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 3, 'chu_sa_nhat_giai': 6, 'spirit_stone': 1 }, outputs: [{ itemId: 'kinh_moc_giap_phu', chance: 1, amount: 1 }] },
    'craft_nhu_thuy_thuan_phu': { id: 'craft_nhu_thuy_thuan_phu', name: 'Chế tác Nhu Thủy Thuẫn Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 2, 'chu_sa_nhat_giai': 5, 'spirit_stone': 10 }, outputs: [{ itemId: 'nhu_thuy_thuan_phu', chance: 1, amount: 1 }] },
    // Bỏ Trốn
    'craft_khinh_than_phu': { id: 'craft_khinh_than_phu', name: 'Chế tác Khinh Thân Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 4, 'chu_sa_nhat_giai': 7 }, outputs: [{ itemId: 'khinh_than_phu', chance: 1, amount: 1 }] },
    'craft_don_tuc_phu': { id: 'craft_don_tuc_phu', name: 'Chế tác Độn Tức Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 3, 'chu_sa_nhat_giai': 6, 'spirit_stone': 1 }, outputs: [{ itemId: 'don_tuc_phu', chance: 1, amount: 1 }] },
    'craft_tat_phong_phu': { id: 'craft_tat_phong_phu', name: 'Chế tác Tật Phong Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 2, 'chu_sa_nhat_giai': 5, 'spirit_stone': 10 }, outputs: [{ itemId: 'tat_phong_phu', chance: 1, amount: 1 }] },
    'craft_than_hanh_phu': { id: 'craft_than_hanh_phu', name: 'Chế tác Thần Hành Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 4, 'chu_sa_nhat_giai': 7 }, outputs: [{ itemId: 'than_hanh_phu', chance: 1, amount: 1 }] },
    'craft_an_hinh_phu': { id: 'craft_an_hinh_phu', name: 'Chế tác Ẩn Hình Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 3, 'chu_sa_nhat_giai': 6, 'spirit_stone': 1 }, outputs: [{ itemId: 'an_hinh_phu', chance: 1, amount: 1 }] },
    'craft_phong_don_phu': { id: 'craft_phong_don_phu', name: 'Chế tác Phong Độn Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 2, 'chu_sa_nhat_giai': 5, 'spirit_stone': 10 }, outputs: [{ itemId: 'phong_don_phu', chance: 1, amount: 1 }] },
    'craft_tinh_am_phu': { id: 'craft_tinh_am_phu', name: 'Chế tác Tĩnh Âm Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 4, 'chu_sa_nhat_giai': 7 }, outputs: [{ itemId: 'tinh_am_phu', chance: 1, amount: 1 }] },
    'craft_du_dia_phu': { id: 'craft_du_dia_phu', name: 'Chế tác Du Địa Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 3, 'chu_sa_nhat_giai': 6, 'spirit_stone': 1 }, outputs: [{ itemId: 'du_dia_phu', chance: 1, amount: 1 }] },
    'craft_bich_ho_phu': { id: 'craft_bich_ho_phu', name: 'Chế tác Bích Hổ Phù', building: 'talisman_house', requiredTier: ItemQuality.NHAT_GIAI, requiredProfessionTier: ItemQuality.NHAT_GIAI, cost: { 'yeu_bi_nhat_giai': 2, 'chu_sa_nhat_giai': 5, 'spirit_stone': 10 }, outputs: [{ itemId: 'bich_ho_phu', chance: 1, amount: 1 }] },
    // Existing recipe
    'craft_loi_dinh_phu': {
        id: 'craft_loi_dinh_phu',
        name: 'Chế tác Lôi Đình Phù',
        building: 'talisman_house',
        requiredTier: ItemQuality.TAM_GIAI,
        requiredProfessionTier: ItemQuality.TAM_GIAI,
        cost: { 'yeu_bi_tam_giai': 1, 'chu_sa_tam_giai': 5, 'yeu_dan_tam_giai': 1 },
        outputs: [{ itemId: 'loi_dinh_phu', chance: 1, amount: 1 }],
    },
    // New Nhị Giai Recipes
    'craft_la_bua_nhi_giai': {
        id: 'craft_la_bua_nhi_giai',
        name: 'Chế tác Nhị Giai Lá Bùa',
        building: 'talisman_house',
        requiredTier: ItemQuality.NHI_GIAI,
        requiredProfessionTier: ItemQuality.NHI_GIAI,
        cost: { 'yeu_bi_nhi_giai': 10 },
        outputs: [{ itemId: 'la_bua_nhi_giai', chance: 0.3, amount: 1 }],
    },
    // Tấn Công
    'craft_hoa_cau_phu_nhi_giai': { id: 'craft_hoa_cau_phu_nhi_giai', name: 'Chế tác Hỏa Cầu Phù (Nhị Giai)', building: 'talisman_house', requiredTier: ItemQuality.NHI_GIAI, requiredProfessionTier: ItemQuality.NHI_GIAI, cost: { 'chu_sa_nhi_giai': 1, 'la_bua_nhi_giai': 1, 'spirit_stone': 2 }, outputs: [{ itemId: 'hoa_cau_phu_nhi_giai', chance: 1, amount: 1 }] },
    'craft_loi_dien_phu_nhi_giai': { id: 'craft_loi_dien_phu_nhi_giai', name: 'Chế tác Lôi Điện Phù (Nhị Giai)', building: 'talisman_house', requiredTier: ItemQuality.NHI_GIAI, requiredProfessionTier: ItemQuality.NHI_GIAI, cost: { 'chu_sa_nhi_giai': 3, 'la_bua_nhi_giai': 1, 'spirit_stone': 5 }, outputs: [{ itemId: 'loi_dien_phu_nhi_giai', chance: 1, amount: 1 }] },
    'craft_bang_truy_phu_nhi_giai': { id: 'craft_bang_truy_phu_nhi_giai', name: 'Chế tác Băng Trùy Phù (Nhị Giai)', building: 'talisman_house', requiredTier: ItemQuality.NHI_GIAI, requiredProfessionTier: ItemQuality.NHI_GIAI, cost: { 'chu_sa_nhi_giai': 5, 'la_bua_nhi_giai': 1, 'spirit_stone': 10 }, outputs: [{ itemId: 'bang_truy_phu_nhi_giai', chance: 1, amount: 1 }] },
    // Bảo Vệ
    'craft_ho_giap_phu_nhi_giai': { id: 'craft_ho_giap_phu_nhi_giai', name: 'Chế tác Hộ Giáp Phù (Nhị Giai)', building: 'talisman_house', requiredTier: ItemQuality.NHI_GIAI, requiredProfessionTier: ItemQuality.NHI_GIAI, cost: { 'chu_sa_nhi_giai': 1, 'la_bua_nhi_giai': 1, 'spirit_stone': 2 }, outputs: [{ itemId: 'ho_giap_phu_nhi_giai', chance: 1, amount: 1 }] },
    'craft_khang_ma_phu_nhi_giai': { id: 'craft_khang_ma_phu_nhi_giai', name: 'Chế tác Kháng Ma Phù (Nhị Giai)', building: 'talisman_house', requiredTier: ItemQuality.NHI_GIAI, requiredProfessionTier: ItemQuality.NHI_GIAI, cost: { 'chu_sa_nhi_giai': 3, 'la_bua_nhi_giai': 1, 'spirit_stone': 5 }, outputs: [{ itemId: 'khang_ma_phu_nhi_giai', chance: 1, amount: 1 }] },
    'craft_kim_cuong_thuan_phu_nhi_giai': { id: 'craft_kim_cuong_thuan_phu_nhi_giai', name: 'Chế tác Kim Cương Thuẫn Phù (Nhị Giai)', building: 'talisman_house', requiredTier: ItemQuality.NHI_GIAI, requiredProfessionTier: ItemQuality.NHI_GIAI, cost: { 'chu_sa_nhi_giai': 5, 'la_bua_nhi_giai': 1, 'spirit_stone': 10 }, outputs: [{ itemId: 'kim_cuong_thuan_phu_nhi_giai', chance: 1, amount: 1 }] },
    // Bỏ Trốn
    'craft_tang_toc_phu_nhi_giai': { id: 'craft_tang_toc_phu_nhi_giai', name: 'Chế tác Tăng Tốc Phù (Nhị Giai)', building: 'talisman_house', requiredTier: ItemQuality.NHI_GIAI, requiredProfessionTier: ItemQuality.NHI_GIAI, cost: { 'chu_sa_nhi_giai': 1, 'la_bua_nhi_giai': 1, 'spirit_stone': 2 }, outputs: [{ itemId: 'tang_toc_phu_nhi_giai', chance: 1, amount: 1 }] },
    'craft_ao_anh_phu_nhi_giai': { id: 'craft_ao_anh_phu_nhi_giai', name: 'Chế tác Ảo Ảnh Phù (Nhị Giai)', building: 'talisman_house', requiredTier: ItemQuality.NHI_GIAI, requiredProfessionTier: ItemQuality.NHI_GIAI, cost: { 'chu_sa_nhi_giai': 3, 'la_bua_nhi_giai': 1, 'spirit_stone': 5 }, outputs: [{ itemId: 'ao_anh_phu_nhi_giai', chance: 1, amount: 1 }] },
    'craft_phong_hanh_phu_nhi_giai': { id: 'craft_phong_hanh_phu_nhi_giai', name: 'Chế tác Phong Hành Phù (Nhị Giai)', building: 'talisman_house', requiredTier: ItemQuality.NHI_GIAI, requiredProfessionTier: ItemQuality.NHI_GIAI, cost: { 'chu_sa_nhi_giai': 5, 'la_bua_nhi_giai': 1, 'spirit_stone': 10 }, outputs: [{ itemId: 'phong_hanh_phu_nhi_giai', chance: 1, amount: 1 }] },
    // Bộc Phát
    'craft_hoa_cuoc_phu_nhi_giai': { id: 'craft_hoa_cuoc_phu_nhi_giai', name: 'Chế tác Hỏa Cước Phù (Nhị Giai)', building: 'talisman_house', requiredTier: ItemQuality.NHI_GIAI, requiredProfessionTier: ItemQuality.NHI_GIAI, cost: { 'chu_sa_nhi_giai': 1, 'la_bua_nhi_giai': 1, 'spirit_stone': 2 }, outputs: [{ itemId: 'hoa_cuoc_phu_nhi_giai', chance: 1, amount: 1 }] },
    'craft_bao_cat_phu_nhi_giai': { id: 'craft_bao_cat_phu_nhi_giai', name: 'Chế tác Bão Cát Phù (Nhị Giai)', building: 'talisman_house', requiredTier: ItemQuality.NHI_GIAI, requiredProfessionTier: ItemQuality.NHI_GIAI, cost: { 'chu_sa_nhi_giai': 3, 'la_bua_nhi_giai': 1, 'spirit_stone': 5 }, outputs: [{ itemId: 'bao_cat_phu_nhi_giai', chance: 1, amount: 1 }] },
    'craft_thai_duong_no_phu_nhi_giai': { id: 'craft_thai_duong_no_phu_nhi_giai', name: 'Chế tác Thái Dương Nộ Phù (Nhị Giai)', building: 'talisman_house', requiredTier: ItemQuality.NHI_GIAI, requiredProfessionTier: ItemQuality.NHI_GIAI, cost: { 'chu_sa_nhi_giai': 5, 'la_bua_nhi_giai': 1, 'spirit_stone': 10 }, outputs: [{ itemId: 'thai_duong_no_phu_nhi_giai', chance: 1, amount: 1 }] },

    // --- TAM GIAI ---
    'craft_la_bua_tam_giai': {
        id: 'craft_la_bua_tam_giai',
        name: 'Chế tác Tam Giai Lá Bùa',
        building: 'talisman_house',
        requiredTier: ItemQuality.TAM_GIAI,
        requiredProfessionTier: ItemQuality.TAM_GIAI,
        cost: { 'yeu_bi_tam_giai': 15 },
        outputs: [{ itemId: 'la_bua_tam_giai', chance: 0.2, amount: 1 }],
    },
    // Tấn Công
    'craft_doc_sa_phu': { id: 'craft_doc_sa_phu', name: 'Chế tác Độc Sa Phù', building: 'talisman_house', requiredTier: ItemQuality.TAM_GIAI, requiredProfessionTier: ItemQuality.TAM_GIAI, cost: { 'chu_sa_tam_giai': 3, 'la_bua_tam_giai': 1, 'spirit_stone': 15 }, outputs: [{ itemId: 'doc_sa_phu', chance: 1, amount: 1 }] },
    'craft_phong_nhan_phu': { id: 'craft_phong_nhan_phu', name: 'Chế tác Phong Nhận Phù', building: 'talisman_house', requiredTier: ItemQuality.TAM_GIAI, requiredProfessionTier: ItemQuality.TAM_GIAI, cost: { 'chu_sa_tam_giai': 6, 'la_bua_tam_giai': 1, 'spirit_stone': 30 }, outputs: [{ itemId: 'phong_nhan_phu', chance: 1, amount: 1 }] },
    'craft_hoa_nguc_phu': { id: 'craft_hoa_nguc_phu', name: 'Chế tác Hỏa Ngục Phù', building: 'talisman_house', requiredTier: ItemQuality.TAM_GIAI, requiredProfessionTier: ItemQuality.TAM_GIAI, cost: { 'chu_sa_tam_giai': 12, 'la_bua_tam_giai': 1, 'spirit_stone': 60 }, outputs: [{ itemId: 'hoa_nguc_phu', chance: 1, amount: 1 }] },
    // Bảo Vệ
    'craft_ngu_hanh_phu': { id: 'craft_ngu_hanh_phu', name: 'Chế tác Ngũ Hành Phù', building: 'talisman_house', requiredTier: ItemQuality.TAM_GIAI, requiredProfessionTier: ItemQuality.TAM_GIAI, cost: { 'chu_sa_tam_giai': 3, 'la_bua_tam_giai': 1, 'spirit_stone': 15 }, outputs: [{ itemId: 'ngu_hanh_phu', chance: 1, amount: 1 }] },
    'craft_tinh_luc_phu': { id: 'craft_tinh_luc_phu', name: 'Chế tác Tĩnh Lực Phù', building: 'talisman_house', requiredTier: ItemQuality.TAM_GIAI, requiredProfessionTier: ItemQuality.TAM_GIAI, cost: { 'chu_sa_tam_giai': 6, 'la_bua_tam_giai': 1, 'spirit_stone': 30 }, outputs: [{ itemId: 'tinh_luc_phu', chance: 1, amount: 1 }] },
    'craft_phan_chan_phu': { id: 'craft_phan_chan_phu', name: 'Chế tác Phản Chấn Phù', building: 'talisman_house', requiredTier: ItemQuality.TAM_GIAI, requiredProfessionTier: ItemQuality.TAM_GIAI, cost: { 'chu_sa_tam_giai': 12, 'la_bua_tam_giai': 1, 'spirit_stone': 60 }, outputs: [{ itemId: 'phan_chan_phu', chance: 1, amount: 1 }] },
    // Bỏ Trốn
    'craft_huyen_an_phu': { id: 'craft_huyen_an_phu', name: 'Chế tác Huyền Ẩn Phù', building: 'talisman_house', requiredTier: ItemQuality.TAM_GIAI, requiredProfessionTier: ItemQuality.TAM_GIAI, cost: { 'chu_sa_tam_giai': 3, 'la_bua_tam_giai': 1, 'spirit_stone': 15 }, outputs: [{ itemId: 'huyen_an_phu', chance: 1, amount: 1 }] },
    'craft_thuan_di_phu': { id: 'craft_thuan_di_phu', name: 'Chế tác Thuấn Di Phù', building: 'talisman_house', requiredTier: ItemQuality.TAM_GIAI, requiredProfessionTier: ItemQuality.TAM_GIAI, cost: { 'chu_sa_tam_giai': 6, 'la_bua_tam_giai': 1, 'spirit_stone': 30 }, outputs: [{ itemId: 'thuan_di_phu', chance: 1, amount: 1 }] },
    'craft_vo_hinh_phu': { id: 'craft_vo_hinh_phu', name: 'Chế tác Vô Hình Phù', building: 'talisman_house', requiredTier: ItemQuality.TAM_GIAI, requiredProfessionTier: ItemQuality.TAM_GIAI, cost: { 'chu_sa_tam_giai': 12, 'la_bua_tam_giai': 1, 'spirit_stone': 60 }, outputs: [{ itemId: 'vo_hinh_phu', chance: 1, amount: 1 }] },
    // Bộc Phát
    'craft_suong_doc_phu': { id: 'craft_suong_doc_phu', name: 'Chế tác Sương Độc Phù', building: 'talisman_house', requiredTier: ItemQuality.TAM_GIAI, requiredProfessionTier: ItemQuality.TAM_GIAI, cost: { 'chu_sa_tam_giai': 5, 'la_bua_tam_giai': 1, 'spirit_stone': 20 }, outputs: [{ itemId: 'suong_doc_phu', chance: 1, amount: 1 }] },
    'craft_bao_phong_phu': { id: 'craft_bao_phong_phu', name: 'Chế tác Bạo Phong Phù', building: 'talisman_house', requiredTier: ItemQuality.TAM_GIAI, requiredProfessionTier: ItemQuality.TAM_GIAI, cost: { 'chu_sa_tam_giai': 6, 'la_bua_tam_giai': 1, 'spirit_stone': 35 }, outputs: [{ itemId: 'bao_phong_phu', chance: 1, amount: 1 }] },
    'craft_diet_phap_phu': { id: 'craft_diet_phap_phu', name: 'Chế tác Diệt Pháp Phù', building: 'talisman_house', requiredTier: ItemQuality.TAM_GIAI, requiredProfessionTier: ItemQuality.TAM_GIAI, cost: { 'chu_sa_tam_giai': 12, 'la_bua_tam_giai': 1, 'spirit_stone': 70 }, outputs: [{ itemId: 'diet_phap_phu', chance: 1, amount: 1 }] },
    // Tối Thượng
    'craft_thien_phat_loi_kiep_phu': { id: 'craft_thien_phat_loi_kiep_phu', name: 'Chế tác Thiên Phạt Lôi Kiếp Phù', building: 'talisman_house', requiredTier: ItemQuality.TAM_GIAI, requiredProfessionTier: ItemQuality.TAM_GIAI, cost: { 'chu_sa_tam_giai': 20, 'la_bua_tam_giai': 1, 'spirit_stone': 300 }, outputs: [{ itemId: 'thien_phat_loi_kiep_phu', chance: 0.05, amount: 1 }] },
    'craft_bat_hoai_ket_gioi_phu': { id: 'craft_bat_hoai_ket_gioi_phu', name: 'Chế tác Bất Hoại Kết Giới Phù', building: 'talisman_house', requiredTier: ItemQuality.TAM_GIAI, requiredProfessionTier: ItemQuality.TAM_GIAI, cost: { 'chu_sa_tam_giai': 20, 'la_bua_tam_giai': 1, 'spirit_stone': 200 }, outputs: [{ itemId: 'bat_hoai_ket_gioi_phu', chance: 0.05, amount: 1 }] },
};
