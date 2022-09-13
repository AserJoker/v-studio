import { EventBus } from "@core/EventBus";

export const bus = new EventBus<{
  update: [];
}>();
