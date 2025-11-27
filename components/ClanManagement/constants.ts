
import { HeartIcon, InventoryIcon, LibraryIcon, AlchemyIcon, ForgeIcon, TalismanIcon, HerbGardenIcon, SwordIcon, DaoHeartIcon, BeastCoreIcon, StarIcon, ManagementIcon, SpiritStoneIcon, WoodIcon, StoneIcon, SpiritHerbIcon, BeastCoreIcon as BeastCoreResourceIcon, TuLuyenThapIcon } from '../Icons.tsx';

export const BUILDING_ICONS: {[key: string]: React.FC<{className?: string}>} = {
    tu_duong: HeartIcon,
    kho_phong: InventoryIcon,
    library: LibraryIcon,
    alchemist_room: AlchemyIcon,
    blacksmith_forge: ForgeIcon,
    talisman_house: TalismanIcon,
    tran_phap_duong: TuLuyenThapIcon,
    herb_garden: HerbGardenIcon,
    vo_dai: SwordIcon,
    su_vu_duong: DaoHeartIcon,
    tran_yeu_duong: BeastCoreIcon,
    thang_tien_dai: StarIcon,
    huan_cong_duong: DaoHeartIcon,
    thiet_luat_duong: ManagementIcon,
    tu_luyen_thap: TuLuyenThapIcon
};

export const RESOURCE_COST_ICONS: {[key: string]: React.FC<{className?: string}>} = {
    spirit_stone: SpiritStoneIcon,
    wood: WoodIcon,
    stone: StoneIcon,
    spirit_herb: SpiritHerbIcon,
    beast_core: BeastCoreResourceIcon,
};