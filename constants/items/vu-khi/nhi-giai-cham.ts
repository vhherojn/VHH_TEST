import { ItemQuality, EquipmentQuality, ItemType, Element, CultivationStage, WeaponType } from '../../../types/index.ts';
import type { EquippableItem } from '../../../types/index.ts';

export const NHI_GIAI_CHAM: { [key: string]: EquippableItem } = {
    'nhi_giai_cham_lam_quang_doat_phach_cham': { 
        id: 'nhi_giai_cham_lam_quang_doat_phach_cham', name: 'Lam Quang Đoạt Phách Châm', 
        description: 'Tấn công vào phách của đối thủ, khiến họ rơi vào trạng thái hoảng loạn, mất phương hướng.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 450, daoTam: -10 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_cham_hoa_diem_phan_tam_cham': { 
        id: 'nhi_giai_cham_hoa_diem_phan_tam_cham', name: 'Hỏa Diễm Phần Tâm Châm', 
        description: 'Sau khi trúng đích, hỏa độc sẽ không phát tác ngay mà âm thầm thiêu đốt tâm mạch của nạn nhân từ bên trong.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 600 }, 
        elements: [Element.FIRE], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_cham_ma_cot_hu_than_cham': { 
        id: 'nhi_giai_cham_ma_cot_hu_than_cham', name: 'Ma Cốt Hủ Thần Châm', 
        description: 'Chế tác từ xương ma thú bị nguyền rủa, chuyên dùng để tấn công thức hải, làm mục rữa nguyên thần.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 650 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_cham_phong_sat_vo_tuc_cham': { 
        id: 'nhi_giai_cham_phong_sat_vo_tuc_cham', name: 'Phong Sát Vô Tức Châm', 
        description: 'Bay trong không khí mà không tạo ra tiếng động hay luồng linh lực nào, cực kỳ khó phát hiện.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 300, speed: 15, critChance: 0.1 }, 
        elements: [Element.WIND], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_cham_bach_dien_tinh_hon_cham': { 
        id: 'nhi_giai_cham_bach_dien_tinh_hon_cham', name: 'Bạch Điền Tịnh Hồn Châm', 
        description: 'Là một bộ châm y dược, có thể dùng để chữa trị vết thương linh hồn hoặc ổn định nguyên thần bị tổn thương.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalDefense: 300, daoTam: 5 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_cham_bang_tam_thuc_cot_cham': { 
        id: 'nhi_giai_cham_bang_tam_thuc_cot_cham', name: 'Băng Tàm Thực Cốt Châm', 
        description: 'Sau khi trúng đích, hàn độc sẽ ngấm sâu vào xương tủy, gây đau đớn tột cùng và phá hủy từ bên trong.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 620 }, 
        elements: [Element.ICE], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_cham_huyen_am_pha_giap_cham': { 
        id: 'nhi_giai_cham_huyen_am_pha_giap_cham', name: 'Huyền Âm Phá Giáp Châm', 
        description: 'Châm mang âm khí nặng nề, có khả năng ăn mòn và phá hủy hộ thể chân khí một cách âm thầm.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 500 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_cham_tu_loi_cham': { 
        id: 'nhi_giai_cham_tu_loi_cham', name: 'Tử Lôi Châm', 
        description: 'Ngưng tụ từ tinh hoa sấm sét, khi bắn ra là một tia sét tím nhỏ, tốc độ cực nhanh, gây tê liệt toàn thân.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 550, speed: 10, critChance: 0.1 }, 
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_cham_tu_kim_huyet_te_cham': { 
        id: 'nhi_giai_cham_tu_kim_huyet_te_cham', name: 'Tử Kim Huyết Tế Châm', 
        description: 'Một loại châm cấm thuật, cần một giọt máu của người sử dụng để kích hoạt. Sau khi kích hoạt, nó sẽ tự động truy tìm và tấn công kẻ địch với uy lực đáng sợ.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 800 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_cham_khuong_hoang_thach_hoa_cham': { 
        id: 'nhi_giai_cham_khuong_hoang_thach_hoa_cham', name: 'Khương Hoàng Thạch Hóa Châm', 
        description: 'Chất độc trong châm không gây chết người mà sẽ khiến kinh mạch và cơ bắp của nạn nhân bị hóa đá tạm thời, khiến họ không thể di chuyển.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 300, speed: -20 }, 
        elements: [Element.EARTH], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_cham_thanh_kim_dan_loi_cham': { 
        id: 'nhi_giai_cham_thanh_kim_dan_loi_cham', name: 'Thanh Kim Dẫn Lôi Châm', 
        description: 'Bản thân cây châm không có sát thương lớn, nhưng một khi đã găm vào người đối thủ, nó sẽ trở thành cột thu lôi, thu hút các đòn tấn công hệ lôi khác nhắm vào nạn nhân.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalDefense: -200 }, 
        elements: [Element.LIGHTNING, Element.METAL], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_cham_bach_dien_sinh_co_cham': { 
        id: 'nhi_giai_cham_bach_dien_sinh_co_cham', name: 'Bạch Điền Sinh Cơ Châm', 
        description: 'Châm dùng trong y thuật, có khả năng kích thích sinh cơ, giúp vết thương mau lành và hồi phục linh khí một cách nhanh chóng.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { manaRecoveryRate: 1.2 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_cham_loi_van_bao_liet_cham': { 
        id: 'nhi_giai_cham_loi_van_bao_liet_cham', name: 'Lôi Vân Bạo Liệt Châm', 
        description: 'Sau khi găm vào mục tiêu 3 giây, cây châm sẽ phát nổ, tạo ra một vụ nổ lôi hỏa nhỏ để gây sát thương từ bên trong.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 750 }, 
        elements: [Element.LIGHTNING, Element.FIRE], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
};
