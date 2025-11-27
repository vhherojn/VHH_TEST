import { ItemQuality, ItemType } from '../../types/index.ts';
import type { Resource } from '../../types/index.ts';

export const TOKENS: { [id: string]: Resource } = {
    library_token_1: {
        id: 'library_token_1',
        name: 'Lệnh Bài Tầng 1 - Tàng Kinh Các',
        description: 'Tín vật cho phép tộc nhân tiến vào Tàng Kinh Các Tầng 1 để tham ngộ công pháp Nhất Giai. Sẽ bị tiêu hao sau khi sử dụng.',
        quality: ItemQuality.NHAT_GIAI,
        type: ItemType.TOKEN,
        value: 100,
    },
    library_token_2: {
        id: 'library_token_2',
        name: 'Lệnh Bài Tầng 2 - Tàng Kinh Các',
        description: 'Tín vật cho phép tộc nhân tiến vào Tàng Kinh Các Tầng 2 để tham ngộ công pháp Nhị Giai. Sẽ bị tiêu hao sau khi sử dụng.',
        quality: ItemQuality.NHI_GIAI,
        type: ItemType.TOKEN,
        value: 500,
    },
    library_token_3: {
        id: 'library_token_3',
        name: 'Lệnh Bài Tầng 3 - Tàng Kinh Các',
        description: 'Tín vật cho phép tộc nhân tiến vào Tàng Kinh Các Tầng 3 để tham ngộ công pháp Tam Giai. Sẽ bị tiêu hao sau khi sử dụng.',
        quality: ItemQuality.TAM_GIAI,
        type: ItemType.TOKEN,
        value: 2500,
    },
    library_token_4: {
        id: 'library_token_4',
        name: 'Lệnh Bài Tầng 4 - Tàng Kinh Các',
        description: 'Tín vật cho phép tộc nhân tiến vào Tàng Kinh Các Tầng 4 để tham ngộ công pháp Tứ Giai. Sẽ bị tiêu hao sau khi sử dụng.',
        quality: ItemQuality.TU_GIAI,
        type: ItemType.TOKEN,
        value: 10000,
    },
    library_token_5: {
        id: 'library_token_5',
        name: 'Lệnh Bài Tầng 5 - Tàng Kinh Các',
        description: 'Tín vật cho phép tộc nhân tiến vào Tàng Kinh Các Tầng 5 để tham ngộ công pháp Ngũ Giai. Sẽ bị tiêu hao sau khi sử dụng.',
        quality: ItemQuality.NGU_GIAI,
        type: ItemType.TOKEN,
        value: 50000,
    },
    tu_luyen_thap_token_4: {
        id: 'tu_luyen_thap_token_4',
        name: 'Lệnh Bài - Tu Luyện Tháp - Tầng 4',
        description: 'Lệnh bài cần thiết để tiến vào tầng 4 của Tu Luyện Tháp trong 1 tháng. Tiêu hao khi sử dụng.',
        quality: ItemQuality.TU_GIAI,
        type: ItemType.TOKEN,
        value: 10000,
    },
    tu_luyen_thap_token_5: {
        id: 'tu_luyen_thap_token_5',
        name: 'Lệnh Bài - Tu Luyện Tháp - Tầng 5',
        description: 'Lệnh bài cần thiết để tiến vào tầng 5 của Tu Luyện Tháp trong 1 tháng. Tiêu hao khi sử dụng.',
        quality: ItemQuality.NGU_GIAI,
        type: ItemType.TOKEN,
        value: 50000,
    },
};
