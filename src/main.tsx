import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./renderer";
import { Application } from "@/components";
import { Application as StudioApplication } from "@/studio";
import FileExplorer from "@/components/FileExplorer";

StudioApplication.theApp.setExplorer({
  name: "File Explorer",
  icon: () => {
    return "\ue63e";
  },
  content: () => {
    return <FileExplorer />;
  },
});

StudioApplication.theApp.setExplorer({
  name: "Component Explorer",
  icon: () => {
    return "\ue6b2";
  },
  content: () => {
    return "component";
  },
});

StudioApplication.theApp.setMenus([
  {
    name: "File",
    children: [
      {
        name: "Open File",
      },
      {
        name: "Open Folder",
      },
      {
        name: "Save",
      },
      {
        name: "Open...",
        children: [
          {
            name: "File",
          },
          {
            name: "Folder",
          },
        ],
      },
      {
        name: "Load...",
        children: [
          { name: "Project...", children: [{ name: "Old" }, { name: "Raw" }] },
          {},
          { name: "Dump" },
          { name: "File" },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>
);