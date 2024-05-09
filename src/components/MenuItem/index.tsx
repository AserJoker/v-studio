import { Runtime } from "@/runtime";
import { classname } from "@/util";
import { useEffect, useState } from "react";
import "./index.less";
import { IMenuItem } from "@/types";
export interface IMenuItemProps {
  item: IMenuItem;
  onClick?: (path: string[]) => void;
  path?: string[];
  popupDirection?: "right" | "bottom" | "left" | "top";
  active: string[];
  onActive: (path: string[]) => void;
  trigger: "click" | "hover";
}

const MenuItem: React.FC<IMenuItemProps> = ({
  item,
  onActive,
  active,
  path = [item.name as string],
  popupDirection = "right",
  onClick,
  trigger,
}) => {
  const [isPopup, setIsPopup] = useState(false);
  useEffect(() => {
    if (active.join("#").startsWith(path.join("#"))) {
      setIsPopup(true);
    } else {
      setIsPopup(false);
    }
  }, [active]);
  const children = item.children ?? [];
  if (item.visible && !item.visible()) {
    return null;
  }
  return (
    <div
      className={classname("menu-item", { root: path.length === 1 })}
      onClick={(e) => {
        if (!item.children?.length) {
          onActive([]);
          onClick?.(path);
          return;
        }
        if (trigger === "click" && item.children?.length) {
          onActive(path);
          e.stopPropagation();
        }
        e.stopPropagation();
      }}
      onMouseEnter={(e) => {
        if (trigger === "hover" && item.children?.length) {
          onActive(path);
          e.stopPropagation();
        }
      }}
      onMouseLeave={(e) => {
        if (trigger === "hover" && item.children?.length) {
          onActive(path.slice(0, path.length - 1));
          e.stopPropagation();
        }
      }}
    >
      <div className="menu-item-title">
        <span>
          {Runtime.theApp.$locale.get(
            item.displayName ?? (item.name as string)
          )}
        </span>
        <span>
          {item.children?.length && popupDirection === "right" && ">"}
        </span>
      </div>
      {isPopup && (
        <div
          className={classname("menu-popup", {
            top: popupDirection === "top",
            left: popupDirection === "left",
            right: popupDirection === "right",
            bottom: popupDirection === "bottom",
          })}
        >
          {children.map((item, index) => {
            const { name } = item;
            if (name) {
              return (
                <MenuItem
                  active={active}
                  onActive={onActive}
                  item={item}
                  key={item.name}
                  trigger="hover"
                  path={[...path, name]}
                  popupDirection="right"
                  onClick={onClick}
                />
              );
            } else {
              return (
                <div key={`divider-${index}`} className="menu-popup-divider" />
              );
            }
          })}
        </div>
      )}
    </div>
  );
};
export default MenuItem;
