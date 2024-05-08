import React, { useState } from "react";
import "./index.less";
import { Divider } from "../Divider";
const Output: React.FC = () => {
  const [height, setHeight] = useState(20 * 16);
  return (
    <div className="output" style={{ height }}>
      <div className="output-content">console</div>
      <Divider
        offset={height}
        direction="column-revert"
        onChange={(val) => {
          setHeight(val);
        }}
      />
    </div>
  );
};
export default Output;
