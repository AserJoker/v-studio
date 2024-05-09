import { IComponent, ISchemaNode, IComputed, IRenderer } from "../types";
import React from "react";
import { EventBus, clone, reactive } from "@/util";

interface Watcher {
  key: string | RegExp;
  callback: () => void;
}

export class Component<T = any, C extends Record<string, unknown> = {}>
  implements IComponent<T, C>
{
  private static renderers: Record<string, IRenderer> = {};
  private $store: any = {};
  private $key?: string;
  private static $listener = new EventBus();
  private computedDescriptor = {} as IComputed<T, C>;
  private watchers: Watcher[] = [];
  private effect(key: string) {
    this.watchers.forEach((w) => {
      if (typeof w.key === "string") {
        if (w.key.startsWith(key) || (key.startsWith(key) && key !== w.key)) {
          w.callback();
        }
      } else {
        if (w.key.test(key)) {
          w.callback();
        }
      }
    });
  }
  public constructor(
    state: T = {} as T,
    computed?: IComputed<T, C>,
    key?: string
  ) {
    this.$store = clone(state);
    if (computed) {
      this.computedDescriptor = computed;
    }
    this.$key = key;
  }
  public on<T = unknown>(
    type: string,
    cb: (arg: T, key?: string | undefined) => void
  ): () => void {
    return Component.$listener.on(type, cb);
  }
  public off<T = unknown>(
    type: string,
    cb: (arg: T, key?: string | undefined) => void
  ): void {
    return Component.$listener.off(type, cb);
  }
  public once<T = unknown>(
    type: string,
    cb: (arg: T, key?: string | undefined) => void
  ): void {
    return Component.$listener.once(type, cb);
  }
  public emit<T = unknown>(
    type: string,
    arg?: T | undefined,
    key?: string | undefined
  ): void {
    return Component.$listener.emit(type, arg, key ?? this.key);
  }
  public field<K extends keyof T, CC extends Record<string, unknown>>(
    field: K,
    computed?: IComputed<T[K], CC>,
    key?: string
  ): IComponent<T[K], CC> {
    return new (class extends Component<T[K], CC> {
      private parent: IComponent;
      public get state() {
        return this.parent.state[field] as T[K];
      }
      public get raw() {
        return this.parent.raw[field] as T[K];
      }
      public watch(key: string, callback: () => void | Promise<void>) {
        return this.parent.watch(`${field as string}.${key}`, callback);
      }
      public constructor(parent: IComponent) {
        super(undefined, computed, key ?? `${parent.key}.${field as string}`);
        this.parent = parent;
      }
      public emit(type: string, arg?: unknown, key?: string): void {
        this.parent.emit(type, arg, key ?? this.key);
      }
    })(this as IComponent);
  }
  public watch(key: string | RegExp, callback: () => void | Promise<void>) {
    const watcher: Watcher = {
      key:
        typeof key === "string" ? key.replace("]", "").replace("[", ".") : key,
      callback,
    };
    this.watchers.push(watcher);
    return () => {
      const index = this.watchers.findIndex((w) => w === watcher);
      if (index !== -1) {
        this.watchers.splice(index, 1);
      }
    };
  }
  public get state() {
    return reactive(this.$store, (key) => this.effect(key)) as T;
  }
  public get raw() {
    return this.$store;
  }
  public get computed() {
    return new Proxy(
      {},
      {
        get: (_, key: string): unknown => {
          return this.computedDescriptor[key]?.(this as IComponent<T, C>);
        },
      }
    ) as C;
  }
  public get key() {
    return this.$key;
  }

  public render(
    schema: ISchemaNode,
    slot?: string
  ): JSX.Element | string | null {
    if (slot) {
      const slots = schema.slots?.[slot] ?? [];
      const cache: Record<string, IComponent> = {};
      if (!slots.length) {
        return null;
      }
      return React.createElement(
        React.Fragment,
        {},
        slots.map((slot) => {
          let $comp: IComponent;
          if (slot.field) {
            $comp =
              cache[slot.field] ??
              this.field(slot.field as keyof T, undefined, slot.key);
            cache[slot.field as string] = $comp;
          } else {
            $comp = new Component(slot.state, undefined, slot.key);
          }
          return $comp.render(slot);
        })
      );
    } else {
      const renderer = schema.renderer;
      const render = Component.renderers[renderer];
      if (render) {
        return render.render(this as IComponent, schema);
      }
      return null;
    }
  }
  public static renderer(name: string, render: IRenderer) {
    Component.renderers[name] = render;
  }
  public static getRenderers(): string[] {
    return Object.keys(Component.renderers);
  }
  public static getRenderer(name: string) {
    return Component.renderers[name];
  }
}
