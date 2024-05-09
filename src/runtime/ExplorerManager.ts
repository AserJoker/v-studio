import { EventBus } from "@/util";
import { IExplorer } from "@/types";

export class ExplorerManager {
  private $bus: EventBus;
  public constructor($bus: EventBus) {
    this.$bus = $bus;
  }

  private explorers: Record<string, IExplorer> = {};

  public getExplorers() {
    return Object.keys(this.explorers);
  }

  public setExplorer(explorer: IExplorer) {
    this.explorers[explorer.name] = explorer;
    this.$bus.emit(ExplorerManager.EVENT_EXPLORER_CHANGE);
  }
  public getExplorer(name: string) {
    return this.explorers[name];
  }

  public static EVENT_EXPLORER_CHANGE = "explorer:change";
  public static EVENT_EXPLORER_ACTION_CLICK = "explorer:action:click";
}
