import { Component } from "@/engine";
import { useState, useEffect } from "react";
import { ComponentPreview } from "../ComponentPreview";
import "./index.less";
export const ComponentBox = () => {
  const [components, setComponents] = useState<string[]>([]);
  useEffect(() => {
    setComponents([...Component.getRenderers()]);
  }, []);
  return (
    <div className="component-box">
      <div className="pallete">
        {components.map((name) => {
          if (name === "slot" || name === "placeholder") {
            return null;
          }
          return <ComponentPreview name={name} key={name} />;
        })}
      </div>
    </div>
  );
};
