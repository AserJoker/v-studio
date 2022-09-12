import React from "react";
import { IWidgetDefinition, SLOT_RENDER } from "../types";

const Iterator: IWidgetDefinition = {
  name: "Iterator",
  slots: {
    default: {
      width: "fit-content",
      height: "fit-content"
    }
  },
  render(props, slots) {
    const list = props.list as Record<string, unknown>[];
    const _slots = slots as { default: SLOT_RENDER };
    return list.map((item, index) => {
      return _slots.default({ ...item, key: item.key || `${index}` });
    });
  },
  preview() {
    return React.createElement("div", {}, "iterator");
  }
};
export default Iterator;
