import { ItemQuality, EquipmentQuality, ItemType, Element, CultivationStage, WeaponType } from '../../../types/index.ts';
import type { EquippableItem } from '../../../types/index.ts';

export const TU_GIAI_DAO: { [key: string]: EquippableItem } = {
    'tu_giai_dao_pha_quan_dao': { 
        id: 'tu_giai_dao_pha_quan_dao', name: 'Phá Quân Đao', 
        description: 'Đao nặng và cực kỳ sắc bén, ẩn chứa "Phá diệt pháp tắc" sơ khai. Đao thế không thể ngăn cản, chuyên dùng để phá vỡ các loại quân trận và các pháp bảo phòng ngự dạng mai rùa.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 30000, physicalDefense: -2000 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_dao_ho_hon_dao': { 
        id: 'tu_giai_dao_ho_hon_dao', name: 'Hổ Hồn Đao', 
        description: 'Phong ấn linh hồn của một con Hổ Yêu Thánh, khi chiến đấu có thể triệu hồi hổ hồn để áp chế đối thủ, tiếng gầm của nó làm chấn động nguyên thần.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 25000, magicalAttack: 10000 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_dao_tram_kinh_dao': { 
        id: 'tu_giai_dao_tram_kinh_dao', name: 'Trảm Kình Đao', 
        description: 'Đao nặng như núi, khi vung lên tạo ra áp lực như biển sâu vạn mét. Uy lực của nó đủ sức chém nát những con yêu thú khổng lồ như cá kình.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 32000, speed: -20 }, 
        elements: [Element.WATER], requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_dao_hac_dieu_dao': { 
        id: 'tu_giai_dao_hac_dieu_dao', name: 'Hắc Diệu Đao', 
        description: 'Lưỡi đao có khả năng hấp thụ ánh sáng và linh khí. Tạo ra một vùng bóng tối xung quanh, làm suy yếu ngũ giác và thần thức của đối thủ.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 20000, magicalDefense: 5000 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_dao_cuong_loi_dao': { 
        id: 'tu_giai_dao_cuong_loi_dao', name: 'Cuồng Lôi Đao', 
        description: 'Một thanh ma đao hệ lôi. Càng chém, lôi điện càng trở nên cuồng bạo và khó kiểm soát, uy lực tăng lên nhưng cũng có thể làm chính người dùng bị thương.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 28000, magicalAttack: 12000, daoTam: -20 }, 
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_dao_minh_nguc_dao': { 
        id: 'tu_giai_dao_minh_nguc_dao', name: 'Minh Ngục Đao', 
        description: 'Có khả năng tạo ra một lĩnh vực nhỏ bao trùm đối thủ, mô phỏng lại cảnh tượng của "Minh Uyên Địa Ngục". Trong lĩnh vực này, đối thủ sẽ bị hàn khí và oán hồn tấn công không ngừng.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 25000 }, 
        elements: [Element.ICE], requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_dao_lac_nhat_dao': { 
        id: 'tu_giai_dao_lac_nhat_dao', name: 'Lạc Nhật Đao', 
        description: 'Có thể tích tụ năng lượng để tung ra một chiêu duy nhất - "Lạc Nhật". Chiêu này tạo ra một vầng mặt trời lặn bằng máu và lửa, có sức công phá hủy diệt nhưng sau đó đao sẽ tạm thời mất đi ánh sáng.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 35000 }, 
        elements: [Element.FIRE], requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_dao_chien_hon_dao': { 
        id: 'tu_giai_dao_chien_hon_dao', name: 'Chiến Hồn Đao', 
        description: 'Một thanh hung đao, có khả năng hấp thụ "chiến ý" và "sát khí" trên chiến trường. Càng có nhiều người chết xung quanh (bất kể phe nào), đao càng trở nên sắc bén và cuồng bạo.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 26000, daoTam: -15 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_dao_ba_nhac_dao': { 
        id: 'tu_giai_dao_ba_nhac_dao', name: 'Bá Nhạc Đao', 
        description: 'Một thanh trọng đao với sức nặng không thể tưởng tượng. Nó không cần sắc bén, chỉ cần dùng sức nặng thuần túy để đè bẹp và nghiền nát đối thủ cùng pháp bảo của họ.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 35000, speed: -25 }, 
        elements: [Element.EARTH], requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_dao_dieu_tinh_dao': { 
        id: 'tu_giai_dao_dieu_tinh_dao', name: 'Diệu Tinh Đao', 
        description: 'Lưỡi đao liên tục bong ra những mảnh vảy bằng hắc diệu thạch cực mỏng và sắc, tạo thành một cơn bão mảnh vỡ tấn công đối thủ sau mỗi cú vung đao.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 28000, speed: 10 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
};