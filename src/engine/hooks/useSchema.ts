import { ISchemaNode } from "../types";

export function useSchema<S>(schema: ISchemaNode<S>) {
    return schema;
}