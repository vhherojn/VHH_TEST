import { CultivationStage, ProfessionType, ItemQuality } from '../types/index.ts';
import { Task } from '../types/index.ts';

export const ADVANCED_TASKS: Task[] = [
    // Trúc Cơ Kỳ
    {
        id: 'task_explore_cave_1',
        name: 'Thám Hiểm Yêu Quật',
        description: 'Phát hiện một yêu quật ở dãy núi gần đó, có yêu khí Trúc Cơ Kỳ. Cử một đội đi tiêu diệt yêu thú, chiếm đoạt tài nguyên.',
        duration: 12,
        requirements: {
            minCultivationStage: CultivationStage.FOUNDATION_ESTABLISHMENT,
            partySize: { min: 2, max: 3 }
        },
        rewards: {
            spirit_stone: 1000,
            contribution: 100,
            items: { 'yeu_dan_nhi_giai': 5, 'hac_thiet': 20 }
        }
    },
    {
        id: 'task_protect_spirit_mine',
        name: 'Bảo Vệ Mỏ Linh Thạch',
        description: 'Một mỏ linh thạch nhỏ bị tán tu dòm ngó. Cần một Trúc Cơ tu sĩ trấn giữ trong một thời gian dài.',
        duration: 24,
        requirements: {
            minCultivationStage: CultivationStage.FOUNDATION_ESTABLISHMENT,
        },
        rewards: {
            spirit_stone: 2500,
            contribution: 200,
        }
    },

    // Kết Đan Kỳ
    {
        id: 'task_ancient_ruins_excavation',
        name: 'Khai Quật Di Tích Cổ',
        description: 'Một di tích cổ đại có cấm chế mạnh mẽ, cần ít nhất một đội Kết Đan Kỳ tu sĩ mới có thể phá giải, tìm kiếm cơ duyên thượng cổ.',
        duration: 36,
        requirements: {
            minCultivationStage: CultivationStage.CORE_FORMATION,
            partySize: { min: 3, max: 5 }
        },
        rewards: {
            spirit_stone: 8000,
            contribution: 500,
            items: { 'yeu_dan_tam_giai': 3, 'hoang_thiet': 15 }
        }
    },
    {
        id: 'task_assassinate_rival_elder',
        name: 'Ám Sát Trưởng Lão Địch Tộc',
        description: 'Một trưởng lão của gia tộc đối địch đang ở bên ngoài một mình. Đây là cơ hội ngàn vàng để trừ đi một hoạ lớn.',
        duration: 6,
        requirements: {
            minCultivationStage: CultivationStage.CORE_FORMATION,
        },
        rewards: {
            spirit_stone: 5000,
            contribution: 1000,
        }
    },

    // Nguyên Anh Kỳ
    {
        id: 'task_quell_beast_tide',
        name: 'Trấn Áp Thú Triều',
        description: 'Một đợt thú triều quy mô lớn đang hình thành, có nguy cơ uy hiếp cả một vùng. Cần Lão Tổ Nguyên Anh ra tay mới có thể bình ổn.',
        duration: 24,
        requirements: {
            minCultivationStage: CultivationStage.NASCENT_SOUL,
        },
        rewards: {
            spirit_stone: 50000,
            contribution: 8000,
            items: { 'yeu_dan_tu_giai': 10, 'yeu_cot_tu_giai': 5 }
        }
    },
    {
        id: 'task_explore_secret_realm',
        name: 'Thăm Dò Bí Cảnh',
        description: 'Một bí cảnh không gian vừa mở ra, bên trong có vô số kỳ trân dị bảo nhưng cũng đầy rẫy nguy hiểm. Chỉ có Lão Tổ Nguyên Anh mới đủ sức vào trong.',
        duration: 48,
        requirements: {
            minCultivationStage: CultivationStage.NASCENT_SOUL,
        },
        rewards: {
            spirit_stone: 30000,
            contribution: 5000,
            items: { 'xich_dong': 10 }
        }
    },
];
