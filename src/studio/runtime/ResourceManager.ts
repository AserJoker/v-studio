import { EventBus } from "@/engine";
import { IResourceItem, IResourceSet } from "../types";

export class ResourceManager {
    private resources: IResourceSet[] = [];
    private $bus: EventBus;
    public constructor($bus: EventBus) {
        this.$bus = $bus;
    }
    public getResource(key: string) {
        const path = key.split('#');
        let item: IResourceItem | undefined = this.resources.find(r => r.name === path[0]);
        for (let index = 1; index < path.length; index++) {
            if (!item || item.type === "resource") {
                return undefined;
            }
            item = (item as IResourceSet).children[path[index]];
        }
        return item;
    }
    public getResources() {
        return this.resources;
    }
    public remove(key: string) {
        const path = key.split('#');
        const parent = this.getResource(path.slice(0, path.length - 1).join('.'));
        if (parent && parent.type === "set") {
            const p = parent as IResourceSet;
            delete p.children[path[path.length - 1]];
            this.$bus.emit(ResourceManager.EVENT_RESOURCE_CHANGE);
            return true;
        }
        return false;
    }
    public add(key: string, resource: IResourceItem) {
        const path = key.split('#');
        const parent = this.getResource(path.slice(0, path.length - 1).join('#'));
        if (parent && parent.type === "set") {
            const p = parent as IResourceSet;
            p.children[path[path.length - 1]] = resource;
            this.$bus.emit(ResourceManager.EVENT_RESOURCE_CHANGE);
        }
    }
    public move(key: string, target: string) {
        const item = this.getResource(key);
        const set = this.getResource(target);
        const path = key.split('#');
        const name = path[path.length - 1];
        if (item && set && set.type === "set") {
            const p = set as IResourceSet;
            p.children[name] = item;
            this.remove(key);
            this.$bus.emit(ResourceManager.EVENT_RESOURCE_CHANGE);
        }
    }

    public static EVENT_RESOURCE_CHANGE = "resource:change";
}