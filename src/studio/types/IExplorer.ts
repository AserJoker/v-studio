import { JSX } from "react";
import { IAction } from "./IAction";
export interface IExplorer {
  name: string;
  description?: string;
  icon: () => string;
  content: () => JSX.Element | string | null;
  actions?: IAction[];
}
