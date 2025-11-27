import { ItemQuality, EquipmentQuality, ItemType, Element, CultivationStage } from '../../../types/index.ts';
import type { EquippableItem } from '../../../types/index.ts';

export const TAM_GIAI_NON: { [key: string]: EquippableItem } = {
    'tam_giai_non_tinh_van_thien_muc_khoi': {
        id: 'tam_giai_non_tinh_van_thien_muc_khoi', name: 'Tinh Vân Thiên Mục Khôi',
        description: 'Mũ trụ giúp người đội mở ra "Thiên Mục", có thể nhìn thấu dòng chảy của linh khí, tìm ra điểm yếu trong trận pháp và nhược điểm trong công pháp của đối thủ.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { magicalDefense: 1500, comprehension: 10 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_non_ngu_hanh_thanh_lien_mien': {
        id: 'tam_giai_non_ngu_hanh_thanh_lien_mien', name: 'Ngũ Hành Thánh Liên Miện',
        description: 'Một chiếc vương miện hình hoa sen năm màu, có khả năng phòng ngự tuyệt đối với các pháp thuật dưới Tam Giai, đồng thời giúp chủ nhân tĩnh tâm, chống lại tâm ma.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        effects: { magicalDefense: 2500, daoTam: 15 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_non_ta_duong_doa_than_dien': {
        id: 'tam_giai_non_ta_duong_doa_than_dien', name: 'Tà Dương Đọa Thần Diện',
        description: 'Một chiếc mặt nạ ma quái. Bất cứ ai nhìn thẳng vào hoa văn trên mặt nạ sẽ bị tà khí xâm nhập, ý chí chiến đấu suy sụp, thậm chí có thể phát điên.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { physicalDefense: 1000, magicalDefense: 1000, daoTam: -20 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_non_su_tu_hong_kinh_loi_khoi': {
        id: 'tam_giai_non_su_tu_hong_kinh_loi_khoi', name: 'Sư Tử Hống Kình Lôi Khôi',
        description: 'Có khả năng khuếch đại âm thanh của người đội thành thần thông "Sư Tử Hống", tạo ra một đòn tấn công sóng âm diện rộng làm tổn thương nguyên thần của kẻ địch.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        effects: { physicalDefense: 1200, magicalAttack: 800 },
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_non_van_phap_quy_nhat_kinh': {
        id: 'tam_giai_non_van_phap_quy_nhat_kinh', name: 'Vạn Pháp Quy Nhất Kính',
        description: 'Gương hộ tâm đeo trước ngực, có khả năng hấp thụ và phân tích một đòn tấn công pháp thuật của đối phương. Sau khi phân tích, người dùng có thể mô phỏng lại đòn tấn công đó một lần.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { magicalDefense: 1800 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_non_tram_ngan_bang_tam_kinh': {
        id: 'tam_giai_non_tram_ngan_bang_tam_kinh', name: 'Trầm Ngân Băng Tâm Kính',
        description: 'Gương hộ tâm đeo trước trán, tỏa ra hàn khí nhẹ giúp người đội luôn giữ được cái đầu lạnh và trái tim băng giá, miễn nhiễm với các thuật khiêu khích, điều khiển cảm xúc.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { magicalDefense: 1200, daoTam: 12 },
        elements: [Element.ICE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_non_bat_dong_minh_vuong_khoi': {
        id: 'tam_giai_non_bat_dong_minh_vuong_khoi', name: 'Bất Động Minh Vương Khôi',
        description: 'Mũ trụ mang theo ý chí "bất động" của Minh Vương, giúp tăng cường sự kiên định và phòng ngự tinh thần đến cực hạn, khó bị lay chuyển.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { physicalDefense: 1500, magicalDefense: 1500 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_non_van_hon_ma_cot_khoi': {
        id: 'tam_giai_non_van_hon_ma_cot_khoi', name: 'Vạn Hồn Ma Cốt Khôi',
        description: 'Mũ trụ được luyện từ xương và vạn linh hồn oán giận, tạo thành một lớp phòng ngự tâm linh. Có thể giải phóng các linh hồn này để tấn công nguyên thần đối thủ.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { magicalDefense: 2200 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_non_tinh_van_chu_thien_kinh': {
        id: 'tam_giai_non_tinh_van_chu_thien_kinh', name: 'Tinh Vân Chu Thiên Kính',
        description: 'Gương hộ tâm giúp người đội cảm nhận được sự vận hành của linh khí trong trời đất, hỗ trợ việc điều động và vận chuyển linh khí trong cơ thể, tăng hiệu suất chiến đấu và tu luyện.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { magicalDefense: 1000, manaRecoveryRate: 1.1 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_non_huyen_quang_vo_dien_khoi': {
        id: 'tam_giai_non_huyen_quang_vo_dien_khoi', name: 'Huyễn Quang Vô Diện Khôi',
        description: 'Mũ trụ có bề mặt nhẵn như gương, không có ngũ quan. Nó che giấu hoàn toàn khuôn mặt và khí tức của người đội, đồng thời có thể phản lại các đòn dò xét tinh thần yếu.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        effects: { magicalDefense: 2000 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_non_ngu_hanh_dien_phap_khoi': {
        id: 'tam_giai_non_ngu_hanh_dien_phap_khoi', name: 'Ngũ Hành Diễn Pháp Khôi',
        description: 'Giúp người đội phân tích và suy diễn các nguyên lý trong công pháp của đối thủ khi họ ra chiêu, từ đó nhanh chóng tìm ra cách khắc chế.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { magicalDefense: 1600, comprehension: 8 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_non_kim_o_xich_diem_mien': {
        id: 'tam_giai_non_kim_o_xich_diem_mien', name: 'Kim Ô Xích Diễm Miện',
        description: 'Vương miện mang hình tượng Kim Ô (quạ vàng ba chân trong thần thoại), giúp người đội miễn nhiễm với lửa, ảo thuật và có thể bắn ra một luồng "bão mặt trời" nhỏ.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        effects: { magicalDefense: 1800, magicalAttack: 1200 },
        elements: [Element.FIRE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_non_thai_cuong_vo_lau_hoan': {
        id: 'tam_giai_non_thai_cuong_vo_lau_hoan', name: 'Thái Cương Vô Lậu Hoàn',
        description: 'Một chiếc vòng kim cô đeo trên đầu, giúp củng cố thân thể và linh hồn, ngăn chặn sinh khí và linh lực bị "rò rỉ" hoặc bị các thuật hút công lực ảnh hưởng.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { physicalDefense: 1000, magicalDefense: 1000 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_non_kinh_loi_phap_am_loa': {
        id: 'tam_giai_non_kinh_loi_phap_am_loa', name: 'Kình Lôi Pháp Âm Loa',
        description: 'Mũ trụ hình ốc biển, có thể hấp thụ các đòn tấn công bằng âm thanh. Đồng thời có thể phát ra "Pháp Âm" giúp thanh tỉnh đầu óc, xua đuổi tà ma.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { magicalDefense: 1700 },
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_non_huyen_quang_thuy_kinh_dien': {
        id: 'tam_giai_non_huyen_quang_thuy_kinh_dien', name: 'Huyễn Quang Thủy Kính Diện',
        description: 'Mặt nạ có bề mặt như nước trong gương. Nó có thể phản chiếu khuôn mặt của người mà kẻ tấn công tin tưởng hoặc sợ hãi nhất, gây ra một khoảnh khắc do dự chí mạng.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { magicalDefense: 1500 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_non_thai_cuong_pha_phap_khoi': {
        id: 'tam_giai_non_thai_cuong_pha_phap_khoi', name: 'Thái Cương Phá Pháp Khôi',
        description: 'Có thể giải phóng một sóng xung kích chứa đầy các hạt cát Thái Cương li ti, làm vỡ nát các cấu trúc pháp thuật và trận pháp đơn giản ở gần.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { physicalDefense: 1300, magicalDefense: 1300 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_non_tinh_van_thu_vien_khoi': {
        id: 'tam_giai_non_tinh_van_thu_vien_khoi', name: 'Tinh Vân Thư Viện Khôi',
        description: 'Hỗ trợ thần thức, giúp người đội có trí nhớ siêu phàm, chỉ cần liếc mắt là có thể ghi nhớ toàn bộ sách vở, công pháp và phân tích chúng với tốc độ cực nhanh.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.HA_PHAM,
        effects: { magicalDefense: 800, comprehension: 15 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_non_tien_tri_yeu_cot_dien': {
        id: 'tam_giai_non_tien_tri_yeu_cot_dien', name: 'Tiên Tri Yêu Cốt Diện',
        description: 'Mặt nạ làm từ xương sọ của yêu thú có khả năng nhìn trước tương lai. Khi chiến đấu, nó sẽ cho người đội thấy những hình ảnh chớp nhoáng về tương lai gần, giúp né đòn và phản công.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        effects: { physicalDefense: 1000, magicalDefense: 1000, speed: 10 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_non_hoang_ngoc_xa_loi_mien': {
        id: 'tam_giai_non_hoang_ngoc_xa_loi_mien', name: 'Hoàng Ngọc Xá Lợi Miện',
        description: 'Một chiếc vòng kim cô có gắn một viên ngọc xá lợi, tỏa ra phật quang ôn hòa giúp trấn an các loại yêu thú hung hãn và làm giảm sát ý của đối thủ.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.HA_PHAM,
        effects: { magicalDefense: 1200, daoTam: 8 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_non_huyen_bang_da_trong_kinh': {
        id: 'tam_giai_non_huyen_bang_da_trong_kinh', name: 'Huyễn Băng Đa Trọng Kính',
        description: 'Gương hộ tâm có thể tạo ra nhiều ảo ảnh của phần thân trên của người dùng, khiến đối thủ không thể xác định đâu là mục tiêu thật sự để ra đòn chí mạng.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { magicalDefense: 1900 },
        elements: [Element.ICE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
};
