import { EventBus } from "@/engine/runtime/EventBus";
import { IExplorer, IMenuItem } from "../types";

export class Application {
    public static theApp = new Application();

    private explorers: Record<string, IExplorer> = {};

    public getExplorers() {
        return Object.keys(this.explorers);
    }

    public setExplorer(explorer: IExplorer) {
        this.explorers[explorer.name] = explorer;
        this.$bus.emit(Application.EVENT_EXPLORER_CHANGE);
    }
    public getExplorer(name: string) {
        return this.explorers[name];
    }

    private menus: IMenuItem[] = [];

    public getMenus() {
        return this.menus;
    }

    public setMenus(menus: IMenuItem[]) {
        this.menus = menus;
        this.$bus.emit(Application.EVENT_MENU_CHANGE);
    }

    public $bus = new EventBus();

    public static EVENT_EXPLORER_CHANGE = "explorer:change";
    public static EVENT_EXPLORER_ACTION_CLICK = "explorer:action:click";
    public static EVENT_MENU_CHANGE = "menu:change";
    public static EVENT_MENU_CLICK = "menu:click";
}