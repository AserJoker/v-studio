export interface ISelector {
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  onSelect: () => void;
}
