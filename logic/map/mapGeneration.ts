
import { Location, Territory, MortalKingdom, Market, City, District, LocationType, Peak } from '../../types/world.ts';
import { Force } from '../../types/forces.ts';
import { ForceRank, ItemQuality, ItemType } from '../../types/enums.ts';
import { FIXED_FORCES_DATA } from '../../constants/world/fixed-forces.ts';
import { KINGDOM_PREFIXES, KINGDOM_NAMES, KINGDOM_SUFFIXES } from '../../constants/world/kingdoms.ts';
import { MARKET_PREFIXES, MARKET_SUFFIXES, MARKET_SPECIALTIES } from '../../constants/world/markets.ts';
import { CITY_PREFIXES, CITY_SUFFIXES } from '../../constants/world/cities.ts';
import { REGION_NAMES } from '../../constants/world/regions.ts';
import { DISTRICT_NAMES, DISTRICT_SUFFIXES } from '../../constants/world/districts.ts';
import { ALL_ITEMS } from '../../constants.ts';
import { generateRandomForces } from '../forces.ts';
import { deepClone } from '../utils/clone.ts';

// Helper tạo ID ngẫu nhiên
const generateId = (prefix: string) => `${prefix}_${Math.random().toString(36).substr(2, 9)}`;

const getResourcesByTier = (tier: ItemQuality) => {
    return Object.values(ALL_ITEMS).filter(item => 
        item && item.quality === tier && 
        (item.type === ItemType.MATERIAL || item.type === ItemType.HERB) &&
        !item.id.startsWith('yeu_') &&
        !item.id.startsWith('linh_mach_') // Exclude Spirit Veins from generic resources
    );
};

const getSpiritVeinItem = (tier: ItemQuality, quality: 'ha' | 'trung' | 'thuong') => {
    let tierStr = '';
    switch(tier) {
        case ItemQuality.NHAT_GIAI: tierStr = 'nhat_giai'; break;
        case ItemQuality.NHI_GIAI: tierStr = 'nhi_giai'; break;
        case ItemQuality.TAM_GIAI: tierStr = 'tam_giai'; break;
        case ItemQuality.TU_GIAI: tierStr = 'tu_giai'; break;
        case ItemQuality.NGU_GIAI: tierStr = 'ngu_giai'; break;
    }
    const itemId = `linh_mach_${tierStr}_${quality}_pham`;
    return ALL_ITEMS[itemId];
}

const generateTerritories = (count: number, forceTier?: ItemQuality): Territory[] => {
    const territories: Territory[] = [];
    
    for (let i = 0; i < count; i++) {
        const rand = Math.random();
        let tier = ItemQuality.NHAT_GIAI;
        
        if (forceTier) {
             if (rand > 0.8) tier = forceTier;
             else if (rand > 0.5) tier = ItemQuality.NHAT_GIAI;
             else tier = ItemQuality.NHI_GIAI; 
        } else {
            if (rand > 0.99) tier = ItemQuality.NGU_GIAI;      
            else if (rand > 0.95) tier = ItemQuality.TU_GIAI; 
            else if (rand > 0.80) tier = ItemQuality.TAM_GIAI; 
            else if (rand > 0.50) tier = ItemQuality.NHI_GIAI; 
            else tier = ItemQuality.NHAT_GIAI;   
        }

        const targetItems = getResourcesByTier(tier);
        const selectedItem = targetItems[Math.floor(Math.random() * targetItems.length)];

        if (!selectedItem) continue;

        const suffix = ['Mỏ', 'Động', 'Cốc', 'Rừng', 'Vườn'][Math.floor(Math.random() * 5)];
        
        let type: 'linh_thach' | 'duoc_lieu' | 'khoang_san' | 'bi_canh' = 'khoang_san';
        if (selectedItem.id === 'spirit_stone') type = 'linh_thach';
        else if (selectedItem.type === ItemType.HERB) type = 'duoc_lieu';
        else if (selectedItem.type === ItemType.MATERIAL) type = 'khoang_san';
        else type = 'bi_canh';

        territories.push({
            id: generateId('territory'),
            name: `${selectedItem.name.replace(' (Hạ Phẩm)', '').replace(' (Trung Phẩm)', '').replace(' (Thượng Phẩm)', '')} ${suffix}`,
            type: type,
            resourceItemId: selectedItem.id,
            tier: tier,
            quality: 10 + Math.floor(Math.random() * 90),
            ownerForceId: null
        });
    }
    return territories;
};

const GRID_3X3 = [
    { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 },
    { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 },
    { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }
];

let globalTier5VeinCount = 0;

