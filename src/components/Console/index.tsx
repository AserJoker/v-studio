import React, { useState } from "react";
import "./index.less";
import { Divider } from "../Divider";
const Console: React.FC = () => {
  const [height, setHeight] = useState(20 * 16);
  return (
    <div className="console" style={{ height }}>
      <div className="console-content">console</div>
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
export default Console;
