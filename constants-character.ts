import {
    CultivationStage, Element, PhysiqueTier, Gender,
    SpiritualRootType, CombatStats
} from './types/index.ts';

export const SKIN_COLORS = ['#f3d9b7', '#e2c5a2', '#cfae8b', '#b9956f', '#a17c5b', '#846649'];

export const GENERATION_NAMES = ["Thái", "Sơ", "Uẩn", "Tiên", "Lộ", "Trường", "Thanh", "Hữu", "Cảnh", "Minh"];

type AvatarPartCollection = {
    BASE: string[];
    EYES: string[];
    HAIR: string[];
    MOUTH: string[];
    ACCESSORY: string[];
};
type AvatarAgeGroup = {
    CHILD: AvatarPartCollection;
    TEEN: AvatarPartCollection;
    ADULT: AvatarPartCollection;
};
export const AVATAR_PARTS: Record<Gender, AvatarAgeGroup> = {
    [Gender.MALE]: {
        CHILD: { BASE: ['<path d="M12,7 C 8,7 6,9 6,14 C 6,19.5 9,21.5 12,21.5 S 18,19.5 18,14 C 18,9 16,7 12,7 Z"/>'], EYES: ['<circle cx="9.5" cy="13.5" r="1.2" fill="#2c1e15"/><circle cx="14.5" cy="13.5" r="1.2" fill="#2c1e15"/>', '<path d="M9,13.5 h1.5 m4,0 h1.5" stroke="#2c1e15" stroke-width="0.8" stroke-linecap="round"/>'], HAIR: ['<path d="M7,13a5,5,0,0,1,10,0V10a5,5,0,0,0-10,0Z" fill="#3a3a3a"/>', '<path d="M8,9 a4,4,0,0,1,8,0 l-1,4h-6Z" fill="#2a2a2a"/>', '<path d="M12,7.5 Q 15,8 16,12.5 H 8 Q 9,8 12,7.5 Z" fill="#4a3a3a"/>', '<path d="M7,12.5 C 7,9 9,7.5 12,7.5 C 15,7.5 17,9 17,12.5 H 7 Z" fill="#332a24"/>'], MOUTH: ['<path d="M10.5,16.5 q1.5,0.5,3,0" fill="none" stroke="#2c1e15" stroke-width="0.5"/>'], ACCESSORY: [''] },
        TEEN: { BASE: ['<path d="M12,6 C 7,6 5,9 5,15 C 5,21 8,22.5 12,22.5 S 19,21 19,15 C 19,9 17,6 12,6 Z"/>'], EYES: ['<path d="M8.5,14 h3" stroke="#2c1e15" stroke-width="1"/><path d="M13.5,14 h3" stroke="#2c1e15" stroke-width="1"/>', '<path d="M8,14 c 1,0,1.5,0.5,2.5,0.5 m3,0 c 1,0,1.5,-0.5,2.5,-0.5" stroke="#2c1e15" stroke-width="0.8" fill="none" />'], HAIR: ['<path d="M6,13a6,6,0,0,1,12,0v-2a6,4,0,0,0-12,0Z" fill="#594236"/>', '<path d="M5,13 L5,8 Q 12,4 19,8 L 19,13 A 7,7 0,0,1,5,13 Z" fill="#2e2e2e" />', '<path d="M12,4 Q 14,7 15,12 H 9 Q 10,7 12,4 Z" fill="#333" /><path d="M6,12a6,6,0,0,1,12,0h-12Z" fill="#333"/>', '<path d="M6,13 C 6,9 8,6 12,6 C 16,6 18,9 18,13 H 6 Z" fill="#3d2314" />', '<path d="M12,5 l-6,7h12Z M7,12.5 l5,5 5-5 Z" fill="#444" />'], MOUTH: ['<path d="M10.5,17 h3" fill="none" stroke="#2c1e15" stroke-width="0.6"/>'], ACCESSORY: ['', '<path d="M12,7 l1-1.5,1,1.5" stroke="#d4af37" fill="none" stroke-width="0.5"/>', '<circle cx="12" cy="6" r="0.8" fill="#a89984" />'] },
        ADULT: { BASE: ['<path d="M12,5.5 C 6,5.5 4.5,9 4.5,15 C 4.5,21.5 7.5,23 12,23 S 19.5,21.5 19.5,15 C 19.5,9 18,5.5 12,5.5 Z"/>'], EYES: ['<path d="M7.5,14.5 h3.5" stroke="#2c1e15" stroke-width="1.1"/><path d="M13.5,14.5 h3.5" stroke="#2c1e15" stroke-width="1.1"/>', '<path d="M7,14.5 c 1.5,-0.5,3,0,3,0" stroke="#2c1e15" stroke-width="0.9" fill="none" /><path d="M14,14.5 c 1.5,-0.5,3,0,3,0" stroke="#2c1e15" stroke-width="0.9" fill="none" />', '<path d="M7.5,14.5 c1.5,0,2.5,0.8,3.5,0.5 m2,0 c1.5,0,2.5-0.8,3.5,-0.5" stroke="#2c1e15" stroke-width="0.8" fill="none" />'], HAIR: ['<path d="M4,13 C4,7,6,3,12,3s8,4,8,10h-16z M4,13.5h16v-2h-16z" fill="#1e1e1e"/>', '<path d="M12,3 Q 15,8 16,13 H 8 Q 9,8 12,3 Z" fill="#2e2e2e" /><path d="M5,12.5a7,7,0,0,1,14,0h-14Z" fill="#2e2e2e"/>', '<path d="M12,3.5 l -4,10 h 8 z" fill="#4a4a4a"/> <path d="M5,12.5a7,7,0,0,1,14,0h-14Z" fill="#4a4a4a"/>', '<path d="M5,13 L5,7 L12,3 L19,7 L19,13 A 7,7 0,0,1 5,13 Z" fill="#222"/>', '<path d="M5,14 C 5,8 7,5 12,5 C 17,5 19,8 19,14 H5Z M4,13 h16 v-2 H4Z" fill="#3d2314"/>', '<path d="M12,3.5 L12,13.5 M12,3.5 L6,10 M12,3.5 L18,10 M5,12.5a7,7,0,0,1,14,0h-14Z" fill="#3a3a3a"/>'], MOUTH: ['<path d="M10,18 h4" fill="none" stroke="#2c1e15" stroke-width="0.8"/>', '<path d="M10.5,17.5 q3,0.5,3,0" fill="none" stroke="#2c1e15" stroke-width="0.7"/>'], ACCESSORY: ['', '<path d="M11,4l1-2,1,2" stroke="#d4af37" fill="none"/>', '<path d="M2.5,10 h2 m15,0 h2" stroke-width="0.8" stroke="#504945"/>', '<circle cx="12" cy="7" r="1.1" fill="#b16286"/>', '<path d="M12,6.5 m-1,0 a1,1,0,1,0 2,0 a1,1,0,1,0 -2,0" stroke="#cc241d" stroke-width="0.5" fill="none" />'] }
    },
    [Gender.FEMALE]: {
        CHILD: { BASE: ['<path d="M12,7 C 8,7 6,9 6,14 C 6,19.5 9,21.5 12,21.5 S 18,19.5 18,14 C 18,9 16,7 12,7 Z"/>'], EYES: ['<circle cx="9.5" cy="13.5" r="1.4" fill="#4a2e2a"/><circle cx="14.5" cy="13.5" r="1.4" fill="#4a2e2a"/>', '<path d="M8.5,14 a 1.5,1.5 0 0 0 3,0 m2.5,0 a 1.5,1.5 0 0 0 3,0" stroke="#4a2e2a" stroke-width="0.8" fill="none" />'], HAIR: ['<path d="M7,13 C 7,10,8,8.5,12,8.5 C 16,8.5,17,10,17,13 Z M6,12.5 h12 v-1 h-12 Z" fill="#c17d52"/>', '<path d="M8,12a4,4,0,0,1,8,0h-8Z M7,11.5a5,5,0,0,1,10,0V10a5,5,0,0,0-10,0Z" fill="#693d2b"/>', '<path d="M8,8 a4,4,0,0,1,8,0 l -1,5 h-6 Z" fill="#8d5524"/>'], MOUTH: ['<path d="M11,16.5 a1,1,0,0,1,2,0" fill="#c12127"/>', '<path d="M11,16.5 q2,0.2,2,0" fill="none" stroke="#4a2e2a" stroke-width="0.5"/>'], ACCESSORY: ['', '<path d="M15,8 a1,1,0,0,0,2,0" fill="#fe8019"/>'] },
        TEEN: { BASE: ['<path d="M12,6 C 7,6 5,9 5,15 C 5,21 8,22.5 12,22.5 S 19,21 19,15 C 19,9 17,6 12,6 Z"/>'], EYES: ['<path d="M8.5,14 c1,-0.8,2,0,2,0 m3,0 c1,-0.8,2,0,2,0" stroke="#4a2e2a" stroke-width="0.9" fill="none"/>', '<path d="M8,14.5 c 1,0.5,1.5,0.5,2.5,0 m3,0 c 1,0.5,1.5,0.5,2.5,0" stroke="#4a2e2a" stroke-width="0.8" fill="none" />'], HAIR: ['<path d="M5,13 C5,8,7,4,12,4s7,4,7,8z" fill="#8d5524"/>', '<path d="M5,13.5 C5,8,7,4,12,4s7,4,7,8z M19,11 a2,2,0,0,1,-4,0 h-6 a2,2,0,0,1,-4,0" fill="#693d2b"/>', '<path d="M5,13 L5,7 L12,3 L19,7 L19,13 A 7,7 0,0,1 5,13 Z" fill="#3d2314" />', '<path d="M12,4 Q 14,7 15,12 H 9 Q 10,7 12,4 Z" fill="#c17d52" /><path d="M6,12.5a6,6,0,0,1,12,0h-12Z" fill="#c17d52"/>', '<path d="M4.5,10 l-1,-6 h17 l-1,6 a8,8,0,0,1-15,0 Z" fill="#504945" />'], MOUTH: ['<path d="M10.5,17.5 q3,0.3,3,0" fill="none" stroke="#4a2e2a" stroke-width="0.6"/>', '<path d="M11,17.5 a1,0.8,0,0,0,2,0" fill="#d65d0e" />'], ACCESSORY: ['', '<path d="M4,8 l2,2 -2,2" stroke="#8ec07c" fill="none" stroke-width="0.8"/>', '<circle cx="12" cy="7.5" r="1.1" fill="#b16286" opacity="0.8"/>', '<path d="M15,8 l2,1 -2,1" stroke="#d5c4a1" fill="none" stroke-width="0.7"/> <path d="M9,8 l-2,1 2,1" stroke="#d5c4a1" fill="none" stroke-width="0.7"/>'] },
        ADULT: { BASE: ['<path d="M12,5.5 C 6,5.5 4.5,9 4.5,15 C 4.5,21.5 7.5,23 12,23 S 19.5,21.5 19.5,15 C 19.5,9 18,5.5 12,5.5 Z"/>'], EYES: ['<path d="M7.5,14.5 c 1.5,-1,3,0,3,0" stroke="#4a2e2a" stroke-width="1" fill="none" /><path d="M13.5,14.5 c 1.5,-1,3,0,3,0" stroke="#4a2e2a" stroke-width="1" fill="none" />', '<path d="M7,14.5 c 1,0.5,2,0.5,3,0" stroke="#4a2e2a" stroke-width="0.9" fill="none" /><path d="M14,14.5 c 1,0.5,2,0.5,3,0" stroke="#4a2e2a" stroke-width="0.9" fill="none" />', '<path d="M7.5,15 a2.5 2.5 0 0 0 4 0 m1 0 a2.5 2.5 0 0 0 4 0" stroke="#4a2e2a" stroke-width="0.8" fill="none" />'], HAIR: ['<path d="M4,13 C4,7,6,3,12,3s8,4,8,10z M4,13.5h16v-2h-16z" fill="#3d2314"/>', '<path d="M4,13.5 C3,8,5,4,12,4 C19,4,21,8,20,13.5 H4Z" fill="#594236"/>', '<path d="M12,3.5 l -4,10 h 8 z" fill="#c17d52"/> <path d="M5,13a7,7,0,0,1,14,0h-14Z" fill="#c17d52"/>', '<path d="M5,13 L5,7 L12,3 L19,7 L19,13 A 7,7 0,0,1 5,13 Z" fill="#4a4a4a" />', '<path d="M4,13 C4,6,7,2,12,2s8,4,8,11v-1a4,4,0,0,0-4-4h-8a4,4,0,0,0-4,4v1Z" fill="#2e2e2e" />'], MOUTH: ['<path d="M10.5,18 a1.5,1,0,0,0,3,0" fill="#d65d0e" />', '<path d="M10.5,18 q3,-0.3,3,0" fill="none" stroke="#4a2e2a" stroke-width="0.7"/>'], ACCESSORY: ['', '<circle cx="4" cy="11" r="1" fill="#83a598"/>', '<circle cx="20" cy="11" r="1" fill="#83a598"/>', '<path d="M12,7.5 m -1,0 a 1.2,1.2 0 1,0 2.4,0 a 1.2,1.2 0 1,0 -2.4,0" stroke="#8ec07c" fill="none" stroke-width="0.6"/>', '<path d="M12,6.5 m-1.5,0 a1.5,1.5 0 1,0 3,0 a1.5,1.5 0 1,0 -3,0" fill="#fabd2f" opacity="0.7" />', '<path d="M9,4 l-1-2 2,1 -1,1 z" fill="#b16286"/>'] }
    }
};

