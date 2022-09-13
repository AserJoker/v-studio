export interface IBaseField {
  type: "string" | "boolean" | "number" | "object" | "array" | "function";
}
export interface ISimpleField extends IBaseField {
  type: "string" | "boolean" | "number";
  getter: string;
}
export interface IFunctionField extends IBaseField {
  type: "function";
  // eslint-disable-next-line @typescript-eslint/ban-types
  func?: Function;
  getter?: string;
}
export interface IObjectField extends IBaseField {
  type: "object";
  prototype?: Record<string, IField>;
  value?: Record<string, unknown>;
}
export interface IArrayField extends IBaseField {
  type: "array";
  prototype?: IField;
  getter?: string;
  items?: IField[];
}
export type IField = IArrayField | IObjectField | ISimpleField | IFunctionField;
export type IAttribute = Record<string, IField>;
