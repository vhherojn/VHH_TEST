import { ItemQuality, EquipmentQuality, ItemType, Element, CultivationStage } from '../../../types/index.ts';
import type { EquippableItem } from '../../../types/index.ts';

export const TAM_GIAI_GIAP: { [key: string]: EquippableItem } = {
    'tam_giai_giap_ngu_hanh_thien_luan_giap': {
        id: 'tam_giai_giap_ngu_hanh_thien_luan_giap', name: 'Ngũ Hành Thiên Luân Giáp',
        description: 'Trước ngực có một pháp luân năm màu. Khi bị tấn công bởi thuộc tính nào, pháp luân sẽ tự xoay để kích hoạt khả năng phòng ngự tương ứng, hóa giải phần lớn sát thương nguyên tố.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        effects: { physicalDefense: 3000, magicalDefense: 4500 },
        elements: [Element.METAL, Element.WOOD, Element.WATER, Element.FIRE, Element.EARTH], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_giap_tinh_van_tinh_than_giap': {
        id: 'tam_giai_giap_tinh_van_tinh_than_giap', name: 'Tinh Vân Tinh Thần Giáp',
        description: 'Áo giáp có khả năng tự động hấp thụ ánh sáng của các vì sao vào ban đêm để tạo ra một lớp "Tinh Thuẫn" (Khiên Sao) bao bọc bên ngoài, lớp khiên này có thể tự tái tạo.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { physicalDefense: 3500, magicalDefense: 3500 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_giap_ta_duong_ma_khu_giap': {
        id: 'tam_giai_giap_ta_duong_ma_khu_giap', name: 'Tà Dương Ma Khu Giáp',
        description: 'Áo giáp mang theo năng lượng ăn mòn, có thể làm hư hại vũ khí của đối thủ khi va chạm. Đồng thời, nó có thể hút một phần nhỏ linh lực của kẻ tấn công.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { physicalDefense: 4000, magicalDefense: 2000, daoTam: -15 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_giap_huyen_bang_kinh_tuong_giap': {
        id: 'tam_giai_giap_huyen_bang_kinh_tuong_giap', name: 'Huyễn Băng Kính Tượng Giáp',
        description: 'Có khả năng tạo ra một ảo ảnh bằng băng giống hệt người mặc. Ảo ảnh này có thể di chuyển và thu hút đòn tấn công, khi bị phá vỡ sẽ phát nổ thành một cơn mưa mảnh băng.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        effects: { physicalDefense: 2500, magicalDefense: 4000 },
        elements: [Element.ICE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_giap_hoang_ngoc_bat_diet_the': {
        id: 'tam_giai_giap_hoang_ngoc_bat_diet_the', name: 'Hoàng Ngọc Bất Diệt Thể',
        description: 'Không phải áo giáp mặc ngoài, mà là một loại cát ngọc có thể dung hợp vào da thịt, giúp người dùng có khả năng tái tạo cơ thể cực nhanh, miễn là kim đan không bị tổn thương.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { healthModifier: 1.2, physicalDefense: 3000 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_giap_tram_ngan_huyen_vu_giap': {
        id: 'tam_giai_giap_tram_ngan_huyen_vu_giap', name: 'Trầm Ngân Huyền Vũ Giáp',
        description: 'Lấy ý tưởng từ thần thú Huyền Vũ, bộ giáp này có sức phòng ngự vật lý và phòng ngự hệ thủy, băng cực mạnh. Có thể tạo ra một mai rùa hư ảnh để phòng thủ tuyệt đối.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { physicalDefense: 5000, magicalDefense: 2000 },
        elements: [Element.WATER, Element.ICE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_giap_xich_diem_chu_tuoc_giap': {
        id: 'tam_giai_giap_xich_diem_chu_tuoc_giap', name: 'Xích Diễm Chu Tước Giáp',
        description: 'Lấy ý tưởng từ thần thú Chu Tước, bộ giáp này miễn nhiễm với lửa và có khả năng "Dục Hỏa Trùng Sinh", tự động chữa lành khi bị hư hại nặng bằng cách bùng lên một ngọn lửa.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { physicalDefense: 2000, magicalDefense: 5000 },
        elements: [Element.FIRE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_giap_kinh_loi_bach_ho_giap': {
        id: 'tam_giai_giap_kinh_loi_bach_ho_giap', name: 'Kình Lôi Bạch Hổ Giáp',
        description: 'Lấy ý tưởng từ thần thú Bạch Hổ, đây là một bộ giáp tấn công. Nó tăng cường sức mạnh và tốc độ cho người mặc, đồng thời tỏa ra lôi điện khi di chuyển.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { physicalDefense: 3000, physicalAttack: 1000, speed: 15 },
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_giap_dia_liet_thanh_long_giap': {
        id: 'tam_giai_giap_dia_liet_thanh_long_giap', name: 'Địa Liệt Thanh Long Giáp',
        description: 'Lấy ý tưởng từ thần thú Thanh Long, bộ giáp này chứa đựng sinh cơ dồi dào, giúp người mặc tăng tốc độ hồi phục vết thương và linh lực.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { physicalDefense: 3000, magicalDefense: 3000, healthModifier: 1.1 },
        elements: [Element.EARTH, Element.WOOD], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_giap_huyen_quang_thien_y_giap': {
        id: 'tam_giai_giap_huyen_quang_thien_y_giap', name: 'Huyễn Quang Thiên Y Giáp',
        description: 'Không phải giáp trụ nặng, mà là một bộ pháp y. Nó có khả năng khúc xạ ánh sáng xung quanh, khiến thân hình người mặc trở nên mờ ảo, khó nắm bắt.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.HA_PHAM,
        effects: { magicalDefense: 3000, speed: 10 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_giap_thai_cuong_kim_than_giap': {
        id: 'tam_giai_giap_thai_cuong_kim_than_giap', name: 'Thái Cương Kim Thân Giáp',
        description: 'Lớp cát siêu cứng này sẽ bám vào cơ thể người mặc như một làn da thứ hai, tạo thành một lớp "kim thân" gần như không thể bị xuyên thủng bởi các đòn tấn công vật lý.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        effects: { physicalDefense: 6000 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_giap_huyen_quang_vo_hinh_giap': {
        id: 'tam_giai_giap_huyen_quang_vo_hinh_giap', name: 'Huyễn Quang Vô Hình Giáp',
        description: 'Có khả năng bẻ cong ánh sáng một cách hoàn hảo, giúp người mặc tàng hình hoàn toàn. Tuy nhiên, việc duy trì trạng thái này rất hao tổn linh lực.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        effects: { speed: 20, manaRecoveryRate: -0.2 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_giap_van_thu_yeu_bi_giap': {
        id: 'tam_giai_giap_van_thu_yeu_bi_giap', name: 'Vạn Thú Yêu Bì Giáp',
        description: 'Được khâu lại từ da của hàng trăm loại yêu thú. Người mặc có thể đánh thức các tàn hồn bên trong để tạm thời có được năng lực của chúng.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { physicalDefense: 3800, magicalDefense: 2200 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_giap_ta_duong_dung_huyet_giap': {
        id: 'tam_giai_giap_ta_duong_dung_huyet_giap', name: 'Tà Dương Dung Huyết Giáp',
        description: 'Một bộ giáp sống, có thể hòa tan vào máu của người mặc. Nó cung cấp khả năng tái tạo phi thường nhưng sẽ dần dần làm tha hóa huyết mạch của chủ nhân.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { healthModifier: 1.15, physicalDefense: 2000, daoTam: -18 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_giap_tinh_van_chu_thien_giap': {
        id: 'tam_giai_giap_tinh_van_chu_thien_giap', name: 'Tinh Vân Chu Thiên Giáp',
        description: 'Tạo ra một vòng tuần hoàn linh khí khép kín quanh cơ thể, liên tục thanh lọc tạp chất. Giúp người mặc chống lại các loại độc tố và sự xâm nhập của dị chủng linh lực.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { magicalDefense: 4000 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_giap_dia_liet_mach_dong_giap': {
        id: 'tam_giai_giap_dia_liet_mach_dong_giap', name: 'Địa Liệt Mạch Động Giáp',
        description: 'Bộ giáp có khả năng đồng bộ với "nhịp đập" của mặt đất. Chỉ cần người mặc còn đứng trên mặt đất, họ sẽ có một nguồn thể lực gần như vô tận.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { physicalDefense: 4200 },
        elements: [Element.EARTH], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_giap_tram_ngan_vinh_dong_giap': {
        id: 'tam_giai_giap_tram_ngan_vinh_dong_giap', name: 'Trầm Ngân Vĩnh Động Giáp',
        description: 'Tỏa ra một trường lực "tĩnh". Mọi đòn tấn công vật lý bay vào trường lực này đều sẽ bị giảm tốc độ một cách đột ngột, như thể đang bơi trong một chất lỏng cực đặc.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        effects: { physicalDefense: 4500 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_giap_huyen_bang_thien_dien_giap': {
        id: 'tam_giai_giap_huyen_bang_thien_dien_giap', name: 'Huyễn Băng Thiên Diện Giáp',
        description: 'Không chỉ tạo ảo ảnh của người mặc, bộ giáp này còn có thể thay đổi hình dạng và khí tức để ngụy trang thành bất kỳ ai mà người mặc đã từng gặp.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { magicalDefense: 3500 },
        elements: [Element.ICE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_giap_ngu_hanh_thien_di_giap': {
        id: 'tam_giai_giap_ngu_hanh_thien_di_giap', name: 'Ngũ Hành Thiên Di Giáp',
        description: 'Cho phép người dùng "hòa tan" vào nguyên tố tương ứng trong khoảnh khắc để trở nên vô hình và miễn nhiễm với chính nguyên tố đó (ví dụ: hòa vào tường đất để đi xuyên tường).',
        quality: ItemQuality.TAM_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        effects: { magicalDefense: 4200 },
        elements: [Element.METAL, Element.WOOD, Element.WATER, Element.FIRE, Element.EARTH], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_giap_cong_sinh_yeu_bi_giap': {
        id: 'tam_giai_giap_cong_sinh_yeu_bi_giap', name: 'Cộng Sinh Yêu Bì Giáp',
        description: 'Một bộ giáp sống, ký sinh trên người chủ. Nó hút linh lực để tồn tại, đổi lại nó cung cấp cho chủ nhân các giác quan của dã thú, bản năng chiến đấu và khả năng tự chữa lành vết thương.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.CHESTPLATE, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        effects: { healthModifier: 1.1, physicalDefense: 3000 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
};
