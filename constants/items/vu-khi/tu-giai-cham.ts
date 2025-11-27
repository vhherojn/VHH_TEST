import { ItemQuality, EquipmentQuality, ItemType, Element, CultivationStage, WeaponType } from '../../../types/index.ts';
import type { EquippableItem } from '../../../types/index.ts';

export const TU_GIAI_CHAM: { [key: string]: EquippableItem } = {
    'tu_giai_cham_tang_hon_cham': { 
        id: 'tu_giai_cham_tang_hon_cham', name: 'Táng Hồn Châm', 
        description: 'Cây châm có khả năng đóng băng và chôn vùi Nguyên Anh của đối thủ vào trong vực sâu tuyệt vọng, khiến họ chết dần chết mòn.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 30000 }, 
        elements: [Element.ICE], requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_cham_huyet_sat_cham': { 
        id: 'tu_giai_cham_huyet_sat_cham', name: 'Huyết Sát Châm', 
        description: 'Biến máu trong cơ thể nạn nhân thành một loại độc tố cực mạnh, tự hủy hoại cơ thể từ bên trong.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 28000, daoTam: -30 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_cham_phe_hon_cham': { 
        id: 'tu_giai_cham_phe_hon_cham', name: 'Phệ Hồn Châm', 
        description: 'Không gây sát thương vật lý, mà trực tiếp tấn công và gặm nhấm Nguyên Anh của đối thủ, là ám khí đáng sợ nhất đối với tu sĩ.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 35000 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_cham_kiep_loi_cham': { 
        id: 'tu_giai_cham_kiep_loi_cham', name: 'Kiếp Lôi Châm', 
        description: 'Ngưng tụ một tia thiên lôi của độ kiếp vào đầu mũi châm. Khi bắn ra, nó sẽ đánh lừa thiên đạo, khiến nạn nhân có cảm giác như đang đối mặt với thiên kiếp của chính mình.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 32000, critChance: 0.2 }, 
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_cham_do_kiep_cham': { 
        id: 'tu_giai_cham_do_kiep_cham', name: 'Độ Kiếp Châm', 
        description: 'Một bộ y châm, dùng tiên khí để ổn định Nguyên Anh, giúp các tu sĩ khác chống lại tâm ma khi độ kiếp hoặc khi bị trọng thương.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.HA_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalDefense: 10000, daoTam: 25 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_cham_bang_co_cham': { 
        id: 'tu_giai_cham_bang_co_cham', name: 'Băng Cổ Châm', 
        description: 'Tiêm vào cơ thể đối thủ một loại "băng cổ trùng" (ký sinh trùng băng) hư ảo. Nó sẽ từ từ gặm nhấm linh lực và phát triển, làm nạn nhân bị đóng băng từ bên trong.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 29000 }, 
        elements: [Element.ICE], requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_cham_huyet_lien_cham': { 
        id: 'tu_giai_cham_huyet_lien_cham', name: 'Huyết Liên Châm', 
        description: 'Khi găm vào người, nó sẽ hút máu của nạn nhân để nuôi dưỡng một "huyết liên" (sen máu) trong cơ thể họ. Hoa sen càng nở rộ, nạn nhân càng suy yếu.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 27000, physicalAttack: 5000 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_cham_phong_linh_cham': { 
        id: 'tu_giai_cham_phong_linh_cham', name: 'Phong Linh Châm', 
        description: 'Một bộ gồm 36 cây châm, khi cắm vào các đại huyệt trên cơ thể sẽ tạm thời phong bế hoàn toàn kinh mạch và linh lực, biến một tu sĩ thành người thường.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.HA_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 10000 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_cham_pha_tran_cham': { 
        id: 'tu_giai_cham_pha_tran_cham', name: 'Phá Trận Châm', 
        description: 'Có khả năng gây nhiễu loạn và "đoản mạch" các đường vân linh lực. Có thể dùng để phá hoại các trận pháp từ bên trong một cách lặng lẽ.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 15000 }, 
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_cham_thien_co_cham': { 
        id: 'tu_giai_cham_thien_co_cham', name: 'Thiên Cơ Châm', 
        description: 'Ám khí của số mệnh. Nó không gây vết thương, nhưng sẽ can nhiễu vào "thiên cơ" của nạn nhân, khiến họ chắc chắn sẽ gặp một tai kiếp bất ngờ trong tương lai gần.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 5000, critChance: 0.5 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
};