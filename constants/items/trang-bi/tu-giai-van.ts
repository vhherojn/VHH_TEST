import { ItemQuality, EquipmentQuality, ItemType, Element, CultivationStage } from '../../../types/index.ts';
import type { EquippableItem } from '../../../types/index.ts';

export const TU_GIAI_VAN: { [key: string]: EquippableItem } = {
    'tu_giai_van_lang_tieu_van': { 
        id: 'tu_giai_van_lang_tieu_van', name: 'Lăng Tiêu Vân', 
        description: 'Cho phép người mang bay lượn trên chín tầng trời (cửu thiên), tốc độ như sấm sét, có thể đạp lên mây sấm để di chuyển.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { speed: 200 }, 
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_van_truy_nguyet_van': { 
        id: 'tu_giai_van_truy_nguyet_van', name: 'Truy Nguyệt Vân', 
        description: 'Hấp thụ nguyệt quang để gia tăng tốc độ, đặc biệt nhanh vào ban đêm. Có thể tạo ra các ảo ảnh dưới ánh trăng để gây nhiễu loạn.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { speed: 180 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_van_dap_hai_van': { 
        id: 'tu_giai_van_dap_hai_van', name: 'Đạp Hải Vân', 
        description: 'Cho phép người mang đi lại dưới biển sâu như trên đất liền, có thể chịu được áp lực nước cực lớn và điều khiển các dòng chảy nhỏ.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { speed: 150 }, 
        elements: [Element.WATER], requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_van_vo_anh_van': { 
        id: 'tu_giai_van_vo_anh_van', name: 'Vô Ảnh Vân', 
        description: 'Hòa vào bóng tối, giúp người mang tàng hình hoàn toàn trong bóng râm hoặc ban đêm, ngay cả thần thức cũng khó phát hiện.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { speed: 160 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_van_tat_phong_van': { 
        id: 'tu_giai_van_tat_phong_van', name: 'Tật Phong Vân', 
        description: 'Đôi giày của tốc độ thuần túy, có thể hóa thành một cơn lốc, di chuyển nhanh đến mức không khí xung quanh bị xé rách.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { speed: 250 }, 
        elements: [Element.WIND], requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_van_ly_phong_van': { 
        id: 'tu_giai_van_ly_phong_van', name: 'Lý Phong Vân', 
        description: 'Cho phép người mang dẫm lên không khí như đi trên đất bằng cách tạo ra những bệ đỡ bằng gió nén dưới chân.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.HA_PHAM, 
        effects: { speed: 170 }, 
        elements: [Element.WIND], requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_van_don_tho_van': { 
        id: 'tu_giai_van_don_tho_van', name: 'Độn Thổ Vân', 
        description: 'Ban cho người mang khả năng độn thổ, di chuyển xuyên qua đất đá như bơi trong nước (không thể đi xuyên qua các kim loại quý hiếm).', 
        quality: ItemQuality.TU_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { speed: 140 }, 
        elements: [Element.EARTH], requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_van_bao_loi_van': { 
        id: 'tu_giai_van_bao_loi_van', name: 'Bạo Lôi Vân', 
        description: 'Sử dụng lôi điện để tạo ra những vụ nổ dưới chân, đẩy người dùng đi với tốc độ của một viên đạn đại bác, chuyên dùng để đột phá hoặc lao tới.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { speed: 220 }, 
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_van_huyen_quang_van': { 
        id: 'tu_giai_van_huyen_quang_van', name: 'Huyễn Quang Vân', 
        description: 'Khi di chuyển nhanh sẽ để lại các tàn ảnh bằng ánh sáng. Người dùng có thể kích hoạt để các tàn ảnh này phát nổ, tạo ra một luồng sáng chói mắt.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { speed: 190 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_van_dinh_hai_van': { 
        id: 'tu_giai_van_dinh_hai_van', name: 'Định Hải Vân', 
        description: 'Đôi giày nặng không tưởng. Khi đứng yên, người mang sẽ không bị ảnh hưởng bởi bất kỳ lực bên ngoài nào (gió bão, sóng thần, lực đẩy), vững như một cây cột chống trời.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.HA_PHAM, 
        effects: { speed: -50, physicalDefense: 8000 }, 
        elements: [Element.WATER, Element.EARTH], requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
};