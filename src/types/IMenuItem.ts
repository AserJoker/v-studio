export interface IMenuItem {
  name?: string;
  displayName?: string;
  disable?: boolean;
  children?: IMenuItem[];
  visible?: () => boolean;
}
