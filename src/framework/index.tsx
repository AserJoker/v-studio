interface Module {
  ready: boolean;
  deps: string[];
  init: () => Promise<void>;
}
export const InitBundle = async () => {
  const imported = import.meta.glob("./module/*.*", {
    eager: true,
  }) as Record<string, { default: Module }>;
  const modules: Record<string, Module> = {};
  Object.keys(imported).forEach((filepath) => {
    const part = filepath.split("/");
    const [name] = part[part.length - 1].split(".");
    modules[name] = imported[filepath].default;
  });
  const initModule = async (name: string): Promise<void> => {
    const m = modules[name];
    if (m.ready) {
      return;
    }
    await Promise.all(m.deps.map((dep) => initModule(dep)));
    return m.init();
  };
  await Promise.all(Object.keys(modules).map((m) => initModule(m)));
};
