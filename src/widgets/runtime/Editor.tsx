import { ReactNode } from "react";
import PreviewWidget from "../components/PreviewWidget";
import { ISlot, IWidget } from "../types";
import { Renderer } from "./Renderer";
import { Store } from "./Store";
import { setAttribute } from "./utils";

export class Editor extends Renderer {
  private static _editorInstance: Renderer | null = null;
  public static getInstance(): Renderer {
    if (!this._editorInstance) {
      this._editorInstance = new Editor();
    }
    return this._editorInstance;
  }
  public drawWidget(
    widget: IWidget,
    ctx: Record<string, unknown>,
    path: string[] = []
  ): ReactNode {
    const { slots } = widget;

    if (Array.isArray(slots)) {
      if (
        !slots.length ||
        slots[slots.length - 1].definition.name !== "Placeholder"
      ) {
        const slot = Store.getInstance().createWidget("Placeholder");
        setAttribute(slot, {
          ...widget.definition.slots[0],
          path: path.join("."),
          identity: slot.identity
        });
        slot.attrs.host = {
          type: "object",
          value: { ...widget }
        };
        slots.push(slot);
      }
    } else {
      Object.keys(widget.definition.slots).forEach((name) => {
        if (!slots[name]) {
          const slot = Store.getInstance().createWidget("Placeholder");
          setAttribute(slot, {
            ...(widget.definition.slots as Record<string, ISlot>)[name],
            path: path.join("."),
            identity: slot.identity
          });
          slot.attrs.host = {
            type: "object",
            value: { ...widget }
          };
          slots[name] = slot;
        }
      });
    }
    return (
      <PreviewWidget widget={widget} path={path} key={widget.identity}>
        {super.drawWidget(widget, ctx, path)}
      </PreviewWidget>
    );
  }
}
