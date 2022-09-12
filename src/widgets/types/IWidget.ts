import { IAttribute } from "./IField";
import { IWidgetDefinition } from "./IWidgetDefinition";
export interface IWidget {
  identity: string;
  definition: IWidgetDefinition;
  attrs: IAttribute;
  slots: Record<string, IWidget> | IWidget[];
}