export const FIRST_NAMES = ["Sơn", "Hải", "Nguyệt", "Linh", "Vân", "Long", "Phượng", "Hạo", "Thiên", "Lam", "Bích", "Tuyết", "Phong", "Vũ", "Minh", "Nhật", "Huyền", "Trúc", "Cúc", "Mai", "Tùng", "Bách", "Hưng", "An", "Bình", "Châu", "Dũng", "Giang", "Hà", "Khải"];
export const PERSONALITIES = ["Cẩn Trọng", "Hào Hùng", "Bá Đạo", "Lương Thiện", "Kiêu Ngạo", "Khiêm Tốn", "Lạnh Lùng", "Nhiệt Huyết", "Mưu Trí", "Đa Nghi", "Tham Lam"];
export const PHYSIQUES: Record<string, { name: string; tier: PhysiqueTier; description: string; effects: { cultivationSpeedModifier: number; healthModifier: number; manaModifier: number; lifespanModifier: number; combatStatModifiers?: Partial<Record<keyof CombatStats, number>>; } }> = {
    'BÌNH PHÀM CHI THỂ': { name: 'Bình Phàm Chi Thể', tier: PhysiqueTier.COMMON, description: 'Không có gì đặc biệt, là thể chất phổ biến nhất trong nhân gian.', effects: { cultivationSpeedModifier: 1, healthModifier: 1, manaModifier: 1, lifespanModifier: 1 } },
    'TRÁNG KIỆN CHI THỂ': { name: 'Tráng Kiện Chi Thể', tier: PhysiqueTier.COMMON, description: 'Khí huyết dồi dào, thân thể cường tráng hơn người thường.', effects: { cultivationSpeedModifier: 1, healthModifier: 1.15, manaModifier: 1, lifespanModifier: 1 } },
    'THANH LINH CHI THỂ': { name: 'Thanh Linh Chi Thể', tier: PhysiqueTier.COMMON, description: 'Thân thể nhẹ nhàng, cảm ứng linh khí tốt hơn một chút.', effects: { cultivationSpeedModifier: 1.05, healthModifier: 1, manaModifier: 1.1, lifespanModifier: 1 } },
    'KIM LINH THỂ': { name: 'Kim Linh Thể', tier: PhysiqueTier.SPIRIT, description: 'Thân hòa với Kim thuộc tính linh khí, tu luyện công pháp hệ Kim có hiệu quả cao.', effects: { cultivationSpeedModifier: 1.2, healthModifier: 1.1, manaModifier: 1.1, lifespanModifier: 1.05, combatStatModifiers: { physicalAttack: 1.1, physicalDefense: 1.1 } } },
    'MỘC LINH THỂ': { name: 'Mộc Linh Thể', tier: PhysiqueTier.SPIRIT, description: 'Sinh cơ dồi dào, khả năng hồi phục mạnh mẽ.', effects: { cultivationSpeedModifier: 1.2, healthModifier: 1.25, manaModifier: 1.1, lifespanModifier: 1.1 } },
    'THỦY LINH THỂ': { name: 'Thủy Linh Thể', tier: PhysiqueTier.SPIRIT, description: 'Thân hòa với Thủy thuộc tính linh khí, linh lực mềm mại và dồi dào.', effects: { cultivationSpeedModifier: 1.2, healthModifier: 1.1, manaModifier: 1.25, lifespanModifier: 1.05 } },
    'HỎA LINH THỂ': { name: 'Hỏa Linh Thể', tier: PhysiqueTier.SPIRIT, description: 'Không sợ lửa thường, tính cách nóng nảy, tu luyện công pháp hệ Hỏa cực nhanh.', effects: { cultivationSpeedModifier: 1.2, healthModifier: 1.1, manaModifier: 1.1, lifespanModifier: 1.05, combatStatModifiers: { magicalAttack: 1.15 } } },
    'THỔ LINH THỂ': { name: 'Thổ Linh Thể', tier: PhysiqueTier.SPIRIT, description: 'Lực phòng ngự kinh người, vững như bàn thạch.', effects: { cultivationSpeedModifier: 1.2, healthModifier: 1.2, manaModifier: 1.1, lifespanModifier: 1.05, combatStatModifiers: { physicalDefense: 1.2, magicalDefense: 1.1 } } },
    'CỰ LỰC THỂ': { name: 'Cự Lực Thể', tier: PhysiqueTier.SPIRIT, description: 'Trời sinh thần lực, sức mạnh thể chất vượt xa người cùng cấp.', effects: { cultivationSpeedModifier: 1.1, healthModifier: 1.3, manaModifier: 1, lifespanModifier: 1, combatStatModifiers: { physicalAttack: 1.2 } } },
    'NGỌC CỐT THỂ': { name: 'Ngọc Cốt Thể', tier: PhysiqueTier.EARTH, description: 'Xương cốt như ngọc, tạp chất trong cơ thể cực ít, tu luyện thuận lợi.', effects: { cultivationSpeedModifier: 1.35, healthModifier: 1.2, manaModifier: 1.2, lifespanModifier: 1.15 } },
    'BĂNG CƠ THỂ': { name: 'Băng Cơ Thể', tier: PhysiqueTier.EARTH, description: 'Da thịt như băng, không nhiễm bụi trần, hấp dẫn dị tính.', effects: { cultivationSpeedModifier: 1.3, healthModifier: 1.15, manaModifier: 1.3, lifespanModifier: 1.15 } },
    'KIẾM TÂM THÔNG MINH': { name: 'Kiếm Tâm Thông Minh', tier: PhysiqueTier.EARTH, description: 'Sinh ra để dùng kiếm, lĩnh ngộ kiếm pháp cực nhanh.', effects: { cultivationSpeedModifier: 1.3, healthModifier: 1.1, manaModifier: 1.1, lifespanModifier: 1.1, combatStatModifiers: { physicalAttack: 1.25, critChance: 1.1 } } },
    'LÔI LINH THỂ': { name: 'Lôi Linh Thể', tier: PhysiqueTier.EARTH, description: 'Có thể dẫn Lôi điện rèn thể, tốc độ như tia chớp.', effects: { cultivationSpeedModifier: 1.4, healthModifier: 1.2, manaModifier: 1.2, lifespanModifier: 1.15, combatStatModifiers: { critChance: 1.15, critDamage: 1.1 } } },
    'BÁCH ĐỘC BẤT XÂM': { name: 'Bách Độc Bất Xâm', tier: PhysiqueTier.EARTH, description: 'Miễn nhiễm với hầu hết các loại độc dược thông thường.', effects: { cultivationSpeedModifier: 1.25, healthModifier: 1.2, manaModifier: 1.2, lifespanModifier: 1.2, combatStatModifiers: { magicalDefense: 1.2 } } },
    'THÁI ÂM CHI THỂ': { name: 'Thái Âm Chi Thể', tier: PhysiqueTier.HEAVEN, description: 'Hấp thu nguyệt hoa để tu luyện, tốc độ trong đêm tối tăng gấp bội.', effects: { cultivationSpeedModifier: 1.6, healthModifier: 1.3, manaModifier: 1.5, lifespanModifier: 1.3, combatStatModifiers: { magicalAttack: 1.2, magicalDefense: 1.2 } } },
    'THÁI DƯƠNG CHI THỂ': { name: 'Thái Dương Chi Thể', tier: PhysiqueTier.HEAVEN, description: 'Hấp thu nhật tinh để tu luyện, khí huyết cương dương, bá đạo vô song.', effects: { cultivationSpeedModifier: 1.6, healthModifier: 1.5, manaModifier: 1.3, lifespanModifier: 1.3, combatStatModifiers: { physicalAttack: 1.2, physicalDefense: 1.2 } } },
    'VẠN KIẾM THỂ': { name: 'Vạn Kiếm Thể', tier: PhysiqueTier.HEAVEN, description: 'Là kiếm tu thiên tài nhất, bất kỳ kiếm kỹ nào cũng có thể học được.', effects: { cultivationSpeedModifier: 1.5, healthModifier: 1.3, manaModifier: 1.3, lifespanModifier: 1.25, combatStatModifiers: { physicalAttack: 1.4, critChance: 1.2, critDamage: 1.15 } } },
    'TINH THẦN THỂ': { name: 'Tinh Thần Thể', tier: PhysiqueTier.HEAVEN, description: 'Có thể câu thông với tinh辰, mượn lực lượng của các vì sao để tu luyện và chiến đấu.', effects: { cultivationSpeedModifier: 1.7, healthModifier: 1.3, manaModifier: 1.6, lifespanModifier: 1.35 } },
    'BẤT DIỆT THỂ': { name: 'Bất Diệt Thể', tier: PhysiqueTier.SAINT, description: 'Khả năng tái sinh gần như vô hạn, chỉ cần một giọt máu cũng có thể trọng sinh.', effects: { cultivationSpeedModifier: 1.8, healthModifier: 2, manaModifier: 1.5, lifespanModifier: 1.5 } },
    'HỖN ĐỘN THỂ': { name: 'Hỗn Độn Thể', tier: PhysiqueTier.SAINT, description: 'Thể chất gần với đại đạo nhất, có thể tu luyện bất kỳ loại công pháp nào, không bị xung đột.', effects: { cultivationSpeedModifier: 2, healthModifier: 1.6, manaModifier: 1.6, lifespanModifier: 1.4, combatStatModifiers: { physicalAttack: 1.2, magicalAttack: 1.2, physicalDefense: 1.2, magicalDefense: 1.2 } } },
    'THIÊN YÊU THỂ': { name: 'Thiên Yêu Thể', tier: PhysiqueTier.SAINT, description: 'Mang huyết mạch của Yêu tộc thượng cổ, có thể thi triển một số thiên phú thần thông của yêu thú.', effects: { cultivationSpeedModifier: 1.9, healthModifier: 1.8, manaModifier: 1.5, lifespanModifier: 1.4 } },
    'THÁNH LINH ĐẠO THỂ': { name: 'Thánh Linh Đạo Thể', tier: PhysiqueTier.SAINT, description: 'Trời sinh đã gần gũi với Đạo, tốc độ lĩnh ngộ thiên địa pháp tắc cực nhanh.', effects: { cultivationSpeedModifier: 2.2, healthModifier: 1.5, manaModifier: 1.8, lifespanModifier: 1.5 } },
    'HỒNG MÔNG ĐẠO THỂ': { name: 'Hồng Mông Đạo Thể', tier: PhysiqueTier.DIVINE, description: 'Thể chất đứng đầu vũ trụ, sinh ra từ khí Hồng Mông, là con cưng của Đại Đạo.', effects: { cultivationSpeedModifier: 3, healthModifier: 2, manaModifier: 2, lifespanModifier: 2, combatStatModifiers: { physicalAttack: 1.5, magicalAttack: 1.5, physicalDefense: 1.5, magicalDefense: 1.5, critChance: 1.2, critDamage: 1.2 } } },
};

