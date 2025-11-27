import { ItemQuality, EquipmentQuality, ItemType, Element, CultivationStage, WeaponType } from '../../types/index.ts';
import type { EquippableItem } from '../../types/index.ts';
import { NHI_GIAI_KIEM } from './vu-khi/nhi-giai-kiem.ts';
import { NHI_GIAI_DAO } from './vu-khi/nhi-giai-dao.ts';
import { NHI_GIAI_THUONG } from './vu-khi/nhi-giai-thuong.ts';
import { NHI_GIAI_CHAM } from './vu-khi/nhi-giai-cham.ts';
import { TAM_GIAI_KIEM } from './vu-khi/tam-giai-kiem.ts';
import { TAM_GIAI_DAO } from './vu-khi/tam-giai-dao.ts';
import { TAM_GIAI_THUONG } from './vu-khi/tam-giai-thuong.ts';
import { TAM_GIAI_CHAM } from './vu-khi/tam-giai-cham.ts';
import { TU_GIAI_KIEM } from './vu-khi/tu-giai-kiem.ts';
import { TU_GIAI_DAO } from './vu-khi/tu-giai-dao.ts';
import { TU_GIAI_THUONG } from './vu-khi/tu-giai-thuong.ts';
import { TU_GIAI_CHAM } from './vu-khi/tu-giai-cham.ts';

