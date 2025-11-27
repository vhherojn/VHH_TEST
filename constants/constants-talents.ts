
import { TalentType } from "../types/index.ts";

export const TALENTS_DATA: Record<TalentType, { name: string; description: string }> = {
    [TalentType.CULTIVATION]: {
        name: 'Thiên Phú Tu Luyện',
        description: 'Ảnh hưởng đến tốc độ tăng tu vi cuối cùng.'
    },
    [TalentType.ALCHEMY]: {
        name: 'Thiên Phú Luyện Đan',
        description: 'Ảnh hưởng đến tốc độ và xác suất thành công khi luyện đan.'
    },
    [TalentType.BLACKSMITHING]: {
        name: 'Thiên Phú Luyện Khí',
        description: 'Ảnh hưởng đến tốc độ và xác suất thành công khi luyện khí.'
    },
    [TalentType.TALISMAN_MAKING]: {
        name: 'Thiên Phú Chế Phù',
        description: 'Ảnh hưởng đến tốc độ và xác suất thành công khi chế phù.'
    },
    [TalentType.FORMATION_MAKING]: {
        name: 'Thiên Phú Trận Pháp',
        description: 'Ảnh hưởng đến tốc độ và uy lực của trận pháp được bố trí.'
    },
    [TalentType.SPIRIT_FARMING]: {
        name: 'Thiên Phú Linh Thực',
        description: 'Ảnh hưởng đến sản lượng và chất lượng của linh dược trồng được.'
    },
    [TalentType.COMPREHENSION]: {
        name: 'Thiên Phú Lĩnh Ngộ',
        description: 'Ảnh hưởng đến tốc độ học và lĩnh ngộ công pháp, bí thuật.'
    },
    [TalentType.KIEM_DAO]: {
        name: 'Thiên Phú Kiếm Đạo',
        description: 'Ảnh hưởng đến tốc độ lĩnh ngộ và tu luyện các loại công pháp, bí thuật hệ Kiếm.'
    },
    [TalentType.THE_DAO]: {
        name: 'Thiên Phú Thể Đạo',
        description: 'Ảnh hưởng đến tốc độ lĩnh ngộ và tu luyện các loại công pháp, bí thuật hệ Luyện Thể.'
    },
    [TalentType.MA_DAO]: {
        name: 'Thiên Phú Ma Đạo',
        description: 'Ảnh hưởng đến tốc độ lĩnh ngộ và tu luyện các loại công pháp, bí thuật ma đạo (Huyết, Sát, Độc, v.v.).'
    },
};