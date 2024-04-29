export interface ISchemaNode<S = any> {
    renderer: string;
    state?: S;
    slots?: Record<string, ISchemaNode[]>
    field?: string;
    key?: string;
};