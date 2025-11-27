import { ItemQuality, EquipmentQuality, ItemType, Element, CultivationStage } from '../../../types/index.ts';
import type { EquippableItem } from '../../../types/index.ts';

export const NHI_GIAI_NON: { [key: string]: EquippableItem } = {
    'nhi_giai_non_huyen_thiet_vong_hon_dien': { 
        id: 'nhi_giai_non_huyen_thiet_vong_hon_dien', name: 'Huyền Thiết Vong Hồn Diện', 
        description: 'Mặt nạ che kín khuôn mặt, có hình thù của vong hồn, có khả năng phòng ngự và gây ra ảo giác sợ hãi cho đối thủ.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { physicalDefense: 250, magicalDefense: 150 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_non_loi_van_chien_than_khoi': { 
        id: 'nhi_giai_non_loi_van_chien_than_khoi', name: 'Lôi Vân Chiến Thần Khôi', 
        description: 'Mũ trụ của chiến binh, có thể tích tụ lôi điện để tạo ra một lá chắn sét phòng thủ khi bị tấn công.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { physicalDefense: 300, magicalDefense: 200 }, 
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_non_bach_dien_lien_hoa_mien': { 
        id: 'nhi_giai_non_bach_dien_lien_hoa_mien', name: 'Bạch Điền Liên Hoa Miện', 
        description: 'Vương miện hình hoa sen, tỏa ra ánh sáng tinh khiết giúp chống lại tà khí xâm nhập và các loại độc chướng.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { magicalDefense: 350, daoTam: 5 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_non_thanh_kim_dinh_than_khoi': { 
        id: 'nhi_giai_non_thanh_kim_dinh_than_khoi', name: 'Thanh Kim Định Thần Khôi', 
        description: 'Giúp người đội giữ vững tâm thần, không bị ảnh hưởng bởi các kỹ năng mê hoặc hoặc gây hỗn loạn tâm trí.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { magicalDefense: 300 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_non_ma_lan_ac_quy_khoi': { 
        id: 'nhi_giai_non_ma_lan_ac_quy_khoi', name: 'Ma Lân Ác Quỷ Khôi', 
        description: 'Mũ trụ có hình dáng của một con ác quỷ, có 2 sừng nhọn bằng xương, vừa có thể phòng ngự vừa có thể dùng sừng để tấn công.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { physicalDefense: 320, physicalAttack: 50 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_non_huyen_thiet_tran_hon_khoi': { 
        id: 'nhi_giai_non_huyen_thiet_tran_hon_khoi', name: 'Huyền Thiết Trấn Hồn Khôi', 
        description: 'Bảo vệ thức hải (biển ý thức), chống lại các đòn tấn công tinh thần, ảo thuật và đoạt xá.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { magicalDefense: 400 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_non_bach_dien_thanh_tam_mao': { 
        id: 'nhi_giai_non_bach_dien_thanh_tam_mao', name: 'Bạch Điền Thanh Tâm Mão', 
        description: 'Giúp người đội luôn giữ được tâm trí sáng suốt, bình tĩnh, không bị ảnh hưởng bởi tâm ma và ngoại cảnh.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { magicalDefense: 200, daoTam: 8 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_non_tu_kim_long_lan_mien': { 
        id: 'nhi_giai_non_tu_kim_long_lan_mien', name: 'Tử Kim Long Lân Miện', 
        description: 'Vương miện vừa là pháp bảo phòng ngự đầu, vừa tăng uy áp tinh thần của người đội, mang khí thế của bậc đế vương.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { physicalDefense: 200, magicalDefense: 200 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_non_thao_thiet_dien': { 
        id: 'nhi_giai_non_thao_thiet_dien', name: 'Thao Thiết Diện', 
        description: 'Mặt nạ có hình hung thú Thao Thiết, có khả năng "thôn phệ" một lượng nhất định các đòn tấn công bằng linh hồn hoặc năng lượng thuần túy.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { magicalDefense: 380 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_non_khuong_hoang_minh_kinh_dai': { 
        id: 'nhi_giai_non_khuong_hoang_minh_kinh_dai', name: 'Khương Hoàng Minh Kính Đài', 
        description: 'Một chiếc mũ trụ có gắn một tấm gương ngọc trước trán, giúp giữ cho tâm trí người đội luôn sáng như gương, chống lại ảo ảnh và các thuật mê hoặc.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { magicalDefense: 320 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_non_lam_quang_hai_than_khoi': { 
        id: 'nhi_giai_non_lam_quang_hai_than_khoi', name: 'Lam Quang Hải Thần Khôi', 
        description: 'Mũ trụ giúp tăng cường uy lực của các pháp thuật hệ thủy, đồng thời cho phép người đội có thể thở và di chuyển dưới nước như trên cạn.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { magicalDefense: 280 }, 
        elements: [Element.WATER], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_non_tu_kim_thien_tu_mao': { 
        id: 'nhi_giai_non_tu_kim_thien_tu_mao', name: 'Tử Kim Thiên Tử Mão', 
        description: 'Một chiếc vương miện (mão) của bậc đế vương, tự động phát ra uy áp tinh thần, khiến những tu sĩ có ý chí yếu hơn phải cúi đầu, không dám nhìn thẳng.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { magicalDefense: 250, charisma: 10 }, 
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
    'nhi_giai_non_hong_lien_kinh': { 
        id: 'nhi_giai_non_hong_lien_kinh', name: 'Hồng Liên Kính', 
        description: 'Một tấm gương hộ tâm đeo trước ngực, có hình hoa sen đỏ. Có thể bắn ra một tia lửa hồng liên hoặc bung nở thành một đóa sen lửa phòng ngự.', 
        quality: ItemQuality.NHI_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { magicalDefense: 300, magicalAttack: 150 }, 
        elements: [Element.FIRE], requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT 
    },
};
