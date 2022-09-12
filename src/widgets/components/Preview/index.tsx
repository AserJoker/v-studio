import React, { useRef, useState } from "react";
import { Renderer, Store } from "../../runtime";
import { PreviewContext } from "../../context";
import { IWidget } from "../../types";
import "./index.less";
interface IPlaceholder {
  x: number;
  y: number;
  w: number;
  h: number;
  onDrop: (widget: IWidget) => void;
}
const Preview: React.FC = () => {
  const mask = useRef<HTMLDivElement>(null);
  const [placeholders, setPlaceholders] = useState<
    Record<string, IPlaceholder>
  >({});
  const update = (
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    onDrop: (widget: IWidget) => void
  ) => {
    const dom = mask.current;
    if (dom) {
      if (!placeholders[id]) {
        const domrc = dom.getBoundingClientRect();
        const rc = {
          x: x - domrc.x,
          y: y - domrc.y,
          w,
          h
        };
        setPlaceholders({
          ...placeholders,
          [id]: {
            ...rc,
            onDrop
          }
        });
      }
    }
  };
  return (
    <PreviewContext.Provider value={{ update }}>
      <div className="preview">
        {Renderer.getInstance().drawWidgetEdit(
          Store.getInstance().getRoot(),
          {}
        )}
        <div className="mask" ref={mask}>
          {Object.keys(placeholders).map((id) => {
            return (
              <div
                key={id}
                style={{
                  position: "absolute",
                  left: placeholders[id].x,
                  top: placeholders[id].y,
                  width: placeholders[id].w,
                  height: placeholders[id].h
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={(e) => {
                  const name = e.dataTransfer.getData("widget");
                  placeholders[id].onDrop(
                    Store.getInstance().createWidget(name)
                  );
                }}
              />
            );
          })}
        </div>
      </div>
    </PreviewContext.Provider>
  );
};
export default Preview;
