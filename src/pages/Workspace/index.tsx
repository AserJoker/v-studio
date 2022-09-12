import React, { useEffect, useState } from "react";
import Widget, { Preview } from "../../widgets";
import "./index.less";

Widget.store.init();
const root = Widget.store.getRoot();
const button = Widget.store.createWidget("Button");
const text = Widget.store.createWidget("Text");
Widget.setAttribute(text, {
  text: "hello world"
});
Widget.append(root, text);
Widget.append(root, button);

const Workspace: React.FC = () => {
  const [key, setKey] = useState(`${Date.now()}`);
  useEffect(() => {
    Widget.renderer.onChange = () => {
      setTimeout(() => {
        setKey(`${Date.now()}`);
      }, 1);
    };
    return () => {
      Widget.renderer.onChange = undefined;
    };
  }, []);
  return (
    <div className="workspace">
      <div className="explorer">
        {Widget.store.getDefinitions().map((def) => {
          return (
            <div
              key={def.name}
              className="template-item"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("widget", def.name);
              }}
            >
              <div className="name">{def.name}</div>
              <div className="template-preview">{def.preview()}</div>
            </div>
          );
        })}
        <button onClick={() => setKey(key + 1)}>update</button>
      </div>
      <div className="editor">
        <Preview key={`${key}`} />
      </div>
    </div>
  );
};
export default Workspace;
