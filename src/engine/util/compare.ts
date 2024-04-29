export const compare = (value1: unknown, value2: unknown): boolean => {
    if (value1 === value2) {
        return true;
    }
    if (typeof value1 !== typeof value2) {
        return false;
    }
    if (Array.isArray(value1)) {
        if (Array.isArray(value2)) {
            return value1.reduce((last, item, index) => {
                return last && compare(item, value2[index]);
            }, true);
        }
    } else if (typeof value1 === 'object' && typeof value2 === 'object' && value1 && value2) {
        const keys1 = Object.keys(value1);
        const keys2 = Object.keys(value2);
        if (keys1.length != keys2.length) {
            return false;
        }
        return keys1.reduce((last, key) => {
            return last && compare((value1 as Record<string, unknown>)[key], (value2 as Record<string, unknown>)[key]);
        }, true);
    }
    return false;
}