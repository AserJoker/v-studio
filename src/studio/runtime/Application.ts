import { EventBus } from "@/engine/runtime/EventBus";
import { ResourceManager } from "./ResourceManager";
import { MenuManager } from "./MenuManager";
import { ExplorerManager } from "./ExplorerManager";
import { ContextMenuManager } from "./ContextMenuManager";

export class Application {
    public static theApp = new Application();
    public $bus = new EventBus();

    public $resources = new ResourceManager(this.$bus);
    public $menu = new MenuManager(this.$bus);
    public $contextmenu = new ContextMenuManager(this.$bus);
    public $explorers = new ExplorerManager(this.$bus);
}