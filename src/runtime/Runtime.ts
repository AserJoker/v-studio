import { EventBus } from "@/util";
import { ResourceManager } from "./ResourceManager";
import { MenuManager } from "./MenuManager";
import { ExplorerManager } from "./ExplorerManager";
import { ContextMenuManager } from "./ContextMenuManager";
import { BufferManager } from "./BufferManager";
import { LocaleManager } from "./LocaleManager";
import { ProjectManager } from "./ProjectManager";

export class Runtime {
  public static theApp = new Runtime();
  public $bus = new EventBus();

  public $resource = new ResourceManager(this.$bus);
  public $menu = new MenuManager(this.$bus);
  public $contextmenu = new ContextMenuManager(this.$bus);
  public $explorer = new ExplorerManager(this.$bus);
  public $buffer = new BufferManager(this.$bus);
  public $locale = new LocaleManager(this.$bus);
  public $project = new ProjectManager(this.$bus);

  public constructor() {
    this.$bus.on(ProjectManager.EVENT_PROJECT_CHANGE, () => {
      const resource = this.$project.getProject()?.resource;
      if (resource) {
        this.$resource.add(resource);
      }
    });
  }
}
