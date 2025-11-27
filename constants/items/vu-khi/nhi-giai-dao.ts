import { ItemQuality, EquipmentQuality, ItemType, Element, CultivationStage, WeaponType } from '../../../types/index.ts';
import type { EquippableItem } from '../../../types/index.ts';

export const NHI_GIAI_DAO: { [key: string]: EquippableItem } = {
    'nhi_giai_dao_tu_kim_ban_long_dao': { 
        id: 'nhi_giai_dao_tu_kim_ban_long_dao', name: 'Tử Kim Bàn Long Đao', 
        description: 'Thân đao chạm khắc hình rồng cuộn, mang khí thế bá vương, uy lực kinh hồn.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 800 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_dao_huyen_thiet_doan_hon_dao': { 
        id: 'nhi_giai_dao_huyen_thiet_doan_hon_dao', name: 'Huyền Thiết Đoạn Hồn Đao', 
        description: 'Đao khí âm hàn, có khả năng gây tổn thương trực tiếp đến linh hồn và nguyên thần của đối thủ.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 600, magicalAttack: 200 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_dao_liet_diem_cuong_dao': { 
        id: 'nhi_giai_dao_liet_diem_cuong_dao', name: 'Liệt Diễm Cuồng Đao', 
        description: 'Càng chiến đấu, lửa trên thân đao càng cháy mạnh, kích thích sự cuồng bạo của người sử dụng.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 550, magicalAttack: 150 }, 
        elements: [Element.FIRE], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_dao_ma_cot_ba_dao': { 
        id: 'nhi_giai_dao_ma_cot_ba_dao', name: 'Ma Cốt Bá Đao', 
        description: 'Chế tác từ xương của ma thú, đao pháp đầy ma tính, hung hãn và tàn bạo.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 720 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_dao_nham_pha_dao': { 
        id: 'nhi_giai_dao_nham_pha_dao', name: 'Nham Phá Đao', 
        description: 'Sống đao dày, lưỡi đao nặng, mỗi nhát chém có sức mạnh phá tan đá tảng và công trình phòng ngự.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 700, speed: -6 }, 
        elements: [Element.EARTH], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_dao_hoa_diem_thu_hon_dao': { 
        id: 'nhi_giai_dao_hoa_diem_thu_hon_dao', name: 'Hỏa Diễm Thú Hồn Đao', 
        description: 'Bên trong phong ấn một thú hồn hệ hỏa, khi chiến đấu có thể triệu hồi thú hồn phụ trợ, đao pháp càng thêm hung hãn.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 500, magicalAttack: 350 }, 
        elements: [Element.FIRE], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_dao_loi_van_tan_nguyet_dao': { 
        id: 'nhi_giai_dao_loi_van_tan_nguyet_dao', name: 'Lôi Vân Tàn Nguyệt Đao', 
        description: 'Lưỡi đao cong như trăng khuyết, khi vung lên tạo ra những đường hồ quang điện mạnh mẽ.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 550, magicalAttack: 250, critChance: 0.05 }, 
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_dao_phong_sat_liep_phong_dao': { 
        id: 'nhi_giai_dao_phong_sat_liep_phong_dao', name: 'Phong Sát Liệp Phong Đao', 
        description: 'Đao cực nhẹ và sắc, chuyên dùng để truy sát, tốc độ ra đòn nhanh như gió săn mồi.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 580, speed: 12 }, 
        elements: [Element.WIND], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_dao_thanh_kim_cu_khuyet_dao': { 
        id: 'nhi_giai_dao_thanh_kim_cu_khuyet_dao', name: 'Thanh Kim Cự Khuyết Đao', 
        description: 'Một thanh trọng đao không có mũi nhọn, có những khoảng trống trên thân, chuyên dùng để đập và chém với sức mạnh hủy diệt.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 780, speed: -7 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_dao_huyen_thiet_trong_pha_dao': { 
        id: 'nhi_giai_dao_huyen_thiet_trong_pha_dao', name: 'Huyền Thiết Trọng Phá Đao', 
        description: 'Tập trung vào sức nặng và khả năng phá hủy, chuyên dùng để phá vỡ các lớp phòng ngự cứng rắn.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 760, speed: -7 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_dao_huyen_thiet_nghich_lan_dao': { 
        id: 'nhi_giai_dao_huyen_thiet_nghich_lan_dao', name: 'Huyền Thiết Nghịch Lân Đao', 
        description: 'Trên thân đao có một chiếc vảy ngược. Khi bị tấn công trúng vảy ngược, đao sẽ phát ra sát khí cuồng bạo, tăng sức mạnh cho người sử dụng trong thời gian ngắn.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 650 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_dao_ma_cot_huyet_le_dao': { 
        id: 'nhi_giai_dao_ma_cot_huyet_le_dao', name: 'Ma Cốt Huyết Lệ Đao', 
        description: 'Một thanh ma đao có khả năng hấp thụ máu của kẻ địch để tự cường hóa. Tuy nhiên, nếu lạm dụng sẽ ảnh hưởng đến tâm trí chủ nhân.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 680, daoTam: -5 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_dao_pha_nham_khai_son_dao': { 
        id: 'nhi_giai_dao_pha_nham_khai_son_dao', name: 'Phá Nham Khai Sơn Đao', 
        description: 'Đao pháp chú trọng sự mạnh mẽ, uy lực, chuyên dùng để phá hủy địa hình, mở đường núi, phá tan các trận pháp phòng ngự hệ thổ.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 730 }, 
        elements: [Element.EARTH], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_dao_khuong_hoang_bat_dong_dao': { 
        id: 'nhi_giai_dao_khuong_hoang_bat_dong_dao', name: 'Khương Hoàng Bất Động Đao', 
        description: 'Một thanh trọng đao cực nặng. Một khi đã vung lên, đà của nó gần như không thể bị ngăn cản, buộc đối thủ phải né tránh chứ không thể đỡ.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 820, speed: -10 }, 
        elements: [Element.EARTH], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_dao_loi_van_cuu_hoan_dao': { 
        id: 'nhi_giai_dao_loi_van_cuu_hoan_dao', name: 'Lôi Vân Cửu Hoàn Đao', 
        description: 'Đao có chín chiếc vòng bằng Lôi Vân Tinh Thiết. Khi vung đao, chín chiếc vòng va vào nhau tạo ra tiếng sấm đinh tai và phóng ra những vòng hồ quang điện.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 500, magicalAttack: 320 }, 
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
};
