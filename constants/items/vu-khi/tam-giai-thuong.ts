import { ItemQuality, EquipmentQuality, ItemType, Element, CultivationStage, WeaponType } from '../../../types/index.ts';
import type { EquippableItem } from '../../../types/index.ts';

export const TAM_GIAI_THUONG: { [key: string]: EquippableItem } = {
    'tam_giai_thuong_tinh_van_pha_gioi_thuong': {
        id: 'tam_giai_thuong_tinh_van_pha_gioi_thuong', name: 'Tinh Vân Phá Giới Thương',
        description: 'Mũi thương sắc bén đến mức có thể đâm vào các điểm yếu của không gian, tạo ra những đòn tấn công xuyên không gian ở cự ly ngắn, xuất hiện ngay bên cạnh đối thủ.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 4500, critChance: 0.1 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_thuong_xich_diem_giao_long_thuong': {
        id: 'tam_giai_thuong_xich_diem_giao_long_thuong', name: 'Xích Diễm Giao Long Thương',
        description: 'Thân thương như xương rồng, mũi thương như nanh rồng, khi đâm ra tạo thành một con hỏa long gầm thét, thiêu đốt vạn vật.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 3000, magicalAttack: 2800 },
        elements: [Element.FIRE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_thuong_kinh_loi_chan_hai_thuong': {
        id: 'tam_giai_thuong_kinh_loi_chan_hai_thuong', name: 'Kình Lôi Chấn Hải Thương',
        description: 'Một cây trường thương có sức mạnh của sấm sét và biển cả. Mỗi cú vung thương tạo ra sóng âm và lôi điện, có thể làm rung chuyển cả một vùng biển lớn.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 3200, magicalAttack: 2500 },
        elements: [Element.LIGHTNING, Element.WATER], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_thuong_hoang_long_dia_liet_thuong': {
        id: 'tam_giai_thuong_hoang_long_dia_liet_thuong', name: 'Hoàng Long Địa Liệt Thương',
        description: 'Mang sức mạnh của hoàng long trong truyền thuyết, có khả năng điều khiển đất đá, tạo ra những mũi thương đất từ mặt đất để tấn công kẻ địch.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 4000 },
        elements: [Element.EARTH], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_thuong_tram_ngan_minh_ha_thuong': {
        id: 'tam_giai_thuong_tram_ngan_minh_ha_thuong', name: 'Trầm Ngân Minh Hà Thương',
        description: 'Hàn khí của thương có thể đóng băng cả dòng chảy linh lực trong cơ thể, kéo linh hồn của đối thủ vào trạng thái "vĩnh tịch" như rơi xuống sông Minh Hà dưới cửu tuyền.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 4800 },
        elements: [Element.ICE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_thuong_thai_cuong_quan_tran_thuong': {
        id: 'tam_giai_thuong_thai_cuong_quan_tran_thuong', name: 'Thái Cương Quán Trận Thương',
        description: 'Mũi thương được luyện chế để tập trung toàn bộ sức mạnh vào một điểm duy nhất, chuyên dùng để phá vỡ các mắt trận và các loại trận pháp phòng ngự.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 5200 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_thuong_ngu_hanh_luan_chuyen_thuong': {
        id: 'tam_giai_thuong_ngu_hanh_luan_chuyen_thuong', name: 'Ngũ Hành Luân Chuyển Thương',
        description: 'Mũi thương có thể liên tục luân chuyển qua năm thuộc tính với tốc độ cực nhanh, khiến cho các loại phòng ngự đơn thuộc tính trở nên vô dụng.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 2500, magicalAttack: 2500 },
        elements: [Element.METAL, Element.WOOD, Element.WATER, Element.FIRE, Element.EARTH], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_thuong_ma_lan_doc_long_thuong': {
        id: 'tam_giai_thuong_ma_lan_doc_long_thuong', name: 'Ma Lân Độc Long Thương',
        description: 'Mũi thương tẩm kịch độc của ma long, chuyên phá hủy hộ thể chân khí. Vết thương do nó gây ra sẽ khiến linh lực của đối thủ bị ăn mòn và mục rữa.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 4000, magicalDefense: -800 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_thuong_ta_duong_thien_phat_thuong': {
        id: 'tam_giai_thuong_ta_duong_thien_phat_thuong', name: 'Tà Dương Thiên Phạt Thương',
        description: 'Có thể dẫn động năng lượng của Tà Dương Kim, triệu hồi một cột sáng màu đen từ trên trời giáng xuống, mang theo năng lượng ăn mòn và hủy diệt.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 5000, daoTam: -15 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_thuong_tinh_van_luu_quang_thuong': {
        id: 'tam_giai_thuong_tinh_van_luu_quang_thuong', name: 'Tinh Vân Lưu Quang Thương',
        description: 'Có khả năng đặc biệt là tan rã thành một luồng ánh sao trong khoảnh khắc để đi xuyên qua các vật cản vật lý, sau đó tái định hình lại để tấn công từ bên trong.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 4200 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_thuong_huyen_bang_cuu_long_thuong': {
        id: 'tam_giai_thuong_huyen_bang_cuu_long_thuong', name: 'Huyễn Băng Cửu Long Thương',
        description: 'Khi múa thương, có thể tạo ra ảo ảnh của chín con rồng băng khổng lồ từ chín hướng khác nhau đồng loạt tấn công, khiến đối thủ không biết đâu là thật, đâu là giả.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 4600 },
        elements: [Element.ICE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_thuong_tram_ngan_doat_hon_thuong': {
        id: 'tam_giai_thuong_tram_ngan_doat_hon_thuong', name: 'Trầm Ngân Đoạt Hồn Thương',
        description: 'Một cây ma thương cực kỳ nguy hiểm. Nếu bị mũi thương đâm trúng và giữ lại trong giây lát, nó có thể kéo linh hồn của nạn nhân ra khỏi thể xác.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 3000, magicalAttack: 3000 },
        elements: [Element.ICE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_thuong_ta_duong_liet_nhat_thuong': {
        id: 'tam_giai_thuong_ta_duong_liet_nhat_thuong', name: 'Tà Dương Liệt Nhật Thương',
        description: 'Có thể ngưng tụ năng lượng tại mũi thương để tạo ra một "mặt trời" nhỏ màu đen, bắn ra những chùm tia sáng hắc ám có sức ăn mòn và nhiệt độ cực cao.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 5300 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_thuong_dia_liet_ban_long_thuong': {
        id: 'tam_giai_thuong_dia_liet_ban_long_thuong', name: 'Địa Liệt Bàn Long Thương',
        description: 'Có thể điều khiển đất đá. Khi đâm mũi thương xuống đất, có thể khiến mặt đất bên dưới đối thủ trồi lên, hóa thành một con rồng đất cuộn lại và giam cầm họ.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 4300 },
        elements: [Element.EARTH], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_thuong_xich_diem_long_tuc_thuong': {
        id: 'tam_giai_thuong_xich_diem_long_tuc_thuong', name: 'Xích Diễm Long Tức Thương',
        description: 'Có khả năng tích tụ hỏa linh khí trong không khí và bắn ra một luồng lửa hình nón cực mạnh từ mũi thương, mô phỏng lại hơi thở của rồng.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 4900 },
        elements: [Element.FIRE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_thuong_hoang_ngoc_nguc_long_thuong': {
        id: 'tam_giai_thuong_hoang_ngoc_nguc_long_thuong', name: 'Hoàng Ngọc Ngục Long Thương',
        description: 'Khi đâm xuống đất, có thể triệu hồi một con rồng đất khổng lồ. Con rồng này rỗng ruột và sẽ quấn lấy mục tiêu, tạo thành một nhà tù bằng ngọc thạch để giam cầm đối thủ.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 3800, physicalDefense: 1200 },
        elements: [Element.EARTH], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_thuong_kinh_loi_tu_bao_thuong': {
        id: 'tam_giai_thuong_kinh_loi_tu_bao_thuong', name: 'Kình Lôi Từ Bạo Thương',
        description: 'Mũi thương có thể giải phóng một xung điện từ cực mạnh, làm tê liệt và vô hiệu hóa các loại khôi lỗi, con rối và pháp bảo bằng kim loại trong phạm vi lớn.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 4700 },
        elements: [Element.LIGHTNING], requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_thuong_huyen_quang_thanh_ca_thuong': {
        id: 'tam_giai_thuong_huyen_quang_thanh_ca_thuong', name: 'Huyễn Quang Thánh Ca Thương',
        description: 'Một cây thương ánh sáng có thể "hát". Khi chiến đấu, nó phát ra những giai điệu thánh ca giúp tăng cường sĩ khí cho đồng minh và làm suy yếu ý chí của yêu ma.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.HA_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 3000, daoTam: 10 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_thuong_hang_tinh_tinh_van_thuong': {
        id: 'tam_giai_thuong_hang_tinh_tinh_van_thuong', name: 'Hằng Tinh Tinh Vân Thương',
        description: 'Có thể cắm xuống đất để tạo ra một "mỏ neo" không gian. Trong vòng một canh giờ, người dùng có thể kích hoạt để dịch chuyển tức thời về lại vị trí của cây thương, bất kể đang ở đâu.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 4000, speed: 50 },
        requiredCultivation: CultivationStage.CORE_FORMATION
    },
    'tam_giai_thuong_phung_hoang_xich_diem_thuong': {
        id: 'tam_giai_thuong_phung_hoang_xich_diem_thuong', name: 'Phụng Hoàng Xích Diễm Thương',
        description: 'Mang theo đặc tính niết bàn của phượng hoàng. Người dùng có thể hy sinh cây thương để tạo ra một vụ nổ lửa hủy diệt. Sau 24 giờ, cây thương sẽ từ từ tái tạo lại trong tay chủ nhân.',
        quality: ItemQuality.TAM_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 6000 },
        elements: [Element.FIRE], requiredCultivation: CultivationStage.CORE_FORMATION
    },
};
