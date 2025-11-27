
import { City } from '../../types/world.ts';

export const CITY_PREFIXES = ["Lạc", "Vân", "Thiên", "Hải", "Sơn", "Phong", "Lôi", "Điện", "Vũ", "Sương", "Tuyết", "Băng", "Xích", "Thanh", "Bạch", "Hắc", "Hoàng", "Tử"];
// Loại bỏ các hậu tố cũ như "Thành", "Đô", "Phủ" vì logic mới sẽ tự động thêm "Thành"
export const CITY_SUFFIXES = ["Nhật", "Nguyệt", "Tinh", "Dương", "Hải", "Sơn", "Hà", "Giang", "Lâm", "Nguyên", "Châu", "Bình", "An", "Ninh", "Khang", "Hoa", "Mộc", "Thạch"];

export const CITY_LEVELS = [1, 2, 3, 4, 5]; // Cấp độ quy mô thành trì
