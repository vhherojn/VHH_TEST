
import { ItemQuality } from './types/enums.ts';
import type { Location } from './types/index.ts';

export const PREDEFINED_LOCATIONS: Location[] = [
    // Thanh Vân Sơn nằm ở phía trên, chính giữa
    { 
        id: 'ancestral_land', 
        name: 'Thanh Vân Sơn Mạch', 
        type: 'Sơn Mạch',
        region: 'Thanh Vân Châu', 
        districtId: 'district_0', 
        x: 50, 
        y: 15, 
        isAncestral: true, 
        prefab: 'mountains', 
        territories: [], 
        forces: [], 
        kingdoms: [
            {
                id: 'kingdom_daiviet',
                name: 'Đại Việt Quốc',
                population: 10000000,
                stability: 90,
                description: 'Một quốc gia nhân loại phồn thịnh, người dân hiền hòa, là nguồn cung cấp tiên miêu dồi dào.'
            },
             {
                id: 'kingdom_namchieu',
                name: 'Nam Chiếu Quốc',
                population: 5000000,
                stability: 70,
                description: 'Quốc gia nằm ở phía nam, rừng rậm nhiều, dân phong bưu hãn.'
            },
            {
                id: 'kingdom_bacluong',
                name: 'Bắc Lương Vương Triều',
                population: 8000000,
                stability: 85,
                description: 'Vương triều chuộng võ, quân lực mạnh mẽ.'
            }
        ], 
        markets: [], 
        cities: [],
        subBranches: {},
        peaks: [
            { id: 'peak_ancestral', name: 'Thanh Vân Sơn', tier: ItemQuality.NHAT_GIAI, ownerForceId: 'player_clan_force', description: 'Tổ địa của gia tộc.' }
        ]
    },
    
    { 
        id: 'loc_1', 
        name: 'Lạc Nhật Thành Vực', 
        type: 'Vùng Tài Nguyên',
        region: 'Lạc Nhật Châu', 
        districtId: 'district_1', 
        x: 20, 
        y: 35, 
        prefab: 'city', 
        territories: [], 
        forces: [], 
        kingdoms: [
             {
                id: 'kingdom_tayha',
                name: 'Tây Hạ Quốc',
                population: 3000000,
                stability: 60,
                description: 'Quốc gia nằm giữa sa mạc.'
            }
        ], 
        markets: [], 
        cities: [],
        subBranches: {},
        peaks: []
    },
    // ... Các địa điểm cũ khác nếu cần giữ lại có thể thêm peaks: [] vào
];
