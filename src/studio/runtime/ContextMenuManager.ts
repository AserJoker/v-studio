import { EventBus } from "@/engine";
import { IMenuItem } from "../types";

export class ContextMenuManager {
    private $bus: EventBus;
    public constructor($bus: EventBus) {
        this.$bus = $bus;
    }
    private menus: Record<string, (items?: unknown) => IMenuItem[]> = {};

    public getMenus(id: string) {
        return this.menus[id] ?? [];
    }

    public setMenus(id: string, menus: (items?: unknown) => IMenuItem[]) {
        this.menus[id] = menus;
        this.$bus.emit(ContextMenuManager.EVENT_MENU_CHANGE);
    }
    public static EVENT_MENU_CHANGE = "context-menu:change";
    public static EVENT_MENU_CLICK = "context-menu:click";
}