import React, { useRef, useState } from "react";
import { EditorContext } from "../../context";
import { IPlaceholder, ISelector } from "../../types";
import { Editor, Store } from "../../runtime";
import "./index.less";
const Preview: React.FC = () => {
  const [selectors, setSelectors] = useState<Record<string, ISelector>>({});
  const [placeholders, setPlaceholders] = useState<
    Record<string, IPlaceholder>
  >({});
  const [focus, setFocus] = useState("");
  const mask = useRef<HTMLDivElement>(null);
  const updateElement = (name: string, selector: ISelector) => {
    const dom = mask.current;
    if (!selectors[name] && dom) {
      const rc = dom.getBoundingClientRect();
      setSelectors({
        ...selectors,
        [name]: { ...selector, x: selector.x - rc.x, y: selector.y - rc.y }
      });
    }
  };
  const updatePlaceholder = (name: string, placeholder: IPlaceholder) => {
    const dom = mask.current;
    if (!placeholders[name] && dom) {
      const rc = dom.getBoundingClientRect();
      setPlaceholders({
        ...placeholders,
        [name]: {
          ...placeholder,
          x: placeholder.x - rc.x,
          y: placeholder.y - rc.y
        }
      });
    }
  };
  return (
    <EditorContext.Provider value={{ updateElement, updatePlaceholder }}>
      <div className="preview">
        {Editor.getInstance().drawWidget(Store.getInstance().getRoot(), {})}
        <div className="mask" ref={mask}>
          {Object.keys(selectors)
            .filter((name) => selectors[name])
            .map((name) => {
              const selector = selectors[name];
              return (
                <div
                  key={name}
                  data-name="name"
                  style={{
                    position: "absolute",
                    top: selector.y,
                    left: selector.x,
                    width: selector.width,
                    height: selector.height,
                    zIndex: selector.zIndex,
                    border: focus === name ? "1px solid #0cf" : "none",
                    boxSizing: "border-box"
                  }}
                  onClick={(e) => {
                    selector.onSelect();
                    e.stopPropagation();
                    setFocus(name);
                  }}
                />
              );
            })}
          {Object.keys(placeholders)
            .filter((name) => placeholders[name])
            .map((name) => {
              const placeholder = placeholders[name];
              return (
                <div
                  key={name}
                  data-name="name"
                  style={{
                    position: "absolute",
                    top: placeholder.y,
                    left: placeholder.x,
                    width: placeholder.width,
                    height: placeholder.height,
                    zIndex: placeholder.zIndex
                  }}
                  onDrop={(e) => {
                    const name = e.dataTransfer.getData("widget");
                    placeholder.onDrop(Store.getInstance().createWidget(name));
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={(e) => {
                    e.stopPropagation();
                    const selector = selectors[placeholder.host];
                    if (selector) {
                      selector.onSelect();
                      setFocus(placeholder.host);
                    }
                  }}
                />
              );
            })}
        </div>
      </div>
    </EditorContext.Provider>
  );
};
export default Preview;
