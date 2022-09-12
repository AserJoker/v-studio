import React from "react";
import { IAttribute } from "./IField";
import { ISlot } from "./ISlot";
export type SLOT_RENDER<
  T extends Record<string, unknown> = Record<string, unknown>
> = (props: T) => React.ReactNode;
export type RENDER<T> = (
  props: T,
  slots: Record<string, SLOT_RENDER> | SLOT_RENDER[]
) => React.ReactNode;
export interface IWidgetDefinition<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  name: string;
  slots: Record<string, ISlot> | [ISlot];
  render: RENDER<T>;
  preview: () => React.ReactNode;
  mock?: IAttribute;
}
