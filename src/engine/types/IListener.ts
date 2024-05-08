export interface IListener {
  on<T = unknown>(type: string, cb: (arg: T, key?: string) => void): () => void;
  off<T = unknown>(type: string, cb: (arg: T, key?: string) => void): void;
  once<T = unknown>(type: string, cb: (arg: T, key?: string) => void): void;
  emit<T = unknown>(type: string, arg?: T, key?: string): void;
}
