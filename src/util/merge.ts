export const merge = <T>(source: T, record: T) => {
  if (source === record) {
    return record;
  }
  if (typeof source !== "object" || source === null) {
    return record;
  }
  if (typeof source !== typeof record) {
    return record;
  }
  if (Array.isArray(source) || Array.isArray(record)) {
    return record;
  }
  Object.keys(record as Record<string, unknown>).forEach((key) => {
    (source as Record<string, unknown>)[key] = merge(
      (source as Record<string, unknown>)[key],
      (record as Record<string, unknown>)[key]
    );
  });
  return source;
};
