import { EventBus } from "@/util";
import { IResourceItem } from "@/types";

export class BufferManager {
  private $bus: EventBus;
  public constructor($bus: EventBus) {
    this.$bus = $bus;
  }
  private buffers: IResourceItem[] = [];
  private active: IResourceItem | undefined = undefined;
  public setActive(buf: IResourceItem) {
    if (buf.name !== this.active?.name) {
      this.active = buf;
      this.$bus.emit(BufferManager.EVENT_BUFFER_ACTIVE_CHANGE);
      if (!this.buffers.find((b) => b.name === buf.name)) {
        this.buffers.push(buf);
        this.$bus.emit(BufferManager.EVENT_BUFFER_CHANGE);
      }
    }
  }
  public close(name: string) {
    const index = this.buffers.findIndex((buf) => buf.name === name);
    if (index !== -1) {
      this.buffers.splice(index, 1);
      this.$bus.emit(BufferManager.EVENT_BUFFER_CHANGE);
      if (this.active?.name === name) {
        if (index < this.buffers.length) {
          this.active = this.buffers[index];
        } else {
          if (this.buffers.length) {
            this.active = this.buffers[this.buffers.length - 1];
          } else {
            this.active = undefined;
          }
        }
        this.$bus.emit(BufferManager.EVENT_BUFFER_ACTIVE_CHANGE);
      }
    }
  }
  public closeAll() {
    this.buffers = [];
    this.$bus.emit(BufferManager.EVENT_BUFFER_CHANGE);
    this.active = undefined;
    this.$bus.emit(BufferManager.EVENT_BUFFER_ACTIVE_CHANGE);
  }
  public getActive() {
    return this.active;
  }

  public static EVENT_BUFFER_ACTIVE_CHANGE = "buffer:active_change";
  public static EVENT_BUFFER_CHANGE = "buffer:change";
}
