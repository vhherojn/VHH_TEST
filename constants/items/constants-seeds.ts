
import { ItemQuality, ItemType, Resource } from '../../types/index.ts';

export const SEEDS: { [key: string]: Resource } = {
    nap_khi_thao_seed: {
        id: 'nap_khi_thao_seed',
        name: 'Nạp Khí Thảo Hạt Giống',
        description: 'Hạt giống của Nạp Khí Thảo, có thể trồng ở Dược Điền.',
        quality: ItemQuality.NHAT_GIAI,
        type: ItemType.SEED,
        value: 1,
    },
    man_da_can_seed: {
        id: 'man_da_can_seed',
        name: 'Mạn Đà Căn Hạt Giống',
        description: 'Hạt giống của Mạn Đà Căn, có thể trồng ở Dược Điền.',
        quality: ItemQuality.NHAT_GIAI,
        type: ItemType.SEED,
        value: 1,
    },
};
