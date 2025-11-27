import { ItemQuality, EquipmentQuality, ItemType, Element, CultivationStage, WeaponType } from '../../../types/index.ts';
import type { EquippableItem } from '../../../types/index.ts';

export const NHI_GIAI_THUONG: { [key: string]: EquippableItem } = {
    'nhi_giai_thuong_huyen_thiet_pha_quan_thuong': { 
        id: 'nhi_giai_thuong_huyen_thiet_pha_quan_thuong', name: 'Huyền Thiết Phá Quân Thương', 
        description: 'Thương dài và nặng, có sức xuyên phá khủng khiếp, một người một thương có thể chống lại thiên quân vạn mã.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 750, speed: -5 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_thuong_loi_van_pha_thien_thuong': { 
        id: 'nhi_giai_thuong_loi_van_pha_thien_thuong', name: 'Lôi Vân Phá Thiên Thương', 
        description: 'Có thể triệu hồi sức mạnh sấm sét, tạo ra một đòn tấn công hủy diệt từ trên trời.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 500, magicalAttack: 400, critChance: 0.08 }, 
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_thuong_huyet_nha_thuong': { 
        id: 'nhi_giai_thuong_huyet_nha_thuong', name: 'Huyết Nha Thương', 
        description: 'Mũi thương là nanh của ma thú, có rãnh dẫn máu, gây ra vết thương không thể lành và rút cạn máu của đối thủ.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 680 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_thuong_bang_tam_truy_hon_thuong': { 
        id: 'nhi_giai_thuong_bang_tam_truy_hon_thuong', name: 'Băng Tàm Truy Hồn Thương', 
        description: 'Mũi thương tỏa ra hàn khí cực độ, có thể đóng băng cả linh hồn, khiến đối thủ chết trong im lặng.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 500, magicalAttack: 350 }, 
        elements: [Element.ICE], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_thuong_phong_sat_doat_menh_thuong': { 
        id: 'nhi_giai_thuong_phong_sat_doat_menh_thuong', name: 'Phong Sát Đoạt Mệnh Thương', 
        description: 'Mỗi cú đâm ra đều tạo thành một mũi nhọn bằng gió xoáy, tấn công ở khoảng cách xa hơn thân thương.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 620, speed: 10 }, 
        elements: [Element.WIND], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_thuong_thanh_kim_quan_nhat_thuong': { 
        id: 'nhi_giai_thuong_thanh_kim_quan_nhat_thuong', name: 'Thanh Kim Quán Nhật Thương', 
        description: 'Mũi thương được luyện đến mức cực kỳ sắc bén, khi đâm ra tạo luồng sáng chói lòa như ánh mặt trời, có sức xuyên phá kinh người.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 720 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_thuong_tu_kim_giao_long_thuong': { 
        id: 'nhi_giai_thuong_tu_kim_giao_long_thuong', name: 'Tử Kim Giao Long Thương', 
        description: 'Thân thương như xương sống rồng, mũi thương như nanh rồng, mang theo long uy, áp chế các yêu thú cấp thấp.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 690 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_thuong_lam_quang_bang_ha_thuong': { 
        id: 'nhi_giai_thuong_lam_quang_bang_ha_thuong', name: 'Lam Quang Băng Hà Thương', 
        description: 'Thương khí mang theo hàn khí của sông băng, có thể đóng băng một vùng rộng lớn.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 400, magicalAttack: 300 }, 
        elements: [Element.ICE, Element.WATER], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_thuong_khuong_hoang_ban_thach_thuong': { 
        id: 'nhi_giai_thuong_khuong_hoang_ban_thach_thuong', name: 'Khương Hoàng Bàn Thạch Thương', 
        description: 'Cây thương nặng ngàn cân, không chú trọng sự sắc bén mà dùng sức mạnh thuần túy để đập nát đối thủ.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 800, speed: -8 }, 
        elements: [Element.EARTH], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_thuong_ma_lan_pha_giap_thuong': { 
        id: 'nhi_giai_thuong_ma_lan_pha_giap_thuong', name: 'Ma Lân Phá Giáp Thương', 
        description: 'Mũi thương được chế tác theo hình xoắn ốc từ vảy ma thú, có khả năng xuyên thủng các loại pháp bảo phòng ngự và giáp trụ.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 710 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_thuong_bang_tam_thien_tuc_thuong': { 
        id: 'nhi_giai_thuong_bang_tam_thien_tuc_thuong', name: 'Băng Tàm Thiên Túc Thương', 
        description: 'Khi đâm trúng mục tiêu, mũi thương có thể bung ra thành vô số mảnh băng nhỏ như chân rết, gây sát thương trên diện rộng từ bên trong.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 400, magicalAttack: 450 }, 
        elements: [Element.ICE], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_thuong_hoa_diem_luu_tinh_thuong': { 
        id: 'nhi_giai_thuong_hoa_diem_luu_tinh_thuong', name: 'Hỏa Diễm Lưu Tinh Thương', 
        description: 'Được thiết kế để ném đi. Khi rời tay, thương sẽ bốc cháy như một ngôi sao băng và phát nổ khi va chạm.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 200, magicalAttack: 500 }, 
        elements: [Element.FIRE], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_thuong_phong_sat_nhat_diem_thuong': { 
        id: 'nhi_giai_thuong_phong_sat_nhat_diem_thuong', name: 'Phong Sát Nhất Điểm Thương', 
        description: 'Toàn bộ sức mạnh được tập trung vào một điểm duy nhất ở mũi thương, tạo ra sức xuyên phá cực hạn, có thể xuyên qua nhiều lớp phòng ngự.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 780, speed: 5 }, 
        elements: [Element.WIND], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_thuong_huyen_thiet_tram_giang_thuong': { 
        id: 'nhi_giai_thuong_huyen_thiet_tram_giang_thuong', name: 'Huyền Thiết Trầm Giang Thương', 
        description: 'Nặng như thể có thể làm chìm cả dòng sông. Mỗi đòn đập, quét của thương đều tạo ra áp lực khủng khiếp, có thể đập nát xương cốt đối thủ dù không trúng trực diện.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 850, speed: -12 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_thuong_cung_ky_nha_thuong': { 
        id: 'nhi_giai_thuong_cung_ky_nha_thuong', name: 'Cùng Kỳ Nha Thương', 
        description: 'Chế tác từ nanh của hung thú Cùng Kỳ, mang theo tà khí và sự hung ác, có khả năng xé rách các loại pháp y, nhuyễn giáp.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 700, critChance: 0.05 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
};
