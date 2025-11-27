import { ItemQuality, EquipmentQuality, ItemType, Element, CultivationStage } from '../../../types/index.ts';
import type { EquippableItem } from '../../../types/index.ts';

export const TU_GIAI_GIAP: { [key: string]: EquippableItem } = {
    'tu_giai_giap_huyen_vu_giap': { 
        id: 'tu_giai_giap_huyen_vu_giap', name: 'Huyền Vũ Giáp', 
        description: 'Phòng ngự vật lý tuyệt đối. Có thể triệu hồi hư ảnh Huyền Vũ để tạo ra một kết giới phòng ngự, chống đỡ mọi đòn tấn công dưới cùng cấp.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { physicalDefense: 30000, magicalDefense: 10000 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_giap_hau_tho_giap': { 
        id: 'tu_giai_giap_hau_tho_giap', name: 'Hậu Thổ Giáp', 
        description: 'Kết nối người mặc với mặt đất, cho phép hấp thụ địa khí để hồi phục linh lực và chữa thương không ngừng. Chỉ cần chân còn chạm đất thì gần như bất bại.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { physicalDefense: 25000, healthModifier: 1.1, manaRecoveryRate: 1.2 }, 
        elements: [Element.EARTH], requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_giap_bat_hoai_giap': { 
        id: 'tu_giai_giap_bat_hoai_giap', name: 'Bất Hoại Giáp', 
        description: 'Ẩn chứa "Bất hoại pháp tắc", áo giáp có khả năng tự tái tạo và phục hồi gần như ngay lập tức sau khi bị phá hủy, trừ khi bị phá hủy từ cấp độ bản nguyên.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { physicalDefense: 20000, magicalDefense: 15000 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_giap_linh_quang_giap': { 
        id: 'tu_giai_giap_linh_quang_giap', name: 'Linh Quang Giáp', 
        description: 'Một bộ pháp y nhẹ nhàng, có khả năng tự động hóa giải phần lớn các đòn tấn công bằng nguyên tố và làm chệch hướng các đòn tấn công vật lý.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { physicalDefense: 15000, magicalDefense: 20000, speed: 15 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_giap_tu_kim_giap': { 
        id: 'tu_giai_giap_tu_kim_giap', name: 'Tử Kim Giáp', 
        description: 'Bộ giáp của bậc đế vương, không chỉ phòng ngự mạnh mà còn tỏa ra uy áp khiến đối thủ có tu vi thấp hơn không thể nảy sinh ý định tấn công.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { physicalDefense: 18000, magicalDefense: 18000, charisma: 20 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_giap_dieu_quang_giap': { 
        id: 'tu_giai_giap_dieu_quang_giap', name: 'Diệu Quang Giáp', 
        description: 'Khi bị tấn công, áo giáp có thể bùng phát ra ánh sáng cực mạnh, làm lóa mắt và tạm thời vô hiệu hóa thần thức của đối thủ ở cự ly gần.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { physicalDefense: 16000, magicalDefense: 16000 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_giap_cong_sinh_giap': { 
        id: 'tu_giai_giap_cong_sinh_giap', name: 'Cộng Sinh Giáp', 
        description: 'Một bộ giáp sống có ý thức riêng. Nó có thể tự động hành động để đỡ những đòn tấn công mà chủ nhân không nhận ra, đổi lại nó tiêu hao một phần linh lực của chủ nhân để tồn tại.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { physicalDefense: 22000, magicalDefense: 12000, manaRecoveryRate: 0.9 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_giap_thien_bien_giap': { 
        id: 'tu_giai_giap_thien_bien_giap', name: 'Thiên Biến Giáp', 
        description: 'Bộ giáp được tạo thành từ hàng vạn con côn trùng kim loại nhỏ. Chúng có thể thay đổi hình dạng theo ý muốn của chủ nhân, biến thành khiên, gai nhọn, hoặc thậm chí là một thanh kiếm tạm thời.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { physicalDefense: 18000, magicalDefense: 18000, physicalAttack: 5000 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_giap_tich_nhiet_giap': { 
        id: 'tu_giai_giap_tich_nhiet_giap', name: 'Tịch Nhiệt Giáp', 
        description: 'Hấp thụ nhiệt năng. Mọi đòn tấn công hệ hỏa hoặc các đòn tấn công mang theo nhiệt độ cao khi chạm vào áo giáp đều sẽ bị hấp thụ và làm suy yếu đi rất nhiều.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { physicalDefense: 15000, magicalDefense: 22000 }, 
        elements: [Element.FIRE], requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_giap_thai_an_giap': { 
        id: 'tu_giai_giap_thai_an_giap', name: 'Thái An Giáp', 
        description: 'Tỏa ra một lĩnh vực "hòa bình", làm suy yếu sát ý và lòng thù địch của những kẻ bước vào. Có khả năng trấn an các loại yêu thú đang cuồng bạo.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.HA_PHAM, 
        effects: { physicalDefense: 10000, magicalDefense: 10000, daoTam: 20 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
};