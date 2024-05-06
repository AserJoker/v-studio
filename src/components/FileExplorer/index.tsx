import React from "react";
import "./index.less";
import Tree from "../Tree";
const data = [
  {
    name: "/",
    content: () => (
      <div className="folder">
        <span>/</span>
        <span className="iconfont">&#xe63a;</span>
      </div>
    ),
    children: [
      {
        name: "usr",
        content: () => "usr",
        children: [
          {
            name: "aserjoker",
            content: () => "aserjoker",
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
          },
          {
            name: "x86_64",
            content: () => "x86_64",
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
          },
          {
            name: "rm",
            content: () => "rm",
          },
        ],
      },
    ],
  },
];
const FileExplorer: React.FC = () => {
  return (
    <div className="file-explorer">
      <Tree
        nodes={data}
        onContextMenu={(e, node) => {
          console.log(node);
          e.preventDefault();
        }}
        dragable
      />
    </div>
  );
};
export default FileExplorer;
