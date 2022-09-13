import internal from "./internal";
import {
  append,
  buildAttribue,
  Renderer,
  setAttribute,
  Store,
  bus
} from "./runtime";
export { default as Preview } from "./components/Preview";

export * from "./types";
class Widget {
  public static store = Store.getInstance();
  public static renderer = Renderer.getInstance();
  public static bus = bus;
  public static append = append;
  public static setAttribute = setAttribute;
  public static buildAttribue = buildAttribue;
  public static use(module: { install: (store: Store) => void }) {
    module.install(this.store);
  }
}
Widget.use(internal);
export default Widget;
