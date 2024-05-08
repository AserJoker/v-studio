import { IListener } from "../types";

export class EventBus implements IListener {
  private listeners: Record<
    string,
    Array<(arg?: unknown, key?: string) => void>
  > = {};
  public on<T = unknown>(type: string, cb: (arg: T, key?: string) => void) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    const listeners = this.listeners[type];
    listeners.push(cb as (arg: unknown) => void);
    return () => this.off(type, cb);
  }
  public once<T = unknown>(type: string, cb: (arg: T, key?: string) => void) {
    const release = this.on(type, (arg) => {
      cb(arg as T);
      release();
    });
  }
  public off<T = unknown>(type: string, cb?: (arg: T, key?: string) => void) {
    if (!cb) {
      delete this.listeners[type];
    }
    const listeners = this.listeners[type];
    if (listeners) {
      const index = listeners.findIndex((f) => f === cb);
      listeners.splice(index, 1);
      if (listeners.length == 0) {
        delete this.listeners[type];
      }
    }
  }
  public emit(type: string, arg?: unknown, key?: string) {
    const listeners = this.listeners[type];
    if (listeners) {
      listeners.forEach((cb) => cb(arg, key));
    }
  }
}
