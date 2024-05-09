import { useEffect, useState } from "react";
import "@/themes";
import "./index.less";
import Vertical from "../Vertical";
import Header from "../Header";
import Horizontal from "../Horizontal";
import Explorer from "../Explorer";
import Editor from "../Editor";
import Output from "../Output";
import Toolbox from "../Toolbox";
import StatusBar from "../StatusBar";
import { LocaleManager, Runtime } from "@/runtime";
export const Application: React.FC<{ theme?: string }> = ({
  theme = "monokai",
}) => {
  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);
  const [_, setLanguage] = useState(Runtime.theApp.$locale.getLanguage());
  useEffect(() => {
    return Runtime.theApp.$bus.on(LocaleManager.EVENT_LOCALE_CHANGE, () => {
      setLanguage(Runtime.theApp.$locale.getLanguage());
    });
  }, []);
  return (
    <Vertical className="application" onContextMenu={(e) => e.preventDefault()}>
      <Header />
      <Horizontal className="body">
        <Explorer />
        <Vertical className="content">
          <Editor />
          <Output />
        </Vertical>
        <Toolbox />
      </Horizontal>
      <StatusBar />
    </Vertical>
  );
};
