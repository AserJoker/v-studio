import { IComponent } from "./IComponent";
import { IPropType } from "./IPropType";
import { ISchemaNode } from "./ISchemaNode";
import { JSX } from "react";

export interface Render {
  ($component: IComponent, schema: ISchemaNode): JSX.Element | string | null;
}
export interface IRenderer {
  props: IPropType;
  slots: string[];
  emits: string[];
  render: Render;
  mock?: Record<string, unknown>;
}
