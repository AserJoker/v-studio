import { IComputed } from "./IComputed";
import { IListener } from "./IListener";
import { ISchemaNode } from "./ISchemaNode";
import { IStore } from "./IStore";

export interface IComponent<T = any, C extends Record<string, unknown> = {}> extends IStore<T, C>, IListener {
    field<K extends keyof T>(field: K, computed?: IComputed<T[K], C>, key?: string): IComponent<T[K], C>;
    key?: string;
    render(schema: ISchemaNode, slot?: string): JSX.Element | string | null;
}