import { IComponent } from "./IComponent";

export type IComputed<T, C extends Record<string, unknown>> = {
  [key in keyof C]: ($comp: IComponent<T, C>) => C[key];
};
