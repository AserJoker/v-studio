import React from "react";
import "./index.less";
const Col: React.FC<Record<string, unknown>> = (props) => {
  return <div className="col" {...props} />;
};
export default Col;
