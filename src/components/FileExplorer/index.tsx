import React, { useEffect, useState } from "react";
import "./index.less";
import Tree, { ITreeNode } from "../Tree";
import ContextMenu from "../ContextMenu";
import { Runtime, IResource, ResourceManager } from "@/studio";
const resolveResource = (resource: IResource): ITreeNode => {
  if (resource.type === "resource") {
    const item = resource as IResource;
    return {
      name: item.name,
      content: () => item.name,
    };
  } else {
    return {
      name: resource.name,
      content: () => resource.name,
      children: resource.children.map((r) => resolveResource(r)),
    };
  }
};
const FileExplorer: React.FC = () => {
  const app = Runtime.theApp;
  const [nodes, setNodes] = useState<ITreeNode[]>([]);
  useEffect(() => {
    const resources = app.$resources.getResources();
    setNodes(resources.map((r) => resolveResource(r)));
    return app.$bus.on(ResourceManager.EVENT_RESOURCE_CHANGE, () => {
      setNodes(resources.map((r) => resolveResource(r)));
    });
  }, []);
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
        onDrop={(target, src) => {
          app.$resources.move(src.join("#"), target.join("#"));
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
