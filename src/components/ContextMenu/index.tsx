import { Application, ContextMenuManager, IMenuItem } from "@/studio";
import React, { useEffect, useState } from "react";
import "./index.less";
import MenuItem from "../MenuItem";
export interface IContextMenuProps {
  id: string;
  visible?: boolean;
  onClose?: () => void;
  x?: number;
  y?: number;
  arg?: unknown;
}
const ContextMenu: React.FC<IContextMenuProps> = ({
  id,
  visible,
  onClose,
  x = 0,
  y = 0,
  arg,
}) => {
  const app = Application.theApp;
  const [menus, setMenus] = useState<IMenuItem[]>([]);
  useEffect(() => {
    setMenus([...(app.$contextmenu.getMenus(id)?.(arg) ?? [])]);
  }, [arg]);
  useEffect(() => {
    return app.$bus.on(ContextMenuManager.EVENT_MENU_CHANGE, () => {
      setMenus([...(app.$contextmenu.getMenus(id)?.(arg) ?? [])]);
    });
  }, []);
  const [activePath, setActivePath] = useState<string[]>([]);
  useEffect(() => {
    const onBlur = () => {
      onClose?.();
    };
    document.addEventListener("click", onBlur);
    return () => {
      document.removeEventListener("click", onBlur);
    };
  }, []);
  return (
    <div
      className="context-menu"
      style={{
        display: visible ? "block" : "none",
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      {menus.map((menu, index) => {
        if (menu.name) {
          return (
            <MenuItem
              item={menu}
              key={menu.name}
              active={activePath}
              onActive={(path) => {
                setActivePath([...path]);
              }}
              trigger="hover"
              onClick={(path) => {
                app.$bus.emit(ContextMenuManager.EVENT_MENU_CLICK, {
                  id,
                  arg: path,
                });
                onClose?.();
              }}
            />
          );
        } else {
          return (
            <div key={`divider-${index}`} className="menu-popup-divider" />
          );
        }
      })}
    </div>
  );
};
export default ContextMenu;
