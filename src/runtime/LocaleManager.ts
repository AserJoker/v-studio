import { EventBus, get, merge } from "@/util";

export class LocaleManager {
  private $bus: EventBus;
  public constructor($bus: EventBus) {
    this.$bus = $bus;
  }
  private language: string = "en_US";
  private locales: Record<string, Record<string, unknown>> = {};
  public getLanguages() {
    return Object.keys(this.locales);
  }
  public setLanguage(lang: string) {
    this.language = lang;
    this.$bus.emit(LocaleManager.EVENT_LOCALE_CHANGE);
  }
  public setLocale(lang: string, locale: Record<string, unknown>) {
    if (!this.locales[lang]) {
      this.locales[lang] = {};
    }
    merge(this.locales[lang], locale);
    this.$bus.emit(LocaleManager.EVENT_LOCALE_CHANGE);
  }
  public getLocale(lang: string) {
    return this.locales[lang];
  }
  public getLanguage() {
    return this.language;
  }
  public get(key: string): string {
    return get(this.locales[this.language] ?? {}, key) ?? key;
  }
  public static EVENT_LOCALE_CHANGE = "locale:change";
}
