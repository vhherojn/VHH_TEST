
import { PhysiqueTier, ItemQuality } from './types/index.ts';

export const PHYSIQUE_TIER_COLORS: Record<PhysiqueTier, string> = {
    [PhysiqueTier.COMMON]: 'text-gray-400',
    [PhysiqueTier.SPIRIT]: 'text-green-400',
    [PhysiqueTier.EARTH]: 'text-yellow-400',
    [PhysiqueTier.HEAVEN]: 'text-blue-400',
    [PhysiqueTier.SAINT]: 'text-purple-400',
    [PhysiqueTier.DIVINE]: 'text-red-500 shimmer-effect',
};

export const ITEM_QUALITY_COLORS: Record<ItemQuality, string> = {
    [ItemQuality.NHAT_GIAI]: 'text-gray-300',
    [ItemQuality.NHI_GIAI]: 'text-green-400',
    [ItemQuality.TAM_GIAI]: 'text-blue-400',
    [ItemQuality.TU_GIAI]: 'text-purple-400',
    [ItemQuality.NGU_GIAI]: 'text-yellow-500',
};

export const ITEM_QUALITY_BORDER_COLORS: Record<ItemQuality, string> = {
    [ItemQuality.NHAT_GIAI]: 'border-gray-400/50',
    [ItemQuality.NHI_GIAI]: 'border-green-500/60',
    [ItemQuality.TAM_GIAI]: 'border-blue-500/60',
    [ItemQuality.TU_GIAI]: 'border-purple-500/60',
    [ItemQuality.NGU_GIAI]: 'border-yellow-500/60',
};

export const COMBAT_STAT_TRANSLATIONS: Record<string, string> = {
    physicalAttack: 'Công Kích',
    magicalAttack: 'Pháp Lực',
    physicalDefense: 'Phòng Ngự',
    magicalDefense: 'Hộ Thể',
    critChance: 'Tỷ Lệ Bạo Kích',
    critDamage: 'Sát Thương Bạo Kích',
};
