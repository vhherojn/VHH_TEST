
import { ItemQuality } from '../../../types/index.ts';
import { Recipe } from '../../../types/index.ts';
import { TU_GIAI_KIEM_RECIPES } from './vu-khi/tu-giai-kiem-recipes.ts';
import { TU_GIAI_DAO_RECIPES } from './vu-khi/tu-giai-dao-recipes.ts';
import { TU_GIAI_THUONG_RECIPES } from './vu-khi/tu-giai-thuong-recipes.ts';
import { TU_GIAI_CHAM_RECIPES } from './vu-khi/tu-giai-cham-recipes.ts';
import { TU_GIAI_GIAP_RECIPES } from './trang-bi/tu-giai-giap-recipes.ts';
import { TU_GIAI_VAN_RECIPES } from './trang-bi/tu-giai-van-recipes.ts';
import { TU_GIAI_NON_RECIPES } from './trang-bi/tu-giai-non-recipes.ts';

export const TU_GIAI_RECIPES: Record<string, Recipe> = {
    ...TU_GIAI_KIEM_RECIPES,
    ...TU_GIAI_DAO_RECIPES,
    ...TU_GIAI_THUONG_RECIPES,
    ...TU_GIAI_CHAM_RECIPES,
    ...TU_GIAI_GIAP_RECIPES,
    ...TU_GIAI_VAN_RECIPES,
    ...TU_GIAI_NON_RECIPES,
};
