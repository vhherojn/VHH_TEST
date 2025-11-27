
import { MortalKingdom } from '../../types/world.ts';

// Mẫu tên quốc gia
export const KINGDOM_PREFIXES = ["Đại", "Tiểu", "Hậu", "Tiền", "Bắc", "Nam", "Đông", "Tây"];
export const KINGDOM_NAMES = ["Việt", "Sở", "Tần", "Hán", "Đường", "Tống", "Minh", "Ngụy", "Thục", "Ngô", "Lương", "Trần", "Lý", "Lê"];
export const KINGDOM_SUFFIXES = ["Quốc", "Triều", "Đế Quốc", "Vương Triều"];

// Một vài mẫu quốc gia có sẵn (dùng cho cốt truyện sau này nếu cần)
export const PREDEFINED_KINGDOMS: MortalKingdom[] = [
    {
        id: 'kingdom_daiviet',
        name: 'Đại Việt Quốc',
        population: 10000000,
        stability: 90,
        description: 'Một quốc gia nhân loại phồn thịnh, người dân hiền hòa, là nguồn cung cấp tiên miêu dồi dào.'
    }
];
