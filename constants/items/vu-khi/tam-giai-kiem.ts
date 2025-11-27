import { ItemQuality, EquipmentQuality, ItemType, Element, CultivationStage, WeaponType } from '../../../types/index.ts';
import type { EquippableItem } from '../../../types/index.ts';

export const TAM_GIAI_KIEM: { [key: string]: EquippableItem } = {
    'tam_giai_kiem_tinh_van_tinh_ha_kiem': {
        id: 'tam_giai_kiem_tinh_van_tinh_ha_kiem', name: 'Tinh Vân Tinh Hà Kiếm',
        description: 'Khi vung kiếm, kiếm quang kéo theo một dải ngân hà lấp lánh, ẩn chứa sức mạnh của tinh tú, kiếm chiêu bao trùm một không gian rộng lớn, khó lòng né tránh.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 2500, magicalAttack: 4000 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_kiem_ngu_hanh_quy_nhat_kiem': {
        id: 'tam_giai_kiem_ngu_hanh_quy_nhat_kiem', name: 'Ngũ Hành Quy Nhất Kiếm',
        description: 'Thân kiếm có thể tùy ý chuyển đổi giữa năm thuộc tính Kim, Mộc, Thủy, Hỏa, Thổ, hoặc hợp nhất năm hành để tạo ra một nhát chém hủy diệt, phá vỡ mọi quy tắc nguyên tố.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 3000, magicalAttack: 5000 },
        elements: [Element.METAL, Element.WOOD, Element.WATER, Element.FIRE, Element.EARTH], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_kiem_tram_ngan_tuyet_tran_kiem': {
        id: 'tam_giai_kiem_tram_ngan_tuyet_tran_kiem', name: 'Trầm Ngân Tuyệt Trần Kiếm',
        description: 'Một thanh kiếm mang theo hàn khí tuyệt đối, có khả năng đóng băng cả linh khí. Vết thương do nó gây ra sẽ làm hàn khí xâm nhập, phá hủy kinh mạch và kim đan của đối thủ.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 3200, magicalAttack: 3200 },
        elements: [Element.ICE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_kiem_huyen_quang_phu_anh_kiem': {
        id: 'tam_giai_kiem_huyen_quang_phu_anh_kiem', name: 'Huyễn Quang Phù Ảnh Kiếm',
        description: 'Lưỡi kiếm là một luồng ánh sáng hư ảo, không có hình thể cố định. Kiếm ở trong tay nhưng bóng kiếm lại xuất hiện ở một nơi khác, thật giả khó lường.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 3500, magicalAttack: 3500, speed: 20 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_kiem_ta_duong_doat_phach_kiem': {
        id: 'tam_giai_kiem_ta_duong_doat_phach_kiem', name: 'Tà Dương Đoạt Phách Kiếm',
        description: 'Thanh ma kiếm có khả năng hút lấy sinh khí và một phần linh hồn của những kẻ bị nó chém trúng để bồi bổ cho chủ nhân.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 4200, daoTam: -15 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_kiem_huyen_quang_tram_nguyet_kiem': {
        id: 'tam_giai_kiem_huyen_quang_tram_nguyet_kiem', name: 'Huyễn Quang Trảm Nguyệt Kiếm',
        description: 'Kiếm pháp tạo ra những luồng kiếm khí hình lưỡi liềm bằng ánh sáng, tốc độ cực nhanh và quỹ đạo biến ảo, có thể tấn công từ nhiều góc độ cùng lúc.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 3800, speed: 25 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_kiem_dia_liet_van_tinh_kiem': {
        id: 'tam_giai_kiem_dia_liet_van_tinh_kiem', name: 'Địa Liệt Vẫn Tinh Kiếm',
        description: 'Một thanh trọng kiếm. Khi dồn linh lực và bổ xuống, nó có thể triệu hồi một khối thiên thạch bằng đất đá rực lửa từ trên trời giáng xuống vị trí chỉ định.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 5500, magicalAttack: 2000, speed: -10 },
        elements: [Element.EARTH, Element.FIRE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_kiem_thai_cuong_pha_vong_kiem': {
        id: 'tam_giai_kiem_thai_cuong_pha_vong_kiem', name: 'Thái Cương Phá Vọng Kiếm',
        description: 'Thân kiếm có khả năng nhìn thấu và phá vỡ các loại ảo thuật, mê trận và thuật ngụy trang dưới cùng cấp. Lưỡi kiếm sắc bén có thể chém đứt cả những thứ hư ảo.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 3000, magicalAttack: 3000 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_kiem_kinh_loi_am_bao_kiem': {
        id: 'tam_giai_kiem_kinh_loi_am_bao_kiem', name: 'Kình Lôi Âm Bạo Kiếm',
        description: 'Khi vung kiếm với tốc độ tối đa, nó sẽ phá vỡ bức tường âm thanh, tạo ra một tiếng nổ siêu thanh (sonic boom) gây sát thương vật lý và chấn động tới đối thủ.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 4000, speed: 30 },
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_kiem_xich_diem_bat_tan_kiem': {
        id: 'tam_giai_kiem_xich_diem_bat_tan_kiem', name: 'Xích Diễm Bất Tẫn Kiếm',
        description: 'Ngọn lửa trên thân kiếm là một loại "bất diệt hỏa", không thể bị dập tắt bằng nước hay gió thông thường, nó sẽ tiếp tục cháy cho đến khi mục tiêu bị thiêu rụi hoàn toàn.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 5200 },
        elements: [Element.FIRE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_kiem_hoang_ngoc_thu_ho_kiem': {
        id: 'tam_giai_kiem_hoang_ngoc_thu_ho_kiem', name: 'Hoàng Ngọc Thủ Hộ Kiếm',
        description: 'Một thanh kiếm không chú trọng sát thương. Thay vào đó, nó có khả năng tạo ra những tấm khiên bằng ngọc thạch cực kỳ kiên cố, là pháp bảo phòng ngự đỉnh cao.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalDefense: 2000, magicalDefense: 2000 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_kiem_tram_ngan_tran_nguc_kiem': {
        id: 'tam_giai_kiem_tram_ngan_tran_nguc_kiem', name: 'Trầm Ngân Trấn Ngục Kiếm',
        description: 'Kiếm mang theo sức nặng và hàn khí của địa ngục băng giá, chuyên dùng để trấn áp, phong ấn ma đầu. Kiếm khí có thể tạo ra xiềng xích bằng băng, khóa chặt linh lực của đối thủ.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 3500, magicalAttack: 2000 },
        elements: [Element.ICE, Element.EARTH], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_kiem_ta_duong_thuc_cot_kiem': {
        id: 'tam_giai_kiem_ta_duong_thuc_cot_kiem', name: 'Tà Dương Thực Cốt Kiếm',
        description: 'Kiếm quang không thiêu đốt mà tỏa ra một luồng hắc quang có khả năng ăn mòn, có thể làm tan chảy hộ thể chân khí, da thịt và thậm chí cả xương cốt.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 4800, magicalDefense: -500, daoTam: -18 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_kiem_tinh_van_thien_tuyen_kiem': {
        id: 'tam_giai_kiem_tinh_van_thien_tuyen_kiem', name: 'Tinh Vân Thiên Tuyền Kiếm',
        description: 'Kiếm pháp tuân theo quỹ đạo của các vì sao. Các đường kiếm tuy có thể đoán trước nhưng lại ẩn chứa thiên uy, không thể ngăn cản, như thể số mệnh đã định.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 3000, magicalAttack: 3000, critChance: 0.1 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_kiem_ngu_hanh_hon_don_kiem': {
        id: 'tam_giai_kiem_ngu_hanh_hon_don_kiem', name: 'Ngũ Hành Hỗn Độn Kiếm',
        description: 'Thay vì cân bằng, thanh kiếm này giải phóng sức mạnh hỗn loạn của Ngũ hành khi chưa được phân tách, tạo ra một vùng năng lượng hỗn độn có khả năng phân giải mọi thứ.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 5500 },
        elements: [Element.METAL, Element.WOOD, Element.WATER, Element.FIRE, Element.EARTH], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_kiem_kinh_loi_tinh_mich_kiem': {
        id: 'tam_giai_kiem_kinh_loi_tinh_mich_kiem', name: 'Kình Lôi Tĩnh Mịch Kiếm',
        description: 'Sử dụng tần số sấm sét đặc biệt để tạo ra một vùng không gian tĩnh lặng tuyệt đối xung quanh người dùng, vô hiệu hóa các đòn tấn công bằng âm thanh và làm đối thủ mất phương hướng.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalDefense: 2000, speed: 10 },
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_kiem_dia_liet_trong_luc_kiem': {
        id: 'tam_giai_kiem_dia_liet_trong_luc_kiem', name: 'Địa Liệt Trọng Lực Kiếm',
        description: 'Thân kiếm có khả năng thay đổi trọng lực trong một phạm vi nhỏ. Có thể làm đối thủ đột nhiên nặng như núi hoặc nhẹ như lông hồng, tạo ra cơ hội tấn công chí mạng.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 4000, speed: -5 },
        elements: [Element.EARTH], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_kiem_huyen_bang_thoi_van_kiem': {
        id: 'tam_giai_kiem_huyen_bang_thoi_van_kiem', name: 'Huyễn Băng Thời Vẫn Kiếm',
        description: 'Hàn khí từ kiếm lạnh đến mức có thể làm "đóng băng" thời gian trong một khu vực cực nhỏ. Khiến đòn tấn công của đối thủ chậm lại một cách dị thường.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 4000, speed: 15 },
        elements: [Element.ICE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_kiem_thai_cuong_phan_tran_kiem': {
        id: 'tam_giai_kiem_thai_cuong_phan_tran_kiem', name: 'Thái Cương Phân Trần Kiếm',
        description: 'Lưỡi kiếm thực chất là một đám mây cát Thái Cương rung động ở tần số cực cao. Bất cứ thứ gì nó chạm vào, từ pháp bảo đến cơ thể, đều sẽ bị phân giải thành bụi.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 6000 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_kiem_xich_diem_luyen_pham_kiem': {
        id: 'tam_giai_kiem_xich_diem_luyen_pham_kiem', name: 'Xích Diễm Luyện Phàm Kiếm',
        description: 'Một thanh kiếm của lửa tinh khiết, không dùng để giết chóc mà để "luyện hóa". Có thể dùng để loại bỏ tạp chất trong pháp bảo, hoặc đốt cháy tâm ma, tà khí trong cơ thể người khác.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 1000, daoTam: 20 },
        elements: [Element.FIRE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
};
