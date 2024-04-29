export const reactive = function <T>(record: T, callback: (key: string) => void): T {
    return new Proxy(record as Record<string, unknown>, {
        get(_, key: string): unknown {
            const value = (record as Record<string, unknown>)[key];
            if (typeof value === 'object' && value) {
                return reactive(value as Record<string, unknown>, (field) => callback(`${key}.${field}`));
            }
            return value;
        },
        set(_, key: string, value: unknown) {
            (record as Record<string, unknown>)[key] = value;
            callback(key);
            return true;
        }
    }) as T;
}