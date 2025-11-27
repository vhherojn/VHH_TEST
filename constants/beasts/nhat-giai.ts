
import { Beast } from '../../types/index.ts';
import { ItemQuality, Element } from '../../types/index.ts';

export const NHAT_GIAI_BEASTS: Beast[] = [
    // --- 10 YÊU THÚ CŨ (HỒI QUY) ---
    {
        id: 'o_ne_coc',
        name: 'Ô Nê Cóc',
        description: 'Cóc Bùn Đen. Da sần sùi đen bóng, sống trong đầm lầy. Phun bùn đen làm chậm đối thủ.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.EARTH, Element.WATER],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.3 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.5 },
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 1, chance: 0.4 },
        ]
    },
    {
        id: 'thach_xi_thu',
        name: 'Thạch Xỉ Thử',
        description: 'Chuột Răng Đá. Răng cửa cứng như đá, thích gặm nhấm khoáng thạch.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.EARTH],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.3 },
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 2, chance: 0.6 }, // Răng
        ]
    },
    {
        id: 'hac_giap_trung',
        name: 'Hắc Giáp Trùng',
        description: 'Bọ Giáp Đen. Vỏ cứng như sắt, thường húc thẳng vào kẻ địch.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.METAL, Element.WOOD],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_thu_lan_nhat_giai', min: 1, max: 1, chance: 0.8 }, // Vỏ giáp
        ]
    },
    {
        id: 'hoa_vi_tich',
        name: 'Hỏa Vĩ Tích',
        description: 'Thằn Lằn Đuôi Lửa. Đuôi luôn bốc cháy, dùng để quật và gây bỏng.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.FIRE],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.5 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 1, max: 1, chance: 0.4 }, // Đuôi
        ]
    },
    {
        id: 'thiet_khau_ngu',
        name: 'Thiết Khẩu Ngư',
        description: 'Cá Miệng Sắt. Hàm răng sắc nhọn có thể cắn nát kim loại, sống bầy đàn dưới sông.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.WATER],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.35 },
            { itemId: 'yeu_thu_lan_nhat_giai', min: 2, max: 4, chance: 0.6 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 1, max: 2, chance: 0.5 }, // Răng
        ]
    },
    {
        id: 'thanh_duc_bien_buc',
        name: 'Thanh Dực Biên Bức',
        description: 'Dơi Cánh Xanh. Phát ra sóng âm gây chóng mặt, hoạt động về đêm.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.WIND], // Âm -> Phong/Thủy
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 2, chance: 0.6 }, // Cánh
        ]
    },
    {
        id: 'dong_giac_son_duong',
        name: 'Đồng Giác Sơn Dương',
        description: 'Dê Núi Sừng Đồng. Cặp sừng cứng như đồng thau, cú húc cực mạnh.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Hậu Kỳ',
        elements: [Element.EARTH, Element.METAL],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.5 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 2, max: 2, chance: 0.9 }, // Sừng
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.4 },
        ]
    },
    {
        id: 'hap_huyet_dia',
        name: 'Hấp Huyết Đỉa',
        description: 'Đỉa Hút Máu. To bằng bắp tay, bám chặt hút máu và linh lực.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Hậu Kỳ',
        elements: [Element.WATER, Element.WOOD], // Độc -> Mộc
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.3 },
        ]
    },
    {
        id: 'quy_khuyen',
        name: 'Quỷ Khuyển',
        description: 'Chó Quỷ. Thân hình gầy gò, mắt đỏ, tiếng tru gây sợ hãi.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Hậu Kỳ',
        elements: [Element.WATER], // Âm -> Thủy
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.5 },
            { itemId: 'yeu_cot_nhat_giai', min: 2, max: 4, chance: 0.6 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 2, max: 4, chance: 0.5 }, // Răng
        ]
    },
    {
        id: 'thuc_nhan_hoa',
        name: 'Thực Nhân Hoa',
        description: 'Hoa Ăn Thịt. Dùng dây leo trói mồi, phấn hoa gây mê.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Hậu Kỳ',
        elements: [Element.WOOD],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.5 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 2, chance: 0.4 }, // Cánh hoa/Lá
        ]
    },

    // --- 10 YÊU THÚ MỚI 0.20.29 ---
    // 1. Bích Lân Xà
    {
        id: 'bich_lan_xa',
        name: 'Bích Lân Xà',
        description: 'Rắn Vảy Xanh. Thân dài, vảy xanh ngọc, ẩn mình trong bụi cây. Có khả năng ẩn nấp sinh cơ và phun độc sương.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.WOOD], // Độc tính thường đi kèm Mộc
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.3 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.6 },
            { itemId: 'yeu_thu_lan_nhat_giai', min: 2, max: 4, chance: 0.5 },
        ]
    },
    // 2. Phong Hành Thử
    {
        id: 'phong_hanh_thu',
        name: 'Phong Hành Thử',
        description: 'Chuột Chạy Gió. Kích thước lớn, lông xám bạc, tốc độ cực nhanh. Sở trường cực tốc độn và cắn phá.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.WIND],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.35 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.5 },
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 2, chance: 0.4 },
        ]
    },
    // 3. Thổ Miêu
    {
        id: 'tho_mieu',
        name: 'Thổ Miêu',
        description: 'Mèo Đất. Toàn thân bao phủ bởi lớp đất sét cứng, phòng ngự tốt. Có khả năng độn thổ và ngoạm thổ.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.EARTH],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.3 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 1, chance: 0.4 },
        ]
    },
    // 4. Hỏa Điểu Sơ Cấp
    {
        id: 'hoa_dieu_so_cap',
        name: 'Hỏa Điểu Sơ Cấp',
        description: 'Chim Lửa. Lông đỏ rực, phát ra hơi nóng nhẹ, sống trên cao. Có thể phun lửa nhỏ và tăng tốc đốt cháy.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.FIRE],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 2, chance: 0.5 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 1, max: 2, chance: 0.6 }, // Móng vuốt/mỏ
        ]
    },
    // 5. Thủy Hồ
    {
        id: 'thuy_ho',
        name: 'Thủy Hồ',
        description: 'Hồ Ly Nước. Lông trắng, đuôi có thể vẫy nước, sống gần suối. Tấn công bằng thủy tiễn và gây trì hoãn.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.WATER],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.3 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.7 }, // Da hồ ly giá trị
            { itemId: 'yeu_thu_chi_nhat_giai', min: 1, max: 1, chance: 0.3 },
        ]
    },
    // 6. Kim Ngưu
    {
        id: 'kim_nguu',
        name: 'Kim Ngưu',
        description: 'Trâu Vàng. Sừng vàng nhạt, da dày cứng, sức mạnh phi thường. Sở trường Kim Cương Trùng Kích và Khiên Kim.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.METAL],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_cot_nhat_giai', min: 2, max: 4, chance: 0.6 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 2, max: 2, chance: 0.8 }, // Sừng
        ]
    },
    // 7. Âm Ảnh Báo
    {
        id: 'am_anh_bao',
        name: 'Âm Ảnh Báo',
        description: 'Báo Bóng Tối. Toàn thân đen tuyền, hòa lẫn vào bóng đêm. Khả năng ẩn hình hắc ám và cào xé lặng lẽ.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.WATER], // Ám thường quy về Thủy (Âm)
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.6 },
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 2, chance: 0.4 },
        ]
    },
    // 8. Cự Thạch Viên
    {
        id: 'cu_thach_vien',
        name: 'Cự Thạch Viên',
        description: 'Vượn Đá Lớn. To lớn, cơ bắp cuồn cuộn, da giống đá tảng. Sức mạnh cự lực, chuyên ném đá.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Hậu Kỳ',
        elements: [Element.EARTH],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.5 },
            { itemId: 'yeu_cot_nhat_giai', min: 2, max: 5, chance: 0.7 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.3 },
        ]
    },
    // 9. Lôi Điện Khuyển
    {
        id: 'loi_dien_khuyen',
        name: 'Lôi Điện Khuyển',
        description: 'Chó Sấm Sét. Lông dựng đứng, phát ra tia điện nhỏ. Tấn công bằng lôi bạo sơ cấp, tốc độ lôi đình.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.LIGHTNING],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.5 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 2, max: 4, chance: 0.6 }, // Răng/Móng
        ]
    },
    // 10. Hàn Băng Thử
    {
        id: 'han_bang_thu',
        name: 'Hàn Băng Thử',
        description: 'Chuột Băng Giá. Lông trắng và lạnh, sống trong hang động băng. Phun băng khí và đào tuyết.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.ICE, Element.WATER],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.3 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.6 },
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 1, chance: 0.4 },
        ]
    },
    // 11. Phệ Hồn Điệp
    {
        id: 'phe_hon_diep',
        name: 'Phệ Hồn Điệp',
        description: 'Bướm Nuốt Hồn. Cánh rực rỡ nhưng có hoa văn ma mị. Gây ảo ảnh và mê hoặc.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.WOOD], // Tinh thần/Mộc
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.3 },
            { itemId: 'yeu_thu_lan_nhat_giai', min: 1, max: 2, chance: 0.7 }, // Phấn điệp/Cánh (tính là Lân/Vảy)
            { itemId: 'yeu_thu_chi_nhat_giai', min: 1, max: 1, chance: 0.2 },
        ]
    },
    // 12. Thạch Giáp Quy
    {
        id: 'thach_giap_quy',
        name: 'Thạch Giáp Quy',
        description: 'Rùa Mai Đá. Mai cứng như sắt thép, phòng ngự cực cao. Tuyệt đối phòng ngự.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Đỉnh Phong',
        elements: [Element.EARTH],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.6 },
            { itemId: 'yeu_thu_lan_nhat_giai', min: 1, max: 1, chance: 0.9 }, // Mai rùa (tính là Lân lớn)
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 2, chance: 0.5 },
        ]
    },
    // 13. Quang Minh Lộc
    {
        id: 'quang_minh_loc',
        name: 'Quang Minh Lộc',
        description: 'Hươu Ánh Sáng. Sừng phát ra ánh sáng dịu nhẹ, toàn thân màu trắng. Có khả năng trị liệu sơ cấp và tịnh hóa.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.FIRE], // Quang thường quy về Hỏa (Dương)
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 2, max: 2, chance: 0.8 }, // Sừng
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.5 },
        ]
    },
    // 14. Bạo Liệt Trư
    {
        id: 'bao_liet_tru',
        name: 'Bạo Liệt Trư',
        description: 'Heo Nổ. Lợn rừng có khối u màu đỏ, dễ bị kích động. Húc đầu mạnh và có thể tự bạo.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.FIRE, Element.EARTH],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 2, chance: 0.5 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.5 },
        ]
    },
    // 15. Thiên Lang
    {
        id: 'thien_lang',
        name: 'Thiên Lang',
        description: 'Chó Sói Trời. Sói màu xanh da trời, tốc độ và khả năng săn mồi tuyệt vời. Phối hợp tấn công bầy đàn.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Hậu Kỳ',
        elements: [Element.WIND],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.5 },
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 2, chance: 0.6 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 2, max: 4, chance: 0.7 }, // Nanh vuốt
        ]
    },
    // 16. Hắc Thủy Ngư
    {
        id: 'hac_thuy_ngu',
        name: 'Hắc Thủy Ngư',
        description: 'Cá Nước Đen. Cá lớn sống trong vực sâu, da đen trơn. Phun sương hắc ám và tập kích dưới nước.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.WATER],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.3 },
            { itemId: 'yeu_thu_lan_nhat_giai', min: 2, max: 5, chance: 0.6 }, // Vảy
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 1, chance: 0.4 },
        ]
    },
    // 17. Mộc Giáp Trùng
    {
        id: 'moc_giap_trung',
        name: 'Mộc Giáp Trùng',
        description: 'Bọ Cánh Cứng Giáp Gỗ. Lưng có lớp giáp cứng như vỏ cây. Ngụy trang mộc tinh và cắn phá gỗ.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.WOOD],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.3 },
            { itemId: 'yeu_thu_lan_nhat_giai', min: 1, max: 1, chance: 0.8 }, // Vỏ cứng
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.2 },
        ]
    },
    // 18. Huyết Nha
    {
        id: 'huyet_nha',
        name: 'Huyết Nha',
        description: 'Quạ Máu. Quạ đen mắt đỏ rực, mỏ sắc nhọn. Hút huyết sơ cấp, bay lượn linh hoạt.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.WIND], // Phong/Huyết
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 1, max: 2, chance: 0.6 }, // Mỏ/Vuốt
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 1, chance: 0.3 },
        ]
    },
    // 19. Vô Hình Hùng
    {
        id: 'vo_hinh_hung',
        name: 'Vô Hình Hùng',
        description: 'Gấu Vô Hình. Gấu lớn màu nâu, thân thể thỉnh thoảng mờ đi. Thi triển vô hình và vồ hụt.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Hậu Kỳ',
        elements: [Element.EARTH], // Ám/Thổ
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.5 },
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 2, chance: 0.6 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.6 },
        ]
    },
    // 20. Linh Khí Lộc
    {
        id: 'linh_khi_loc',
        name: 'Linh Khí Lộc',
        description: 'Hươu Linh Khí. Hươu màu sắc rực rỡ, phát ra linh khí tinh thuần. Có khả năng dưỡng thể và phân tán linh khí.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Đỉnh Phong',
        elements: [Element.WOOD], // Ngũ hành/Mộc
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.7 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 2, max: 2, chance: 0.9 }, // Sừng quý
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.6 },
        ]
    },

    // --- 50 YÊU THÚ MỚI (0.20.30) ---
    {
        id: 'xich_viem_tho',
        name: 'Xích Viêm Thỏ',
        description: 'Thỏ Lửa Đỏ. Thỏ rừng có lông màu đỏ cam, chạy nhanh. Đốt Cháy Lông (Tỏa nhiệt), Né Tránh Nhanh.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.FIRE, Element.WOOD],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.3 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.5 }, // Lông da
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 1, chance: 0.3 },
        ]
    },
    {
        id: 'can_tu_xa',
        name: 'Căn Tu Xà',
        description: 'Rắn Rễ Cây. Da sần sùi như rễ cây, ngụy trang hoàn hảo trong rừng. Trói Buộc Căn, Ăn Mòn Mộc.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.WOOD, Element.EARTH],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.6 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 1, max: 2, chance: 0.4 }, // Nanh
        ]
    },
    {
        id: 'dia_ho',
        name: 'Địa Hổ',
        description: 'Cọp Đất. Hổ có vằn nâu đen, thích ẩn nấp trong bụi rậm. Ngao Vuốt Thổ, Lực Bạt Sơn.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.EARTH],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.45 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.5 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 2, max: 4, chance: 0.6 }, // Vuốt
        ]
    },
    {
        id: 'thao_linh_loc',
        name: 'Thảo Linh Lộc',
        description: 'Hươu Linh Cỏ. Hươu nhỏ, ăn linh thảo, sừng có chồi non. Phun Sương Hồi Phục (Yếu), Dị Chuyển.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.WOOD],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.3 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 1, max: 2, chance: 0.7 }, // Sừng
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.4 },
        ]
    },
    {
        id: 'thien_diep_quy',
        name: 'Thiên Diệp Quy',
        description: 'Rùa Ngàn Lá. Mai phủ đầy rêu và lá cây, phòng ngự tĩnh. Giáp Lá Chắn, Phản Đòn Mộc.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Đỉnh Phong',
        elements: [Element.WOOD],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.6 },
            { itemId: 'yeu_thu_lan_nhat_giai', min: 1, max: 1, chance: 0.8 }, // Mai rùa
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 2, chance: 0.5 },
        ]
    },
    {
        id: 'cu_mang',
        name: 'Cự Mãng',
        description: 'Trăn Khổng Lồ. Trăn dài và dày, sức siết cực mạnh. Siết Chặt Chết Chóc, Kháng Phép Thô.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Hậu Kỳ',
        elements: [Element.EARTH],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.5 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.7 },
            { itemId: 'yeu_cot_nhat_giai', min: 2, max: 4, chance: 0.4 },
        ]
    },
    {
        id: 'moc_nhan_oa',
        name: 'Mộc Nhãn Oa',
        description: 'Ếch Mắt Gỗ. Ếch có mắt lồi như khối gỗ, da tiết độc tố nhẹ. Nhảy Bọt Độc, Lưỡi Sét Đánh.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.WOOD], // Độc/Mộc
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.3 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.4 },
        ]
    },
    {
        id: 'co_thu_vien',
        name: 'Cổ Thụ Viên',
        description: 'Vượn Cây Cổ. Sống trên cây cao, tốc độ leo trèo nhanh chóng. Tung Cành, Quả Thú Phá.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.WOOD],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.5 },
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 2, chance: 0.4 },
        ]
    },
    {
        id: 'nhi_dau_ma',
        name: 'Nhị Đầu Mã',
        description: 'Ngựa Hai Đầu. Ngựa lớn có hai đầu, một chạy một cảnh giới. Song Húc, Tiếng Kêu Giao Thoa.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.EARTH, Element.WIND],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 2, chance: 0.45 }, // Có thể rớt 2 đan?
            { itemId: 'yeu_cot_nhat_giai', min: 2, max: 4, chance: 0.5 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.5 },
        ]
    },
    {
        id: 'sa_loc',
        name: 'Sa Lộc',
        description: 'Hươu Cát. Sống ở vùng đất khô cằn, có thể chạy trên cát nhanh. Chôn Vùi Cát, Tăng Tốc.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.EARTH],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.3 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 1, max: 2, chance: 0.6 }, // Sừng/Móng
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.4 },
        ]
    },
    {
        id: 'lam_bang_ngu',
        name: 'Lam Băng Ngư',
        description: 'Cá Băng Xanh. Cá nhỏ, bơi nhanh dưới nước lạnh. Đóng Băng Tức Thời (Làm chậm), Phóng Thủy Tiễn.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.ICE, Element.WATER],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.3 },
            { itemId: 'yeu_thu_lan_nhat_giai', min: 1, max: 2, chance: 0.5 },
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 1, chance: 0.3 },
        ]
    },
    {
        id: 'han_long_tich',
        name: 'Hàn Long Tích',
        description: 'Thằn Lằn Rồng Lạnh. Giống thằn lằn nhưng có vảy băng, sống ở khe núi lạnh. Phun Hơi Lạnh, Lướt Trên Băng.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.ICE],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_thu_lan_nhat_giai', min: 1, max: 2, chance: 0.6 },
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 2, chance: 0.4 },
        ]
    },
    {
        id: 'hai_ma',
        name: 'Hải Mã',
        description: 'Ngựa Biển. Ngựa có vảy cá, bơi nhanh và có thể tạo sóng nhỏ. Thủy Kích, Lặn Sâu.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.WATER],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.3 },
            { itemId: 'yeu_thu_lan_nhat_giai', min: 1, max: 2, chance: 0.5 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 1, max: 1, chance: 0.3 },
        ]
    },
    {
        id: 'u_anh_chi_thuy',
        name: 'U Ảnh Chi Thuỷ',
        description: 'Tôm Bóng Tối. Tôm hùm lớn, da màu tím than, sống dưới đáy hồ. Bóng Nước Ảo Ảnh, Càng Đen Cắt.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.WATER], // Ám/Thủy
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_thu_lan_nhat_giai', min: 1, max: 2, chance: 0.6 }, // Vỏ tôm
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 2, chance: 0.3 },
        ]
    },
    {
        id: 'nhu_thuy_xa',
        name: 'Nhu Thủy Xà',
        description: 'Rắn Nước Mềm. Thân mềm mại, khó nắm bắt, có khả năng hóa lỏng cơ thể. Thủy Độ, Khóa Nước.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Hậu Kỳ',
        elements: [Element.WATER],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.5 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.6 },
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 2, chance: 0.4 },
        ]
    },
    {
        id: 'tuyet_bao',
        name: 'Tuyết Báo',
        description: 'Báo Tuyết. Báo trắng muốt, tốc độ cực nhanh trong bão tuyết. Bão Tuyết Mini, Vồ Băng.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.ICE, Element.WIND],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.45 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.7 }, // Da báo tuyết quý
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 2, chance: 0.4 },
        ]
    },
    {
        id: 'tu_bang_nhen',
        name: 'Tử Băng Nhện',
        description: 'Nhện Băng Tím. Nhện lớn, mạng nhện có khả năng đóng băng nhẹ. Mạng Băng, Nọc Độc Thấp.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.ICE], // Độc/Băng
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.3 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 1, max: 2, chance: 0.5 }, // Chân nhện
        ]
    },
    {
        id: 'ngan_lan_quy',
        name: 'Ngân Lân Quy',
        description: 'Rùa Vảy Bạc. Rùa có vảy bạc, mai rất cứng, sống dưới sông lớn. Giáp Kim Thủy, Phun Bọt Thủy.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Đỉnh Phong',
        elements: [Element.WATER, Element.METAL],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.6 },
            { itemId: 'yeu_thu_lan_nhat_giai', min: 2, max: 4, chance: 0.8 }, // Mai/Vảy bạc
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 2, chance: 0.5 },
        ]
    },
    {
        id: 'tham_hai_bat_trao',
        name: 'Thâm Hải Bát Trảo',
        description: 'Bạch Tuộc Biển Sâu. Bạch tuộc lớn, có khả năng phun mực dày đặc. Phun Mực Ám Ảnh, Tám Tay Trói.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Hậu Kỳ',
        elements: [Element.WATER], // Ám/Thủy
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.5 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 2, chance: 0.4 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 1, max: 2, chance: 0.4 }, // Xúc tu
        ]
    },
    {
        id: 'bot_nuoc_tinh',
        name: 'Bọt Nước Tinh',
        description: 'Linh Tinh Bọt Nước. Sinh vật nhỏ bé làm từ nước và linh khí. Tan Biến Thủy, Làm Ẩm.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.WATER],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.3 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 1, max: 1, chance: 0.4 }, // Tinh hoa
            { itemId: 'yeu_thu_lan_nhat_giai', min: 1, max: 1, chance: 0.2 },
        ]
    },
    {
        id: 'bach_vu_ung',
        name: 'Bạch Vũ Ưng',
        description: 'Chim Ưng Lông Trắng. Bay cao, mắt sắc bén, săn mồi từ trên trời. Phong Nhãn, Lướt Gió.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.WIND],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 2, chance: 0.6 }, // Lông vũ
            { itemId: 'yeu_thu_chi_nhat_giai', min: 1, max: 2, chance: 0.5 }, // Móng
        ]
    },
    {
        id: 'thien_loi_thu',
        name: 'Thiên Lôi Thử',
        description: 'Sóc Sấm Sét. Sóc nhỏ, đuôi tích điện, chạy trên cành cây. Phóng Điện Sơ Cấp, Nhảy Lôi Điện.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.LIGHTNING],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.3 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.5 },
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 1, chance: 0.3 },
        ]
    },
    {
        id: 'hac_van_yen',
        name: 'Hắc Vân Yến',
        description: 'Chim Én Mây Đen. Bay nhanh qua các đám mây đen, tạo mưa nhỏ. Cánh Mây, Gió Lốc Nhỏ.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.WIND, Element.WATER],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.35 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 2, chance: 0.5 }, // Lông
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 1, chance: 0.3 },
        ]
    },
    {
        id: 'loi_manh_tru',
        name: 'Lôi Mãnh Trư',
        description: 'Heo Rừng Lôi. Lợn rừng có sừng thép, da có vết cháy xém. Lôi Trùng Kích, Húc Thép.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Hậu Kỳ',
        elements: [Element.LIGHTNING, Element.EARTH],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.5 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.6 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 2, max: 2, chance: 0.7 }, // Sừng/Nanh
        ]
    },
    {
        id: 'vu_duc_diep',
        name: 'Vũ Dực Điệp',
        description: 'Bướm Cánh Gió. Cánh mỏng và lớn, tạo ra cơn gió nhẹ. Tán Gió, Bay Lượn.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.WIND],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.3 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 2, chance: 0.6 }, // Cánh
        ]
    },
    {
        id: 'thien_giac_nguu',
        name: 'Thiên Giác Ngưu',
        description: 'Trâu Sừng Trời. Trâu cực lớn, sừng chĩa lên trời có thể hút Lôi. Hút Lôi Sơ Cấp, Lôi Giáng.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Đỉnh Phong',
        elements: [Element.LIGHTNING],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.6 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 2, max: 2, chance: 0.9 }, // Sừng
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.6 },
        ]
    },
    {
        id: 'bao_phong_hac',
        name: 'Bạo Phong Hạc',
        description: 'Hạc Bão Tố. Hạc lớn, có khả năng tạo ra gió mạnh khi vỗ cánh. Vũ Điệu Gió Xoáy, Mỏ Nhọn.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.WIND],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 2, chance: 0.5 }, // Lông
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 2, chance: 0.4 },
        ]
    },
    {
        id: 'canh_chuon_bay_mau',
        name: 'Cánh Chuồn Bảy Màu',
        description: 'Thất Sắc Tinh Lân. Chuồn chuồn lớn, cánh lấp lánh bảy màu. Phản Chiếu Quang, Tăng Tốc Đột Ngột.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.WIND, Element.FIRE], // Quang/Phong
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.3 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 2, chance: 0.7 }, // Cánh mỏng
        ]
    },
    {
        id: 'loi_xa_doc',
        name: 'Lôi Xà Độc',
        description: 'Rắn Độc Lôi. Rắn có vảy màu đen và vàng, cực kỳ nhanh. Phun Độc Điện, Lôi Xoắn.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Hậu Kỳ',
        elements: [Element.LIGHTNING, Element.WOOD], // Lôi/Độc
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.5 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.6 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 2, max: 2, chance: 0.5 }, // Nanh
        ]
    },
    {
        id: 'hu_khong_ma',
        name: 'Hư Không Mã',
        description: 'Ngựa Không Gian Nhỏ. Ngựa nhỏ, thỉnh thoảng hiện ra rồi biến mất. Dịch Chuyển Ngắn, Linh Khí Chạy.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.WIND], // Không gian -> Phong
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.45 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.5 },
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 2, chance: 0.5 },
        ]
    },
    {
        id: 'thiet_giap_thu',
        name: 'Thiết Giáp Thử',
        description: 'Chuột Giáp Sắt. Chuột nhỏ, lông cứng như kim loại, gặm nhấm đá. Răng Kim Loại, Phòng Ngự Thấp.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.METAL],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.3 },
            { itemId: 'yeu_thu_lan_nhat_giai', min: 1, max: 1, chance: 0.6 }, // Lông cứng (Vỏ)
            { itemId: 'yeu_thu_chi_nhat_giai', min: 1, max: 2, chance: 0.4 }, // Răng
        ]
    },
    {
        id: 'xich_diem_ho',
        name: 'Xích Diễm Hổ',
        description: 'Cọp Lửa Đỏ. Hổ có vằn lửa, sống gần núi lửa. Móng Vuốt Lửa, Hơi Thở Nóng.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.FIRE],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.6 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 2, max: 4, chance: 0.5 }, // Vuốt
        ]
    },
    {
        id: 'kim_cuong_xa',
        name: 'Kim Cương Xà',
        description: 'Rắn Kim Cương. Rắn có vảy cứng lấp lánh, rất khó xuyên thủng. Phản Đòn Kim, Cuộn Chặt.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Hậu Kỳ',
        elements: [Element.METAL, Element.EARTH],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.5 },
            { itemId: 'yeu_thu_lan_nhat_giai', min: 1, max: 1, chance: 0.8 }, // Vảy
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 2, chance: 0.4 },
        ]
    },
    {
        id: 'phuong_hoang_vu',
        name: 'Phượng Hoàng Vũ',
        description: 'Chim Công Lửa Nhỏ. Chim công nhỏ, lông đuôi phát sáng và ấm áp. Tán Hỏa Quang, Hồi Phục Tinh Thần.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.FIRE], // Quang/Hỏa
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.3 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 2, chance: 0.6 }, // Lông vũ đẹp
        ]
    },
    {
        id: 'thach_loi_vien',
        name: 'Thạch Lôi Viên',
        description: 'Vượn Lôi Đá. Vượn cơ bắp, có khả năng đập tay tạo ra rung chấn Lôi. Chấn Động Địa, Lôi Thủ.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.EARTH, Element.LIGHTNING],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_cot_nhat_giai', min: 2, max: 4, chance: 0.6 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.4 },
        ]
    },
    {
        id: 'thien_hoa_ho',
        name: 'Thiên Hỏa Hồ',
        description: 'Hồ Ly Lửa Trời. Hồ ly có đuôi lửa, di chuyển nhanh và linh hoạt. Hỏa Cầu Sơ Cấp, Múa Lửa.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.FIRE, Element.WIND],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.7 }, // Da
            { itemId: 'yeu_thu_chi_nhat_giai', min: 1, max: 1, chance: 0.3 },
        ]
    },
    {
        id: 'luyen_kim_ngu',
        name: 'Luyện Kim Ngư',
        description: 'Cá Luyện Kim. Cá sống trong suối khoáng, vảy có màu vàng đồng. Phun Bột Kim Loại, Hút Linh Thạch.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.METAL, Element.WATER],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.3 },
            { itemId: 'yeu_thu_lan_nhat_giai', min: 1, max: 2, chance: 0.6 },
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 1, chance: 0.3 },
        ]
    },
    {
        id: 'dia_long_giap',
        name: 'Địa Long Giáp',
        description: 'Thằn Lằn Giáp Đất. Thằn lằn lớn, da dày và xám, chịu nhiệt tốt. Độn Thổ Sâu, Cào Địa Chấn.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Hậu Kỳ',
        elements: [Element.EARTH],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.5 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.8 }, // Da dày
            { itemId: 'yeu_thu_chi_nhat_giai', min: 1, max: 2, chance: 0.4 },
        ]
    },
    {
        id: 'kim_ti_trung',
        name: 'Kim Ti Trùng',
        description: 'Sâu Vàng. Sâu nhỏ, nhả ra tơ vàng óng ánh, cứng cáp. Nhả Tơ Kim, Lẩn Trốn.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.METAL],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.3 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 2, chance: 0.5 }, // Tơ (tính là Bì/Sợi)
        ]
    },
    {
        id: 'phe_kim_nguu',
        name: 'Phệ Kim Ngưu',
        description: 'Trâu Ăn Kim. Trâu có hàm răng cực khỏe, có thể nhai kim loại. Hàm Răng Thần, Húc Thép.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Đỉnh Phong',
        elements: [Element.METAL, Element.EARTH],
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.6 },
            { itemId: 'yeu_cot_nhat_giai', min: 2, max: 5, chance: 0.7 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 2, max: 2, chance: 0.8 }, // Sừng/Răng
        ]
    },
    {
        id: 'hac_doc_giac',
        name: 'Hắc Độc Giác',
        description: 'Tê Giác Độc Đen. Tê giác có sừng đen bóng, thích sống ở nơi ẩm thấp. Sừng Độc, Chạy Độc.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.WOOD], // Độc/Mộc
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 1, max: 1, chance: 0.9 }, // Sừng độc
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.5 },
        ]
    },
    {
        id: 'me_hon_ho',
        name: 'Mê Hồn Hồ',
        description: 'Hồ Ly Mê Hoặc. Hồ ly có bộ lông màu tím nhạt, sống trong rừng sâu. Gây Mê Hoặc, Phân Thân Ảnh.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Hậu Kỳ',
        elements: [Element.WOOD], // Tinh thần/Mộc
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.5 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.7 },
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 1, chance: 0.3 },
        ]
    },
    {
        id: 'quy_hoa_thu',
        name: 'Quỷ Hỏa Thử',
        description: 'Chuột Lửa Ma. Chuột nhỏ, mắt đỏ, bao quanh bởi lửa xanh yếu. Phun Lửa Âm, Chạy Nhanh Trong Đêm.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.FIRE, Element.WATER], // Hỏa/Âm
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.35 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.5 },
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 1, chance: 0.4 },
        ]
    },
    {
        id: 'bach_doc_ngo_cong',
        name: 'Bách Độc Ngô Công',
        description: 'Rết Trăm Độc. Rết dài, nhiều chân, tiết ra chất độc đa dạng. Phun Độc Sương, Cắn Độc.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.WOOD], // Độc
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_thu_lan_nhat_giai', min: 2, max: 4, chance: 0.5 }, // Vỏ rết
            { itemId: 'yeu_thu_chi_nhat_giai', min: 2, max: 4, chance: 0.4 }, // Chân
        ]
    },
    {
        id: 'hoang_kim_nhan',
        name: 'Hoàng Kim Nhãn',
        description: 'Thằn Lằn Mắt Vàng. Thằn lằn nhỏ, mắt vàng có thể phát ra tia sáng yếu. Nhãn Quang Sơ Cấp, Ngụy Trang.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.EARTH, Element.METAL], // Quang/Thổ -> Kim
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.3 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.5 },
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 1, chance: 0.3 },
        ]
    },
    {
        id: 'hu_vo_thu',
        name: 'Hư Vô Thú',
        description: 'Thú Hư Vô. Sinh vật không rõ hình dạng, chỉ là cái bóng. Nuốt Chửng Linh Khí (Yếu), Chuyển Vị.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Đỉnh Phong',
        elements: [Element.WIND], // Không gian/Hư vô -> Phong
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.7 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.4 }, // Da bóng
        ]
    },
    {
        id: 'am_phong_dieu',
        name: 'Âm Phong Điêu',
        description: 'Chồn Gió Âm. Chồn có lông đen xám, hoạt động mạnh vào lúc hoàng hôn. Phong Thích, Hút Khí Lạnh.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.WIND, Element.WATER], // Phong/Âm
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.6 },
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 1, chance: 0.3 },
        ]
    },
    {
        id: 'ngu_sac_dieu',
        name: 'Ngũ Sắc Điểu',
        description: 'Chim Năm Màu. Chim nhỏ, lông rực rỡ, mỗi lông mang một thuộc tính. Ngũ Hành Tản Mạn, Gây Rối.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Sơ Kỳ',
        elements: [Element.WOOD], // Đại diện Ngũ hành
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.35 },
            { itemId: 'yeu_bi_nhat_giai', min: 2, max: 3, chance: 0.7 }, // Lông vũ
        ]
    },
    {
        id: 'tu_tinh_thach_thu',
        name: 'Tử Tinh Thạch Thú',
        description: 'Thú Đá Pha Lê Tím. Sinh vật làm từ tinh thể tím, có linh thức đơn giản. Tán Tinh Thần Lực, Tạo Vỏ Bọc.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Hậu Kỳ',
        elements: [Element.EARTH], // Tinh thần/Thổ
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.5 },
            { itemId: 'yeu_thu_lan_nhat_giai', min: 2, max: 4, chance: 0.8 }, // Vỏ đá tím
            { itemId: 'yeu_cot_nhat_giai', min: 1, max: 2, chance: 0.6 },
        ]
    },
    {
        id: 'linh_doc_chu',
        name: 'Linh Độc Chu',
        description: 'Nhện Linh Độc. Nhện lớn, nọc độc có khả năng làm tê liệt thần trí. Nọc Độc Tê Liệt, Mạng Linh Lực.',
        tier: ItemQuality.NHAT_GIAI,
        stage: 'Trung Kỳ',
        elements: [Element.WOOD], // Độc/Tinh thần
        drops: [
            { itemId: 'yeu_dan_nhat_giai', min: 1, max: 1, chance: 0.4 },
            { itemId: 'yeu_thu_chi_nhat_giai', min: 2, max: 4, chance: 0.5 }, // Chân
            { itemId: 'yeu_bi_nhat_giai', min: 1, max: 1, chance: 0.4 },
        ]
    },
];
