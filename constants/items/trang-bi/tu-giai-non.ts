import { ItemQuality, EquipmentQuality, ItemType, Element, CultivationStage } from '../../../types/index.ts';
import type { EquippableItem } from '../../../types/index.ts';

export const TU_GIAI_NON: { [key: string]: EquippableItem } = {
    'tu_giai_non_tu_la_dien': { 
        id: 'tu_giai_non_tu_la_dien', name: 'Tu La Diện', 
        description: 'Mặt nạ mang theo sát khí của Tu La, kích thích bản năng chiến đấu của người đeo, càng bị thương càng trở nên mạnh mẽ.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { physicalDefense: 6000, physicalAttack: 2000 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_non_bat_dong_khoi': { 
        id: 'tu_giai_non_bat_dong_khoi', name: 'Bất Động Khôi', 
        description: 'Mũ trụ mang theo "Bất động pháp tắc", giúp Nguyên Anh trong thức hải vững như núi, miễn nhiễm với phần lớn các đòn tấn công tinh thần và chấn động linh hồn.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { physicalDefense: 7000, magicalDefense: 10000 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_non_thai_thanh_kinh': { 
        id: 'tu_giai_non_thai_thanh_kinh', name: 'Thái Thanh Kính', 
        description: 'Gương hộ tâm đeo trước trán, tỏa ra "Thái Thanh thần quang", có thể nhìn thấu mọi ảo ảnh, ngụy trang và thanh tẩy mọi loại nguyền rủa.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { magicalDefense: 12000, daoTam: 15 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_non_thien_tu_mien': { 
        id: 'tu_giai_non_thien_tu_mien', name: 'Thiên Tử Miện', 
        description: 'Vương miện của bậc quân chủ, phát ra khí thế đế vương, có thể dùng ý chí để áp chế và ra lệnh cho các tu sĩ và yêu thú có cấp bậc thấp hơn.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { physicalDefense: 5000, magicalDefense: 5000, charisma: 25 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_non_ma_long_khoi': { 
        id: 'tu_giai_non_ma_long_khoi', name: 'Ma Long Khôi', 
        description: 'Chế tác từ xương sọ của Ma Long, cho phép người dùng giao tiếp và sử dụng một phần nhỏ của Long Ngữ Ma Pháp, một loại ngôn ngữ cổ xưa chứa đựng sức mạnh của pháp tắc.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { physicalDefense: 8000, magicalDefense: 8000 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_non_tu_linh_mien': { 
        id: 'tu_giai_non_tu_linh_mien', name: 'Tụ Linh Miện', 
        description: 'Vương miện có khả năng tự động hấp thụ linh khí trời đất và tích trữ lại. Khi cần, người dùng có thể rút linh khí dự trữ này ra để sử dụng, như có thêm một cái kim đan thứ hai.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { magicalDefense: 7000, maxMana: 20000 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_non_thu_vuong_khoi': { 
        id: 'tu_giai_non_thu_vuong_khoi', name: 'Thú Vương Khôi', 
        description: 'Cho phép người dùng kết nối và chia sẻ ngũ quan với các yêu thú đã được mình thuần hóa. Có thể ra lệnh cho cả một bầy thú bằng ý nghĩ.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { physicalDefense: 6000, magicalDefense: 6000 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_non_hoa_nguyen_kinh': { 
        id: 'tu_giai_non_hoa_nguyen_kinh', name: 'Hóa Nguyên Kính', 
        description: 'Gương hộ tâm có khả năng hấp thụ các đòn tấn công bằng linh lực thuần túy, sau đó chuyển hóa chúng thành linh khí mà người dùng có thể hấp thụ để hồi phục.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.TRUNG_PHAM, 
        effects: { magicalDefense: 13000, manaRecoveryRate: 1.1 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_non_tang_hon_dien': { 
        id: 'tu_giai_non_tang_hon_dien', name: 'Tàng Hồn Diện', 
        description: 'Mặt nạ che giấu hoàn toàn khí tức của Nguyên Anh, khiến người dùng không thể bị phát hiện bởi các loại thần thức và các thuật soi xét, bói toán.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { magicalDefense: 9000 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
    'tu_giai_non_than_toc_mien': { 
        id: 'tu_giai_non_than_toc_mien', name: 'Thần Tốc Miện', 
        description: 'Một chiếc vòng kim cô giúp gia tốc hoạt động của thần thức, khiến người dùng có cảm giác như thời gian trôi chậm lại, cho phép họ suy nghĩ và phản ứng nhanh hơn gấp nhiều lần.', 
        quality: ItemQuality.TU_GIAI, type: ItemType.HELMET, equipmentQuality: EquipmentQuality.THUONG_PHAM, 
        effects: { magicalDefense: 8000, speed: 30 }, 
        requiredCultivation: CultivationStage.NASCENT_SOUL 
    },
};