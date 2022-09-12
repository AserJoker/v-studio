import React from "react";
import { IWidgetDefinition, SLOT_RENDER } from "../types";

const Button: IWidgetDefinition = {
  name: "Button",
  slots: {
    default: {
      width: "120px",
      height: "fit-content"
    }
  },
  render(props, slots) {
    const _slots = slots as {
      default: SLOT_RENDER;
    };
    return React.createElement(
      "button",
      { key: props.key as string },
      _slots.default?.({})
    );
  },
  preview() {
    return React.createElement("button", {}, "button");
  }
};
export default Button;
