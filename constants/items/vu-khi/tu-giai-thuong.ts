import { ItemQuality, EquipmentQuality, ItemType, Element, CultivationStage, WeaponType } from '../../../types/index.ts';
import type { EquippableItem } from '../../../types/index.ts';

export const TU_GIAI_THUONG: { [key: string]: EquippableItem } = {
    'tu_giai_thuong_liet_van_thuong': { 
        id: 'tu_giai_thuong_liet_van_thuong', name: 'Liệt Vân Thương', 
        description: 'Tốc độ đâm thương có thể xé rách mây trời, tạo ra những luồng phong nhận sắc bén tấn công ở khoảng cách cực xa. Ẩn chứa "Tốc độ pháp tắc".', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 20000, speed: 60 }, 
        elements: [Element.WIND], requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_thuong_thanh_long_thuong': { 
        id: 'tu_giai_thuong_thanh_long_thuong', name: 'Thánh Long Thương', 
        description: 'Chế tác từ xương sống của một con rồng thánh, mang theo long uy áp đảo. Thương khí hóa thành hình rồng, có thể tự do công kích, phòng thủ.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 25000, physicalDefense: 5000 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_thuong_tran_nhac_thuong': { 
        id: 'tu_giai_thuong_tran_nhac_thuong', name: 'Trấn Nhạc Thương', 
        description: 'Cây thương nặng tựa một ngọn núi thần. Khi đập xuống đất có thể gây ra động đất trong phạm vi mười dặm, khi đâm ra mang theo sức nặng của cả đại địa.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 33000, speed: -20 }, 
        elements: [Element.EARTH], requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_thuong_than_loi_thuong': { 
        id: 'tu_giai_thuong_than_loi_thuong', name: 'Thần Lôi Thương', 
        description: 'Có khả năng điều khiển lôi điện của trời đất. Mũi thương có thể phóng ra "Thần Lôi" tinh khiết, là sức mạnh phán xét, hủy diệt.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 30000, critChance: 0.15 }, 
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_thuong_thai_nhat_thuong': { 
        id: 'tu_giai_thuong_thai_nhat_thuong', name: 'Thái Nhất Thương', 
        description: 'Thân thương ẩn chứa đạo lý "quy về một". Mọi đòn tấn công đều được ngưng tụ sức mạnh vào một điểm duy nhất, có sức xuyên phá vô tận, không gì cản nổi.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 35000, magicalDefense: -5000 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_thuong_vo_cuc_thuong': { 
        id: 'tu_giai_thuong_vo_cuc_thuong', name: 'Vô Cực Thương', 
        description: 'Ẩn chứa "Không gian pháp tắc" sơ khai. Thân thương có thể vươn dài ra gần như vô hạn, tấn công kẻ địch từ khoảng cách không thể ngờ tới.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 28000, speed: 20 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_thuong_chan_khong_thuong': { 
        id: 'tu_giai_thuong_chan_khong_thuong', name: 'Chân Không Thương', 
        description: 'Mũi thương được thiết kế để tạo ra một vùng chân không nhỏ khi đâm tới. Khiến đối thủ bị ngạt thở và hộ thể chân khí bị hút vào, dễ dàng bị phá vỡ.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 22000, magicalDefense: -3000 }, 
        elements: [Element.WIND, Element.ICE], requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_thuong_thien_khien_thuong': { 
        id: 'tu_giai_thuong_thien_khien_thuong', name: 'Thiên Khiển Thương', 
        description: 'Có khả năng đánh một "thiên lôi ấn ký" lên người đối thủ. Sau một khoảng thời gian, một tia sét trừng phạt từ trên trời sẽ tự động đánh xuống người mang ấn ký.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 29000 }, 
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_thuong_thon_phap_thuong': { 
        id: 'tu_giai_thuong_thon_phap_thuong', name: 'Thôn Pháp Thương', 
        description: 'Có khả năng "thôn phệ" một loại pháp tắc đơn giản trong một phạm vi nhỏ. Ví dụ: "thôn phệ" pháp tắc ma sát, khiến mặt đất trơn như băng.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 26000 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_thuong_ap_hai_thuong': { 
        id: 'tu_giai_thuong_ap_hai_thuong', name: 'Áp Hải Thương', 
        description: 'Có khả năng điều khiển áp suất nước. Ở nơi có nước, nó có thể tạo ra những luồng nước áp suất cao sắc như dao, hoặc tạo ra một vùng áp suất cực lớn đè nát đối thủ.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 18000, magicalAttack: 18000 }, 
        elements: [Element.WATER], requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
};