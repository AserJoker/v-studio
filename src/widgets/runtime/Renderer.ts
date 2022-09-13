import React from "react";
import { IAttribute, IField, IWidget, SLOT_RENDER } from "../types";
import { bus } from "./bus";

export class Renderer {
  private static _instance: Renderer;
  public static getInstance() {
    if (!Renderer._instance) {
      this._instance = new Renderer();
    }
    return this._instance;
  }
  private _context: Record<string, unknown> = {};
  private _renderCounter = 0;
  public drawWidget(
    widget: IWidget,
    ctx: Record<string, unknown>,
    path: string[] = []
  ): React.ReactNode {
    const context = { ...this._context, ...ctx };
    const { attrs, definition, slots } = widget;
    const { mock = {} } = definition;
    const props = this.execAttributes({ ...mock, ...attrs }, context);
    widget.key = `${widget.identity}-${++this._renderCounter}`;
    if (!props.key) {
      props.key = widget.key;
    }
    return definition.render(
      props,
      this.drawSlots(slots, [...path, props.key as string])
    );
  }
  private drawSlots(
    slots: Record<string, IWidget> | IWidget[],
    path: string[]
  ) {
    return Array.isArray(slots)
      ? this.drawArraySlots(slots, path)
      : this.drawObjectSlots(slots, path);
  }
  private drawArraySlots(slots: IWidget[], path: string[]): SLOT_RENDER[] {
    return slots.map((slot) => {
      return (props: Record<string, unknown>) => {
        return this.drawWidget(slot, { props }, path);
      };
    });
  }
  private drawObjectSlots(slots: Record<string, IWidget>, path: string[]) {
    return Object.keys(slots).reduce((res, name) => {
      res[name] = (props: Record<string, unknown>) => {
        return this.drawWidget(slots[name], { props }, path);
      };
      return res;
    }, {} as Record<string, SLOT_RENDER>);
  }
  private execAttributes(attrs: IAttribute, ctx: Record<string, unknown>) {
    const res = Object.keys(attrs).reduce((r, name) => {
      r[name] = this.execField(attrs[name], ctx);
      return r;
    }, {} as Record<string, unknown>);
    return res;
  }
  private execField(field: IField, ctx: Record<string, unknown>): unknown {
    if (field.type === "object") {
      if (field.prototype) {
        return this.execAttributes(field.prototype, ctx);
      }
      if (field.value) {
        return field.value;
      }
      return null;
    } else if (field.type === "array") {
      if (field.items) {
        return field.items.map((item) => this.execField(item, ctx));
      }
    } else {
      if (field.type === "function" && field.func) {
        return field.func;
      }
      const getter = new Function("ctx", `return \`${field.getter}\`;`);
      return getter(ctx);
    }
  }

  public notify() {
    bus.emit("update");
  }
}
