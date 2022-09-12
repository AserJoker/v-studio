import React, { HTMLAttributes } from "react";
const Root: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return <div {...props} data-name="Root" className="root" />;
};
export default Root;
