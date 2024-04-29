import "./index.less";
export const Divider: React.FC<{
  direction: "row" | "column" | "row-revert" | "column-revert";
  offset: number;
  onChange: (value: number) => void;
}> = ({ direction, offset, onChange }) => {
  return (
    <div
      className="divider"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        const div = document.createElement("div");
        div.textContent = "resize";
        e.dataTransfer.setDragImage(div, 0, 0);
      }}
      onDrag={(e) => {
        onChange(e.clientX);
      }}
      style={{
        left: direction === "row" ? offset - 5 : undefined,
        top: direction === "column" ? offset - 5 : undefined,
        right: direction === "row-revert" ? offset - 5 : undefined,
        bottom: direction === "column-revert" ? offset - 5 : undefined,
      }}
    ></div>
  );
};
