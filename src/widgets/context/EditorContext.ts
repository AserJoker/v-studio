import React from "react";
import { IPlaceholder, ISelector } from "../types";
interface IEditorContext {
  updateElement: (name: string, selector: ISelector) => void;
  updatePlaceholder: (name: string, placeholder: IPlaceholder) => void;
}
const EditorContext = React.createContext<IEditorContext | null>(null);
export default EditorContext;
