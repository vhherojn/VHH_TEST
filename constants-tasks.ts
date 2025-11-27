import { ItemQuality, CultivationStage, ProfessionType } from './types/index.ts';
import { Task } from './types/index.ts';
import { ADVANCED_TASKS } from './constants/tasks-advanced.ts';


export const TASKS: Task[] = [
    {
        id: 'task_explore_ruins_1',
        name: 'Thăm Dò Di Tích Gần',
        description: 'Một di tích cổ gần lãnh địa gia tộc có dấu hiệu linh khí biến động. Cử người đến thăm dò để tìm kiếm cơ duyên.',
        duration: 3,
        requirements: {},
        rewards: {
            spirit_stone: 100,
            contribution: 10,
            items: { 'wood': 50, 'stone': 50 }
        }
    },
    {
        id: 'task_hunt_beasts_1',
        name: 'Săn Bắt Yêu Thú',
        description: 'Đàn yêu thú cấp thấp đang quấy nhiễu phàm nhân gần đó. Hãy cử người đi tiêu diệt chúng.',
        duration: 2,
        requirements: {
            minCultivationStage: CultivationStage.QI_REFINEMENT
        },
        rewards: {
            spirit_stone: 150,
            contribution: 15,
            items: { 'yeu_dan_nhat_giai': 2 }
        }
    },
    {
        id: 'task_gather_herbs_1',
        name: 'Thu Hoạch Linh Thảo',
        description: 'Phát hiện một khu vực có nhiều linh thảo cấp thấp. Cần người có kinh nghiệm về dược liệu đến thu hoạch.',
        duration: 4,
        requirements: {
            requiredProfession: {
                type: ProfessionType.SPIRIT_FARMER,
                tier: ItemQuality.NHAT_GIAI
            }
        },
        rewards: {
            spirit_stone: 50,
            contribution: 10,
            items: { 'nap_khi_thao': 10, 'man_da_can': 5 }
        }
    },
    {
        id: 'task_escort_merchant',
        name: 'Hộ Tống Thương Đội',
        description: 'Một thương đội cần được bảo vệ khi đi qua khu vực nguy hiểm. Phần thưởng sẽ rất hậu hĩnh.',
        duration: 6,
        requirements: {
            minCultivationStage: CultivationStage.FOUNDATION_ESTABLISHMENT
        },
        rewards: {
            spirit_stone: 500,
            contribution: 50,
        }
    },
    {
        id: 'task_guard_gate',
        name: 'Trấn Giữ Sơn Môn',
        description: 'Sơn môn của gia tộc cần có người canh gác để ngăn kẻ lạ đột nhập. Một công việc đơn giản nhưng cần thiết.',
        duration: 2,
        requirements: {}, // No requirements, suitable for anyone
        rewards: {
            spirit_stone: 50,
            contribution: 5,
        }
    },
    {
        id: 'task_clean_hall',
        name: 'Dọn Dẹp Từ Đường',
        description: 'Từ đường là nơi thiêng liêng và phải được giữ sạch sẽ. Hãy thể hiện lòng thành kính với tổ tiên.',
        duration: 1,
        requirements: {},
        rewards: {
            contribution: 5,
        }
    },
    {
        id: 'task_help_villagers',
        name: 'Trừ Hại Cho Dân',
        description: 'Lợn rừng đang phá hoại mùa màng của một ngôi làng gần đó. Hãy cử người đi xử lý chúng.',
        duration: 2,
        requirements: {},
        rewards: {
            spirit_stone: 30,
            contribution: 8,
        }
    },
    ...ADVANCED_TASKS,
];