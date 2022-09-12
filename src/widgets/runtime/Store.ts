import { IWidget, IWidgetDefinition } from "../types";

export class Store {
  private static _instance: Store;
  public static getInstance() {
    if (!this._instance) {
      this._instance = new Store();
    }
    return this._instance;
  }
  private _definitions: Record<string, IWidgetDefinition> = {};
  private _root: IWidget | null = null;
  private _counter = 0;
  public defineWidget<T extends Record<string, unknown>>(
    def: IWidgetDefinition<T>
  ) {
    this._definitions[def.name] = def as IWidgetDefinition;
  }
  public createWidget(definitionName: string) {
    const def = this._definitions[definitionName];
    if (!def) {
      throw new Error(`unknown widget type '${definitionName}'`);
    }
    const w: IWidget = {
      definition: def,
      attrs: {},
      slots: Array.isArray(def.slots) ? [] : {},
      identity: `${def.name}-${++this._counter}`
    };
    return w;
  }
  public init() {
    this._root = null;
  }
  public getRoot() {
    if (!this._root) {
      this._root = this.createWidget("Root");
    }
    return this._root;
  }
  public getDefinitions() {
    return Object.keys(this._definitions)
      .filter((name) => name !== "Root")
      .map((key) => {
        return this._definitions[key];
      });
  }
}
