/**
 * Performs a deep clone of an object. This is more performant than JSON.parse(JSON.stringify(obj))
 * as it avoids the overhead of string conversion and handles more data types.
 * @param obj The object to clone.
 * @returns A deep copy of the object.
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any;
  }

  // Handle Array
  if (Array.isArray(obj)) {
    const arrCopy = [] as any[];
    for (let i = 0; i < obj.length; i++) {
      arrCopy[i] = deepClone(obj[i]);
    }
    return arrCopy as any;
  }

  // Handle Object
  const objCopy = {} as { [key: string]: any };
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      objCopy[key] = deepClone((obj as any)[key]);
    }
  }

  return objCopy as T;
}

import { ItemQuality, EquipmentQuality } from '../../types/index.ts';

export const getNextTierAndQuality = (currentTier: ItemQuality, currentQuality: EquipmentQuality): { tier: ItemQuality, quality: EquipmentQuality } | null => {
    const qualityValues = Object.values(EquipmentQuality);
    const tierValues = Object.values(ItemQuality);
    
    const currentQualityIndex = qualityValues.indexOf(currentQuality);
    if (currentQualityIndex < qualityValues.length - 1) {
        return { tier: currentTier, quality: qualityValues[currentQualityIndex + 1] };
    } else {
        const currentTierIndex = tierValues.indexOf(currentTier);
        if (currentTierIndex < tierValues.length - 1) {
            return { tier: tierValues[currentTierIndex + 1], quality: qualityValues[0] };
        }
    }
    return null; // Already at max level
};
