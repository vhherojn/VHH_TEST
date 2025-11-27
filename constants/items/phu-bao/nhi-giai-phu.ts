import { ItemQuality, EquipmentQuality, ItemType } from '../../../types/index.ts';
import type { Talisman } from '../../../types/index.ts';

export const NHI_GIAI_PHU: { [key: string]: Talisman } = {
    // Phù Tấn Công
    'hoa_cau_phu_nhi_giai': {
        id: 'hoa_cau_phu_nhi_giai',
        name: 'Hỏa Cầu Phù',
        description: 'Triệu hồi một quả cầu lửa có kích cỡ nắm tay để tấn công mục tiêu.',
        quality: ItemQuality.NHI_GIAI,
        equipmentQuality: EquipmentQuality.HA_PHAM,
        type: ItemType.TALISMAN,
        effects: { damage: 500 }
    },
    'loi_dien_phu_nhi_giai': {
        id: 'loi_dien_phu_nhi_giai',
        name: 'Lôi Điện Phù',
        description: 'Triệu hồi một luồng điện tích nhỏ giáng xuống mục tiêu, gây tê liệt và sát thương vừa phải.',
        quality: ItemQuality.NHI_GIAI,
        equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        type: ItemType.TALISMAN,
        effects: { damage: 800, duration: 1 }
    },
    'bang_truy_phu_nhi_giai': {
        id: 'bang_truy_phu_nhi_giai',
        name: 'Băng Trùy Phù',
        description: 'Triệu hồi nhiều mũi băng nhọn, sắc bén để công kích mục tiêu, gây ra sát thương cao và làm chậm kẻ địch.',
        quality: ItemQuality.NHI_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        type: ItemType.TALISMAN,
        effects: { damage: 1200, duration: 2 }
    },

    // Phù Bảo Vệ
    'ho_giap_phu_nhi_giai': {
        id: 'ho_giap_phu_nhi_giai',
        name: 'Hộ Giáp Phù',
        description: 'Tạo một lớp giáp linh lực mỏng hấp thụ sát thương vật lý cấp thấp.',
        quality: ItemQuality.NHI_GIAI,
        equipmentQuality: EquipmentQuality.HA_PHAM,
        type: ItemType.TALISMAN,
        effects: { shield: 800 }
    },
    'khang_ma_phu_nhi_giai': {
        id: 'khang_ma_phu_nhi_giai',
        name: 'Kháng Ma Phù',
        description: 'Tạo một lớp màng bảo vệ, giúp kháng lại các đòn tấn công linh lực và ma thuật.',
        quality: ItemQuality.NHI_GIAI,
        equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        type: ItemType.TALISMAN,
        effects: { shield: 1200 }
    },
    'kim_cuong_thuan_phu_nhi_giai': {
        id: 'kim_cuong_thuan_phu_nhi_giai',
        name: 'Kim Cương Thuẫn Phù',
        description: 'Tạo một tấm khiên vững chắc từ linh lực, có thể chịu đựng sát thương vật lý và linh lực cấp cao.',
        quality: ItemQuality.NHI_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        type: ItemType.TALISMAN,
        effects: { shield: 1800 }
    },

    // Phù Bỏ Trốn
    'tang_toc_phu_nhi_giai': {
        id: 'tang_toc_phu_nhi_giai',
        name: 'Tăng Tốc Phù',
        description: 'Tăng tốc độ di chuyển trong thời gian ngắn để dễ dàng thoát khỏi kẻ địch.',
        quality: ItemQuality.NHI_GIAI,
        equipmentQuality: EquipmentQuality.HA_PHAM,
        type: ItemType.TALISMAN,
        effects: { duration: 2 }
    },
    'ao_anh_phu_nhi_giai': {
        id: 'ao_anh_phu_nhi_giai',
        name: 'Ảo Ảnh Phù',
        description: 'Tạo ra một ảo ảnh của người dùng, đánh lừa kẻ địch trong vài giây, giúp người dùng bỏ trốn.',
        quality: ItemQuality.NHI_GIAI,
        equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        type: ItemType.TALISMAN,
        effects: { duration: 3 }
    },
    'phong_hanh_phu_nhi_giai': {
        id: 'phong_hanh_phu_nhi_giai',
        name: 'Phong Hành Phù',
        description: 'Tăng tốc độ di chuyển và khả năng né tránh của người dùng, giúp họ dễ dàng thoát khỏi nguy hiểm hoặc tấn công chớp nhoáng.',
        quality: ItemQuality.NHI_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        type: ItemType.TALISMAN,
        effects: { duration: 3 }
    },

    // Phù Bộc Phát
    'hoa_cuoc_phu_nhi_giai': {
        id: 'hoa_cuoc_phu_nhi_giai',
        name: 'Hỏa Cước Phù',
        description: 'Tạo một làn sóng lửa nhỏ từ chân người dùng, gây sát thương cho kẻ địch xung quanh.',
        quality: ItemQuality.NHI_GIAI,
        equipmentQuality: EquipmentQuality.HA_PHAM,
        type: ItemType.TALISMAN,
        effects: { damage: 450 }
    },
    'bao_cat_phu_nhi_giai': {
        id: 'bao_cat_phu_nhi_giai',
        name: 'Bão Cát Phù',
        description: 'Triệu hồi một cơn bão cát nhỏ, làm giảm tầm nhìn và làm chậm kẻ địch trong một khu vực nhất định.',
        quality: ItemQuality.NHI_GIAI,
        equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        type: ItemType.TALISMAN,
        effects: { damage: 600, duration: 2 }
    },
    'thai_duong_no_phu_nhi_giai': {
        id: 'thai_duong_no_phu_nhi_giai',
        name: 'Thái Dương Nộ Phù',
        description: 'Bộc phát một vụ nổ ánh sáng mạnh, gây sát thương cực lớn cho tất cả kẻ địch trong phạm vi.',
        quality: ItemQuality.NHI_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        type: ItemType.TALISMAN,
        effects: { damage: 1500 }
    },
};