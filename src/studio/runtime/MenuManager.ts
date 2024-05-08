import { EventBus } from "@/engine";
import { IMenuItem } from "../types";

export class MenuManager {
  private $bus: EventBus;
  public constructor($bus: EventBus) {
    this.$bus = $bus;
  }
  private menus: IMenuItem[] = [];

  public getMenus() {
    return this.menus;
  }

  public setMenus(menus: IMenuItem[]) {
    this.menus = menus;
    this.$bus.emit(MenuManager.EVENT_MENU_CHANGE);
  }
  public static EVENT_MENU_CHANGE = "menu:change";
  public static EVENT_MENU_CLICK = "menu:click";
}
