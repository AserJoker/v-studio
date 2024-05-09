import ResourceExplorer from "@/components/ResourceExplorer";
import { ContextMenuManager, Runtime } from "@/runtime";
import menuResource from "../bundle/menu-resource";
import React from "react";
interface IResourceContextMenuArg {
  id: string;
  action: string[];
  item?: string[];
}
export default {
  deps: [],
  ready: false,
  init() {
    Runtime.theApp.$explorer.setExplorer({
      name: "explorer.resources.name",
      content: () => React.createElement(ResourceExplorer),
      icon: () => "\ue63e",
    });
    Runtime.theApp.$contextmenu.setMenus("resources", (item) => {
      return menuResource(item as string[]);
    });
    Runtime.theApp.$bus.on(
      ContextMenuManager.EVENT_MENU_CLICK,
      ({ id, action, item }: IResourceContextMenuArg) => {
        if (id === "resources") {
          console.log(action, item);
        }
      }
    );
    Runtime.theApp.$resource.add({ type: "set", name: "/", children: [] });
    this.ready = true;
  },
};
