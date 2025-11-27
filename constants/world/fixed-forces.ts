
import { Force } from '../../types/forces.ts';
import { ForceRank, Gender } from '../../types/enums.ts';
import { AVATAR_PARTS } from '../constants-character.ts';

// Helper to create a fixed avatar
const createFixedAvatar = (gender: Gender) => {
    const parts = AVATAR_PARTS[gender].ADULT;
    return {
        base: parts.BASE[0],
        eyes: parts.EYES[0],
        hair: parts.HAIR[0],
        mouth: parts.MOUTH[0],
        skinColor: '#f3d9b7',
        accessory: parts.ACCESSORY[0]
    };
};

export const FIXED_FORCES_DATA: Force[] = [
    {
        id: 'force_thien_nhat_mon',
        name: 'Thiên Nhất Môn',
        description: 'Đệ nhất chính đạo tông môn tại vùng này. Chuyên tu kiếm đạo, lấy việc trảm yêu trừ ma làm nhiệm vụ của mình. Môn quy nghiêm ngặt, đệ tử đều là những bậc chính nhân quân tử.',
        icon: 'righteous',
        rank: ForceRank.THANH_DIA,
        power: 500000,
        resources: 200000,
        population: 5000,
        experts: 50,
        territoryIds: [],
        headquartersId: null,
        diplomacy: {},
        leader: {
            name: 'Thiên Cơ Tử',
            title: 'Chưởng Môn',
            cultivationStage: 'Hóa Thần Trung Kỳ',
            avatar: createFixedAvatar(Gender.MALE)
        }
    },
    {
        id: 'force_tinh_nguyet_cung',
        name: 'Tinh Nguyệt Cung',
        description: 'Một thế lực thần bí chỉ thu nhận nữ đệ tử. Tinh Nguyệt Cung nằm ẩn mình trên đỉnh núi tuyết, tu luyện công pháp liên quan đến trăng và sao. Họ ít khi can dự vào việc thế tục nhưng không ai dám coi thường.',
        icon: 'righteous',
        rank: ForceRank.DINH_CAP,
        power: 350000,
        resources: 150000,
        population: 3000,
        experts: 30,
        territoryIds: [],
        headquartersId: null,
        diplomacy: {},
        leader: {
            name: 'Nguyệt Thần Tiên Tử',
            title: 'Cung Chủ',
            cultivationStage: 'Nguyên Anh Đỉnh Phong',
            avatar: createFixedAvatar(Gender.FEMALE)
        }
    },
    {
        id: 'force_huyet_ma_tong',
        name: 'Huyết Ma Tông',
        description: 'Ma đạo đệ nhất tông. Tu luyện Huyết Sát công pháp tàn độc, thường xuyên gây ra những vụ thảm sát để tế luyện ma khí. Là kẻ thù không đội trời chung của Thiên Nhất Môn.',
        icon: 'evil',
        rank: ForceRank.DINH_CAP,
        power: 400000,
        resources: 180000,
        population: 4000,
        experts: 40,
        territoryIds: [],
        headquartersId: null,
        diplomacy: {},
        leader: {
            name: 'Huyết Lệ Lão Tổ',
            title: 'Tông Chủ',
            cultivationStage: 'Nguyên Anh Hậu Kỳ',
            avatar: createFixedAvatar(Gender.MALE)
        }
    },
    {
        id: 'force_van_thu_son',
        name: 'Vạn Thú Sơn',
        description: 'Thế lực trung lập, chuyên về ngự thú. Đệ tử Vạn Thú Sơn thường đi kèm với một con yêu thú bản mệnh. Họ nắm giữ nhiều bí mật về rừng rậm và các loài dị thú.',
        icon: 'righteous',
        rank: ForceRank.TAM_GIAI,
        power: 150000,
        resources: 80000,
        population: 2000,
        experts: 20,
        territoryIds: [],
        headquartersId: null,
        diplomacy: {},
        leader: {
            name: 'Thú Vương',
            title: 'Sơn Chủ',
            cultivationStage: 'Kết Đan Viên Mãn',
            avatar: createFixedAvatar(Gender.MALE)
        }
    },
     {
        id: 'force_duoc_vuong_coc',
        name: 'Dược Vương Cốc',
        description: 'Nơi hội tụ của các Luyện Đan Sư tài ba nhất. Dù sức chiến đấu không cao nhưng Dược Vương Cốc có tầm ảnh hưởng cực lớn nhờ vào khả năng luyện chế linh đan diệu dược.',
        icon: 'righteous',
        rank: ForceRank.TAM_GIAI,
        power: 80000,
        resources: 300000,
        population: 1000,
        experts: 10,
        territoryIds: [],
        headquartersId: null,
        diplomacy: {},
        leader: {
            name: 'Mộc Dược Sư',
            title: 'Cốc Chủ',
            cultivationStage: 'Kết Đan Hậu Kỳ',
            avatar: createFixedAvatar(Gender.MALE)
        }
    }
];