export const WEAPONS: { [key: string]: EquippableItem } = {
    // ========== NHẤT GIAI ==========
    'xich_dong_co_kiem': { id: 'xich_dong_co_kiem', name: 'Xích Đồng Cổ Kiếm', description: 'Thân kiếm màu đồng đỏ cổ xưa, bền bỉ và đáng tin cậy.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.HA_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 25 } },
    'tinh_thiet_trong_kiem': { id: 'tinh_thiet_trong_kiem', name: 'Tinh Thiết Trọng Kiếm', description: 'Cực kỳ nặng, sức chém kinh người, phù hợp với người có sức mạnh vượt trội.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 45, speed: -5 } },
    'luu_sa_kiem': { id: 'luu_sa_kiem', name: 'Lưu Sa Kiếm', description: 'Lưỡi kiếm lấp lánh ánh vàng, khi vung lên tạo ra ảo ảnh như cát chảy, vừa sắc bén vừa hoa lệ.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 30, speed: 2 } },
    'thanh_ngoc_nhuyen_kiem': { id: 'thanh_ngoc_nhuyen_kiem', name: 'Thanh Ngọc Nhuyễn Kiếm', description: 'Thân kiếm mềm dẻo, có thể uốn cong như roi, khó đoán và linh hoạt.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 28, magicalAttack: 10 } },
    'huyen_duong_kiem': { id: 'huyen_duong_kiem', name: 'Huyễn Dương Kiếm', description: 'Kiếm quang tạo ra ảo ảnh, gây nhiễu loạn thị giác của đối thủ.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 25, magicalAttack: 15 } },
    'han_bang_kiem': { id: 'han_bang_kiem', name: 'Hàn Băng Kiếm', description: 'Tỏa ra hàn khí lạnh buốt, có thể làm chậm và đóng băng vết thương của kẻ địch.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 30, magicalAttack: 25 }, elements: [Element.ICE] },
    'tat_phong_kiem': { id: 'tat_phong_kiem', name: 'Tật Phong Kiếm', description: 'Thân kiếm nhẹ, tốc độ ra đòn cực nhanh, như một cơn gió lốc.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 28, speed: 10 }, elements: [Element.WIND] },
    'loi_quang_kiem': { id: 'loi_quang_kiem', name: 'Lôi Quang Kiếm', description: 'Khi chém tạo ra tia sét, có khả năng gây tê liệt.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 30, magicalAttack: 30, critChance: 0.05 }, elements: [Element.LIGHTNING] },
    'thu_cot_kiem': { id: 'thu_cot_kiem', name: 'Thú Cốt Kiếm', description: 'Làm từ xương yêu thú, mang theo sát khí và sự hung hãn của dã thú.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 38 } },
    'thuy_van_kiem': { id: 'thuy_van_kiem', name: 'Thủy Vân Kiếm', description: 'Kiếm pháp uyển chuyển, nhẹ nhàng như mây trôi nước chảy.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 22, magicalAttack: 18 }, elements: [Element.WATER] },
    'thanh_ngoc_kiem': { id: 'thanh_ngoc_kiem', name: 'Thanh Ngọc Kiếm', description: 'Thân kiếm nhẹ, chuôi kiếm khảm Thanh Ngọc giúp dẫn dắt linh khí cực kỳ thuận lợi, tiêu hao ít. Là pháp khí tiêu chuẩn nhất cho tu sĩ Luyện Khí.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 20, magicalAttack: 20, manaRecoveryRate: 1.05 } },
    'song_sinh_kiem': { id: 'song_sinh_kiem', name: 'Song Sinh Kiếm', description: 'Một nửa thân kiếm có thể dẫn dắt hỏa linh khí, nửa còn lại dẫn dắt băng linh khí. Yêu cầu người dùng phải có khả năng kiểm soát linh khí tốt, nếu không sẽ tự làm mình bị thương.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 40 }, elements: [Element.FIRE, Element.ICE] },
    'xich_dong_phach_dao': { id: 'xich_dong_phach_dao', name: 'Xích Đồng Phách Đao', description: 'Lưỡi đao dày, chuyên dùng để bổ, chém với uy lực mạnh mẽ.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.HA_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 35 } },
    'tinh_thiet_cu_dao': { id: 'tinh_thiet_cu_dao', name: 'Tinh Thiết Cự Đao', description: 'To và nặng, dành cho những người tu luyện ngoại công, mỗi nhát chém có sức mạnh kinh hồn.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 50, speed: -6 } },
    'viem_kinh_dao': { id: 'viem_kinh_dao', name: 'Viêm Kình Đao', description: 'Lưỡi đao luôn rực lửa, có khả năng thiêu đốt mọi thứ nó chạm vào.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 30, magicalAttack: 20 }, elements: [Element.FIRE] },
    'loi_minh_dao': { id: 'loi_minh_dao', name: 'Lôi Minh Đao', description: 'Khi vung đao phát ra tiếng sấm rền, đao thế mang theo sức mạnh của sấm sét.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 35, magicalAttack: 25 }, elements: [Element.LIGHTNING] },
    'man_cot_dao': { id: 'man_cot_dao', name: 'Man Cốt Đao', description: 'Lưỡi đao lởm chởm như xương thú, mang theo sức mạnh hoang dã và man rợ.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 42 } },
    'giao_lan_dao': { id: 'giao_lan_dao', name: 'Giao Lân Đao', description: 'Thân đao được bao bọc bởi lớp vảy cứng, tăng cường độ bền và sức cắt.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 38, physicalDefense: 10 } },
    'toai_bang_dao': { id: 'toai_bang_dao', name: 'Toái Băng Đao', description: 'Cực kỳ sắc bén, có thể dễ dàng phá vỡ băng đá và các lớp phòng ngự hệ thủy.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 35 }, elements: [Element.ICE] },
    'huyen_anh_dao': { id: 'huyen_anh_dao', name: 'Huyễn Ảnh Đao', description: 'Đao quang biến ảo, tạo ra nhiều ảnh giả để đánh lừa đối thủ.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 30, speed: 5 } },
    'lang_nha_dao': { id: 'lang_nha_dao', name: 'Lang Nha Đao', description: 'Hình dạng như chiếc nanh sói khổng lồ, chuyên dùng để xé rách và xuyên phá.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 40, critChance: 0.05 } },
    'kim_sa_doan_hon_dao': { id: 'kim_sa_doan_hon_dao', name: 'Kim Sa Đoạn Hồn Đao', description: 'Ánh vàng chói lóa từ lưỡi đao có thể làm đối thủ mất phương hướng trong giây lát.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 33 } },
    'trong_thiet_dao': { id: 'trong_thiet_dao', name: 'Trọng Thiết Đao', description: 'Thân đao nặng trịch, không có hoa văn, chém xuống mang theo sức mạnh bạt sơn. Phù hợp với người tu luyện công pháp cương mãnh, rèn luyện thân thể.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 55, speed: -7 } },
    'le_sa_phach_dao': { id: 'le_sa_phach_dao', name: 'Lê Sa Phách Đao', description: 'Lưỡi đao được luyện vào vô số hạt Lê Kim Sa, cực kỳ sắc bén, có thể dễ dàng phá vỡ hộ thân linh khí mỏng manh của đối thủ cùng giai.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 40, magicalDefense: -10 } },
    'viem_duong_dao': { id: 'viem_duong_dao', name: 'Viêm Dương Đao', description: 'Khi灌入 linh khí, thân đao tỏa ra nhiệt độ cao, vết thương do nó gây ra sẽ có cảm giác bỏng rát. Ánh sáng từ Huyễn Dương Thạch có thể gây lóa mắt đối thủ trong giây lát.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 32, magicalAttack: 18 }, elements: [Element.FIRE] },
    'han_phong_dao': { id: 'han_phong_dao', name: 'Hàn Phong Đao', description: 'Chém ra mang theo hàn khí, làm chậm tốc độ của đối thủ. Phong Linh Thạch giúp tiếng đao rít lên trong gió, gây áp lực tâm lý.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 30, speed: 5 }, elements: [Element.ICE, Element.WIND] },
    'tinh_thiet_truong_thuong': { id: 'tinh_thiet_truong_thuong', name: 'Tinh Thiết Trường Thương', description: 'Thân thương cứng cáp, mũi thương sắc bén, là vũ khí tiêu chuẩn trên chiến trường.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.HA_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 30 } },
    'liet_hoa_thuong': { id: 'liet_hoa_thuong', name: 'Liệt Hỏa Thương', description: 'Mũi thương rực lửa, mỗi cú đâm đều mang theo sức nóng thiêu đốt.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 25, magicalAttack: 15 }, elements: [Element.FIRE] },
    'truy_phong_thuong': { id: 'truy_phong_thuong', name: 'Truy Phong Thương', description: 'Tốc độ đâm thương cực nhanh, như gió đuổi, khiến đối thủ không kịp phản ứng.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 28, speed: 8 }, elements: [Element.WIND] },
    'bon_loi_thuong': { id: 'bon_loi_thuong', name: 'Bôn Lôi Thương', description: 'Mũi thương tích tụ lôi điện, khi đâm ra tạo thành một tia sét mạnh mẽ.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 32, magicalAttack: 28 }, elements: [Element.LIGHTNING] },
    'xa_cot_thuong': { id: 'xa_cot_thuong', name: 'Xà Cốt Thương', description: 'Thân thương dẻo dai như xương rắn, mũi thương linh hoạt, khó lường.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 33 } },
    'thiet_nha_thuong': { id: 'thiet_nha_thuong', name: 'Thiết Nha Thương', description: 'Đơn giản, bền chắc, mũi thương được rèn nhọn cực độ. Uy lực hoàn toàn phụ thuộc vào sức mạnh của người sử dụng.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.HA_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 32 } },
    'xuyen_kim_thuong': { id: 'xuyen_kim_thuong', name: 'Xuyên Kim Thương', description: 'Mũi thương được luyện từ Lê Kim Sa, tăng cường khả năng xuyên phá. Có thể đâm thủng các loại giáp da yêu thú cấp thấp.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 38 } },
    'loi_nha_thuong': { id: 'loi_nha_thuong', name: 'Lôi Nha Thương', description: 'Mũi thương tích tụ Lôi điện. Khi đâm trúng mục tiêu sẽ phóng ra một luồng điện nhỏ gây tê liệt.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 30, magicalAttack: 15, critChance: 0.03 }, elements: [Element.LIGHTNING] },
    'ban_thach_thuong': { id: 'ban_thach_thuong', name: 'Bàn Thạch Thương', description: 'Cực kỳ nặng và bền, phòng ngự cũng tốt như tấn công. Khi đâm ra thế thương trầm ổn như núi, khó lòng bị đánh gạt.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 35, physicalDefense: 15, speed: -3 } },
    'tan_phong_thuong': { id: 'tan_phong_thuong', name: 'Tàn Phong Thương', description: 'Đâm ra tạo thành vô số thương ảnh, thật giả khó phân, lấy tốc độ bù lại sức mạnh.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 25, speed: 12 }, elements: [Element.WIND] },
    'bang_phach_cham': { id: 'bang_phach_cham', name: 'Băng Phách Châm', description: 'Khi trúng đích, hàn khí sẽ xâm nhập và đóng băng kinh mạch đối thủ.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 35 }, elements: [Element.ICE] },
    'hoa_cot_thuy_cham': { id: 'hoa_cot_thuy_cham', name: 'Hóa Cốt Thủy Châm', description: 'Mang theo độc tính ăn mòn, có thể làm tan chảy xương cốt.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 25 }, elements: [Element.WATER] },
    'vo_anh_huyen_cham': { id: 'vo_anh_huyen_cham', name: 'Vô Ảnh Huyễn Châm', description: 'Gần như trong suốt, rất khó để phát hiện bằng mắt thường khi được bắn ra.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 15, critChance: 0.1 } },
    'tan_loi_cham': { id: 'tan_loi_cham', name: 'Tàn Lôi Châm', description: 'Sau khi trúng đích sẽ phóng ra một luồng sét nhỏ gây tê liệt tạm thời.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 20, critChance: 0.08 }, elements: [Element.LIGHTNING] },
    'hoa_doc_cham': { id: 'hoa_doc_cham', name: 'Hỏa Độc Châm', description: 'Mũi châm được tôi luyện với hỏa độc, gây ra vết thương bỏng rát và đau đớn.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 30 }, elements: [Element.FIRE] },
    'pha_khi_cham': { id: 'pha_khi_cham', name: 'Phá Khí Châm', description: 'Cực kỳ sắc bén, chuyên dùng để tấn công vào các điểm yếu trên hộ thân linh khí của đối thủ.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 20 } },
    'han_suong_cham': { id: 'han_suong_cham', name: 'Hàn Sương Châm', description: 'Luyện từ tinh túy của Hàn Băng Thạch. Khi đâm vào cơ thể sẽ tỏa ra hàn độc, làm kinh mạch đối phương đông cứng.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 40 }, elements: [Element.ICE] },
    'loi_ma_cham': { id: 'loi_ma_cham', name: 'Lôi Ma Châm', description: 'Gây ra hiệu ứng tê liệt mạnh, dù chỉ sượt qua da cũng đủ làm một tu sĩ Luyện Khí Kỳ khựng lại.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 25, critChance: 0.1 }, elements: [Element.LIGHTNING] },
    'huyen_anh_cham': { id: 'huyen_anh_cham', name: 'Huyễn Ảnh Châm', description: 'Thân châm trong suốt, khi bay trong không khí gần như vô hình, cực kỳ khó phát hiện.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.TRUNG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { physicalAttack: 18 } },
    'truy_hon_cham': { id: 'truy_hon_cham', name: 'Truy Hồn Châm', description: 'Có thể dùng một tia thần niệm yếu ớt để điều khiển quỹ đạo của nó trong một khoảng cách ngắn sau khi phóng ra, tạo ra những đòn tấn công bất ngờ.', quality: ItemQuality.NHAT_GIAI, type: ItemType.WEAPON, equipmentQuality: EquipmentQuality.THUONG_PHAM, weaponType: WeaponType.PHAP_KHI, effects: { magicalAttack: 30 } },

    // ========== NHỊ GIAI ==========
    ...NHI_GIAI_KIEM,
    ...NHI_GIAI_DAO,
    ...NHI_GIAI_THUONG,
    ...NHI_GIAI_CHAM,
    'hac_thiet_kiem': {
        id: 'hac_thiet_kiem',
        name: 'Hắc Thiết Kiếm',
        description: 'Kiếm được rèn từ Hắc Thiết, vô cùng cứng rắn và nặng nề, phù hợp để cận chiến.',
        quality: ItemQuality.NHI_GIAI,
        type: ItemType.WEAPON,
        equipmentQuality: EquipmentQuality.TRUNG_PHAM,
        weaponType: WeaponType.PHAP_KHI,
        effects: { physicalAttack: 450, physicalDefense: 50, speed: -3 },
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT,
    },
     'tinh_van_phien': {
        id: 'tinh_van_phien',
        name: 'Tinh Vân Phiến',
        description: 'Một chiếc quạt pháp khí, có thể phóng ra cương phong, vừa có thể tấn công vừa có thể phòng thủ.',
        quality: ItemQuality.NHI_GIAI,
        type: ItemType.WEAPON,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        weaponType: WeaponType.PHAP_KHI,
        effects: { magicalAttack: 400, speed: 10 },
        elements: [Element.WIND],
        requiredCultivation: CultivationStage.FOUNDATION_ESTABLISHMENT,
    },

    // ========== TAM GIAI ==========
    ...TAM_GIAI_KIEM,
    ...TAM_GIAI_DAO,
    ...TAM_GIAI_THUONG,
    ...TAM_GIAI_CHAM,
    'thanh_truc_phong_van_kiem': {
        id: 'thanh_truc_phong_van_kiem',
        name: 'Thanh Trúc Phong Vân Kiếm',
        description: 'Một thanh phi kiếm được luyện chế từ Thanh Lôi Trúc ngàn năm, ẩn chứa sức mạnh của Mộc và Lôi.',
        quality: ItemQuality.TAM_GIAI,
        equipmentQuality: EquipmentQuality.HA_PHAM,
        type: ItemType.WEAPON,
        weaponType: WeaponType.PHAP_KHI,
        effects: { physicalAttack: 600, magicalAttack: 1800 },
        elements: [Element.WOOD, Element.LIGHTNING],
        requiredCultivation: CultivationStage.CORE_FORMATION,
        history: 'Được luyện chế từ ngàn năm "Thanh Lôi trúc", 20 năm dùng lục dịch thúc chín, tổng cộng thúc chín được 6 cây. (Trích Phàm Nhân Tu Tiên truyện)'
    },
    'phan_hon_chuyen': {
        id: 'phan_hon_chuyen',
        name: 'Phệ Hồn Châm',
        description: 'Một bộ kim châm độc địa, chuyên dùng để tấn công nguyên thần của đối phương, vô cùng âm hiểm.',
        quality: ItemQuality.TAM_GIAI,
        equipmentQuality: EquipmentQuality.THUONG_PHAM,
        type: ItemType.WEAPON,
        weaponType: WeaponType.PHAP_KHI,
        effects: { magicalAttack: 2500, critChance: 0.15 },
        requiredCultivation: CultivationStage.CORE_FORMATION,
    },

    // ========== TỨ GIAI ==========
    ...TU_GIAI_KIEM,
    ...TU_GIAI_DAO,
    ...TU_GIAI_THUONG,
    ...TU_GIAI_CHAM,
};