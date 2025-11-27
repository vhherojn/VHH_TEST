

import type { Location, LocationData } from '../types/index.ts';
import { LOCATION_PREFABS_DATA, PREDEFINED_LOCATIONS } from '../constants.ts';

export const getPredefinedLocations = (): Location[] => {
    // Simply returns the predefined locations. One of them should have isAncestral = true.
    return PREDEFINED_LOCATIONS;
};

export const generateLocalLocationData = (location: Location): LocationData => {
    const prefab = location.prefab || 'mountains';
    const templates = LOCATION_PREFABS_DATA[prefab] || LOCATION_PREFABS_DATA.mountains;
    const template = templates[Math.floor(Math.random() * templates.length)];
    return {
        name: location.name,
        type: template.type || "Bí Cảnh",
        description: template.description || "Một vùng đất chưa được khám phá.",
        linh_khi: template.linh_khi || "Bình thường",
        tai_nguyen: template.tai_nguyen || ["Không rõ"],
        gia_toc_anh_huong: ["Chưa rõ"],
    };
};
