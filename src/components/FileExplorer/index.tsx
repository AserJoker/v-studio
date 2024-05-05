import React from "react";
import "./index.less";
import Tree from "../Tree";
const data = [
  {
    name: "/",
    content: () => "/",
    children: [
      {
        name: "usr",
        content: () => "usr",
        children: [
          {
            name: "aserjoker",
            content: () => "aserjoker",
            children: [],
          },
        ],
      },
      {
        name: "lib",
        content: () => "lib",
        children: [
          {
            name: "x86",
            content: () => "x86",
            children: [],
          },
          {
            name: "x86_64",
            content: () => "x86_64",
            children: [],
          },
        ],
      },
      {
        name: "bin",
        content: () => "bin",
        children: [
          {
            name: "ls",
            content: () => "ls",
            children: [],
          },
          {
            name: "rm",
            content: () => "rm",
            children: [],
          },
        ],
      },
    ],
  },
];
const FileExplorer: React.FC = () => {
  return (
    <div className="file-explorer">
      <Tree nodes={data} />
    </div>
  );
};
export default FileExplorer;
