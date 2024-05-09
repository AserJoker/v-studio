import { EventBus } from "@/util";
import { IResource, IResourceSet } from "@/types";

export class ResourceManager {
  private resources: IResource[] = [];
  private $bus: EventBus;
  public constructor($bus: EventBus) {
    this.$bus = $bus;
  }
  public getResource(key: string) {
    const path = key.split("#");
    let item: IResource | undefined = this.resources.find(
      (r) => r.name === path[0]
    );
    for (let index = 1; index < path.length; index++) {
      if (!item || item.type === "resource") {
        return undefined;
      }
      item = item.children.find((c) => c.name === path[index]);
    }
    return item;
  }
  public getResources() {
    return this.resources;
  }
  public remove(key: string) {
    const path = key.split("#");
    const parent = this.getResource(path.slice(0, path.length - 1).join("#"));
    if (parent && parent.type === "set") {
      const index = parent.children.findIndex(
        (c) => c.name === path[path.length - 1]
      );
      if (index !== -1) {
        parent.children.splice(index, 1);
        this.$bus.emit(ResourceManager.EVENT_RESOURCE_CHANGE);
        return true;
      }
    }
    return false;
  }
  public add(resource: IResource, position?: string) {
    if (position) {
      const path = position.split("#");
      const parent = this.getResource(path.slice(0, path.length - 1).join("#"));
      if (parent && parent.type === "set") {
        parent.children.push(resource);
        this.$bus.emit(ResourceManager.EVENT_RESOURCE_CHANGE);
      }
    } else {
      this.resources.push(resource);
      this.$bus.emit(ResourceManager.EVENT_RESOURCE_CHANGE);
    }
  }
  public move(src: string, target: string) {
    const item = this.getResource(src);
    const set = this.getResource(target);
    if (item && set && set.type === "set") {
      const p = set as IResourceSet;
      p.children.push(item);
      this.remove(src);
      this.$bus.emit(ResourceManager.EVENT_RESOURCE_CHANGE);
    }
  }

  public static EVENT_RESOURCE_CHANGE = "resource:change";
}