export const PHYSIQUE_TIER_WEIGHTS = [
    { tier: PhysiqueTier.COMMON, weight: 60 },
    { tier: PhysiqueTier.SPIRIT, weight: 25 },
    { tier: PhysiqueTier.EARTH, weight: 10 },
    { tier: PhysiqueTier.HEAVEN, weight: 4 },
    { tier: PhysiqueTier.SAINT, weight: 0.9 },
    { tier: PhysiqueTier.DIVINE, weight: 0.1 },
];

export const SPIRITUAL_ROOT_WEIGHTS = [
    { type: SpiritualRootType.PENTAD, weight: 35 },
    { type: SpiritualRootType.QUAD, weight: 30 },
    { type: SpiritualRootType.TRIPLE, weight: 20 },
    { type: SpiritualRootType.DUAL, weight: 10 },
    { type: SpiritualRootType.HEAVENLY, weight: 4 },
    { type: SpiritualRootType.MUTATED, weight: 1 },
];

export const NORMAL_ELEMENTS = [Element.METAL, Element.WOOD, Element.WATER, Element.FIRE, Element.EARTH];
export const MUTATED_ELEMENTS = [Element.LIGHTNING, Element.WIND, Element.ICE];

export const ELEMENT_DATA = {
    [Element.METAL]: { name: 'Kim', color: '#e8e8e8' },
    [Element.WOOD]: { name: 'Mộc', color: '#26A65B' },
    [Element.WATER]: { name: 'Thuỷ', color: '#3498DB' },
    [Element.FIRE]: { name: 'Hoả', color: '#E74C3C' },
    [Element.EARTH]: { name: 'Thổ', color: '#A0522D' },
    [Element.LIGHTNING]: { name: 'Lôi', color: '#F1C40F' },
    [Element.WIND]: { name: 'Phong', color: '#8E44AD' },
    [Element.ICE]: { name: 'Băng', color: '#00BCD4' }
};