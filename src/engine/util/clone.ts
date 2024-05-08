export const clone: <T>(src: T) => T = (s) => {
  const cache = new Map();
  const _clone = (src: unknown): unknown => {
    if (["string", "number", "boolean", "undefined"].includes(typeof src)) {
      return src;
    }
    if (!src) {
      return src;
    }
    if (Array.isArray(src)) {
      return src.map(_clone) as typeof src;
    }
    const res: Record<string, unknown> = {};
    Object.keys(src as Record<string, unknown>).forEach((key) => {
      const value = (src as Record<string, unknown>)[key];
      const item = cache.get(value);
      if (item) {
        res[key] = item;
      } else {
        const val = _clone(value);
        res[key] = val;
        cache.set(value, val);
      }
    });
    return res as typeof src;
  };
  return _clone(s) as typeof s;
};
