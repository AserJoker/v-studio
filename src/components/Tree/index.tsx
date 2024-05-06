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
}
interface ITreeProps {
  nodes: ITreeNode[];
  onContextMenu?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    path?: string[]
  ) => void;
}
const TreeNode: React.FC<ITreeNodeProps> = ({
  path,
  onContextMenu,
  ...node
}) => {
  const { name, children, content } = node;
  const [isFolder, toggleFolder] = useState(false);
  return (
    <>
      <div className="tree-node">
        <div
          className="tree-node-content"
          style={{ paddingLeft: `${path.length - 1}rem` }}
          onContextMenu={(e) => {
            onContextMenu?.(e, path);
            e.stopPropagation();
          }}
        >
          {children !== undefined ? (
            <div
              className="tree-node-folder"
              onClick={(e) => {
                toggleFolder(!isFolder);
                e.preventDefault();
              }}
            >
              <div
                className={classname("tree-node-folder-action", { isFolder })}
              >
                <span className="iconfont">&#xe665;</span>
              </div>
            </div>
          ) : (
            <div className="tree-node-placeholder" key={name}>
              <div className="tree-node-placeholder-line" />
            </div>
          )}
          <div className="tree-node-content">{content()}</div>
        </div>
        {!isFolder && children !== undefined && (
          <div className="tree-nodoe-children">
            {children.map((c) => (
              <TreeNode
                {...c}
                path={[...path, c.name]}
                key={c.name}
                onContextMenu={onContextMenu}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
const Tree: React.FC<ITreeProps> = ({ nodes, onContextMenu }) => {
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
        />
      ))}
    </div>
  );
};
export default Tree;
