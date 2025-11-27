
import { Clan, Location, Profession, RankType, CultivationStage, Building, ItemQuality, EquipmentQuality, CraftingStation, Character } from '../types/index.ts';
import {
    BUILDINGS,
    TASKS,
    PREDEFINED_EQUIPMENT
} from '../constants.ts';
import { ProfessionType } from '../types/index.ts';

const createStationsForTier = (tier: ItemQuality, count: number): CraftingStation[] => {
    const stations: CraftingStation[] = [];
    for (let i = 0; i < count; i++) {
        stations.push({
            id: `station_${tier}_${i}`,
            tier: tier,
            workerId: null,
            apprenticeIds: [null, null],
            activeRecipeId: null,
            progress: 0,
            duration: 0,
            isActive: false,
        });
    }
    return stations;
};

export const initializeNewClan = (location: Location, clanName: string, founder: Character, generationNames: string[]): Clan => {
    founder.equipment.weapon = PREDEFINED_EQUIPMENT['thiet_kiem'];
    founder.equipment.chest = PREDEFINED_EQUIPMENT['da_thu_giap'];
    
    const initialItemInventory = {
        wood: 500000,
        stone: 500000,
        hac_thiet: 10,
        hoang_thiet: 10,
        'yeu_dan_nhat_giai': 20,
        'yeu_dan_nhi_giai': 10,
        'truong_xuan_cong': 1,
        'nguyen_khi_quyet': 1,
        'thanh_moc_dieu_hoa_cong': 1,
        'luyen_dan_co_so': 1,
        'luyen_khi_nhap_mon': 1,
        'luyen_phu_nhap_mon': 1,
        'tran_phap_nhap_mon': 1,
        'linh_thuc_co_so': 1,
        'nap_khi_thao_seed': 10,
        'man_da_can_seed': 10,
        'library_token_1': 50,
        'library_token_2': 50,
        'library_token_3': 50,
        'tu_luyen_thap_token_4': 1,
        'tu_luyen_thap_token_5': 1,
        'tu_khi_dan': 10,
        'hoi_khi_dan': 10,
        'ban_ve_hac_thiet_kiem': 1,
        'ban_ve_hoang_thiet_giap': 1,
        'ban_ve_thiet_kiem': 1,
        'ban_ve_tu_linh_tran_1': 1,
        'dan_phuong_truc_co_dan': 1,
    };

    const initialRankStipends = Object.values(RankType).reduce((acc, rank) => {
        acc[rank] = {};
        return acc;
    }, {} as Record<RankType, Record<string, number>>);
    initialRankStipends[RankType.DE_TU_NGOAI_TOC]['spirit_stone'] = 2;
    initialRankStipends[RankType.DE_TU_NOI_TOC]['spirit_stone'] = 5;

    const newClan: Clan = {
        name: clanName,
        members: [founder],
        generationNames: generationNames,
        resources: { spirit_stone: 5000000 },
        itemInventory: initialItemInventory,
        linhMach: {
            tier: ItemQuality.NHAT_GIAI,
            quality: EquipmentQuality.HA_PHAM,
            miningAssignments: {
                supervisorId: null,
                minerIds: Array(2).fill(null),
            }
        },
        buildings: Object.values(BUILDINGS).reduce((acc, b) => {
            const isDefault = ['kho_phong', 'tu_duong', 'su_vu_duong', 'thang_tien_dai', 'huan_cong_duong', 'tu_luyen_thap', 'library'].includes(b.id);
            const level = isDefault ? 1 : 0;
            const tier = ItemQuality.NHAT_GIAI;
            const quality = EquipmentQuality.HA_PHAM;
            
            acc[b.id] = {
                id: b.id, name: b.name,
                level: level, tier: tier, quality: quality,
                stations: [],
                managerId: null,
            };

            if(isDefault && b.id === 'tu_luyen_thap') {
                acc[b.id].stations = createStationsForTier(ItemQuality.NHAT_GIAI, 10);
            } else if(isDefault && b.id === 'library') {
                 acc[b.id].stations = []; // Library doesn't have stations
            } else if(isDefault && b.profession) { // Default profession buildings
                 acc[b.id].stations = createStationsForTier(ItemQuality.NHAT_GIAI, 2);
            }


            return acc;
        }, {} as Record<string, Building>),
        availableTasks: TASKS.slice(0, 2),
        library: {
        [ItemQuality.NHAT_GIAI]: Array(100).fill(null),
        },
        meritShop: [],
        rankStipends: initialRankStipends,
        welcomePackage: [{ itemId: 'hoi_khi_dan_ha_pham', count: 5 }],
        promotionRules: [],
        breakthroughRewards: {},
        pendingRecruits: [],
        mandatoryQuestFrequency: {
            [RankType.TOC_TRUONG]: 0,
            [RankType.THIEU_TOC_TRUONG]: 0,
            [RankType.THANH_TU]: 0,
            [RankType.DAI_TRUONG_LAO]: 0,
            [RankType.TRUONG_LAO]: 24,
            [RankType.KHACH_KHANH]: 24,
            [RankType.TRUONG_LAO_SU_VU]: 12,
            [RankType.DE_TU_TINH_ANH]: 12,
            [RankType.DE_TU_NONG_COT]: 9,
            [RankType.DE_TU_NOI_MON]: 6,
            [RankType.DE_TU_NOI_TOC]: 6,
            [RankType.DE_TU_NGOAI_TOC]: 3,
        },
        taskCooldowns: {},
        election: null,
        disciplineSettings: { punishmentLevel: 'medium' },
        scandals: [],
        activeFormationId: null,
        knownRecipes: [],
        
        // Initialize Statistics
        yearlyRecords: [],
        currentYearStats: {
            spiritStonesEarned: 0,
            itemsCreated: 0,
            births: 0,
            deaths: 0,
        },
    };
    
    return newClan;
}
