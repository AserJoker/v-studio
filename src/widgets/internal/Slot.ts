import React from "react";
import { IWidgetDefinition } from "../types";
import _Slot from "../components/Slot";
const Slot: IWidgetDefinition = {
  name: "Slot",
  slots: {},
  render(props) {
    return React.createElement(_Slot, props);
  },
  preview() {
    return React.createElement("div", {}, "slot");
  }
};
export default Slot;