export const generateWorldMap = (): { locations: Location[], districts: District[] } => {
    const locations: Location[] = [];
    const districts: District[] = [];
    const usedRegionNames = new Set<string>();
    const availableFixedForces = deepClone(FIXED_FORCES_DATA);
    
    globalTier5VeinCount = 0;

    // 9 Châu
    for (let i = 0; i < 9; i++) {
        let regionNameBase = '';
        do {
            regionNameBase = REGION_NAMES[Math.floor(Math.random() * REGION_NAMES.length)];
        } while (usedRegionNames.has(regionNameBase));
        usedRegionNames.add(regionNameBase);
        const regionName = `${regionNameBase} Châu`;

        const regionCellWidth = 100 / 3;
        const regionCellHeight = 100 / 3;
        const gridPos = GRID_3X3[i];
        
        const regionMinX = gridPos.col * regionCellWidth + 2;
        const regionMaxX = (gridPos.col + 1) * regionCellWidth - 2;
        const regionMinY = gridPos.row * regionCellHeight + 2;
        const regionMaxY = (gridPos.row + 1) * regionCellHeight - 2;

        // Mỗi Châu có 4-6 Quận
        const districtCount = 4 + Math.floor(Math.random() * 3);
        const usedDistrictNames = new Set<string>();

        for (let d = 0; d < districtCount; d++) {
             let districtName = '';
             do {
                 districtName = DISTRICT_NAMES[Math.floor(Math.random() * DISTRICT_NAMES.length)];
             } while(usedDistrictNames.has(districtName));
             usedDistrictNames.add(districtName);
             
             const districtFullName = `${districtName} ${DISTRICT_SUFFIXES[0]}`;
             const districtId = generateId('district');

             const distX = regionMinX + Math.random() * (regionMaxX - regionMinX);
             const distY = regionMinY + Math.random() * (regionMaxY - regionMinY);

             districts.push({
                 id: districtId,
                 name: districtFullName,
                 region: regionName,
                 x: distX,
                 y: distY,
                 description: `Một vùng đất trù phú thuộc ${regionName}.`
             });

             // --- 0.20.50: Sinh Vùng Tài Nguyên (Zones) ---
             // Mỗi Quận sẽ có 9-15 Vùng Tài Nguyên (trước đây là Địa Điểm)
             // Trong mỗi Vùng Tài Nguyên sẽ chứa: Sơn Phong, Thành Trì, Phường Thị...
             
             const zoneCount = 9 + Math.floor(Math.random() * 7);
             
             // Phân bố Forces cho Quận này
             const forcesInDistrict: Force[] = [];
             // 20% cơ hội xuất hiện 1 thế lực cố định
             if (availableFixedForces.length > 0 && Math.random() < 0.2) {
                 const fixed = availableFixedForces.shift();
                 if(fixed) forcesInDistrict.push(fixed);
             }
             // Sinh thêm thế lực ngẫu nhiên để đạt 5-10 thế lực
             const randomForcesCount = 5 + Math.floor(Math.random() * 6) - forcesInDistrict.length;
             const randomForces = generateRandomForces(Math.max(0, randomForcesCount), []);
             forcesInDistrict.push(...randomForces);

             for (let z = 0; z < zoneCount; z++) {
                 const isAncestralZone = (i === 4 && d === 0 && z === 0); // Trung tâm bản đồ
                 
                 // Sinh Tên & Loại Vùng
                 const zoneTypeRoll = Math.random();
                 let zoneType: LocationType = 'Vùng Tài Nguyên';
                 let prefab: any = 'forest';
                 let suffix = 'Sâm Lâm';
                 
                 if (isAncestralZone) {
                     zoneType = 'Sơn Mạch';
                     prefab = 'mountains';
                     suffix = 'Sơn Mạch';
                 } else if (zoneTypeRoll < 0.2) { suffix = 'Sơn Mạch'; prefab = 'mountains'; zoneType = 'Sơn Mạch'; }
                 else if (zoneTypeRoll < 0.4) { suffix = 'Sâm Lâm'; prefab = 'forest'; }
                 else if (zoneTypeRoll < 0.5) { suffix = 'Sa Mạc'; prefab = 'desert'; }
                 else if (zoneTypeRoll < 0.6) { suffix = 'Hồ'; prefab = 'island'; }
                 else if (zoneTypeRoll < 0.7) { suffix = 'Di Tích'; prefab = 'ruins'; zoneType = 'Cấm Địa'; }
                 else if (zoneTypeRoll < 0.75) { suffix = 'Bí Cảnh'; prefab = 'palace'; zoneType = 'Cấm Địa'; }
                 else { suffix = 'Thung Lũng'; prefab = 'forest'; }

                 const zoneName = isAncestralZone ? 'Thanh Vân Sơn Mạch' : `${CITY_PREFIXES[Math.floor(Math.random() * CITY_PREFIXES.length)]} ${suffix}`;
                 const locId = generateId('loc');

                 // --- Sinh Nội Dung Bên Trong Vùng ---
                 const peaks: Peak[] = [];
                 const cities: City[] = [];
                 const markets: Market[] = [];
                 const kingdoms: MortalKingdom[] = [];
                 
                 // 1. Sinh Sơn Phong (2-4 ngọn/vùng)
                 const peakCount = 2 + Math.floor(Math.random() * 3);
                 for(let p=0; p<peakCount; p++) {
                     const peakName = isAncestralZone && p === 0 ? 'Thanh Vân Sơn' : `${CITY_PREFIXES[Math.floor(Math.random() * CITY_PREFIXES.length)]} Phong`;
                     // Tier của núi
                     let peakTier = ItemQuality.NHAT_GIAI;
                     const tierRoll = Math.random();
                     if (globalTier5VeinCount < 10 && tierRoll > 0.995) { peakTier = ItemQuality.NGU_GIAI; globalTier5VeinCount++; }
                     else if (tierRoll > 0.95) peakTier = ItemQuality.TU_GIAI;
                     else if (tierRoll > 0.85) peakTier = ItemQuality.TAM_GIAI;
                     else if (tierRoll > 0.60) peakTier = ItemQuality.NHI_GIAI;
                     
                     // Gán thế lực cho Sơn Phong
                     let ownerForceId: string | null = null;
                     if (isAncestralZone && p === 0) {
                         // Player base, handled in init
                     } else if (forcesInDistrict.length > 0 && Math.random() < 0.6) {
                         const force = forcesInDistrict[forcesInDistrict.length - 1]; // Take last available or distribute
                         // Simple distribution: Cycle through forces in district
                         const forceIndex = (z * peakCount + p) % forcesInDistrict.length;
                         const assignedForce = forcesInDistrict[forceIndex];
                         if (assignedForce) {
                             ownerForceId = assignedForce.id;
                             if (!assignedForce.headquartersId) {
                                 assignedForce.headquartersId = locId; // HQ is the Location ID
                             }
                         }
                     }

                     peaks.push({
                         id: generateId('peak'),
                         name: peakName,
                         tier: peakTier,
                         ownerForceId: ownerForceId,
                         description: `Một ngọn núi hùng vĩ linh khí ${peakTier}.`
                     });
                 }

                 // 2. Sinh Thành Trì (0-1)
                 if (Math.random() < 0.3) {
                      const cityPrefix = CITY_PREFIXES[Math.floor(Math.random() * CITY_PREFIXES.length)];
                      const cityName = `${cityPrefix} Thành`;
                      cities.push({
                        id: generateId('city_obj'),
                        name: cityName,
                        level: 1 + Math.floor(Math.random() * 5),
                        taxIncome: 200 + Math.floor(Math.random() * 800),
                        ownerForceId: null, // Sẽ được chiếm sau
                        defense: 2000
                     });
                 }

                 // 3. Sinh Phường Thị (0-1)
                 if (Math.random() < 0.2) {
                     const marketPrefix = MARKET_PREFIXES[Math.floor(Math.random() * MARKET_PREFIXES.length)];
                     const marketName = `${marketPrefix} Phường Thị`;
                     markets.push({
                        id: generateId('market_obj'),
                        name: marketName,
                        size: 'medium',
                        specialty: MARKET_SPECIALTIES[Math.floor(Math.random() * MARKET_SPECIALTIES.length)],
                        ownerForceId: null
                     });
                 }

                 // 4. Sinh Nhân Quốc (3-6) [FIXED: Tăng số lượng]
                 const kingdomCount = 3 + Math.floor(Math.random() * 4); 
                 for (let k = 0; k < kingdomCount; k++) {
                     const kPrefix = KINGDOM_PREFIXES[Math.floor(Math.random() * KINGDOM_PREFIXES.length)];
                     const kName = KINGDOM_NAMES[Math.floor(Math.random() * KINGDOM_NAMES.length)];
                     const kSuffix = KINGDOM_SUFFIXES[Math.floor(Math.random() * KINGDOM_SUFFIXES.length)];
                     const kingdomName = `${kPrefix} ${kName} ${kSuffix}`;
                     kingdoms.push({
                        id: generateId('kingdom_obj'),
                        name: kingdomName,
                        population: 500000 + Math.floor(Math.random() * 2000000),
                        stability: 60 + Math.floor(Math.random() * 40),
                        description: 'Một quốc gia phàm nhân nằm trong vùng ảnh hưởng của các thế lực tu tiên.'
                     });
                 }

                 // 5. Sinh Tài Nguyên (15-40)
                 const territoryCount = 15 + Math.floor(Math.random() * 26);
                 const territories = generateTerritories(territoryCount);

                 // Add Forces physically to the location list if they own a peak here
                 const residentForces = forcesInDistrict.filter(f => 
                    peaks.some(p => p.ownerForceId === f.id)
                 );

                 locations.push({
                     id: locId,
                     name: zoneName,
                     type: zoneType,
                     region: regionName,
                     districtId: districtId,
                     x: distX, y: distY,
                     isAncestral: isAncestralZone,
                     prefab: prefab,
                     peaks: peaks,
                     territories: territories,
                     forces: residentForces,
                     kingdoms: kingdoms,
                     markets: markets,
                     cities: cities,
                     subBranches: {}
                 });
             }
        }
    }

    return { locations, districts };
};
