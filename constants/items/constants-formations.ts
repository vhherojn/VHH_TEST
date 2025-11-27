
import { ItemType, ItemQuality } from "../../types/index.ts";
import type { Formation } from '../../types/index.ts';

export const FORMATIONS: { [key: string]: Formation } = {
    tu_linh_tran_1: {
        id: 'tu_linh_tran_1',
        name: 'Tụ Linh Trận - Nhất Giai',
        type: ItemType.FORMATION,
        quality: ItemQuality.NHAT_GIAI,
        description: 'Một trận pháp đơn giản, có thể tụ tập linh khí trong một phạm vi nhỏ, tăng nhẹ tốc độ tu luyện cho cả gia tộc.',
        effects: { clanCultivationSpeedModifier: 1.05 },
    },
    tu_linh_tran_2: {
        id: 'tu_linh_tran_2',
        name: 'Tụ Linh Trận - Nhị Giai',
        type: ItemType.FORMATION,
        quality: ItemQuality.NHI_GIAI,
        description: 'Trận pháp được cải tiến, hiệu quả tụ linh tốt hơn, tăng tốc độ tu luyện cho cả gia tộc.',
        effects: { clanCultivationSpeedModifier: 1.10 },
    },
    tu_linh_tran_3: {
        id: 'tu_linh_tran_3',
        name: 'Tụ Linh Trận - Tam Giai',
        type: ItemType.FORMATION,
        quality: ItemQuality.TAM_GIAI,
        description: 'Một trận pháp cao cấp, hiệu quả tụ linh rõ rệt, là nền tảng của nhiều thế lực.',
        effects: { clanCultivationSpeedModifier: 1.15 },
    },
    tu_linh_tran_4: {
        id: 'tu_linh_tran_4',
        name: 'Tụ Linh Trận - Tứ Giai',
        type: ItemType.FORMATION,
        quality: ItemQuality.TU_GIAI,
        description: 'Trận pháp uy lực, có thể thay đổi linh khí một vùng, là bí mật không truyền của các đại gia tộc.',
        effects: { clanCultivationSpeedModifier: 1.25 },
    },
    tu_linh_tran_5: {
        id: 'tu_linh_tran_5',
        name: 'Tụ Linh Trận - Ngũ Giai',
        type: ItemType.FORMATION,
        quality: ItemQuality.NGU_GIAI,
        description: 'Trận pháp trong truyền thuyết, nghe đồn có thể tạo ra một tiểu linh mạch.',
        effects: { clanCultivationSpeedModifier: 1.40 },
    },
};