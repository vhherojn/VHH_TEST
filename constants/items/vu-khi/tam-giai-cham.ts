import { ItemQuality, EquipmentQuality, ItemType, Element, CultivationStage, WeaponType } from '../../../types/index.ts';
import type { EquippableItem } from '../../../types/index.ts';

export const TAM_GIAI_CHAM: { [key: string]: EquippableItem } = {
    'tam_giai_cham_thai_cuong_phe_linh_cham': {
        id: 'tam_giai_cham_thai_cuong_phe_linh_cham', name: 'Thái Cương Phệ Linh Châm',
        description: 'Cây châm được nén từ vô số hạt cát Thái Cương. Khi xâm nhập vào cơ thể, nó sẽ bung ra và mài mòn, phá hủy linh lực và kinh mạch của đối thủ từ bên trong.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 4000 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_cham_ta_duong_chu_sat_cham': {
        id: 'tam_giai_cham_ta_duong_chu_sat_cham', name: 'Tà Dương Chú Sát Châm',
        description: 'Không gây sát thương vật lý. Cây châm này mang theo một lời nguyền rủa, một khi đã trúng đích sẽ gieo rắc tai ương, bệnh tật, làm suy yếu đối thủ từ căn nguyên.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 3000, daoTam: -25 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_cham_ngu_hanh_diet_tuyet_cham': {
        id: 'tam_giai_cham_ngu_hanh_diet_tuyet_cham', name: 'Ngũ Hành Diệt Tuyệt Châm',
        description: 'Một bộ gồm năm cây châm. Khi cả năm cây cùng găm vào một mục tiêu, chúng sẽ tạo ra một vòng xoáy ngũ hành hỗn loạn, phá hủy cơ thể và kim đan từ bên trong.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 5500 },
        elements: [Element.METAL, Element.WOOD, Element.WATER, Element.FIRE, Element.EARTH], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_cham_huyen_bang_ly_hon_cham': {
        id: 'tam_giai_cham_huyen_bang_ly_hon_cham', name: 'Huyễn Băng Ly Hồn Châm',
        description: 'Hàn khí hư ảo của châm không làm đóng băng cơ thể, mà làm đóng băng liên kết giữa thể xác và linh hồn, khiến linh hồn của nạn nhân tạm thời bị tách ra khỏi cơ thể.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 4800 },
        elements: [Element.ICE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_cham_tram_ngan_vinh_tich_cham': {
        id: 'tam_giai_cham_tram_ngan_vinh_tich_cham', name: 'Trầm Ngân Vĩnh Tịch Châm',
        description: 'Hàn khí của nó có thể đóng băng cả sự sống. Nạn nhân trúng phải sẽ rơi vào trạng thái chết giả, toàn bộ sinh cơ bị ngưng đọng, không thể cứu chữa bằng phương pháp thông thường.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 4200 },
        elements: [Element.ICE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_cham_xich_diem_hu_cot_cham': {
        id: 'tam_giai_cham_xich_diem_hu_cot_cham', name: 'Xích Diễm Hủ Cốt Châm',
        description: 'Hỏa độc từ châm sẽ xâm nhập vào tủy, không gây bỏng bên ngoài mà thiêu đốt và làm mục rữa xương cốt của nạn nhân từ bên trong.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 4300 },
        elements: [Element.FIRE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_cham_kinh_loi_kinh_than_cham': {
        id: 'tam_giai_cham_kinh_loi_kinh_than_cham', name: 'Kình Lôi Kinh Thần Châm',
        description: 'Đâm thẳng vào hệ thần kinh và nguyên thần, gây ra một cú sốc điện cực mạnh, khiến nạn nhân tê liệt hoàn toàn và thần trí hỗn loạn.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 5000 },
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_cham_hoang_ngoc_tu_lung_cham': {
        id: 'tam_giai_cham_hoang_ngoc_tu_lung_cham', name: 'Hoàng Ngọc Tù Lung Châm',
        description: 'Một bộ gồm nhiều cây châm. Khi cắm xuống đất xung quanh đối thủ, chúng sẽ tạo ra một nhà tù bằng đất, giam cầm và phong tỏa linh lực của mục tiêu.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.HA_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalDefense: 1500 },
        elements: [Element.EARTH], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_cham_ma_cot_ly_tam_cham': {
        id: 'tam_giai_cham_ma_cot_ly_tam_cham', name: 'Ma Cốt Ly Tâm Châm',
        description: 'Ám khí tâm ma, không gây sát thương vật lý mà khuếch đại những cảm xúc tiêu cực (sợ hãi, đố kỵ, tức giận) của nạn nhân, khiến họ tự nghi ngờ và rơi vào hỗn loạn.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 1000, daoTam: -30 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_cham_huyen_quang_phan_than_cham': {
        id: 'tam_giai_cham_huyen_quang_phan_than_cham', name: 'Huyễn Quang Phân Thân Châm',
        description: 'Sau khi trúng đích, nó sẽ tạo ra một ảo ảnh giống hệt nạn nhân. Ảo ảnh này sẽ lập tức tấn công bản thể, gây ra sát thương tinh thần.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 3500 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_cham_tinh_van_tinh_bao_cham': {
        id: 'tam_giai_cham_tinh_van_tinh_bao_cham', name: 'Tinh Vân Tinh Bạo Châm',
        description: 'Khi trúng đích, cây châm sẽ phát nổ, tạo ra một vụ nổ sao mini, giải phóng ánh sáng cường độ cao và lực hấp dẫn cực mạnh trong một phạm vi nhỏ.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 5800 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_cham_thai_cuong_quy_khu_cham': {
        id: 'tam_giai_cham_thai_cuong_quy_khu_cham', name: 'Thái Cương Quy Khư Châm',
        description: 'Sức mạnh hủy diệt tối thượng, cây châm này không giết chết mà sẽ mài mục tiêu thành bụi nguyên thủy, không để lại dấu vết gì.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 6500 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_cham_ngu_hanh_loan_phach_cham': {
        id: 'tam_giai_cham_ngu_hanh_loan_phach_cham', name: 'Ngũ Hành Loạn Phách Châm',
        description: 'Tiêm một luồng linh lực ngũ hành hỗn loạn vào phách của đối thủ, khiến linh lực trong cơ thể họ tự xung đột và tàn phá lẫn nhau.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 5200 },
        elements: [Element.METAL, Element.WOOD, Element.WATER, Element.FIRE, Element.EARTH], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_cham_huyen_bang_tam_hon_cham': {
        id: 'tam_giai_cham_huyen_bang_tam_hon_cham', name: 'Huyễn Băng Tam Hồn Châm',
        description: 'Tạo ra ảo ảnh thật đến mức có thể đánh lừa và "đóng băng" một trong tam hồn của đối phương, khiến họ rơi vào trạng thái ngây dại, mất đi ý thức.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 4900 },
        elements: [Element.ICE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_cham_yeu_cot_dong_tam_cham': {
        id: 'tam_giai_cham_yeu_cot_dong_tam_cham', name: 'Yêu Cốt Đồng Tâm Châm',
        description: 'Một cặp châm. Một cây đâm vào người dùng, một cây đâm vào kẻ địch. Mọi sát thương vật lý mà người dùng phải chịu sẽ được chuyển một phần sang cho kẻ địch.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalDefense: 1000 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_cham_dia_liet_hoa_thach_cham': {
        id: 'tam_giai_cham_dia_liet_hoa_thach_cham', name: 'Địa Liệt Hóa Thạch Châm',
        description: 'Tiêm vào cơ thể đối thủ một loại khoáng chất đặc biệt. Trong vài giờ, máu và nội tạng của nạn nhân sẽ dần dần bị hóa đá từ trong ra ngoài.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 3800 },
        elements: [Element.EARTH], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_cham_tram_ngan_vong_xuyen_cham': {
        id: 'tam_giai_cham_tram_ngan_vong_xuyen_cham', name: 'Trầm Ngân Vong Xuyên Châm',
        description: 'Một loại ám khí không giết người, mà tấn công vào ký ức. Có thể khiến nạn nhân quên đi một sự việc hoặc một người nào đó một cách có chủ đích.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 2000 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_cham_ta_duong_khoi_loi_cham': {
        id: 'tam_giai_cham_ta_duong_khoi_loi_cham', name: 'Tà Dương Khôi Lỗi Châm',
        description: 'Khi găm vào các huyệt đạo chính, nó sẽ cắt đứt liên kết giữa não bộ và các chi, cho phép người dùng điều khiển cơ thể nạn nhân như một con rối trong thời gian ngắn.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 2500, daoTam: -15 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_cham_xich_diem_tinh_the_cham': {
        id: 'tam_giai_cham_xich_diem_tinh_the_cham', name: 'Xích Diễm Tịnh Thế Châm',
        description: 'Một loại y châm, dùng lửa tinh khiết để thiêu đốt các loại nguyền rủa, phong ấn, hoặc các sinh vật ký sinh trong cơ thể mà không làm hại đến vật chủ.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.HA_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalDefense: 1000 },
        elements: [Element.FIRE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_cham_huyen_quang_nhan_qua_cham': {
        id: 'tam_giai_cham_huyen_quang_nhan_qua_cham', name: 'Huyễn Quang Nhân Quả Châm',
        description: 'Một cây châm mang tính khái niệm. Khi đã đánh dấu mục tiêu, trong vòng một giờ tới, mọi hành động gây hại mà mục tiêu thực hiện sẽ bị phản ngược lại một phần cho chính bản thân họ.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 1000 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
};
