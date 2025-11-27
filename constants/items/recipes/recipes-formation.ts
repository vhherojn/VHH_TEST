import { ItemQuality } from '../../../types/index.ts';
import { Recipe } from '../../../types/index.ts';

export const FORMATION_RECIPES: Record<string, Recipe> = {
    'craft_tu_linh_tran_1': {
        id: 'craft_tu_linh_tran_1',
        name: 'Chế Tác Tụ Linh Trận - Nhất Giai',
        building: 'tran_phap_duong',
        requiredTier: ItemQuality.NHAT_GIAI,
        requiredProfessionTier: ItemQuality.NHAT_GIAI,
        cost: { 'yeu_dan_nhat_giai': 5, 'spirit_stone': 200 },
        outputs: [{ itemId: 'tu_linh_tran_1', chance: 1, amount: 1 }],
    },
};