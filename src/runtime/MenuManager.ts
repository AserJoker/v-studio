import { EventBus } from "@/util";
import { IMenuItem } from "@/types";

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
  public getMenu(key: string) {
    const path = key.split("#");
    let item = this.menus.find((m) => m.name === path[0]);
    for (let index = 1; index < path.length; index++) {
      if (!item || !item.children) {
        return undefined;
      }
      item = item.children.find((c) => c.name === path[index]);
    }
    return item;
  }
  public static EVENT_MENU_CHANGE = "menu:change";
  public static EVENT_MENU_CLICK = "menu:click";
}
