import React from "react";
import _GridLayout from "../components/GridLayout";
import { IWidgetDefinition, SLOT_RENDER } from "../types";
const GridLayout: IWidgetDefinition = {
  name: "GridLayout",
  slots: [
    {
      width: "",
      height: "fit-content"
    }
  ],
  render(props, slots) {
    const _slots = slots as SLOT_RENDER[];
    return React.createElement(
      _GridLayout,
      props,
      _slots.map((slot) => slot({}))
    );
  },
  preview() {
    return React.createElement("div", {}, "grid-layout");
  }
};
export default GridLayout;
