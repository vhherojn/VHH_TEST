
import { ItemQuality, EquipmentQuality, ItemType } from '../../../types/index.ts';
import type { Talisman } from '../../../types/index.ts';

export const TAM_GIAI_PHU: { [key: string]: Talisman } = {
    // Existing
    loi_dinh_phu: {
        id: 'loi_dinh_phu',
        name: 'Lôi Đình Phù',
        description: 'Phù bảo Tam Giai Thượng Phẩm, ẩn chứa một tia Lôi Đình chi lực, có thể gây ra 5000 sát thương Lôi. Tương đương một kích của Kết Đan hậu kỳ. Tiêu hao sau khi dùng.',
        quality: ItemQuality.TAM_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        type: ItemType.TALISMAN,
        effects: { damage: 5000 },
    },

    // --- Phù Tấn Công ---
    doc_sa_phu: {
        id: 'doc_sa_phu',
        name: 'Độc Sa Phù',
        description: 'Phóng ra một làn sương độc nhanh chóng, gây sát thương duy trì và làm giảm tốc độ hồi phục của mục tiêu.',
        quality: ItemQuality.TAM_GIAI,
        equipmentQuality: EquipmentQuality.HA_PHAM,
        type: ItemType.TALISMAN,
        effects: { damage: 1500, damageOverTime: 300, duration: 3 },
    },
    phong_nhan_phu: {
        id: 'phong_nhan_phu',
        name: 'Phong Nhận Phù',
        description: 'Triệu hồi một luồng gió xoáy chứa các lưỡi dao sắc bén, tấn công mạnh mẽ kẻ địch trong phạm vi nhỏ.',
        quality: ItemQuality.TAM_GIAI,
        equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        type: ItemType.TALISMAN,
        effects: { damage: 2800 },
    },
    hoa_nguc_phu: {
        id: 'hoa_nguc_phu',
        name: 'Hỏa Ngục Phù',
        description: 'Tạo ra một trận mưa lửa giáng xuống khu vực rộng lớn, gây sát thương hỏa công cực mạnh và đốt cháy vạn vật.',
        quality: ItemQuality.TAM_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        type: ItemType.TALISMAN,
        effects: { damage: 4500 },
    },

    // --- Phù Bảo Vệ ---
    ngu_hanh_phu: {
        id: 'ngu_hanh_phu',
        name: 'Ngũ Hành Phù',
        description: 'Tạo một lớp chắn linh lực có khả năng kháng lại một phần sát thương từ các nguyên tố cơ bản.',
        quality: ItemQuality.TAM_GIAI,
        equipmentQuality: EquipmentQuality.HA_PHAM,
        type: ItemType.TALISMAN,
        effects: { shield: 2000 },
    },
    tinh_luc_phu: {
        id: 'tinh_luc_phu',
        name: 'Tĩnh Lực Phù',
        description: 'Hấp thụ và chuyển hóa một lượng sát thương nhất định thành linh lực để phục hồi cho người dùng.',
        quality: ItemQuality.TAM_GIAI,
        equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        type: ItemType.TALISMAN,
        effects: { shield: 2500, mana_recovery: 500 },
    },
    phan_chan_phu: {
        id: 'phan_chan_phu',
        name: 'Phản Chấn Phù',
        description: 'Khi bị tấn công, lá phù sẽ kích hoạt một kết giới linh lực phản lại một phần sát thương đã nhận về phía kẻ tấn công.',
        quality: ItemQuality.TAM_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        type: ItemType.TALISMAN,
        effects: { shield: 3000, damageReflection: 0.5 },
    },

    // --- Phù Bỏ Trốn ---
    huyen_an_phu: {
        id: 'huyen_an_phu',
        name: 'Huyền Ẩn Phù',
        description: 'Giúp người dùng hòa vào cảnh vật, giảm đáng kể khả năng bị phát hiện bởi giác quan và thần thức cấp thấp.',
        quality: ItemQuality.TAM_GIAI,
        equipmentQuality: EquipmentQuality.HA_PHAM,
        type: ItemType.TALISMAN,
        effects: { duration: 3, aura_concealment: 2 },
    },
    thuan_di_phu: {
        id: 'thuan_di_phu',
        name: 'Thuấn Di Phù',
        description: 'Dịch chuyển tức thời người dùng một khoảng cách ngắn theo hướng chỉ định để né tránh đòn hiểm.',
        quality: ItemQuality.TAM_GIAI,
        equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        type: ItemType.TALISMAN,
        effects: { duration: 1 },
    },
    vo_hinh_phu: {
        id: 'vo_hinh_phu',
        name: 'Vô Hình Phù',
        description: 'Khi kích hoạt, người dùng hoàn toàn biến mất khỏi tầm nhìn và thần thức, trở nên vô hình tuyệt đối trong vài giây.',
        quality: ItemQuality.TAM_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        type: ItemType.TALISMAN,
        effects: { duration: 5, aura_concealment: 5 },
    },

    // --- Phù Bộc Phát ---
    suong_doc_phu: {
        id: 'suong_doc_phu',
        name: 'Sương Độc Phù',
        description: 'Tạo ra một làn sương mù có chứa độc tố cấp Kết Đan, làm giảm tốc độ tấn công của kẻ địch và gây sát thương duy trì nhỏ.',
        quality: ItemQuality.TAM_GIAI,
        equipmentQuality: EquipmentQuality.HA_PHAM,
        type: ItemType.TALISMAN,
        effects: { damage: 800, speedDebuff: 0.2 },
    },
    bao_phong_phu: {
        id: 'bao_phong_phu',
        name: 'Bạo Phong Phù',
        description: 'Tạo ra một vụ nổ gió mạnh, đẩy lùi tất cả kẻ địch trong phạm vi và làm gián đoạn mọi hành động của chúng.',
        quality: ItemQuality.TAM_GIAI,
        equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        type: ItemType.TALISMAN,
        effects: { damage: 1200, stunChance: 0.3 },
    },
    diet_phap_phu: {
        id: 'diet_phap_phu',
        name: 'Diệt Pháp Phù',
        description: 'Kích hoạt một vụ nổ linh lực đặc biệt, tiêu hao một lượng lớn Linh Lực (MP) của tất cả kẻ địch xung quanh.',
        quality: ItemQuality.TAM_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        type: ItemType.TALISMAN,
        effects: { damage: 1000, manaBurn: 2000 },
    },

    // --- Phù Tối Thượng ---
    thien_phat_loi_kiep_phu: {
        id: 'thien_phat_loi_kiep_phu',
        name: 'Thiên Phạt Lôi Kiếp Phù',
        description: 'Cực Phẩm. Triệu hồi một luồng sét màu vàng tím mang theo ý chí Thiên Đạo. Sát thương tương đương một kích toàn lực của Nửa Bước Nguyên Anh.',
        quality: ItemQuality.TAM_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM, // Technical classification for "Ultimate" in Tier 3
        type: ItemType.TALISMAN,
        effects: { damage: 15000, critChance: 1.0 }, // Guaranteed Crit
    },
    bat_hoai_ket_gioi_phu: {
        id: 'bat_hoai_ket_gioi_phu',
        name: 'Bất Hoại Kết Giới Phù',
        description: 'Cực Phẩm. Tạo ra một kết giới linh lực màu vàng kim tuyệt đối. Có thể chặn đứng một đòn tấn công cấp Nguyên Anh.',
        quality: ItemQuality.TAM_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        type: ItemType.TALISMAN,
        effects: { shield: 20000, duration: 5 },
    },
};
