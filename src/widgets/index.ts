import internal from "./internal";
import { Renderer, Store } from "./runtime";
import { IAttribute, IField, IWidget } from "./types";
export { default as Preview } from "./components/Preview";

export * from "./types";
class Widget {
  public static store = Store.getInstance();
  public static renderer = Renderer.getInstance();
  public static append(parent: IWidget, child: IWidget, name = "default") {
    if (Array.isArray(parent.slots)) {
      parent.slots.push(child);
    } else {
      parent.slots[name] = child;
    }
    this.renderer.notify();
  }
  public static setAttribute(
    widget: IWidget,
    path: string,
    value: unknown
  ): void;
  public static setAttribute(
    widget: IWidget,
    attr: Record<string, unknown>
  ): void;
  public static setAttribute(widget: IWidget, ...args: unknown[]) {
    if (typeof args[0] === "object") {
      const record = args[0] as Record<string, unknown>;
      const attrs: IAttribute = {};
      Object.keys(record).forEach(
        (key) => (attrs[key] = this.buildAttribue(record[key]))
      );
      widget.attrs = attrs;
    }
    this.renderer.notify();
  }
  public static use(module: { install: (store: Store) => void }) {
    module.install(this.store);
  }

  private static buildAttribue(attrs: unknown): IField {
    const type = typeof attrs;
    if (type === "string" || type === "number" || type === "boolean") {
      return {
        type,
        getter: `${attrs}`
      };
    } else if (type === "object") {
      if (Array.isArray(attrs)) {
        return {
          type: "array",
          items: attrs.map((attr) => this.buildAttribue(attr))
        };
      } else {
        const obj = attrs as Record<string, unknown>;
        return {
          type: "object",
          prototype: Object.keys(obj).reduce((res, now) => {
            res[now] = this.buildAttribue(obj[now]);
            return res;
          }, {} as Record<string, IField>)
        };
      }
    }
    throw new Error(`cannot convert field value ${attrs} to field`);
  }
}
Widget.use(internal);
export default Widget;
