import React, { useContext, useEffect, useRef } from "react";
import { bus } from "../../runtime";
import { IWidget } from "../../types";
import { EditorContext } from "../../context";
import "./index.less";
const Placeholder: React.FC<Record<string, unknown>> = (props) => {
  const path = props.path as string[];
  const host = props.host as IWidget;
  const identity = props.identity as string | number;
  const ctx = useContext(EditorContext);
  const placeholder = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const dom = placeholder.current;
    const name = props.identity as string;
    if (dom && ctx) {
      const rc = dom.getBoundingClientRect();
      ctx.updatePlaceholder(name, {
        x: rc.x,
        y: rc.y,
        width: rc.width,
        height: rc.height,
        onDrop(widget: IWidget) {
          if (Array.isArray(host.slots)) {
            const index = host.slots.findIndex((s) => s.identity === identity);
            if (index !== -1) {
              host.slots[index] = widget;
              bus.emit("update");
            }
          } else {
            const slots = host.slots;
            Object.keys(slots).forEach((name) => {
              if (slots[name].identity === identity) {
                slots[name] = widget;
                bus.emit("update");
              }
            });
          }
        },
        id: name,
        zIndex: path.length,
        host: host.identity
      });
    }
  }, []);
  return (
    <div
      className="placehoder"
      key={props["data-identity"] as string}
      data-identity={props["data-identity"]}
      ref={placeholder}
      style={{
        width: props.width as string,
        height: props.height as string
      }}
    >
      +
    </div>
  );
};
export default Placeholder;
