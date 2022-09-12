import React from "react";
import _Root from "../components/Root";
import { IWidgetDefinition, SLOT_RENDER } from "../types";

const Root: IWidgetDefinition = {
  name: "Root",
  slots: [
    {
      width: "",
      height: "fit-content"
    }
  ],
  render(props, slots) {
    const _slots = slots as SLOT_RENDER[];
    return React.createElement(
      _Root,
      props,
      _slots.map((slot) => slot({}))
    );
  },
  preview() {
    return React.createElement("div", {}, "root");
  }
};
export default Root;
