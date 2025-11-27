
export enum NeedType {
    EQUIPMENT = 'Cần trang bị tốt hơn',
    CULTIVATION = 'Cần đột phá tu vi',
    SOCIAL = 'Cần quan hệ xã hội',
}

export interface CharacterNeed {
    type: NeedType;
    urgency: number; // 0-100
    detail?: string; // e.g., "Weapon slot is empty" or "Item 'xyz' is an upgrade"
}
