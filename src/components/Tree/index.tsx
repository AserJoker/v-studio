import { useState } from "react";
import "./index.less";
interface ITreeNode {
  content: () => JSX.Element | string | null;
  children: ITreeNode[];
  name: string;
}
interface ITreeProps {
  nodes: ITreeNode[];
}
const TreeNode: React.FC<ITreeNode & { path: string[] }> = ({
  content,
  children,
  path,
  name,
}) => {
  const [isFolder, toggleFolder] = useState(false);
  return (
    <>
      <div className="tree-node">
        {path.map((name) => {
          return (
            <div className="tree-node-placeholder" key={name}>
              <div className="tree-node-placeholder-line" />
            </div>
          );
        })}
        {children.length !== 0 ? (
          <div
            className="tree-node-folder"
            onClick={(e) => {
              toggleFolder(!isFolder);
              e.preventDefault();
            }}
          >
            <div className="tree-node-folder-action">
              {isFolder ? "-" : "+"}
            </div>
          </div>
        ) : (
          <div className="tree-node-placeholder" key={name}>
            <div className="tree-node-placeholder-line" />
          </div>
        )}
        <div className="tree-node-content">{content()}</div>
      </div>
      {!isFolder &&
        children.map((c) => (
          <TreeNode {...c} path={[...path, name]} key={c.name} />
        ))}
    </>
  );
};
const Tree: React.FC<ITreeProps> = ({ nodes }) => {
  return (
    <div className="tree">
      {nodes.map((node) => (
        <TreeNode {...node} path={[]} key={node.name} />
      ))}
    </div>
  );
};
export default Tree;
