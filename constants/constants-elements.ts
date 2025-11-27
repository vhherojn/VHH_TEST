import { Element } from '../types/index.ts';

export const ELEMENTAL_COUNTERS: Record<Element, Element> = {
    [Element.WOOD]: Element.EARTH,
    [Element.EARTH]: Element.WATER,
    [Element.WATER]: Element.FIRE,
    [Element.FIRE]: Element.METAL,
    [Element.METAL]: Element.WOOD,

    // Dị linh căn không khắc chế và không bị khắc chế trong hệ thống này
    [Element.LIGHTNING]: Element.LIGHTNING, // Self-counter means no standard counter
    [Element.WIND]: Element.WIND,
    [Element.ICE]: Element.ICE,
};
