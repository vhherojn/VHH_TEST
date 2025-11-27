import { ItemQuality, EquipmentQuality, ItemType, Element, CultivationStage, WeaponType } from '../../../types/index.ts';
import type { EquippableItem } from '../../../types/index.ts';

export const TU_GIAI_KIEM: { [key: string]: EquippableItem } = {
    'tu_giai_kiem_thai_at_kiem': { 
        id: 'tu_giai_kiem_thai_at_kiem', name: 'Thái Ất Kiếm', 
        description: 'Ẩn chứa một tia "Thái Ất tiên khí", kiếm quang thuần khiết, có khả năng phá vỡ mọi loại ma khí, tà khí. Tự thân nó là một pháp bảo chính đạo đỉnh cao.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 15000, magicalAttack: 25000, daoTam: 20 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL
    },
    'tu_giai_kiem_tu_tieu_kiem': { 
        id: 'tu_giai_kiem_tu_tieu_kiem', name: 'Tử Tiêu Kiếm', 
        description: 'Có khả năng dẫn động "Tử Tiêu Thần Lôi", một loại sấm sét của thiên kiếp. Kiếm khí mang theo uy áp của trời cao, đặc biệt khắc chế các tu sĩ có tâm ma.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 18000, magicalAttack: 22000, critChance: 0.1 }, 
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.NASCENT_SOUL
    },
    'tu_giai_kiem_minh_uyen_kiem': { 
        id: 'tu_giai_kiem_minh_uyen_kiem', name: 'Minh Uyên Kiếm', 
        description: 'Kiếm tạo ra một "hàn vực" nhỏ xung quanh người dùng, làm không gian trở nên đặc sệt. Hàn khí có thể đóng băng và làm mục ruỗng cả Nguyên Anh của đối thủ.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 16000, magicalAttack: 20000, speed: -10 }, 
        elements: [Element.ICE], requiredCultivation: CultivationStage.NASCENT_SOUL
    },
    'tu_giai_kiem_huyet_duong_kiem': { 
        id: 'tu_giai_kiem_huyet_duong_kiem', name: 'Huyết Dương Kiếm', 
        description: 'Lấy máu để nuôi kiếm, có thể hấp thụ tinh huyết của kẻ địch để cường hóa. Khi thi triển đến cực hạn, có thể tạo ra ảo ảnh "mặt trời máu" thiêu đốt thần hồn.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 22000, magicalAttack: 15000, daoTam: -25 }, 
        elements: [Element.FIRE], requiredCultivation: CultivationStage.NASCENT_SOUL
    },
    'tu_giai_kiem_luu_quang_kiem': { 
        id: 'tu_giai_kiem_luu_quang_kiem', name: 'Lưu Quang Kiếm', 
        description: 'Tốc độ xuất kiếm nhanh như ánh sáng, kiếm chiêu như những dòng quang lưu chảy trong không gian, mắt thường và thần thức khó có thể nắm bắt.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 18000, speed: 50 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL
    },
    'tu_giai_kiem_nhan_qua_kiem': { 
        id: 'tu_giai_kiem_nhan_qua_kiem', name: 'Nhân Quả Kiếm', 
        description: 'Một thanh kiếm ẩn chứa "Nhân Quả pháp tắc". Khi chém trúng đối thủ, nó sẽ không gây sát thương ngay mà gieo một "nhân", sau đó một thời gian sẽ trổ "quả", tạo ra một vết thương từ bên trong không thể phòng bị.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 30000 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL
    },
    'tu_giai_kiem_vo_hinh_kiem': { 
        id: 'tu_giai_kiem_vo_hinh_kiem', name: 'Vô Hình Kiếm', 
        description: 'Thân kiếm là một luồng gió được nén lại, gần như vô hình và không có thực thể. Nó không cắt bằng lưỡi kiếm mà bằng áp suất gió cực lớn, có thể xuyên qua giáp trụ.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 25000, magicalDefense: -1000 }, 
        elements: [Element.WIND], requiredCultivation: CultivationStage.NASCENT_SOUL
    },
    'tu_giai_kiem_thach_hoa_kiem': { 
        id: 'tu_giai_kiem_thach_hoa_kiem', name: 'Thạch Hóa Kiếm', 
        description: 'Kiếm khí mang theo sức mạnh của "Thạch hóa pháp tắc". Kẻ địch bị kiếm khí chạm vào sẽ dần dần bị hóa đá, bắt đầu từ tứ chi.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 20000, magicalAttack: 10000 }, 
        elements: [Element.EARTH], requiredCultivation: CultivationStage.NASCENT_SOUL
    },
    'tu_giai_kiem_tich_diet_kiem': { 
        id: 'tu_giai_kiem_tich_diet_kiem', name: 'Tịch Diệt Kiếm', 
        description: 'Thanh kiếm của sự tĩnh lặng và hủy diệt. Nó không chỉ tỏa ra hàn khí mà còn hút cạn linh khí trong một khu vực, tạo ra một "tử địa" nơi mọi pháp thuật đều bị suy yếu.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 28000 }, 
        elements: [Element.ICE], requiredCultivation: CultivationStage.NASCENT_SOUL
    },
    'tu_giai_kiem_long_cot_kiem': { 
        id: 'tu_giai_kiem_long_cot_kiem', name: 'Long Cốt Kiếm', 
        description: 'Được rèn từ toàn bộ xương sống của một con rồng thánh. Thân kiếm cực kỳ dẻo dai, có thể sử dụng như một thanh nhuyễn kiếm hoặc trường tiên, biến ảo khôn lường.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 24000, speed: 20 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL
    },
};