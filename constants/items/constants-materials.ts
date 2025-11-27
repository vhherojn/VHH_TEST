import { ItemQuality, ItemType, Resource } from '../../types/index.ts';

export const MATERIALS: { [key: string]: Resource } = {
    spirit_stone: { id: 'spirit_stone', name: 'Linh Thạch', description: 'Đơn vị tiền tệ cơ bản.', quality: ItemQuality.NHAT_GIAI, type: ItemType.RESOURCE, value: 1, },
    wood: { id: 'wood', name: 'Linh Mộc', description: 'Vật liệu xây dựng cơ bản.', quality: ItemQuality.NHAT_GIAI, type: ItemType.MATERIAL, value: 1, },
    stone: { id: 'stone', name: 'Linh Thạch Khoáng', description: 'Vật liệu xây dựng cơ bản.', quality: ItemQuality.NHAT_GIAI, type: ItemType.MATERIAL, value: 1, },
    spirit_herb: { id: 'spirit_herb', name: 'Linh Thảo', description: 'Dùng để luyện chế đan dược.', quality: ItemQuality.NHAT_GIAI, type: ItemType.HERB, value: 2, },
    nap_khi_thao: { id: 'nap_khi_thao', name: 'Nạp Khí Thảo', description: 'Linh thảo cơ bản, dùng để luyện chế Tụ Khí Đan.', quality: ItemQuality.NHAT_GIAI, type: ItemType.HERB, value: 3 },
    man_da_can: { id: 'man_da_can', name: 'Mạn Đà Căn', description: 'Linh thảo có độc tính nhẹ, dùng để luyện chế Hồi Khí Đan.', quality: ItemQuality.NHAT_GIAI, type: ItemType.HERB, value: 3 },

    // New Herbs for 0.4
    tu_linh_thao: { id: 'tu_linh_thao', name: 'Tụ Linh Thảo', description: 'Linh thảo Nhất Giai, chứa linh khí ôn hòa.', quality: ItemQuality.NHAT_GIAI, type: ItemType.HERB, value: 4 },
    ngung_khi_qua: { id: 'ngung_khi_qua', name: 'Ngưng Khí Quả', description: 'Linh quả Nhất Giai, giúp ngưng tụ linh khí.', quality: ItemQuality.NHAT_GIAI, type: ItemType.HERB, value: 8 },
    thanh_linh_thao: { id: 'thanh_linh_thao', name: 'Thanh Linh Thảo', description: 'Linh thảo Nhất Giai, có tác dụng thanh tâm, an thần.', quality: ItemQuality.NHAT_GIAI, type: ItemType.HERB, value: 5 },
    tinh_linh_qua: { id: 'tinh_linh_qua', name: 'Tĩnh Linh Quả', description: 'Linh quả Nhất Giai, có tác dụng làm "lắng" chân khí.', quality: ItemQuality.NHAT_GIAI, type: ItemType.HERB, value: 9 },
    thanh_ngoc_truc: { id: 'thanh_ngoc_truc', name: 'Thanh Ngọc Trúc', description: 'Linh trúc Nhất Giai, dịch ép có tính ôn hòa.', quality: ItemQuality.NHAT_GIAI, type: ItemType.MATERIAL, value: 6 },
    hoi_xuan_thao: { id: 'hoi_xuan_thao', name: 'Hồi Xuân Thảo', description: 'Linh thảo Nhất Giai, cung cấp sinh cơ dồi dào để chữa lành vết thương.', quality: ItemQuality.NHAT_GIAI, type: ItemType.HERB, value: 5 },
    thanh_ngoc_qua: { id: 'thanh_ngoc_qua', name: 'Thanh Ngọc Quả', description: 'Linh quả Nhất Giai, chứa linh khí thuần túy, thúc đẩy hồi phục.', quality: ItemQuality.NHAT_GIAI, type: ItemType.HERB, value: 8 },
    thiet_diep_moc: { id: 'thiet_diep_moc', name: 'Thiết Diệp Mộc', description: 'Linh mộc Nhất Giai, bột gỗ có tính kiên cố.', quality: ItemQuality.NHAT_GIAI, type: ItemType.MATERIAL, value: 4 },
    hoa_linh_thao: { id: 'hoa_linh_thao', name: 'Hỏa Linh Thảo', description: 'Linh thảo Nhất Giai, chứa hỏa linh khí dồi dào.', quality: ItemQuality.NHAT_GIAI, type: ItemType.HERB, value: 7 },
    hac_linh_co: { id: 'hac_linh_co', name: 'Hắc Linh Cô', description: 'Linh nấm Nhất Giai, chứa âm khí ôn hòa.', quality: ItemQuality.NHAT_GIAI, type: ItemType.HERB, value: 6 },
    
    // New Herbs/Materials for 0.41
    chan_nguyen_qua: { id: 'chan_nguyen_qua', name: 'Chân Nguyên Quả', description: 'Linh quả Tam Giai, chứa đựng chân nguyên cực kỳ tinh thuần.', quality: ItemQuality.TAM_GIAI, type: ItemType.HERB, value: 800 },
    hoang_linh_chi: { id: 'hoang_linh_chi', name: 'Hoàng Linh Chi', description: 'Linh chi Nhị Giai, dược tính "vững", chuyên dùng để ổn định và trung hòa dược lực.', quality: ItemQuality.NHI_GIAI, type: ItemType.HERB, value: 250 },
    tu_khi_hoa: { id: 'tu_khi_hoa', name: 'Tử Khí Hoa', description: 'Linh hoa Nhị Giai, có khả năng thanh tẩy tạp chất.', quality: ItemQuality.NHI_GIAI, type: ItemType.HERB, value: 180 },
    bich_huyet_thao: { id: 'bich_huyet_thao', name: 'Bích Huyết Thảo', description: 'Linh thảo Nhị Giai, là dược dẫn tuyệt vời để chữa trị nội thương.', quality: ItemQuality.NHI_GIAI, type: ItemType.HERB, value: 150 },
    hong_huyet_sam: { id: 'hong_huyet_sam', name: 'Hồng Huyết Sâm', description: 'Linh sâm Tam Giai, cung cấp khí huyết dồi dào.', quality: ItemQuality.TAM_GIAI, type: ItemType.HERB, value: 600 },
    ma_nao_chi: { id: 'ma_nao_chi', name: 'Mã Não Chi', description: 'Linh chi Nhị Giai, dược lực chuyên thấm vào xương cốt.', quality: ItemQuality.NHI_GIAI, type: ItemType.HERB, value: 200 },
    kim_duong_moc: { id: 'kim_duong_moc', name: 'Kim Dương Mộc', description: 'Linh mộc Nhị Giai, nhựa cây mang theo "kim tính" sắc bén.', quality: ItemQuality.NHI_GIAI, type: ItemType.MATERIAL, value: 120 },
    duong_cuc_qua: { id: 'duong_cuc_qua', name: 'Dương Cực Quả', description: 'Linh quả Tam Giai, là vật chí dương chí nóng, đối với Trúc Cơ Kỳ là kịch độc.', quality: ItemQuality.TAM_GIAI, type: ItemType.HERB, value: 1000 },
    viem_hoa_co: { id: 'viem_hoa_co', name: 'Viêm Hỏa Cô', description: 'Linh nấm Nhị Giai, chứa hỏa linh khí tinh thuần nhưng khó khống chế.', quality: ItemQuality.NHI_GIAI, type: ItemType.HERB, value: 220 },
    hoa_van_truc: { id: 'hoa_van_truc', name: 'Hỏa Vân Trúc', description: 'Linh trúc Nhị Giai, dịch ép có thể trung hòa hỏa độc.', quality: ItemQuality.NHI_GIAI, type: ItemType.MATERIAL, value: 130 },
    bang_linh_qua: { id: 'bang_linh_qua', name: 'Băng Linh Quả', description: 'Linh quả Tam Giai, chứa hàn khí cực độ.', quality: ItemQuality.TAM_GIAI, type: ItemType.HERB, value: 1000 },
    am_ngung_co: { id: 'am_ngung_co', name: 'Âm Ngưng Cô', description: 'Linh nấm Nhị Giai, chứa hàn khí âm nhu.', quality: ItemQuality.NHI_GIAI, type: ItemType.HERB, value: 220 },
    tu_ngoc_truc: { id: 'tu_ngoc_truc', name: 'Tử Ngọc Trúc', description: 'Linh trúc Nhị Giai, bột có thể làm chậm quá trình phát tán của dược lực.', quality: ItemQuality.NHI_GIAI, type: ItemType.MATERIAL, value: 140 },

    // New Herbs/Materials for 0.42
    tuyet_linh_chi: { id: 'tuyet_linh_chi', name: 'Tuyết Linh Chi', description: 'Linh chi Tứ Giai, dược tính chí âm chí thuần, là thánh dược chữa trị linh hồn.', quality: ItemQuality.TU_GIAI, type: ItemType.HERB, value: 5000 },
    u_hon_thao: { id: 'u_hon_thao', name: 'U Hồn Thảo', description: 'Linh thảo Tam Giai, có tác dụng nuôi dưỡng thần hồn.', quality: ItemQuality.TAM_GIAI, type: ItemType.HERB, value: 1200 },
    bach_ngoc_san_ho_moc: { id: 'bach_ngoc_san_ho_moc', name: 'Bạch Ngọc San Hô Mộc', description: 'Linh mộc Tam Giai, tinh chất có tính thủy nhu hòa.', quality: ItemQuality.TAM_GIAI, type: ItemType.MATERIAL, value: 800 },
    sinh_nguyen_co: { id: 'sinh_nguyen_co', name: 'Sinh Nguyên Cô', description: 'Linh nấm Tứ Giai, chứa đựng sinh mệnh lực kinh người.', quality: ItemQuality.TU_GIAI, type: ItemType.HERB, value: 6000 },
    ngoc_nguyen_hoi_xuan_hoa: { id: 'ngoc_nguyen_hoi_xuan_hoa', name: 'Ngọc Nguyên Hồi Xuân Hoa', description: 'Linh hoa Tam Giai, chứa đựng sinh mệnh lực.', quality: ItemQuality.TAM_GIAI, type: ItemType.HERB, value: 1500 },
    huyet_ngoc_sam: { id: 'huyet_ngoc_sam', name: 'Huyết Ngọc Sâm', description: 'Linh sâm Tứ Giai, chứa đựng khí huyết bá đạo.', quality: ItemQuality.TU_GIAI, type: ItemType.HERB, value: 7000 },
    nghe_thuong_thao: { id: 'nghe_thuong_thao', name: 'Nghê Thường Thảo', description: 'Linh thảo Tam Giai, có khả năng tạo ra ảo ảnh.', quality: ItemQuality.TAM_GIAI, type: ItemType.HERB, value: 900 },
    that_tinh_thao: { id: 'that_tinh_thao', name: 'Thất Tinh Thảo', description: 'Linh thảo Tam Giai, giúp giữ vững tâm trí, bảo vệ linh đài.', quality: ItemQuality.TAM_GIAI, type: ItemType.HERB, value: 1100 },
    diem_duong_moc: { id: 'diem_duong_moc', name: 'Diễm Dương Mộc', description: 'Linh mộc Tứ Giai, chứa Nam Minh Ly Hỏa.', quality: ItemQuality.TU_GIAI, type: ItemType.MATERIAL, value: 4500 },
    tu_van_sam: { id: 'tu_van_sam', name: 'Tử Vân Sâm', description: 'Linh sâm Tứ Giai, cung cấp một lượng nguyên khí khổng lồ.', quality: ItemQuality.TU_GIAI, type: ItemType.HERB, value: 8000 },
    tinh_huyet_truc_co: { id: 'tinh_huyet_truc_co', name: 'Tinh Huyết Tu Sĩ Trúc Cơ', description: 'Tinh huyết của một tu sĩ Trúc Cơ, là vật đại tà.', quality: ItemQuality.TAM_GIAI, type: ItemType.MATERIAL, value: 2000 },
    
    // New T4 Materials for 0.44
    thien_nguyen_qua: { id: 'thien_nguyen_qua', name: 'Thiên Nguyên Quả', description: 'Thiên tài địa bảo Tứ Giai, chứa đựng "cội nguồn chi lực", dùng để thanh lọc Nguyên Anh.', quality: ItemQuality.TU_GIAI, type: ItemType.HERB, value: 10000 },
    kim_chi_luc_diep_hoa: { id: 'kim_chi_luc_diep_hoa', name: 'Kim Chi Lục Diệp Hoa', description: 'Linh hoa Tứ Giai, mỗi lá chứa đựng thuộc tính bản mệnh tinh thuần, dùng để củng cố Nguyên Anh.', quality: ItemQuality.TU_GIAI, type: ItemType.HERB, value: 8000 },
    nam_hai_tu_diem_truc: { id: 'nam_hai_tu_diem_truc', name: 'Nam Hải Tử Diễm Trúc', description: 'Linh trúc Tứ Giai từ Nam Hải, tinh chất có tính âm dương cân bằng, giúp ổn định quá trình luyện đan.', quality: ItemQuality.TU_GIAI, type: ItemType.MATERIAL, value: 6000 },
    phuong_van_linh_chi: { id: 'phuong_van_linh_chi', name: 'Phượng Văn Linh Chi', description: 'Linh chi Tứ Giai, trên bề mặt có hoa văn phượng hoàng, chứa đựng pháp tắc "tái sinh".', quality: ItemQuality.TU_GIAI, type: ItemType.HERB, value: 12000 },
    thien_linh_chi: { id: 'thien_linh_chi', name: 'Thiên Linh Chi', description: 'Linh chi Tứ Giai, cung cấp sinh mệnh lực khổng lồ.', quality: ItemQuality.TU_GIAI, type: ItemType.HERB, value: 9000 },
    tran_nguc_qua: { id: 'tran_nguc_qua', name: 'Trấn Ngục Quả', description: 'Linh quả Tứ Giai, có sức mạnh trấn áp tâm ma, giữ cho linh đài thanh tịnh.', quality: ItemQuality.TU_GIAI, type: ItemType.HERB, value: 11000 },
    tu_long_qua: { id: 'tu_long_qua', name: 'Tử Long Quả', description: 'Linh quả Tứ Giai, chứa đựng long khí và huyết mạch của Long tộc.', quality: ItemQuality.TU_GIAI, type: ItemType.HERB, value: 15000 },
    long_can_thao: { id: 'long_can_thao', name: 'Long Cân Thảo', description: 'Linh thảo Tứ Giai, có hình dạng như gân rồng, dùng để cường hóa gân cốt.', quality: ItemQuality.TU_GIAI, type: ItemType.HERB, value: 7000 },
    huyet_long_moc: { id: 'huyet_long_moc', name: 'Huyết Long Mộc', description: 'Thần mộc Tứ Giai, có màu đỏ như máu, chứa đựng long khí bá đạo.', quality: ItemQuality.TU_GIAI, type: ItemType.MATERIAL, value: 7500 },
    du_long_thao: { id: 'du_long_thao', name: 'Dụ Long Thảo', description: 'Linh thảo Tứ Giai, tỏa ra mùi hương có sức hấp dẫn trí mạng đối với Giao Long.', quality: ItemQuality.TU_GIAI, type: ItemType.HERB, value: 5000 },
    hoa_anh_qua: { id: 'hoa_anh_qua', name: 'Hoá Anh Quả', description: 'Linh quả nghịch thiên Tứ Giai, là chìa khoá để phá đan thành anh.', quality: ItemQuality.TU_GIAI, type: ItemType.HERB, value: 20000 },
    du_long_huong: { id: 'du_long_huong', name: 'Dụ Long Hương', description: 'Một loại nhang đặc biệt. Khi đốt sẽ thu hút yêu thú có huyết mạch long tộc cấp 4.', quality: ItemQuality.TU_GIAI, type: ItemType.RESOURCE, value: 100 },

    // New T5 Materials for 0.46
    tu_van_long_tien_sam: { id: 'tu_van_long_tien_sam', name: 'Tử Vân Long Tiên Sâm', description: 'Tiên sâm Ngũ Giai, chứa đựng tiên khí cực kỳ tinh thuần, là đại bổ vật cho tu sĩ Hóa Thần.', quality: ItemQuality.NGU_GIAI, type: ItemType.HERB, value: 50000 },
    thien_nguyen_dao_qua: { id: 'thien_nguyen_dao_qua', name: 'Thiên Nguyên Đạo Quả', description: 'Thánh quả Ngũ Giai, ẩn chứa một tia cảm ngộ về Đại Đạo.', quality: ItemQuality.NGU_GIAI, type: ItemType.HERB, value: 80000 },
    cuu_diep_kim_lien: { id: 'cuu_diep_kim_lien', name: 'Cửu Diệp Kim Liên', description: 'Thánh dược Ngũ Giai, mỗi cánh lá mang theo pháp tắc "hài hòa" và "tinh khiết".', quality: ItemQuality.NGU_GIAI, type: ItemType.HERB, value: 60000 },
    phuong_huyet_qua: { id: 'phuong_huyet_qua', name: 'Phượng Huyết Quả', description: 'Linh quả Ngũ Giai, được cho là ngưng tụ từ máu của Chân Phượng, mang theo pháp tắc "Niết Bàn".', quality: ItemQuality.NGU_GIAI, type: ItemType.HERB, value: 75000 },
    truong_sinh_qua: { id: 'truong_sinh_qua', name: 'Trường Sinh Quả', description: 'Tiên quả Ngũ Giai, chứa đựng sinh mệnh lực và pháp tắc thời gian, có thể nghịch thiên cải mệnh, tăng thọ nguyên.', quality: ItemQuality.NGU_GIAI, type: ItemType.HERB, value: 100000 },
    huyet_hoa_phu_tang: { id: 'huyet_hoa_phu_tang', name: 'Huyết Hòa Phù Tang', description: 'Thần mộc Ngũ Giai, là nguồn năng lượng hủy diệt, tương truyền mọc ở nơi mặt trời lặn.', quality: ItemQuality.NGU_GIAI, type: ItemType.MATERIAL, value: 40000 },
    phuc_long_dang: { id: 'phuc_long_dang', name: 'Phục Long Đằng', description: 'Tiên đằng Ngũ Giai, dẻo dai vô cùng, có tác dụng trói buộc năng lượng.', quality: ItemQuality.NGU_GIAI, type: ItemType.MATERIAL, value: 30000 },
};