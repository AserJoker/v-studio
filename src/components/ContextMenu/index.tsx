import { Runtime, ContextMenuManager } from "@/runtime";
import React, { useEffect, useState } from "react";
import "./index.less";
import MenuItem from "../MenuItem";
import { IMenuItem } from "@/types";
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
  const app = Runtime.theApp;
  const [menus, setMenus] = useState<IMenuItem[]>([]);
  useEffect(() => {
    const getter = app.$contextmenu.getMenus(id);
    setMenus([...((getter && getter(arg)) ?? [])]);
  }, [arg]);
  useEffect(() => {
    return app.$bus.on(ContextMenuManager.EVENT_MENU_CHANGE, () => {
      const getter = app.$contextmenu.getMenus(id);
      setMenus([...((getter && getter(arg)) ?? [])]);
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
  if (menus.filter((m) => m.visible?.() !== false).length === 0) {
    return null;
  }
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
                  action: path,
                  item: arg,
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
