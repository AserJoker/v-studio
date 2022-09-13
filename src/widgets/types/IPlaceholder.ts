import { IWidget } from "./IWidget";

export interface IPlaceholder {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  onDrop: (widget: IWidget) => void;
  zIndex: number;
  host: string;
}
