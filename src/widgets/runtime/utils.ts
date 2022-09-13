import { IAttribute, IField, IWidget } from "../types";
import { Renderer } from "./Renderer";
export function buildAttribue(attrs: unknown): IField {
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
        items: attrs.map((attr) => buildAttribue(attr))
      };
    } else {
      const obj = attrs as Record<string, unknown>;
      return {
        type: "object",
        prototype: Object.keys(obj).reduce((res, now) => {
          res[now] = buildAttribue(obj[now]);
          return res;
        }, {} as Record<string, IField>)
      };
    }
  }
  throw new Error(`cannot convert field value ${attrs} to field`);
}
export function append(parent: IWidget, child: IWidget, name = "default") {
  if (Array.isArray(parent.slots)) {
    parent.slots.push(child);
  } else {
    parent.slots[name] = child;
  }
  Renderer.getInstance().notify();
}
export function setAttribute(
  widget: IWidget,
  path: string,
  value: unknown
): void;
export function setAttribute(
  widget: IWidget,
  attr: Record<string, unknown>
): void;
export function setAttribute(widget: IWidget, ...args: unknown[]) {
  if (typeof args[0] === "object") {
    const record = args[0] as Record<string, unknown>;
    const attrs: IAttribute = {};
    Object.keys(record).forEach(
      (key) => (attrs[key] = buildAttribue(record[key]))
    );
    widget.attrs = attrs;
  }
  Renderer.getInstance().notify();
}
