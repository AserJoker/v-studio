import React from "react";
import { IWidgetDefinition } from "../types";
import _Placeholder from "../components/Placeholder";
const Placeholder: IWidgetDefinition = {
  name: "Placeholder",
  slots: {},
  render(props) {
    return React.createElement(_Placeholder, props);
  },
  preview() {
    return React.createElement("div", {}, "placeholder");
  }
};
export default Placeholder;
