import { MenuManager, Runtime } from "@/runtime";

export default {
  deps: ["menu"],
  ready: false,
  init() {
    const locales = import.meta.glob("@/locale/*.ts", {
      eager: true,
    }) as Record<string, { default: Record<string, unknown> }>;
    Object.keys(locales).forEach((filepath) => {
      const parts = filepath.split("/");
      const filename = parts[parts.length - 1];
      const [name] = filename.split(".");
      const locale = locales[filepath].default;
      Runtime.theApp.$locale.setLocale(name, locale);
    });
    Runtime.theApp.$locale.setLanguage("en_US");
    const language = Runtime.theApp.$menu.getMenu("setting#language");
    if (language) {
      const languages = Runtime.theApp.$locale.getLanguages();
      languages.forEach((lang) => {
        language.children = [
          ...(language.children ?? []),
          {
            name: lang,
            displayName:
              (Runtime.theApp.$locale.getLocale(lang).name as string) ?? lang,
          },
        ];
      });
    }
    Runtime.theApp.$bus.emit(MenuManager.EVENT_MENU_CHANGE);
    Runtime.theApp.$bus.on(MenuManager.EVENT_MENU_CLICK, (path: string[]) => {
      if (path.join("#").startsWith("setting#language")) {
        Runtime.theApp.$locale.setLanguage(path[path.length - 1]);
      }
    });
  },
};
