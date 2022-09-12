import React from "react";
import { IWidget } from "../types";
export interface IPlaceholderContext {
  update(
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
    onDrop: (widget: IWidget) => void
  ): void;
}
const PreviewContext = React.createContext<IPlaceholderContext | null>(null);
export default PreviewContext;
