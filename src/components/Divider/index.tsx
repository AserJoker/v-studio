import { classname } from "@/util";
import "./index.less";
import { useRef } from "react";
export const Divider: React.FC<{
  direction: "row" | "column" | "row-revert" | "column-revert";
  offset: number;
  onChange: (value: number) => void;
}> = ({ direction, offset, onChange }) => {
  const mask = useRef<HTMLDivElement>(null);
  return (
    <div>
      <div ref={mask} className="divier-mask" style={{ display: "none" }}></div>
      <div
        onMouseDown={(e) => {
          const div = mask.current;
          let start = e.pageY;
          let startOffset = offset;
          if (direction === "row-revert") {
            start = e.pageX;
          }
          if (div) {
            const onMouseMove = (e: MouseEvent) => {
              if (direction === "row") {
                onChange(e.clientX);
              } else if (direction === "column") {
                onChange(e.clientY);
              } else if (direction === "column-revert") {
                onChange(start - e.pageY + startOffset);
              } else if (direction === "row-revert") {
                onChange(start - e.pageX + startOffset);
              }
            };
            const onMouseUp = () => {
              div.style.cursor = "unset";
              div.style.display = "none";
              document.removeEventListener("mouseup", onMouseUp);
              document.removeEventListener("mousemove", onMouseMove);
            };
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
            if (direction === "row" || direction === "row-revert") {
              div.style.cursor = "e-resize";
            } else {
              div.style.cursor = "n-resize";
            }
            div.style.display = "block";
          }
        }}
        className={classname("divider", direction)}
        style={{
          left: direction === "row" ? offset - 5 : undefined,
          top: direction === "column" ? offset - 5 : undefined,
          right: direction === "row-revert" ? offset - 5 : undefined,
          bottom: direction === "column-revert" ? offset - 5 : undefined,
        }}
      >
        <div className="divider-content" />
      </div>
    </div>
  );
};
