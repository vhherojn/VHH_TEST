
import { ForceRank } from './enums.ts';
import { Avatar } from './character.ts';

export interface DiplomacyState {
    relation: number; // -100 (Kẻ thù) đến 100 (Đồng minh)
    intelLevel: number; // 0 (Mù tịt) đến 100 (Thấu hiểu)
    isAtWar?: boolean;
}

export interface ForceLeader {
    name: string;
    avatar: Avatar;
    cultivationStage: string; // Chỉ cần string để hiển thị (VD: Nguyên Anh Hậu Kỳ)
    title: string; // Ví dụ: Chưởng Môn, Cung Chủ, Lão Tổ
}

export interface Force {
  id: string;
  name: string;
  description: string;
  icon: 'righteous' | 'evil';
  rank: ForceRank;
  
  // Hệ thống mới 0.20.32 & 0.20.34
  power: number; // Sức mạnh quân sự tổng hợp
  resources: number; // Tài nguyên tích lũy
  population: number; // Số lượng môn nhân đệ tử (Mới)
  experts: number; // Số lượng cao tầng (Trúc Cơ/Kết Đan/...) (Mới)
  territoryIds: string[]; // Danh sách ID địa bàn đang chiếm
  
  // 0.20.36: Đại Bản Doanh
  headquartersId: string | null; // ID của Location nơi đặt đại bản doanh

  // 0.20.44: Người Lãnh Đạo
  leader: ForceLeader;

  // Quan hệ với các thế lực khác (Key là ForceID của đối phương)
  diplomacy: Record<string, DiplomacyState>; 
}
