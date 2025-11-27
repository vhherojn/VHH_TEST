
import type { Force } from './forces.ts';
import { ItemQuality } from './enums.ts';

export interface Territory {
    id: string;
    name: string;
    type: 'linh_thach' | 'duoc_lieu' | 'khoang_san' | 'bi_canh'; 
    resourceItemId: string; 
    tier: ItemQuality; 
    quality: number; // 1-100, ảnh hưởng sản lượng
    ownerForceId: string | null; // ID của thế lực chiếm đóng
}

export interface Peak {
    id: string;
    name: string;
    tier: ItemQuality; // Cấp độ linh khí của ngọn núi
    ownerForceId: string | null;
    description: string;
}

export interface MortalKingdom {
    id: string;
    name: string;
    population: number; 
    stability: number; 
    description: string;
}

export interface Market {
    id: string;
    name: string;
    size: 'small' | 'medium' | 'large';
    specialty: string; 
    ownerForceId: string | null;
}

export interface City {
    id: string;
    name: string;
    level: number; 
    taxIncome: number; 
    ownerForceId: string | null;
    defense: number;
}

export interface District {
    id: string;
    name: string;
    region: string; 
    x: number; 
    y: number;
    description: string;
}

// 0.20.48: Tiểu Phân Đà
export interface SubBranch {
    forceId: string;
    masterId: string | null; // ID nhân vật làm Tiểu Đà Chủ
    budget: number; // Ngân sách hoạt động (Linh thạch)
    corruption: number; // 0-100: Mức độ tham ô
    loyalty: number; // 0-100: Lòng trung thành của phân đà
    lastInvestigation: number; // Tháng lần cuối điều tra
    isRevolting?: boolean; // Đang làm phản?
}

// 0.20.50: LocationType đơn giản hóa
export type LocationType = 'Vùng Tài Nguyên' | 'Sơn Mạch' | 'Cấm Địa'; 

export interface Location { 
    id: string; 
    name: string; 
    type: LocationType; 
    region: string; 
    districtId: string; 
    x: number; 
    y: number; 
    isAncestral?: boolean; 
    prefab?: 'palace' | 'mountains' | 'city' | 'forest' | 'ruins' | 'island' | 'desert' | 'snow' | 'volcano' | 'peak'; 
    
    peaks: Peak[]; // 0.20.50: Các ngọn núi chính trong vùng
    territories: Territory[];
    forces: Force[];

    kingdoms: MortalKingdom[];
    markets: Market[];
    cities: City[];
    
    // 0.20.48: Quản lý phân đà của các thế lực tại địa điểm này
    subBranches: Record<string, SubBranch>; 
}

export interface WorldNews {
    id: string;
    month: number;
    type: 'war' | 'rumor' | 'treasure' | 'event';
    content: string;
    importance: 'normal' | 'high' | 'critical';
}

export interface LocationData { name:string; type: string; description: string; linh_khi: string; tai_nguyen: string[]; gia_toc_anh_huong: string[]; }
export interface GameDate { year: number; month: number; }
export interface Event { id: string; date: GameDate; description: string; characterIds?: string[]; }
