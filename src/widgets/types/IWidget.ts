import { IAttribute } from "./IField";
import { IWidgetDefinition } from "./IWidgetDefinition";
export interface IWidget {
  identity: string;
  key: string;
  definition: IWidgetDefinition;
  attrs: IAttribute;
  slots: Record<string, IWidget> | IWidget[];
}
