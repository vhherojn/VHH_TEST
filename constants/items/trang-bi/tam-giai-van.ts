import { ItemQuality, EquipmentQuality, ItemType, Element, CultivationStage } from '../../../types/index.ts';
import type { EquippableItem } from '../../../types/index.ts';

export const TAM_GIAI_VAN: { [key: string]: EquippableItem } = {
    'tam_giai_van_tinh_van_suc_dia_van': {
        id: 'tam_giai_van_tinh_van_suc_dia_van', name: 'Tinh Vân Súc Địa Vân',
        description: 'Có khả năng thực hiện thần thông "Súc Địa Thành Thốn", rút ngắn không gian, giúp người mang di chuyển một quãng đường dài chỉ trong một bước chân.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        effects: { speed: 80 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_van_huyen_quang_truy_quang_van': {
        id: 'tam_giai_van_huyen_quang_truy_quang_van', name: 'Huyễn Quang Truy Quang Vân',
        description: 'Cho phép người mang hóa thành một luồng ánh sáng trong khoảnh khắc, đạt đến tốc độ cực hạn để né tránh hoặc tấn công chớp nhoáng.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { speed: 100 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_van_xich_diem_dap_hoa_van': {
        id: 'tam_giai_van_xich_diem_dap_hoa_van', name: 'Xích Diễm Đạp Hỏa Vân',
        description: 'Miễn nhiễm với mọi loại lửa cấp thấp, cho phép người mang đi lại trên dung nham. Có thể hấp thụ hỏa linh khí để tăng tốc độ di chuyển.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { speed: 60 },
        elements: [Element.FIRE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_van_tram_ngan_vo_anh_van': {
        id: 'tam_giai_van_tram_ngan_vo_anh_van', name: 'Trầm Ngân Vô Ảnh Vân',
        description: 'Tỏa ra hàn khí làm khúc xạ ánh sáng xung quanh bàn chân, khiến các chuyển động của người mang trở nên vô hình, không để lại dấu vết.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { speed: 70 },
        elements: [Element.ICE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_van_kinh_loi_kinh_vu_van': {
        id: 'tam_giai_van_kinh_loi_kinh_vu_van', name: 'Kình Lôi Kinh Vũ Vân',
        description: 'Mỗi bước chân đều như một tiếng sấm nổ. Không chỉ nhanh, mà còn có thể dùng sóng âm từ bước chân để làm đối thủ choáng váng.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { speed: 65, magicalAttack: 500 },
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_van_ngu_hanh_tuan_thien_van': {
        id: 'tam_giai_van_ngu_hanh_tuan_thien_van', name: 'Ngũ Hành Tuần Thiên Vân',
        description: 'Cho phép người mang tạo ra các "điểm tựa" bằng nguyên tố trong không trung (tường đất, cột gió, bậc thang lửa...) để di chuyển và chiến đấu trên trời một cách linh hoạt.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        effects: { speed: 75 },
        elements: [Element.METAL, Element.WOOD, Element.WATER, Element.FIRE, Element.EARTH], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_van_dia_liet_bang_son_van': {
        id: 'tam_giai_van_dia_liet_bang_son_van', name: 'Địa Liệt Băng Sơn Vân',
        description: 'Đôi giày cực nặng, giúp gia tăng sức mạnh cho các đòn đá và dậm chân, khiến mỗi cú đá có uy lực như một ngọn núi nhỏ va vào.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { physicalAttack: 1500, speed: -5 },
        elements: [Element.EARTH, Element.ICE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_van_huyen_bang_diep_vu_van': {
        id: 'tam_giai_van_huyen_bang_diep_vu_van', name: 'Huyễn Băng Điệp Vũ Vân',
        description: 'Giúp thân pháp trở nên nhẹ nhàng, uyển chuyển như vũ điệu của bướm. Khi di chuyển sẽ để lại những con bướm băng hư ảo, có thể phát nổ thành sương lạnh.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { speed: 72 },
        elements: [Element.ICE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_van_ma_bi_cuu_u_van': {
        id: 'tam_giai_van_ma_bi_cuu_u_van', name: 'Ma Bì Cửu U Vân',
        description: 'Cho phép người mang bước vào trong bóng tối và xuất hiện từ một cái bóng khác ở gần đó (yêu cầu phải có bóng tối).',
        quality: ItemQuality.TAM_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        effects: { speed: 60 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_van_thai_cuong_truc_tinh_van': {
        id: 'tam_giai_van_thai_cuong_truc_tinh_van', name: 'Thái Cương Trục Tinh Vân',
        description: 'Khi di chuyển sẽ rải ra phía sau một lớp bụi sao bằng cát Thái Cương, cực kỳ sắc bén, tạo thành một cái bẫy nguy hiểm cho kẻ truy đuổi.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { speed: 68 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_van_phong_hoa_luan': {
        id: 'tam_giai_van_phong_hoa_luan', name: 'Phong Hỏa Luân',
        description: 'Đôi giày có thể tạo ra hai chiếc bánh xe bằng lửa và gió dưới chân, giúp người mang di chuyển cực nhanh trên mặt đất và bay lượn trên không trung.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { speed: 90 },
        elements: [Element.FIRE, Element.WIND], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_van_huyen_bang_nguyet_anh_van': {
        id: 'tam_giai_van_huyen_bang_nguyet_anh_van', name: 'Huyễn Băng Nguyệt Ảnh Vân',
        description: 'Dưới ánh trăng, tốc độ sẽ được tăng mạnh. Có thể lợi dụng bóng tối để tạo ra các phân thân bằng băng có hình dạng y hệt chủ nhân.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { speed: 70 },
        elements: [Element.ICE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_van_tram_ngan_phu_hai_van': {
        id: 'tam_giai_van_tram_ngan_phu_hai_van', name: 'Trầm Ngân Phụ Hải Vân',
        description: 'Đôi giày luyện công có trọng lượng khủng khiếp, chuyên dùng để tu luyện dưới đáy biển sâu hoặc những nơi có áp lực cực lớn.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.HA_PHAM,
        effects: { physicalDefense: 1000, speed: -30 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_van_ta_duong_hoa_huyet_van': {
        id: 'tam_giai_van_ta_duong_hoa_huyet_van', name: 'Tà Dương Hóa Huyết Vân',
        description: 'Một loại ma công, cho phép người dùng hóa thành một vũng máu để di chuyển trong một khoảng cách ngắn, có thể chui qua các khe hẹp.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { speed: 50, daoTam: -10 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_van_dia_liet_thien_tuy_van': {
        id: 'tam_giai_van_dia_liet_thien_tuy_van', name: 'Địa Liệt Thiên Tùy Vân',
        description: 'Giúp người mang có được sự "ưu ái" của đại địa, có thể đi trên mọi địa hình hiểm trở (sa mạc, đầm lầy, núi tuyết) mà không bị giảm tốc độ.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.HA_PHAM,
        effects: { speed: 55 },
        elements: [Element.EARTH], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_van_kinh_loi_thinh_phong_van': {
        id: 'tam_giai_van_kinh_loi_thinh_phong_van', name: 'Kình Lôi Thính Phong Vân',
        description: 'Phát ra những sóng hạ âm mà tai người không nghe thấy. Bằng cách cảm nhận sóng phản xạ, người dùng có thể "nhìn thấy" mọi thứ xung quanh kể cả trong bóng tối hoặc khi bị che mắt.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { speed: 60 },
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_van_hoang_ngoc_bat_hu_van': {
        id: 'tam_giai_van_hoang_ngoc_bat_hu_van', name: 'Hoàng Ngọc Bất Hủ Vân',
        description: 'Đôi giày cực nặng, có thể "bám rễ" xuống đất. Một khi đã bám rễ, người mang không thể bị di chuyển bởi bất kỳ ngoại lực nào, trừ khi họ tự nhấc chân lên.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.HA_PHAM,
        effects: { physicalDefense: 2000, speed: -20 },
        elements: [Element.EARTH], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_van_huyen_quang_quang_minh_dao': {
        id: 'tam_giai_van_huyen_quang_quang_minh_dao', name: 'Huyễn Quang Quang Minh Đạo',
        description: 'Có khả năng tạo ra những con đường hoặc bậc thang bằng ánh sáng rắn, cho phép người dùng đi đến những nơi không thể tiếp cận.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.HA_PHAM,
        effects: { speed: 60 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_van_ta_duong_mong_yem_van': {
        id: 'tam_giai_van_ta_duong_mong_yem_van', name: 'Tà Dương Mộng Yểm Vân',
        description: 'Một đôi giày của thích khách, cho phép người dùng xâm nhập vào giấc mơ của những người đang ngủ ở gần đó.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { speed: 55, daoTam: -12 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_van_thai_cuong_luu_sa_van': {
        id: 'tam_giai_van_thai_cuong_luu_sa_van', name: 'Thái Cương Lưu Sa Vân',
        description: 'Cho phép người dùng biến mặt đất dưới chân thành một vùng xoáy cát lún bằng cát Thái Cương, vừa có thể giam cầm đối thủ, vừa tạo ra một lớp phòng thủ sắc bén.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.BOOTS, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        effects: { speed: 50 },
        elements: [Element.EARTH], requiredCultivation: CultivationStage.CORE_FORMATION
    },
};
