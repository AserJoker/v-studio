import React from "react";
import _Row from "../components/Row";
import { IWidgetDefinition, SLOT_RENDER } from "../types";
const Row: IWidgetDefinition = {
  name: "Row",
  slots: [
    {
      width: "",
      height: "fit-content"
    }
  ],
  render(props, slots) {
    const _slots = slots as SLOT_RENDER[];
    return React.createElement(
      _Row,
      props,
      _slots.map((slot) => slot({}))
    );
  },
  preview() {
    return React.createElement("div", {}, "row");
  }
};
export default Row;
