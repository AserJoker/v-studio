import React from "react";
const Text: React.FC<Record<string, unknown>> = (props) => {
  return <div>{props.text as string}</div>;
};
export default Text;
