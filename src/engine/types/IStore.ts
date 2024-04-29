export interface IStore<T = any, C extends Record<string, unknown> = {}> {
    state: T;
    raw: T;
    computed: C;
    watch(key: string, callback: () => void | Promise<void>): () => void;
}