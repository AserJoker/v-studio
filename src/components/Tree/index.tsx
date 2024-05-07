import { useRef, useState } from "react";
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
  onDrop?: (src: string[], item: string[]) => void;
  dragable?: boolean;
}
interface ITreeProps {
  nodes: ITreeNode[];
  onContextMenu?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    path?: string[]
  ) => void;
  onDrop?: (src: string[], item: string[]) => void;
  dragable?: boolean;
}
const TreeNode: React.FC<ITreeNodeProps> = ({
  path,
  onContextMenu,
  dragable,
  onDrop,
  ...node
}) => {
  const { children, content } = node;
  const [isFolder, toggleFolder] = useState(false);
  const [active, toggleActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
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
            onDrop?.(path, data.split("."));
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
          onDragStart={(e) => {
            e.dataTransfer.setData("text/plain", path.join("."));
            e.dataTransfer.effectAllowed = "all";
            e.dataTransfer.dropEffect = "copy";
            const div = ref.current as HTMLDivElement;
            const rc = div.getBoundingClientRect();
            e.dataTransfer.setDragImage(div, 0, rc.height);
          }}
          draggable
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
          <div className={classname("tree-node-content-text")} ref={ref}>
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
                  onDrop={onDrop}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
const Tree: React.FC<ITreeProps> = ({
  nodes,
  onContextMenu,
  dragable,
  onDrop,
}) => {
  return (
    <div
      className="tree"
      onContextMenu={(e) => {
        onContextMenu?.(e);
      }}
    >
      {nodes.map((node) => (
        <TreeNode
          {...node}
          path={[node.name]}
          key={node.name}
          onContextMenu={onContextMenu}
          dragable={dragable}
          onDrop={onDrop}
        />
      ))}
    </div>
  );
};
export default Tree;
