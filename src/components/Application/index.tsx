import { useEffect } from "react";
import { ConfigProvider } from "antd";
import "@/themes";
import "./index.less";
import "@/studio";
import Vertical from "../Vertical";
import Header from "../Header";
import Horizontal from "../Horizontal";
import Explorer from "../Explorer";
import Editor from "../Editor";
import Console from "../Console";
import Toolbox from "../Toolbox";
import StatusBar from "../StatusBar";
export const Application: React.FC<{ theme?: string }> = ({
  theme = "monokai",
}) => {
  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);
  return (
    <ConfigProvider>
      <Vertical className="application">
        <Header />
        <Horizontal className="body">
          <Explorer />
          <Vertical className="content">
            <Editor />
            <Console />
          </Vertical>
          <Toolbox />
        </Horizontal>
        <StatusBar />
      </Vertical>
    </ConfigProvider>
  );
};