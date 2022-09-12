import React from "react";
import { IAttribute, IField, IWidget, SLOT_RENDER } from "../types";
import { Store } from "./Store";

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
    ctx: Record<string, unknown>
  ): React.ReactNode {
    const context = { ...this._context, ...ctx };
    const { attrs, definition, slots } = widget;
    const props = this.execAttributes(attrs, context);
    if (!props.key) {
      props.key = `${widget.identity}-${++this._renderCounter}`;
    }
    return definition.render(props, this.drawSlots(slots));
  }
  private drawSlots(slots: Record<string, IWidget> | IWidget[]) {
    return Array.isArray(slots)
      ? this.drawArraySlots(slots)
      : this.drawObjectSlots(slots);
  }
  private drawArraySlots(slots: IWidget[]): SLOT_RENDER[] {
    return slots.map((slot) => {
      return (props: Record<string, unknown>) => {
        return this.drawWidget(slot, { props });
      };
    });
  }
  private drawObjectSlots(slots: Record<string, IWidget>) {
    return Object.keys(slots).reduce((res, name) => {
      res[name] = (props: Record<string, unknown>) => {
        return this.drawWidget(slots[name], { props });
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
      return this.execAttributes(field.prototype, ctx);
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
  public drawWidgetEdit(
    widget: IWidget,
    ctx: Record<string, unknown>,
    path: string[] = []
  ): React.ReactNode {
    const context = { ...this._context, ...ctx };
    const { attrs, definition, slots } = widget;
    const { mock = {} } = definition;
    const props = this.execAttributes({ ...mock, ...attrs }, context);
    if (!props.key) {
      props.key = `${widget.identity}-${++this._renderCounter}`;
    }
    props.__path = path;
    props["data-identity"] = widget.identity;
    const store = Store.getInstance();
    if (Array.isArray(definition.slots)) {
      const _slots = slots as IWidget[];
      if (
        !_slots.length ||
        _slots[_slots.length - 1].definition.name !== "Slot"
      ) {
        const slot = store.createWidget("Slot");
        _slots.push(slot);
        slot.attrs.width = {
          type: "string",
          getter: definition.slots[0].width
        };
        slot.attrs.height = {
          type: "string",
          getter: definition.slots[0].height
        };
        slot.attrs.onDrop = {
          type: "function",
          func: (w: IWidget) => {
            const index = _slots.findIndex((s) => s === slot);
            if (index !== -1) {
              _slots[index] = w;
              this.notify();
            }
          }
        };
      }
    } else {
      const _slots = slots as Record<string, IWidget>;
      const _dslots = definition.slots;
      Object.keys(_dslots).forEach((name) => {
        if (!_slots[name]) {
          _slots[name] = store.createWidget("Slot");
          _slots[name].attrs.width = {
            type: "string",
            getter: _dslots[name].width
          };
          _slots[name].attrs.height = {
            type: "string",
            getter: _dslots[name].height
          };
          _slots[name].attrs.onDrop = {
            type: "function",
            func: (w: IWidget) => {
              _slots[name] = w;
              this.notify();
            }
          };
        }
      });
    }
    return definition.render(
      props,
      this.drawSlotsEdit(slots, [...path, widget.identity])
    );
  }
  private drawSlotsEdit(
    slots: Record<string, IWidget> | IWidget[],
    path: string[]
  ) {
    return Array.isArray(slots)
      ? this.drawArraySlotsEdit(slots, path)
      : this.drawObjectSlotsEdit(slots, path);
  }
  private drawArraySlotsEdit(slots: IWidget[], path: string[]): SLOT_RENDER[] {
    return slots.map((slot) => {
      return (props: Record<string, unknown>) => {
        return this.drawWidgetEdit(slot, { props }, path);
      };
    });
  }
  private drawObjectSlotsEdit(slots: Record<string, IWidget>, path: string[]) {
    return Object.keys(slots).reduce((res, name) => {
      res[name] = (props: Record<string, unknown>) => {
        return this.drawWidgetEdit(slots[name], { props }, path);
      };
      return res;
    }, {} as Record<string, SLOT_RENDER>);
  }

  public onChange?: () => void;

  public notify() {
    this.onChange && this.onChange();
  }
}
