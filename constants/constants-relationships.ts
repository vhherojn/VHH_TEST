import { RelationshipClass } from '../types/index.ts';

// Đây là khung sườn, logic chi tiết sẽ được thêm sau
export const RELATIONSHIP_MODIFIERS = {
    [RelationshipClass.FAMILY_CLOSE]: {
        trustModifier: 1.2,
        supportChance: 0.5,
    },
    [RelationshipClass.FRIEND]: {
        trustModifier: 1.1,
        supportChance: 0.2,
    },
    [RelationshipClass.RIVAL]: {
        trustModifier: 0.8,
        supportChance: -0.1,
    }
}