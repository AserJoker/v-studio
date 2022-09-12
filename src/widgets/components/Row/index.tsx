import React from "react";
import "./index.less";
const Row: React.FC<Record<string, unknown>> = (props) => {
  return <div {...props} className="row" />;
};
export default Row;
