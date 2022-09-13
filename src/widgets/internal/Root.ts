import React from "react";
import _Root from "../components/Root";
import { IWidgetDefinition, SLOT_RENDER } from "../types";

const Root: IWidgetDefinition = {
  name: "Root",
  slots: {
    default: {
      width: "",
      height: "fit-content"
    }
  },
  render(props, slots) {
    const _slots = slots as { default: SLOT_RENDER };
    return React.createElement(_Root, props, _slots.default?.({}));
  },
  preview() {
    return React.createElement("div", {}, "root");
  }
};
export default Root;
