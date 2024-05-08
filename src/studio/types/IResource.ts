export interface IResourceBase {
  name: string;
  type: "resource" | "set";
}
export interface IResourceItem extends IResourceBase {
  data: unknown;
  type: "resource";
}
export interface IResourceSet extends IResourceBase {
  name: string;
  type: "set";
  children: IResource[];
}
export type IResource = IResourceItem | IResourceSet;
