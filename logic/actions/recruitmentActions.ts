import type { Clan, Event, Character } from '../../types/index.ts';
import { CultivationStage, RankType } from '../../types/index.ts';
import { createCharacter } from '../character.ts';
import { deepClone } from '../utils/clone.ts';

type RecruitmentActionResult = { updatedClan?: Clan; newEvents?: Omit<Event, 'id' | 'date'>[]; error?: string; };

const DISCOVERY_COST = 500;

const RANDOM_FAMILY_NAMES = ["Lý", "Trần", "Vương", "Lưu", "Triệu", "Ngô", "Tôn", "Chu", "Hồ", "Cao"];

export function discoverNewTalent(clan: Clan): RecruitmentActionResult {
    if ((clan.resources.spirit_stone || 0) < DISCOVERY_COST) {
        return { error: `Không đủ Linh Thạch để tìm kiếm Tiên Miêu (cần ${DISCOVERY_COST}).` };
    }

    const newClan = deepClone(clan);
    newClan.resources.spirit_stone -= DISCOVERY_COST;
    
    // Clear previous pending recruits
    newClan.pendingRecruits = [];
    
    const numberOfRecruits = 1 + Math.floor(Math.random() * 3); // 1 to 3 recruits

    for (let i = 0; i < numberOfRecruits; i++) {
        const familyName = RANDOM_FAMILY_NAMES[Math.floor(Math.random() * RANDOM_FAMILY_NAMES.length)];
        const newRecruit = createCharacter({
            familyName: familyName,
            age: 6,
            isPatriarch: false,
            cultivationStage: CultivationStage.QI_REFINEMENT,
            cultivationLevel: 1,
            generation: 1,
        });
        newRecruit.loyalty = 50 + Math.floor(Math.random() * 21); // Base loyalty
        newClan.pendingRecruits.push(newRecruit);
    }
    
    return {
        updatedClan: newClan,
        newEvents: [{ description: `Tốn ${DISCOVERY_COST} linh thạch, gia tộc đã tìm thấy ${numberOfRecruits} hài đồng có linh căn.` }]
    };
}

export function recruitNewMember(clan: Clan, recruitId: string): RecruitmentActionResult {
    const newClan = deepClone(clan);
    const recruitIndex = newClan.pendingRecruits.findIndex((r: Character) => r.id === recruitId);
    
    if (recruitIndex === -1) {
        return { error: "Không tìm thấy hài đồng này." };
    }
    
    const [recruit] = newClan.pendingRecruits.splice(recruitIndex, 1);
    
    const clanFamilyName = newClan.members[0]?.name.split(' ')[0];
    const recruitFamilyName = recruit.name.split(' ')[0];

    recruit.rank = clanFamilyName === recruitFamilyName ? RankType.DE_TU_NOI_TOC : RankType.DE_TU_NGOAI_TOC;
    
    // Grant welcome package
    for (const pkgItem of newClan.welcomePackage) {
        if ((newClan.itemInventory[pkgItem.itemId] || 0) >= pkgItem.count) {
             newClan.itemInventory[pkgItem.itemId] -= pkgItem.count;
             recruit.inventory[pkgItem.itemId] = (recruit.inventory[pkgItem.itemId] || 0) + pkgItem.count;
        }
    }
    
    newClan.members.push(recruit);
    
    return {
        updatedClan: newClan,
        newEvents: [
            {
                description: `Hài đồng ${recruit.name} đã chính thức bái nhập gia tộc, trở thành ${recruit.rank}.`,
                characterIds: [recruit.id]
            },
            {
                description: `Gia tộc đã ban thưởng một gói phúc lợi nhập tộc cho tân tộc nhân ${recruit.name}.`,
                characterIds: [recruit.id]
            }
        ]
    };
}