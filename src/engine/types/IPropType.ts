export interface IValueType {
  type: "string" | "number" | "boolean" | "object";
  array?: boolean;
  required?: boolean;
  default?: unknown;
  properties?: Record<string, IValueType>;
}
export interface IPropType {
  [key: string]: Record<string, IValueType>;
}
