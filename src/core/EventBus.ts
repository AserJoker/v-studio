type CALLBACK<T extends unknown[] = unknown[]> = (
  ...args: T
) => void | Promise<void>;
export class EventBus<E extends Record<string, unknown[]>> {
  private _callbacks = {} as Record<keyof E, CALLBACK[]>;
  public emit<K extends keyof E>(e: K, ...args: E[K]) {
    const callbacks = this._callbacks[e];
    if (callbacks) {
      callbacks.forEach((cb) => cb(...args));
    }
  }
  public on<K extends keyof E>(e: K, cb: CALLBACK<E[K]>) {
    const callbacks = this._callbacks[e] || [];
    callbacks.push(cb as CALLBACK);
    this._callbacks[e] = callbacks;
    return () => this.off(e, cb);
  }
  public off<K extends keyof E>(e: K, cb: CALLBACK<E[K]>) {
    const callbacks = this._callbacks[e];
    if (callbacks) {
      const index = callbacks.findIndex((_cb) => _cb === cb);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    }
  }
  public once<K extends keyof E>(e: K, cb: CALLBACK<E[K]>) {
    const off = this.on(e, (...args) => {
      off();
      cb(...args);
    });
    return off;
  }
}
