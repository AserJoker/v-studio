import React, { useState } from "react";
import "./index.less";
import Tree, { ITreeNode } from "../Tree";
import ContextMenu from "../ContextMenu";
const data: ITreeNode[] = [
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
  const [nodes, setNodes] = useState(data);
  const getItem = (path: string[]): ITreeNode | undefined => {
    let item = nodes.find((n) => n.name === path[0]);
    for (let index = 1; index < path.length; index++) {
      if (!item || !item.children) {
        return undefined;
      }
      item = item.children.find((c) => c.name === path[index]);
    }
    return item;
  };
  const [isContextMenuVisible, toggleContextMenuVisible] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const [onContextMenuItem, setOnContextMenuItem] = useState<string[]>([]);
  const [contextMenuArg, setContextMenuArg] = useState<unknown>(undefined);
  return (
    <div className="file-explorer">
      <Tree
        nodes={nodes}
        dragable
        activeNode={onContextMenuItem}
        onDragStart={() => {
          toggleContextMenuVisible(false);
          setOnContextMenuItem([]);
        }}
        onDrop={(srcp, itemp) => {
          const src = getItem(srcp);
          const parent = getItem(itemp.slice(0, itemp.length - 1));
          if (parent === src) {
            return;
          }
          if (parent && parent.children && src && src.children) {
            const index = parent.children.findIndex(
              (c) => c.name === itemp[itemp.length - 1]
            );
            if (index !== -1) {
              const item = parent.children[index];
              parent.children.splice(index, 1);
              src.children.push(item);
              setNodes([...nodes]);
            }
          }
        }}
        onContextMenu={(e, path) => {
          setContextMenuPos({ x: e.clientX, y: e.clientY });
          toggleContextMenuVisible(true);
          setContextMenuArg(path);
          if (path) {
            setOnContextMenuItem(path);
          }
          e.preventDefault();
        }}
      />
      <ContextMenu
        id="file-explorer"
        visible={isContextMenuVisible}
        x={contextMenuPos.x}
        y={contextMenuPos.y}
        onClose={() => {
          toggleContextMenuVisible(false);
          setOnContextMenuItem([]);
        }}
        arg={contextMenuArg}
      />
    </div>
  );
};
export default FileExplorer;
