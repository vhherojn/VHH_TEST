
import type { Force } from './types/index.ts';
import { ForceRank, Gender } from './types/index.ts';
import { AVATAR_PARTS } from './constants-character.ts';

const createDefaultAvatar = (gender: Gender) => {
    const parts = AVATAR_PARTS[gender].ADULT;
    return {
        base: parts.BASE[0],
        eyes: parts.EYES[0],
        hair: parts.HAIR[0],
        mouth: parts.MOUTH[0],
        skinColor: '#e2c5a2',
        accessory: parts.ACCESSORY[0]
    };
};

/**
 * Thế Lực Cố Định: Các thế lực có sẵn, sẽ xuất hiện ở vị trí cố định.
 */
export const FIXED_FORCES: Force[] = [
    { 
        id: 'force_fixed_1', 
        name: 'Chính Khí Minh', 
        description: 'Một liên minh các gia tộc chính đạo, mục tiêu là diệt trừ ma đạo, bảo vệ nhân gian.', 
        icon: 'righteous',
        rank: ForceRank.TAM_GIAI,
        power: 50000,
        resources: 10000,
        population: 800,
        experts: 15,
        territoryIds: [],
        diplomacy: {},
        headquartersId: null,
        leader: {
            name: 'Lý Chính Đạo',
            avatar: createDefaultAvatar(Gender.MALE),
            cultivationStage: 'Kết Đan Hậu Kỳ',
            title: 'Minh Chủ'
        }
    },
    { 
        id: 'force_fixed_2', 
        name: 'Thiên Sát Lâu', 
        description: 'Tổ chức sát thủ thần bí, chỉ cần trả đủ giá, bất cứ ai cũng có thể giết.', 
        icon: 'evil',
        rank: ForceRank.NHI_GIAI,
        power: 20000,
        resources: 5000,
        population: 150,
        experts: 8,
        territoryIds: [],
        diplomacy: {},
        headquartersId: null,
        leader: {
            name: 'Vô Danh Sát',
            avatar: createDefaultAvatar(Gender.FEMALE),
            cultivationStage: 'Trúc Cơ Viên Mãn',
            title: 'Lâu Chủ'
        }
    },
];

/**
 * Dữ liệu để tạo Thế Lực Ngẫu Nhiên
 */
export const RANDOM_FORCE_DATA = {
    PREFIXES: ["Hắc Phong", "Thiên Ưng", "Huyết Sát", "Linh Hư", "Phi Vân", "Thiên Cơ", "Vô Tình", "U Minh", "Bích Huyết", "Cuồng Phong"],
    SUFFIXES: ["Môn", "Bảo", "Lâu", "Đoàn", "Hội", "Cốc", "Cung", "Tông", "Phủ", "Các"],
    DESCRIPTIONS: [
        "Một thế lực mới nổi, hành sự bí ẩn, không rõ lai lịch.",
        "Môn phái tà đạo chuyên luyện công pháp âm độc, người trong giang hồ nghe tên đã sợ mất mật.",
        "Gia tộc ẩn thế lâu đời, đột nhiên xuất hiện, thực lực không thể coi thường.",
        "Một thương hội lớn, nắm giữ nhiều tài nguyên và thông tin tình báo quan trọng.",
        "Thế lực trung lập, không tham gia vào tranh đấu, chỉ tập trung phát triển.",
    ]
};
