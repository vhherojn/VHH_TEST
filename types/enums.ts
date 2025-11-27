

export enum ItemQuality { NHAT_GIAI = 'Nhất Giai', NHI_GIAI = 'Nhị Giai', TAM_GIAI = 'Tam Giai', TU_GIAI = 'Tứ Giai', NGU_GIAI = 'Ngũ Giai', }
export enum EquipmentQuality { HA_PHAM = 'Hạ Phẩm', TRUNG_PHAM = 'Trung Phẩm', THUONG_PHAM = 'Thượng Phẩm', }
export enum ItemType { RESOURCE = 'Tài Nguyên', MATERIAL = 'Vật Liệu', HERB = 'Linh Dược', SEED = 'Hạt Giống', WEAPON = 'Vũ Khí', HELMET = 'Hộ Tâm', CHESTPLATE = 'Nhuyễn Giáp', BOOTS = 'Toa', TALISMAN = 'Phù Bảo', PILL = 'Đan Dược', FORMATION = 'Trận Pháp', CULTIVATION_METHOD = 'Công Pháp', SECRET_ART = 'Bí Thuật', SPELL = 'Pháp Quyết', TOKEN = 'Lệnh Bài', BLUEPRINT = 'Bản Vẽ', DAN_PHUONG = 'Đan Phương' }
export enum WeaponType { PHAP_KHI = 'Pháp Khí', BAN_MENH_PHAP_BAO = 'Bản Mệnh Pháp Bảo', }
export enum CultivationStage { QI_REFINEMENT = 'Luyện Khí Kỳ', FOUNDATION_ESTABLISHMENT = 'Trúc Cơ Kỳ', CORE_FORMATION = 'Kết Đan Kỳ', NASCENT_SOUL = 'Nguyên Anh Kỳ', SOUL_FORMATION = 'Hóa Thần Kỳ', }
export enum Element { METAL = 'Kim', WOOD = 'Mộc', WATER = 'Thuỷ', FIRE = 'Hoả', EARTH = 'Thổ', LIGHTNING = 'Lôi', WIND = 'Phong', ICE = 'Băng', }
export enum Gender { MALE = 'Nam', FEMALE = 'Nữ' }
export enum CharacterStatus { ALIVE = 'Còn Sống', DECEASED = 'Đã Mất', }

export enum RelationshipClass {
    SPOUSE = 'Đạo Lữ',
    MASTER = 'Sư Phụ',
    DISCIPLE = 'Đệ Tử',
    FAMILY_CLOSE = 'Gia Đình Thân Thiết', // cha mẹ, con cái
    FRIEND = 'Bằng Hữu',
    RIVAL = 'Đối Thủ',
}

export enum ProfessionType {
    ALCHEMIST = 'Luyện Đan Sư',
    BLACKSMITH = 'Luyện Khí Sư',
    TALISMAN_MASTER = 'Chế Phù Sư',
    FORMATION_MASTER = 'Trận Pháp Sư',
    SPIRIT_FARMER = 'Linh Thực Sư',
}

export enum SpiritualRootType {
    HEAVENLY = 'Thiên Linh Căn',
    MUTATED = 'Dị Linh Căn',
    DUAL = 'Song Linh Căn',
    TRIPLE = 'Tam Linh Căn',
    QUAD = 'Tứ Linh Căn',
    PENTAD = 'Ngũ Hành Linh Căn',
}

export enum PhysiqueTier {
    COMMON = 'Phàm',
    SPIRIT = 'Linh',
    EARTH = 'Địa',
    HEAVEN = 'Thiên',
    SAINT = 'Thánh',
    DIVINE = 'Thần',
}

export enum RankType {
    DE_TU_NGOAI_TOC = 'Đệ Tử Ngoại Tộc',
    DE_TU_NOI_TOC = 'Đệ Tử Nội Tộc',
    DE_TU_NOI_MON = 'Đệ Tử Nội Môn',
    DE_TU_NONG_COT = 'Đệ Tử Nòng Cốt',
    DE_TU_TINH_ANH = 'Đệ Tử Tinh Anh',
    TRUONG_LAO_SU_VU = 'Trưởng Lão Sự Vụ',
    KHACH_KHANH = 'Khách Khanh - Trưởng lão',
    TRUONG_LAO = 'Trưởng Lão',
    THANH_TU = 'Thánh Tử',
    DAI_TRUONG_LAO = 'Đại Trưởng Lão',
    THIEU_TOC_TRUONG = 'Thiếu Tộc Trưởng',
    TOC_TRUONG = 'Tộc Trưởng',
}
export enum TalentType {
    CULTIVATION = 'Thiên Phú Tu Luyện',
    ALCHEMY = 'Thiên Phú Luyện Đan',
    BLACKSMITHING = 'Thiên Phú Luyện Khí',
    TALISMAN_MAKING = 'Thiên Phú Chế Phù',
    FORMATION_MAKING = 'Thiên Phú Trận Pháp',
    SPIRIT_FARMING = 'Thiên Phú Linh Thực',
    COMPREHENSION = 'Thiên Phú Lĩnh Ngộ',
    KIEM_DAO = 'Thiên Phú Kiếm Đạo',
    THE_DAO = 'Thiên Phú Thể Đạo',
    MA_DAO = 'Thiên Phú Ma Đạo',
}
export enum TechniqueMastery {
    NHAP_MON = 'Nhập Môn',
    TIEU_THANH = 'Tiểu Thành',
    DAI_THANH = 'Đại Thành',
    VIEN_MAN = 'Viên Mãn',
}

export enum ForceRank {
    HA_LUU = 'Hạ lưu Thế Lực',
    NHAT_GIAI = 'Nhất giai Thế Lực',
    NHI_GIAI = 'Nhị giai Thế Lực',
    TAM_GIAI = 'Tam giai Thế Lực',
    DINH_CAP = 'Đỉnh Cấp Thế Lực',
    THANH_DIA = 'Thánh Địa',
}