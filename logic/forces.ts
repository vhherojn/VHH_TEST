
import type { Force, Location, ForceLeader } from '../types/index.ts';
import { RANDOM_FORCE_DATA } from '../constants.ts';
import { ForceRank, Gender } from '../types/index.ts';
import { AVATAR_PARTS, FIRST_NAMES } from '../constants-character.ts';

const getTitleBySuffix = (forceName: string): string => {
    const name = forceName.trim();
    if (name.endsWith('Tông')) return 'Tông Chủ';
    if (name.endsWith('Môn')) return 'Môn Chủ';
    if (name.endsWith('Gia')) return 'Gia Chủ';
    if (name.endsWith('Lâu')) return 'Lâu Chủ';
    if (name.endsWith('Điện')) return 'Điện Chủ';
    if (name.endsWith('Cốc')) return 'Cốc Chủ';
    if (name.endsWith('Cung')) return 'Cung Chủ';
    if (name.endsWith('Hội')) return 'Hội Trưởng';
    if (name.endsWith('Đoàn')) return 'Đoàn Trưởng';
    if (name.endsWith('Bảo')) return 'Bảo Chủ';
    if (name.endsWith('Các')) return 'Các Chủ';
    if (name.endsWith('Phủ')) return 'Phủ Chủ';
    if (name.endsWith('Đảo')) return 'Đảo Chủ';
    if (name.endsWith('Thành')) return 'Thành Chủ';
    
    return 'Thủ Lĩnh';
};

const generateRandomLeader = (rank: ForceRank, forceName: string): ForceLeader => {
    const gender = Math.random() > 0.7 ? Gender.FEMALE : Gender.MALE;
    const parts = AVATAR_PARTS[gender].ADULT;
    
    const avatar = {
        base: parts.BASE[Math.floor(Math.random() * parts.BASE.length)],
        eyes: parts.EYES[Math.floor(Math.random() * parts.EYES.length)],
        hair: parts.HAIR[Math.floor(Math.random() * parts.HAIR.length)],
        mouth: parts.MOUTH[Math.floor(Math.random() * parts.MOUTH.length)],
        skinColor: '#e2c5a2',
        accessory: parts.ACCESSORY[Math.floor(Math.random() * parts.ACCESSORY.length)],
    };

    const lastName = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Vũ", "Võ", "Đặng", "Bùi", "Đỗ", "Hồ", "Ngô", "Dương", "Lý"][Math.floor(Math.random() * 14)];
    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    
    let stage = 'Luyện Khí Kỳ';
    
    // Determine stage based on rank
    switch (rank) {
        case ForceRank.HA_LUU: stage = 'Luyện Khí Đỉnh Phong'; break;
        case ForceRank.NHAT_GIAI: stage = 'Trúc Cơ Sơ Kỳ'; break;
        case ForceRank.NHI_GIAI: stage = 'Trúc Cơ Viên Mãn'; break;
        case ForceRank.TAM_GIAI: stage = 'Kết Đan Trung Kỳ'; break;
        case ForceRank.DINH_CAP: stage = 'Nguyên Anh Sơ Kỳ'; break;
        case ForceRank.THANH_DIA: stage = 'Hóa Thần Sơ Kỳ'; break;
    }

    // Determine title based on Force Name Suffix
    const title = getTitleBySuffix(forceName);

    return {
        name: `${lastName} ${firstName}`,
        avatar,
        cultivationStage: stage,
        title
    };
};

export const generateRandomForces = (count: number, existingPoints: (Location | Force)[]): Force[] => {
    const forces: Force[] = [];
    let attempts = 0;

    while (forces.length < count && attempts < 100) {
        const prefix = RANDOM_FORCE_DATA.PREFIXES[Math.floor(Math.random() * RANDOM_FORCE_DATA.PREFIXES.length)]!;
        const suffix = RANDOM_FORCE_DATA.SUFFIXES[Math.floor(Math.random() * RANDOM_FORCE_DATA.SUFFIXES.length)]!;
        const description = RANDOM_FORCE_DATA.DESCRIPTIONS[Math.floor(Math.random() * RANDOM_FORCE_DATA.DESCRIPTIONS.length)]!;
        
        const forceName = `${prefix} ${suffix}`;

        const randomRoll = Math.random();
        let rank: ForceRank;
        if (randomRoll < 0.6) { // 60% chance for Hạ lưu
            rank = ForceRank.HA_LUU;
        } else if (randomRoll < 0.9) { // 30% chance for Nhất giai
            rank = ForceRank.NHAT_GIAI;
        } else { // 10% chance for Nhị giai
            rank = ForceRank.NHI_GIAI;
        }
        
        const rankIndex = Object.values(ForceRank).indexOf(rank);
        
        forces.push({
            id: `force_random_${crypto.randomUUID()}`,
            name: forceName,
            description: description,
            icon: Math.random() > 0.4 ? 'evil' : 'righteous', // More evil forces for drama
            rank: rank,
            power: 1000 * (rankIndex + 1),
            resources: 1000,
            population: 50 * (rankIndex + 1),
            experts: 1 + rankIndex,
            territoryIds: [],
            diplomacy: {},
            headquartersId: null,
            leader: generateRandomLeader(rank, forceName)
        });
        
        attempts++;
    }

    return forces;
};
