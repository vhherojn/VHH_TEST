import { ItemQuality, EquipmentQuality, ItemType, Element, CultivationStage, WeaponType } from '../../../types/index.ts';
import type { EquippableItem } from '../../../types/index.ts';

export const NHI_GIAI_KIEM: { [key: string]: EquippableItem } = {
    'nhi_giai_kiem_tu_kim_linh_kiem': { 
        id: 'nhi_giai_kiem_tu_kim_linh_kiem', name: 'Tử Kim Linh Kiếm', 
        description: 'Thân kiếm màu vàng tía cao quý, có khả năng dẫn linh lực cực tốt, tăng uy lực cho kiếm chiêu.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 500, physicalAttack: 200 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_kiem_huyen_thiet_tram_ma_kiem': { 
        id: 'nhi_giai_kiem_huyen_thiet_tram_ma_kiem', name: 'Huyền Thiết Trảm Ma Kiếm', 
        description: 'Kiếm nặng và đen thẫm, hấp thụ ánh sáng, mang sát khí mạnh mẽ, đặc biệt khắc chế yêu ma.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 650, speed: -5 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_kiem_bach_dien_quan_tu_kiem': { 
        id: 'nhi_giai_kiem_bach_dien_quan_tu_kiem', name: 'Bạch Điền Quân Tử Kiếm', 
        description: 'Kiếm làm từ ngọc quý, trắng muốt không tì vết, chính trực và thanh thoát, kiếm khí sắc bén như gió.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 500, speed: 10, daoTam: 5 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_kiem_hoa_diem_kiem': { 
        id: 'nhi_giai_kiem_hoa_diem_kiem', name: 'Hỏa Diễm Kiếm', 
        description: 'Lưỡi kiếm luôn rực lửa cháy, khi chém tạo ra sóng nhiệt, có khả năng thiêu đốt hộ thể chân khí.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 400, magicalAttack: 300 }, 
        elements: [Element.FIRE], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_kiem_loi_van_kiem': { 
        id: 'nhi_giai_kiem_loi_van_kiem', name: 'Lôi Vân Kiếm', 
        description: 'Thân kiếm có hoa văn mây sấm, có thể dẫn sét từ trời hoặc phóng ra lôi điện mạnh mẽ.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 450, magicalAttack: 450, critChance: 0.05 }, 
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_kiem_bang_tam_ti_kiem': { 
        id: 'nhi_giai_kiem_bang_tam_ti_kiem', name: 'Băng Tàm Ti Kiếm', 
        description: 'Thân kiếm có thể phân rã thành vô số sợi tơ băng sắc bén, dùng để trói buộc hoặc tấn công bất ngờ.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 600, speed: 5 }, 
        elements: [Element.ICE], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_kiem_phong_sat_kiem': { 
        id: 'nhi_giai_kiem_phong_sat_kiem', name: 'Phong Sát Kiếm', 
        description: 'Kiếm nhẹ vô cùng, khi vung lên tạo ra những luồng phong nhận (lưỡi đao gió) có sức cắt đáng sợ.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 480, speed: 15 }, 
        elements: [Element.WIND], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_kiem_thanh_kim_pha_giap_kiem': { 
        id: 'nhi_giai_kiem_thanh_kim_pha_giap_kiem', name: 'Thanh Kim Phá Giáp Kiếm', 
        description: 'Mũi kiếm và lưỡi kiếm cực kỳ cứng rắn, chuyên dùng để xuyên phá các loại giáp trụ và pháp bảo phòng ngự.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 700, magicalDefense: -100 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_kiem_huyen_thiet_phe_hon_kiem': { 
        id: 'nhi_giai_kiem_huyen_thiet_phe_hon_kiem', name: 'Huyền Thiết Phệ Hồn Kiếm', 
        description: 'Kiếm khí có khả năng hấp thụ và làm tổn thương linh hồn của đối thủ, cực kỳ âm độc.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 500, magicalAttack: 200 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_kiem_lam_quang_kiem': { 
        id: 'nhi_giai_kiem_lam_quang_kiem', name: 'Lam Quang Kiếm', 
        description: 'Thân kiếm phát ra ánh sáng xanh dịu, kiếm khí như nước, có thể tạo ra các đòn tấn công hệ thủy.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 300, magicalAttack: 400 }, 
        elements: [Element.WATER], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_kiem_tu_kim_tuong_van_kiem': { 
        id: 'nhi_giai_kiem_tu_kim_tuong_van_kiem', name: 'Tử Kim Tường Vân Kiếm', 
        description: 'Thân kiếm có hoa văn hình mây lành (tường vân), là một thanh kiếm cao quý, có khả năng hộ chủ.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 450, physicalDefense: 100, magicalDefense: 100 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_kiem_khuong_hoang_tran_son_kiem': { 
        id: 'nhi_giai_kiem_khuong_hoang_tran_son_kiem', name: 'Khương Hoàng Trấn Sơn Kiếm', 
        description: 'Kiếm cực nặng, mỗi nhát chém mang theo sức mạnh của núi non, có khả năng trấn áp mạnh mẽ.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 750, speed: -8 }, 
        elements: [Element.EARTH], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_kiem_bach_dien_van_tam_kiem': { 
        id: 'nhi_giai_kiem_bach_dien_van_tam_kiem', name: 'Bạch Điền Vấn Tâm Kiếm', 
        description: 'Kiếm có linh tính, có thể phản ánh tâm cảnh của chủ nhân. Khi đối đầu với kẻ tâm thuật bất chính, uy lực sẽ tăng mạnh.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 400, magicalAttack: 400, daoTam: 10 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_kiem_loi_van_kinh_hong_kiem': { 
        id: 'nhi_giai_kiem_loi_van_kinh_hong_kiem', name: 'Lôi Vân Kinh Hồng Kiếm', 
        description: 'Kiếm pháp nhanh và hoa lệ như bóng chim hồng kinh động bay đi. Mỗi đường kiếm đều kéo theo những tia lôi điện mảnh, vừa đẹp mắt vừa chết người.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 400, magicalAttack: 300, speed: 12 }, 
        elements: [Element.LIGHTNING, Element.WIND], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_kiem_hoa_diem_tinh_phach_kiem': { 
        id: 'nhi_giai_kiem_hoa_diem_tinh_phach_kiem', name: 'Hỏa Diễm Tinh Phách Kiếm', 
        description: 'Luyện từ tinh phách của Hỏa Diễm Thạch, thân kiếm là một khối lửa ngưng tụ. Có khả năng hấp thụ hỏa linh khí trong môi trường để tăng cường uy lực.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 700 }, 
        elements: [Element.FIRE], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_kiem_bang_tam_vo_ngan_kiem': { 
        id: 'nhi_giai_kiem_bang_tam_vo_ngan_kiem', name: 'Băng Tàm Vô Ngân Kiếm', 
        description: 'Kiếm khí không để lại dấu vết, khi chém vào không khí không tạo ra âm thanh. Vết thương do nó gây ra sẽ bị hàn khí ăn mòn một cách âm thầm.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 520, magicalAttack: 100 }, 
        elements: [Element.ICE], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_kiem_thanh_kim_song_tuyet_kiem': { 
        id: 'nhi_giai_kiem_thanh_kim_song_tuyet_kiem', name: 'Thanh Kim Song Tuyệt Kiếm', 
        description: 'Một cặp đoản kiếm, một thanh chuyên phá khí, một thanh chuyên cắt thịt, phối hợp với nhau tạo ra sát thương tuyệt đối.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 600, magicalDefense: -150 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_kiem_tu_kim_quy_nguyen_kiem': { 
        id: 'nhi_giai_kiem_tu_kim_quy_nguyen_kiem', name: 'Tử Kim Quy Nguyên Kiếm', 
        description: 'Có khả năng hấp thụ một phần linh lực từ đòn tấn công của đối thủ, sau đó chuyển hóa thành linh khí thuần túy trả lại cho chủ nhân.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalDefense: 300, manaRecoveryRate: 1.1 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
};
