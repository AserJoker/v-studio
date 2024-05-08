export interface IResourceItem {
    name: string;
    type: "resource" | "set";
}
export interface IResource extends IResourceItem {
    data: unknown;
    type: "resource";
}
export interface IResourceSet extends IResourceItem {
    name: string;
    type: "set";
    children: Record<string, IResourceItem>;
}