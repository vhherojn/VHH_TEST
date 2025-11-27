
import { CultivationStage, ForceRank } from '../../types/index.ts';

export interface ForceRankData {
    name: string;
    description: string;
    requiredStage?: CultivationStage;
    isPeak?: boolean; // For Luyen Khi Ky - Dinh Phong
    populationCap: number; // Mới: Giới hạn số lượng tu sĩ
}

export const FORCE_RANK_DATA: Record<ForceRank, ForceRankData> = {
    [ForceRank.HA_LUU]: {
        name: 'Hạ lưu Thế Lực',
        description: 'Thế lực mới thành lập hoặc yếu kém, không có tu sĩ Luyện Khí Kỳ Đỉnh Phong toạ trấn.',
        populationCap: 125,
    },
    [ForceRank.NHAT_GIAI]: {
        name: 'Nhất giai Thế Lực',
        description: 'Có ít nhất một tu sĩ Luyện Khí Kỳ Đỉnh Phong, bắt đầu có chút danh tiếng trong vùng.',
        requiredStage: CultivationStage.QI_REFINEMENT,
        isPeak: true,
        populationCap: 250,
    },
    [ForceRank.NHI_GIAI]: {
        name: 'Nhị giai Thế Lực',
        description: 'Có Trúc Cơ Kỳ tu sĩ toạ trấn, là một thế lực không thể xem thường trong một khu vực.',
        requiredStage: CultivationStage.FOUNDATION_ESTABLISHMENT,
        populationCap: 500,
    },
    [ForceRank.TAM_GIAI]: {
        name: 'Tam giai Thế Lực',
        description: 'Có Kết Đan Kỳ tu sĩ, là một thế lực lớn, có thể xưng bá một phương.',
        requiredStage: CultivationStage.CORE_FORMATION,
        populationCap: 1000,
    },
    [ForceRank.DINH_CAP]: {
        name: 'Đỉnh Cấp Thế Lực',
        description: 'Có Nguyên Anh Kỳ Lão Tổ toạ trấn, là thế lực hàng đầu trên đại lục.',
        requiredStage: CultivationStage.NASCENT_SOUL,
        populationCap: 2000,
    },
    [ForceRank.THANH_DIA]: {
        name: 'Thánh Địa',
        description: 'Có Hóa Thần Kỳ đại năng, là thế lực tối cao, là thánh địa trong lòng tu sĩ toàn cõi.',
        requiredStage: CultivationStage.SOUL_FORMATION,
        populationCap: 5000,
    },
};
