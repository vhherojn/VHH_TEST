import { ItemQuality, ItemType } from '../../types/index.ts';
import type { Blueprint } from '../../types/index.ts';
import { NHI_GIAI_BLUEPRINTS } from './blueprints/nhi-giai-blueprints.ts';
import { TAM_GIAI_BLUEPRINTS } from './blueprints/tam-giai-blueprints.ts';
import { TU_GIAI_BLUEPRINTS } from './blueprints/tu-giai-blueprints.ts';

export const BLUEPRINTS: { [key: string]: Blueprint } = {
    ban_ve_thiet_kiem: {
        id: 'ban_ve_thiet_kiem',
        name: 'Bản Vẽ: Thiết Kiếm',
        description: 'Bản vẽ chi tiết cách rèn đúc một thanh Thiết Kiếm cơ bản.',
        quality: ItemQuality.NHAT_GIAI,
        type: ItemType.BLUEPRINT,
        recipeId: 'craft_thiet_kiem'
    },
    ban_ve_huyen_thiet_giap: {
        id: 'ban_ve_huyen_thiet_giap',
        name: 'Bản Vẽ: Huyền Thiết Giáp',
        description: 'Bản vẽ chi tiết cách rèn đúc một bộ Huyền Thiết Giáp.',
        quality: ItemQuality.NHI_GIAI,
        type: ItemType.BLUEPRINT,
        recipeId: 'craft_huyen_thiet_giap'
    },
    ban_ve_hac_thiet_kiem: {
        id: 'ban_ve_hac_thiet_kiem',
        name: 'Bản Vẽ: Hắc Thiết Kiếm',
        description: 'Bản vẽ chi tiết cách rèn đúc một thanh Hắc Thiết Kiếm từ kim loại Nhị Giai.',
        quality: ItemQuality.NHI_GIAI,
        type: ItemType.BLUEPRINT,
        recipeId: 'craft_hac_thiet_kiem'
    },
    ban_ve_tinh_van_phien: {
        id: 'ban_ve_tinh_van_phien',
        name: 'Bản Vẽ: Tinh Vân Phiến',
        description: 'Bản vẽ chi tiết cách chế tạo Tinh Vân Phiến.',
        quality: ItemQuality.NHI_GIAI,
        type: ItemType.BLUEPRINT,
        recipeId: 'craft_tinh_van_phien'
    },
    ban_ve_thuy_van_phap_bao: {
        id: 'ban_ve_thuy_van_phap_bao',
        name: 'Bản Vẽ: Thủy Vân Pháp Bào',
        description: 'Bản vẽ chi tiết cách dệt Thủy Vân Pháp Bào.',
        quality: ItemQuality.NHI_GIAI,
        type: ItemType.BLUEPRINT,
        recipeId: 'craft_thuy_van_phap_bao'
    },
    ban_ve_hoang_thiet_giap: {
        id: 'ban_ve_hoang_thiet_giap',
        name: 'Bản Vẽ: Hoàng Thiết Giáp',
        description: 'Bản vẽ chi tiết cách rèn đúc một bộ Hoàng Thiết Giáp từ kim loại Tam Giai.',
        quality: ItemQuality.TAM_GIAI,
        type: ItemType.BLUEPRINT,
        recipeId: 'craft_hoang_thiet_giap'
    },
    ban_ve_thanh_truc_phong_van_kiem: {
        id: 'ban_ve_thanh_truc_phong_van_kiem',
        name: 'Bản Vẽ: Thanh Trúc Phong Vân Kiếm',
        description: 'Bản vẽ chi tiết cách rèn đúc Thanh Trúc Phong Vân Kiếm.',
        quality: ItemQuality.TAM_GIAI,
        type: ItemType.BLUEPRINT,
        recipeId: 'craft_thanh_truc_phong_van_kiem'
    },
    ban_ve_phan_hon_chuyen: {
        id: 'ban_ve_phan_hon_chuyen',
        name: 'Bản Vẽ: Phệ Hồn Châm',
        description: 'Bản vẽ chi tiết cách rèn đúc Phệ Hồn Châm.',
        quality: ItemQuality.TAM_GIAI,
        type: ItemType.BLUEPRINT,
        recipeId: 'craft_phan_hon_chuyen'
    },
    ...NHI_GIAI_BLUEPRINTS,
    ...TAM_GIAI_BLUEPRINTS,
    ...TU_GIAI_BLUEPRINTS,
};