import { ItemQuality, EquipmentQuality, ItemType, Element, CultivationStage, WeaponType } from '../../../types/index.ts';
import type { EquippableItem } from '../../../types/index.ts';

export const TAM_GIAI_DAO: { [key: string]: EquippableItem } = {
    'tam_giai_dao_xich_diem_phan_thien_dao': {
        id: 'tam_giai_dao_xich_diem_phan_thien_dao', name: 'Xích Diễm Phần Thiên Đao',
        description: 'Đao khí là những ngọn lửa màu đỏ thẫm nóng rực, có thể thiêu đốt bầu trời. Khi chém xuống đất còn có thể tạo ra những khe nứt dung nham.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 3800, magicalAttack: 2500 },
        elements: [Element.FIRE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_dao_kinh_loi_van_quan_dao': {
        id: 'tam_giai_dao_kinh_loi_van_quan_dao', name: 'Kình Lôi Vạn Quân Đao',
        description: 'Một thanh trọng đao, mỗi lần vung lên đều phát ra tiếng sấm rền như cá kình rống, sóng âm có thể trấn nhiếp tâm thần của cả một đội quân.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 5000, speed: -10 },
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_dao_dia_liet_ba_vuong_dao': {
        id: 'tam_giai_dao_dia_liet_ba_vuong_dao', name: 'Địa Liệt Bá Vương Đao',
        description: 'Đao pháp bá đạo, mỗi nhát chém đều có khả năng làm nứt vỡ mặt đất, tạo ra địa chấn hoặc những bức tường đất để giam cầm đối thủ.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 4800 },
        elements: [Element.EARTH], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_dao_vo_gian_ma_cot_dao': {
        id: 'tam_giai_dao_vo_gian_ma_cot_dao', name: 'Vô Gian Ma Cốt Đao',
        description: 'Đao được luyện từ xương sống của một Ma Vương, mang theo oán khí từ địa ngục Vô Gian, đao khí có thể tra tấn linh hồn đối thủ một cách tàn độc.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 4500, magicalAttack: 1500, daoTam: -20 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_dao_thai_cuong_ma_thiet_dao': {
        id: 'tam_giai_dao_thai_cuong_ma_thiet_dao', name: 'Thái Cương Ma Thiết Đao',
        description: 'Lưỡi đao được phủ một lớp cát Thái Cương siêu cứng. Nó không chỉ cắt, mà còn mài nát mọi thứ nó chạm vào, từ pháp bảo cho đến xương thịt.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 5200 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_dao_tram_ngan_bang_phach_dao': {
        id: 'tam_giai_dao_tram_ngan_bang_phach_dao', name: 'Trầm Ngân Băng Phách Đao',
        description: 'Hàn khí từ đao không chỉ đóng băng thể xác, mà còn xâm nhập và làm tổn thương "phách" của đối thủ, khiến họ rơi vào trạng thái ý chí suy sụp, tinh thần mệt mỏi.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 3000, magicalAttack: 3000 },
        elements: [Element.ICE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_dao_ta_duong_huyet_te_dao': {
        id: 'tam_giai_dao_ta_duong_huyet_te_dao', name: 'Tà Dương Huyết Tế Đao',
        description: 'Để phát huy uy lực mạnh nhất, người dùng phải dùng máu của chính mình để "tế" đao. Sau khi tế luyện, đao có thể tạo ra những nhát chém hút máu và sinh mệnh lực của đối thủ.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 5500, daoTam: -22 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_dao_tinh_van_tu_la_dao': {
        id: 'tam_giai_dao_tinh_van_tu_la_dao', name: 'Tinh Vân Tu La Đao',
        description: 'Một thanh hung đao dành cho ma đạo. Đao khí của nó mang theo sức mạnh không gian, có thể tạo ra những vết rách không gian nhỏ, gây ra sát thương khó lường.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 4800, critChance: 0.1 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_dao_hoang_ngoc_bach_chien_dao': {
        id: 'tam_giai_dao_hoang_ngoc_bach_chien_dao', name: 'Hoàng Ngọc Bách Chiến Đao',
        description: 'Một thanh đao bền bỉ, có khả năng hấp thụ địa khí. Càng chiến đấu lâu, đao càng trở nên cứng rắn và nặng hơn, uy lực cũng theo đó mà tăng lên.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 4000, physicalDefense: 1000 },
        elements: [Element.EARTH], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_dao_huyen_bang_vo_tuong_dao': {
        id: 'tam_giai_dao_huyen_bang_vo_tuong_dao', name: 'Huyễn Băng Vô Tướng Đao',
        description: 'Lưỡi đao được tạo ra từ băng hư ảo, không có hình dạng cố định, có thể tùy ý thay đổi chiều dài và hình dạng trong phạm vi nhất định, khiến đối thủ không thể phòng ngự.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 5000 },
        elements: [Element.ICE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_dao_dia_liet_khai_thien_dao': {
        id: 'tam_giai_dao_dia_liet_khai_thien_dao', name: 'Địa Liệt Khai Thiên Đao',
        description: 'Một thanh cự đao mang theo sức mạnh khai thiên lập địa. Mỗi nhát chém đều dồn nén sức mạnh của địa chấn, uy lực đủ để chẻ đôi một ngọn núi nhỏ.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 6000, speed: -15 },
        elements: [Element.EARTH], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_dao_huyen_quang_thien_kinh_dao': {
        id: 'tam_giai_dao_huyen_quang_thien_kinh_dao', name: 'Huyễn Quang Thiên Kính Đao',
        description: 'Thân đao được mài bóng đến mức như một tấm gương trời. Nó có khả năng "sao chép" lại hình ảnh của một đòn tấn công đang lao tới và chém trả lại một đòn tương tự.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalDefense: 2500 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_dao_xich_diem_lang_hon_dao': {
        id: 'tam_giai_dao_xich_diem_lang_hon_dao', name: 'Xích Diễm Lang Hồn Đao',
        description: 'Phong ấn linh hồn của một con sói lửa ma vương. Đao pháp cực kỳ hung hãn, và mỗi nhát chém sẽ được theo sau bởi nhiều ảnh sói lửa tấn công cùng lúc.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 3500, magicalAttack: 2000 },
        elements: [Element.FIRE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_dao_thai_cuong_doan_kim_dao': {
        id: 'tam_giai_dao_thai_cuong_doan_kim_dao', name: 'Thái Cương Đoạn Kim Đao',
        description: 'Lưỡi đao sắc bén đến mức có thể cắt ngọt các loại pháp bảo, phi kiếm bằng kim loại khác ở cùng cấp. Là khắc tinh của các tu sĩ dùng vũ khí kim loại.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 5500 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_dao_kinh_loi_cuong_khieu_dao': {
        id: 'tam_giai_dao_kinh_loi_cuong_khieu_dao', name: 'Kình Lôi Cuồng Khiếu Đao',
        description: 'Ngoài tiếng sấm rền, cây đao này còn phát ra một tiếng thét chói tai có tần số cao, gây nhiễu loạn và tổn thương nguyên thần của đối thủ, tấn công cả vật chất lẫn tinh thần.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 4000, magicalAttack: 1000 },
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_dao_tinh_van_thien_the_dao': {
        id: 'tam_giai_dao_tinh_van_thien_the_dao', name: 'Tinh Vân Thiên Thể Đao',
        description: 'Một thanh cự đao có lõi là Tinh Vân Tinh Thiết cực nặng, tạo ra một lực hấp dẫn yếu xung quanh nó. Khiến vũ khí của đối thủ bị hút về phía lưỡi đao, gây khó khăn cho việc phòng thủ.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 5300, speed: -12 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_dao_bach_bien_yeu_cot_dao': {
        id: 'tam_giai_dao_bach_bien_yeu_cot_dao', name: 'Bách Biến Yêu Cốt Đao',
        description: 'Chế tác từ xương sống của Yêu Vương có khả năng biến hình. Lưỡi đao có thể đột ngột dài ra, ngắn lại, hoặc mọc thêm gai nhọn theo ý muốn của chủ nhân.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 4600, speed: 10 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_dao_tram_ngan_yem_ma_dao': {
        id: 'tam_giai_dao_tram_ngan_yem_ma_dao', name: 'Trầm Ngân Yểm Ma Đao',
        description: 'Đao khí không tấn công cơ thể mà tấn công thẳng vào thức hải, tạo ra một cơn ác mộng bằng băng giá, khiến đối thủ phải sống lại những ký ức kinh hoàng nhất.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 4500, daoTam: -10 },
        elements: [Element.ICE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_dao_ta_duong_chan_ngon_dao': {
        id: 'tam_giai_dao_ta_duong_chan_ngon_dao', name: 'Tà Dương Chân Ngôn Đao',
        description: 'Một thanh đao kỳ lạ. Bất cứ ai bị lưỡi đao này gây ra vết thương (dù chỉ là vết xước) sẽ bị buộc phải nói sự thật trong một khoảng thời gian ngắn.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.HA_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 3000 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_dao_ngu_hanh_tuoc_doat_dao': {
        id: 'tam_giai_dao_ngu_hanh_tuoc_doat_dao', name: 'Ngũ Hành Tước Đoạt Đao',
        description: 'Có khả năng "tước đoạt" năng lượng nguyên tố. Ví dụ, khi đỡ một đòn tấn công hệ Hỏa, nó có thể hấp thụ hỏa khí đó và chuyển hóa thành một nhát chém hệ Thủy mạnh hơn.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalDefense: 1000, magicalDefense: 1000, physicalAttack: 3500 },
        elements: [Element.METAL, Element.WOOD, Element.WATER, Element.FIRE, Element.EARTH], requiredCultivation: CultivationStage.CORE_FORMATION
    },
};
