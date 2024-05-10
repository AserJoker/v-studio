import React, { useEffect, useState } from "react";
import "./index.less";
import Tree, { ITreeNode } from "../Tree";
import ContextMenu from "../ContextMenu";
import { Runtime, ResourceManager } from "@/runtime";
import { IResource } from "@/types";
import Button from "../Button";
import Modal from "../Modal";
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
const ResourceExplorer: React.FC = () => {
  const app = Runtime.theApp;
  const [nodes, setNodes] = useState<ITreeNode[]>([]);
  useEffect(() => {
    const resources = app.$resource.getResources();
    setNodes(resources.map((r) => resolveResource(r)));
    return app.$bus.on(ResourceManager.EVENT_RESOURCE_CHANGE, () => {
      setNodes(resources.map((r) => resolveResource(r)));
    });
  }, []);
  const [isContextMenuVisible, toggleContextMenuVisible] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const [onContextMenuItem, setOnContextMenuItem] = useState<string[]>([]);
  const [contextMenuArg, setContextMenuArg] = useState<unknown>(undefined);
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <div className="resource-explorer">
      {nodes.length === 0 ? (
        <>
          <div className="action-wrapper">
            <Button
              className="create-project-button"
              onClick={() => {
                setModalVisible(true);
              }}
            >
              {Runtime.theApp.$locale.get("explorer.resources.btn.new")}
            </Button>
          </div>
          <Modal
            visible={isModalVisible}
            onClose={() => {
              setModalVisible(false);
            }}
            title={Runtime.theApp.$locale.get("explorer.resources.btn.new")}
          >
            <div className="resource-explorer-create-project-modal">
              <div className="content"></div>
              <div className="action-bar">
                <Button
                  className="action"
                  onClick={() => {
                    setModalVisible(false);
                  }}
                >
                  {Runtime.theApp.$locale.get("btn.cancel.name")}
                </Button>
                <Button className="action">
                  {Runtime.theApp.$locale.get("btn.ok.name")}
                </Button>
              </div>
            </div>
          </Modal>
        </>
      ) : (
        <>
          <Tree
            nodes={nodes}
            dragable
            activeNode={onContextMenuItem}
            onDragStart={() => {
              toggleContextMenuVisible(false);
              setOnContextMenuItem([]);
            }}
            onDrop={(target, src) => {
              app.$resource.move(src.join("#"), target.join("#"));
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
            id="resources"
            visible={isContextMenuVisible}
            x={contextMenuPos.x}
            y={contextMenuPos.y}
            onClose={() => {
              toggleContextMenuVisible(false);
              setOnContextMenuItem([]);
            }}
            arg={contextMenuArg}
          />
        </>
      )}
    </div>
  );
};
export default ResourceExplorer;
