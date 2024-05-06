import { useState } from "react";
import "./index.less";
import { classname } from "@/util";
export interface ITreeNode {
  content: () => JSX.Element | string | null;
  children?: ITreeNode[];
  name: string;
}
interface ITreeNodeProps extends ITreeNode {
  path: string[];
  onContextMenu?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    path?: string[]
  ) => void;
  dragable?: boolean;
}
interface ITreeProps {
  nodes: ITreeNode[];
  onContextMenu?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    path?: string[]
  ) => void;
  dragable?: boolean;
}
const TreeNode: React.FC<ITreeNodeProps> = ({
  path,
  onContextMenu,
  dragable,
  ...node
}) => {
  const { children, content } = node;
  const [isFolder, toggleFolder] = useState(false);
  const [active, toggleActive] = useState(false);
  return (
    <>
      <div className="tree-node">
        <div
          className={classname("tree-node-content", { active })}
          style={{ paddingLeft: `${path.length - 1}rem` }}
          onContextMenu={(e) => {
            onContextMenu?.(e, path);
            e.stopPropagation();
          }}
          onClick={(e) => {
            if (children) {
              toggleFolder(!isFolder);
              e.preventDefault();
            }
          }}
          onDrop={(e) => {
            e.preventDefault();
            toggleActive(false);
            const data = e.dataTransfer.getData("text/plain");
            console.log(data.split("."));
            e.stopPropagation();
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "copy";
            toggleActive(true);
            e.stopPropagation();
          }}
          onDragLeave={(e) => {
            toggleActive(false);
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {children !== undefined ? (
            <div className="tree-node-folder">
              <div
                className={classname("tree-node-folder-action", { isFolder })}
              >
                <span className="iconfont">&#xe665;</span>
              </div>
            </div>
          ) : (
            <div style={{ width: "1.5rem" }} />
          )}
          <div
            className={classname("tree-node-content")}
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", path.join("."));
              e.dataTransfer.effectAllowed = "all";
              e.dataTransfer.dropEffect = "copy";
            }}
            draggable
          >
            {content()}
          </div>
        </div>
        {children !== undefined && (
          <div
            className="tree-node-children"
            style={{ height: isFolder ? "0px" : undefined }}
          >
            {children.map((c) => (
              <div className="tree-node-children-item" key={c.name}>
                <TreeNode
                  {...c}
                  path={[...path, c.name]}
                  key={c.name}
                  onContextMenu={onContextMenu}
                  dragable={dragable}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
const Tree: React.FC<ITreeProps> = ({ nodes, onContextMenu, dragable }) => {
  return (
    <div
      className="tree"
      onContextMenu={(e) => {
        onContextMenu?.(e);
      }}
      onDragOver={(e) => {
        e.dataTransfer.dropEffect = "copy";
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {nodes.map((node) => (
        <TreeNode
          {...node}
          path={[node.name]}
          key={node.name}
          onContextMenu={onContextMenu}
          dragable={dragable}
        />
      ))}
    </div>
  );
};
export default Tree;
