import menu from "@/framework/bundle/menu";
import { Runtime } from "@/runtime";
export default {
  deps: [],
  ready: false,
  init() {
    Runtime.theApp.$menu.setMenus(menu);
    this.ready = true;
  },
};
