import { ItemQuality, EquipmentQuality, ItemType, Element, CultivationStage } from '../../types/index.ts';
import type { EquippableItem } from '../../types/index.ts';
import { NHI_GIAI_GIAP } from './trang-bi/nhi-giai-giap.ts';
import { NHI_GIAI_VAN } from './trang-bi/nhi-giai-van.ts';
import { NHI_GIAI_NON } from './trang-bi/nhi-giai-non.ts';
import { TAM_GIAI_GIAP } from './trang-bi/tam-giai-giap.ts';
import { TAM_GIAI_VAN } from './trang-bi/tam-giai-van.ts';
import { TAM_GIAI_NON } from './trang-bi/tam-giai-non.ts';
import { TU_GIAI_GIAP } from './trang-bi/tu-giai-giap.ts';
import { TU_GIAI_VAN } from './trang-bi/tu-giai-van.ts';
import { TU_GIAI_NON } from './trang-bi/tu-giai-non.ts';

export const EQUIPMENT: { [key: string]: EquippableItem } = {
    // ========== NHẤT GIAI ==========
    'tinh_thiet_trong_giap': { id: 'tinh_thiet_trong_giap', name: 'Tinh Thiết Trọng Giáp', description: 'Phòng ngự vật lý cực cao, nhưng nặng nề, làm giảm sự linh hoạt.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.CHESTPLATE, effects: { physicalDefense: 60, speed: -5 } },
    'yeu_bi_nhuyen_giap': { id: 'yeu_bi_nhuyen_giap', name: 'Yêu Bì Nhuyễn Giáp', description: 'Nhẹ và mềm, không ảnh hưởng đến tốc độ, phòng ngự tốt các đòn chém và đâm.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.CHESTPLATE, effects: { physicalDefense: 40 } },
    'thu_lan_giap': { id: 'thu_lan_giap', name: 'Thú Lân Giáp', description: 'Lớp vảy cứng xếp chồng lên nhau, khả năng chống đỡ các đòn tấn công vật lý vượt trội.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.THUONG_PHAM, type: ItemType.CHESTPLATE, effects: { physicalDefense: 50, magicalDefense: 10 } },
    'hoa_nguyen_giap': { id: 'hoa_nguyen_giap', name: 'Hỏa Nguyên Giáp', description: 'Có khả năng kháng lại các đòn tấn công thuộc tính hỏa.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.CHESTPLATE, effects: { physicalDefense: 20, magicalDefense: 30 }, elements: [Element.FIRE] },
    'giao_tho_giap': { id: 'giao_tho_giap', name: 'Giao Thổ Giáp', description: 'Cực kỳ cứng rắn, phòng ngự vững chắc như núi đá.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.CHESTPLATE, effects: { physicalDefense: 55 } },
    'tinh_thiet_phap_bao': { id: 'tinh_thiet_phap_bao', name: 'Tinh Thiết Pháp Bào', description: 'Bộ giáp toàn thân cơ bản, phòng ngự đồng đều nhưng nặng nề, ảnh hưởng đến tốc độ.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.HA_PHAM, type: ItemType.CHESTPLATE, effects: { physicalDefense: 45, speed: -3 } },
    'xich_dong_nhuyen_giap': { id: 'xich_dong_nhuyen_giap', name: 'Xích Đồng Nhuyễn Giáp', description: 'Dạng giáp lưới, nhẹ hơn Tinh Thiết Giáp, linh hoạt hơn nhưng khả năng chống đâm xuyên kém hơn.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.CHESTPLATE, effects: { physicalDefense: 35 } },
    'thanh_ngoc_ho_tam_kinh': { id: 'thanh_ngoc_ho_tam_kinh', name: 'Thanh Ngọc Hộ Tâm Kính', description: 'Chỉ là một tấm gương nhỏ che trước ngực, nhưng là nơi quan trọng nhất. Thanh Ngọc giúp ổn định linh khí tâm mạch, tránh bị sốc khi trúng đòn.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.THUONG_PHAM, type: ItemType.CHESTPLATE, effects: { magicalDefense: 40, maxMana: 50 } },
    'bach_giao_bi_giap': { id: 'bach_giao_bi_giap', name: 'Bạch Giao Bì Giáp', description: 'Lấy Bạch Giao Thổ làm vật liệu chính, luyện thành một lớp da giả cực kỳ dẻo dai. Khả năng phòng ngự vật lý cực tốt, đặc biệt là các đòn chém.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.CHESTPLATE, effects: { physicalDefense: 50 } },
    'nguyen_to_giap': { id: 'nguyen_to_giap', name: 'Nguyên Tố Giáp', description: 'Một bộ giáp đa năng, có khả năng kháng tất cả các thuộc tính cơ bản một chút, nhưng không chuyên về cái nào. Thích hợp để đối phó với những kẻ địch không rõ chi tiết.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.THUONG_PHAM, type: ItemType.CHESTPLATE, effects: { physicalDefense: 25, magicalDefense: 25 } },
    'phong_hanh_van': { id: 'phong_hanh_van', name: 'Phong Hành Vân', description: 'Giúp người mang di chuyển nhanh nhẹn, thân pháp phiêu dật như gió.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.BOOTS, effects: { speed: 12 }, elements: [Element.WIND] },
    'loi_toc_van': { id: 'loi_toc_van', name: 'Lôi Tốc Vân', description: 'Tăng tốc độ bộc phát trong khoảnh khắc, khi di chuyển có tiếng sấm nhỏ.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.BOOTS, effects: { speed: 10 }, elements: [Element.LIGHTNING] },
    'lang_ba_van': { id: 'lang_ba_van', name: 'Lăng Ba Vân', description: 'Cho phép người mang đi lại trên mặt nước một cách dễ dàng.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.BOOTS, effects: { speed: 8 }, elements: [Element.WATER] },
    'tat_phong_bi_van': { id: 'tat_phong_bi_van', name: 'Tật Phong Bì Vân', description: 'Kết hợp sự bền bỉ của da yêu thú và sự nhanh nhẹn của Phong Linh Thạch.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.BOOTS, effects: { speed: 15 }, elements: [Element.WIND] },
    'huyen_anh_van': { id: 'huyen_anh_van', name: 'Huyễn Ảnh Vân', description: 'Khi di chuyển ở tốc độ cao sẽ để lại tàn ảnh, gây nhiễu loạn cho đối thủ.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.THUONG_PHAM, type: ItemType.BOOTS, effects: { speed: 12 } },
    'phong_hanh_diep': { id: 'phong_hanh_diep', name: 'Phong Hành Diệp', description: 'Một pháp khí hình chiếc lá, giúp lướt đi trong gió. Tốc độ không nhanh nhưng tiêu hao linh khí rất ít, thích hợp để di chuyển đường dài.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.BOOTS, effects: { speed: 10, manaRecoveryRate: 1.02 }, elements: [Element.WIND] },
    'thuy_van_toa': { id: 'thuy_van_toa', name: 'Thủy Vân Toa', description: 'Một con thoi nhỏ, khi bay sẽ nhả ra một làn sương mỏng che giấu thân hình.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.BOOTS, effects: { speed: 9 }, elements: [Element.WATER] },
    'loi_quang_bo': { id: 'loi_quang_bo', name: 'Lôi Quang Bộ', description: 'Không phải phi hành liên tục, mà là một đôi giày. Khi灌入 linh khí có thể thực hiện những cú nhảy cực nhanh như một tia chớp, dùng để né tránh hoặc áp sát bất ngờ.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.THUONG_PHAM, type: ItemType.BOOTS, effects: { speed: 18 }, elements: [Element.LIGHTNING] },
    'huyen_duong_ban': { id: 'huyen_duong_ban', name: 'Huyễn Dương Bàn', description: 'Một đĩa tròn phi hành, tốc độ khá nhanh, nhưng sẽ để lại một vệt sáng mờ ảo phía sau.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.BOOTS, effects: { speed: 13 } },
    'bach_giao_van': { id: 'bach_giao_van', name: 'Bạch Giao Vân', description: 'Một đám mây nhỏ nhưng cực kỳ vững chắc, có thể chở thêm một người nữa và có khả năng phòng ngự nhất định.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.BOOTS, effects: { speed: 7, physicalDefense: 10 } },
    'thu_vuong_cot_khoi': { id: 'thu_vuong_cot_khoi', name: 'Thú Vương Cốt Khôi', description: 'Mũ trụ làm từ xương đầu của yêu thú mạnh mẽ, mang theo uy áp tinh thần.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.HELMET, effects: { physicalDefense: 25 } },
    'giao_lan_khoi': { id: 'giao_lan_khoi', name: 'Giao Lân Khôi', description: 'Phòng ngự cực mạnh các đòn tấn công vật lý nhắm vào đầu.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.HELMET, effects: { physicalDefense: 30 } },
    'an_than_ngoc_khoi': { id: 'an_than_ngoc_khoi', name: 'An Thần Ngọc Khôi', description: 'Giúp người đội giữ tâm trí thanh tịnh, chống lại các đòn tấn công tinh thần và ảo thuật.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.THUONG_PHAM, type: ItemType.HELMET, effects: { magicalDefense: 25, daoTam: 5 } },
    'tinh_thiet_ho_tam_kinh_2': { id: 'tinh_thiet_ho_tam_kinh_2', name: 'Tinh Thiết Hộ Tâm Kính', description: 'Một tấm gương nhỏ nhưng cực kỳ cứng rắn đặt trước tim để bảo vệ yếu huyệt.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.TRUNG_PHAM, type: ItemType.CHESTPLATE, effects: { physicalDefense: 20 } },
    'lang_bi_ho_ngach': { id: 'lang_bi_ho_ngach', name: 'Lang Bì Hộ Ngạch', description: 'Đồ bảo vệ trán nhẹ nhàng, không gây cản trở tầm nhìn.', quality: ItemQuality.NHAT_GIAI, equipmentQuality: EquipmentQuality.HA_PHAM, type: ItemType.HELMET, effects: { physicalDefense: 15 } },

    // ========== NHỊ GIAI ==========
    ...NHI_GIAI_GIAP,
    ...NHI_GIAI_VAN,
    ...NHI_GIAI_NON,
    'huyen_thiet_giap': {
        id: 'huyen_thiet_giap',
        name: 'Huyền Thiết Giáp',
        description: 'Bộ giáp nặng làm từ huyền thiết, phòng ngự vật lý cực cao nhưng làm giảm tốc độ.',
        quality: ItemQuality.NHI_GIAI,
        equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        type: ItemType.CHESTPLATE,
        effects: { physicalDefense: 600, magicalDefense: 250, speed: -5 },
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT,
    },
    'thuy_van_phap_bao': {
        id: 'thuy_van_phap_bao',
        name: 'Thủy Vân Pháp Bào',
        description: 'Pháp bào được dệt từ tơ của Băng Tằm, phòng ngự ma pháp tốt và tăng tốc độ hồi phục linh lực.',
        quality: ItemQuality.NHI_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        type: ItemType.CHESTPLATE,
        effects: { physicalDefense: 250, magicalDefense: 550, manaRecoveryRate: 1.1 },
        elements: [Element.WATER, Element.ICE],
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT,
    },

    // ========== TAM GIAI ==========
    ...TAM_GIAI_GIAP,
    ...TAM_GIAI_VAN,
    ...TAM_GIAI_NON,
    'hoang_thiet_giap': {
        id: 'hoang_thiet_giap',
        name: 'Hoàng Thiết Giáp',
        description: 'Bộ giáp được rèn từ Hoàng Thiết, hấp thụ linh khí Thổ, phòng ngự toàn diện, vững như bàn thạch.',
        quality: ItemQuality.TAM_GIAI,
        equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        type: ItemType.CHESTPLATE,
        effects: { physicalDefense: 3000, magicalDefense: 2500 },
        requiredCultivation: CultivationStage.CORE_FORMATION,
    },

    // ========== TỨ GIAI ==========
    ...TU_GIAI_GIAP,
    ...TU_GIAI_VAN,
    ...TU_GIAI_NON,
};