export const get = function <T>(record: Record<string, unknown>, key: string) {
  const path = key.replace("]", "").replace("[", ".").split(".");
  let tmp: unknown = record;
  for (const item of path) {
    if (typeof tmp === "object" && tmp) {
      tmp = (tmp as Record<string, unknown>)[item];
    } else {
      tmp = undefined;
      break;
    }
  }
  return tmp as T;
};
