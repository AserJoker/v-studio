import { Application, IMenuItem } from "@/studio";
import React, { useEffect, useState } from "react";
import "./index.less";
import { classname } from "@/util";

interface IMenuItemProps {
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
  popupDirection,
  onClick,
  trigger,
}) => {
  const [isPopup, setIsPopup] = useState(false);
  useEffect(() => {
    if (active.join(".").startsWith(path.join("."))) {
      setIsPopup(true);
    } else {
      setIsPopup(false);
    }
  }, [active]);
  const children = item.children ?? [];
  return (
    <div
      className={classname("menu-item")}
      onClick={(e) => {
        if (!item.children?.length) {
          onActive([]);
          onClick?.(path);
          e.stopPropagation();
          return;
        }
        if (trigger === "click" && item.children?.length) {
          onActive(path);
          e.stopPropagation();
        }
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
        <span>{item.displayName ?? item.name}</span>
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

const Menu: React.FC = () => {
  const theApp = Application.theApp;
  const [items, setItems] = useState<IMenuItem[]>(theApp.getMenus());
  useEffect(
    () =>
      theApp.$bus.on(Application.EVENT_MENU_CHANGE, () => {
        setItems([...theApp.getMenus()]);
      }),
    []
  );
  const [activePath, setActivePath] = useState<string[]>([]);
  useEffect(() => {
    const onBlur = () => {
      setActivePath([]);
    };
    document.addEventListener("click", onBlur);
    return () => {
      document.removeEventListener("click", onBlur);
    };
  }, []);
  return (
    <div className="menu" onClick={(e) => e.stopPropagation()}>
      {items.map((item, index) => (
        <MenuItem
          item={item}
          key={item.name ?? `${index}`}
          onActive={(act) => {
            setActivePath([...act]);
          }}
          active={activePath}
          trigger="click"
          onClick={(path) => {
            theApp.$bus.emit(Application.EVENT_MENU_CLICK, path);
          }}
        />
      ))}
    </div>
  );
};
export default Menu;
