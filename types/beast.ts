
import { ItemQuality, Element } from './enums.ts';

export interface BeastDrop {
    itemId: string;
    min: number;
    max: number;
    chance: number; // 0.0 - 1.0
}

export interface Beast {
    id: string;
    name: string;
    description: string;
    tier: ItemQuality; // Nhất Giai, Nhị Giai...
    stage: 'Sơ Kỳ' | 'Trung Kỳ' | 'Hậu Kỳ' | 'Đỉnh Phong';
    elements: Element[];
    drops: BeastDrop[];
    // Các chỉ số chiến đấu cơ bản (cho tính năng combat sau này)
    baseCombatPower?: number; 
    isBoss?: boolean;
}
