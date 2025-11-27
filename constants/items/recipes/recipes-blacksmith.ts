import { ItemQuality } from '../../../types/index.ts';
import { Recipe } from '../../../types/index.ts';
import { NHAT_GIAI_RECIPES } from './nhat-giai-recipes.ts';
import { NHI_GIAI_RECIPES } from './nhi-giai-recipes.ts';
import { TAM_GIAI_RECIPES } from './tam-giai-recipes.ts';
import { TU_GIAI_RECIPES } from './tu-giai-recipes.ts';

export const BLACKSMITH_RECIPES: Record<string, Recipe> = {
    'craft_hoang_thiet_giap': { id: 'craft_hoang_thiet_giap', name: 'Rèn đúc Hoàng Thiết Giáp', building: 'blacksmith_forge', requiredTier: ItemQuality.TAM_GIAI, requiredProfessionTier: ItemQuality.TAM_GIAI, cost: { 'hoang_thiet': 8, 'yeu_cot_tam_giai': 2 }, outputs: [{ itemId: 'hoang_thiet_giap', chance: 1, amount: 1 }], requiredBlueprint: 'ban_ve_hoang_thiet_giap' },
    'craft_thanh_truc_phong_van_kiem': { id: 'craft_thanh_truc_phong_van_kiem', name: 'Rèn đúc Thanh Trúc Phong Vân Kiếm', building: 'blacksmith_forge', requiredTier: ItemQuality.TAM_GIAI, requiredProfessionTier: ItemQuality.TAM_GIAI, cost: { 'hoang_thiet': 5, 'yeu_dan_tam_giai': 5 }, outputs: [{ itemId: 'thanh_truc_phong_van_kiem', chance: 1, amount: 1 }], requiredBlueprint: 'ban_ve_thanh_truc_phong_van_kiem' },
    'craft_phan_hon_chuyen': { id: 'craft_phan_hon_chuyen', name: 'Rèn đúc Phệ Hồn Châm', building: 'blacksmith_forge', requiredTier: ItemQuality.TAM_GIAI, requiredProfessionTier: ItemQuality.TAM_GIAI, cost: { 'hoang_thiet': 3, 'yeu_cot_tam_giai': 7 }, outputs: [{ itemId: 'phan_hon_chuyen', chance: 1, amount: 1 }], requiredBlueprint: 'ban_ve_phan_hon_chuyen' },
    ...NHAT_GIAI_RECIPES,
    ...NHI_GIAI_RECIPES,
    ...TAM_GIAI_RECIPES,
    ...TU_GIAI_RECIPES,
};