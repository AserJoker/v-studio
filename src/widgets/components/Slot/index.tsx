import React, { useContext, useEffect, useRef } from "react";
import { PreviewContext } from "../../context";
import { IWidget } from "../../types";
import "./index.less";
const Slot: React.FC<Record<string, unknown>> = (props) => {
  const dom = useRef<HTMLDivElement>(null);
  const ctx = useContext(PreviewContext);
  useEffect(() => {
    const div = dom.current;
    if (div) {
      const rc = div.getBoundingClientRect();
      if (ctx) {
        ctx.update(
          props["data-identity"] as string,
          rc.x,
          rc.y,
          rc.width,
          rc.height,
          props.onDrop as (widget: IWidget) => void
        );
      }
    }
  }, []);
  return (
    <div
      className="slot"
      ref={dom}
      key={props["data-identity"] as string}
      data-identity={props["data-identity"]}
      style={{
        width: props.width as string,
        height: props.height as string
      }}
    >
      +
    </div>
  );
};
export default Slot;
