import React, { useEffect, useState } from "react";
import Widget, { Preview } from "@widgets";
import "./index.less";

Widget.store.init();

const Workspace: React.FC = () => {
  const [key, setKey] = useState(`${Date.now()}`);
  useEffect(() => {
    return Widget.bus.on("update", () => {
      setTimeout(() => {
        setKey(`${Date.now()}`);
      }, 1);
    });
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
      </div>
      <div className="editor">
        <Preview key={`${key}`} />
      </div>
    </div>
  );
};
export default Workspace;
