import React from "react";
import _Col from "../components/Col";
import { IWidgetDefinition, SLOT_RENDER } from "../types";
const Col: IWidgetDefinition = {
  name: "Col",
  slots: {
    default: {
      width: "fit-content",
      height: "fit-content"
    }
  },
  render(props, slots) {
    const _slots = slots as { default: SLOT_RENDER };
    return React.createElement(_Col, { ...props }, _slots.default?.({}));
  },
  preview() {
    return React.createElement("div", {}, "col");
  }
};
export default Col;
