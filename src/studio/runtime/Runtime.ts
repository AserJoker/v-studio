import { EventBus } from "@/engine/runtime/EventBus";
import { ResourceManager } from "./ResourceManager";
import { MenuManager } from "./MenuManager";
import { ExplorerManager } from "./ExplorerManager";
import { ContextMenuManager } from "./ContextMenuManager";
import { BufferManager } from "./BufferManager";

export class Runtime {
  public static theApp = new Runtime();
  public $bus = new EventBus();

  public $resource = new ResourceManager(this.$bus);
  public $menu = new MenuManager(this.$bus);
  public $contextmenu = new ContextMenuManager(this.$bus);
  public $explorer = new ExplorerManager(this.$bus);
  public $buffer = new BufferManager(this.$bus);
}
