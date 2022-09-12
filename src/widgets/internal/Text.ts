import { IWidgetDefinition } from "../types";
import React from "react";
import _Text from "../components/Text";

const Text: IWidgetDefinition = {
  name: "Text",
  slots: {},
  render(props) {
    return React.createElement<Record<string, unknown>>(_Text, {
      ...props
    });
  },
  preview() {
    return React.createElement("div", {}, "this is Text");
  },
  mock: {
    text: {
      type: "string",
      getter: "This is Text"
    }
  }
};
export default Text;
