import { Runtime, MenuManager } from "@/runtime";
import React, { useEffect, useState } from "react";
import "./index.less";
import MenuItem from "../MenuItem";
import { IMenuItem } from "@/types";

const Menu: React.FC = () => {
  const theApp = Runtime.theApp;
  const [items, setItems] = useState<IMenuItem[]>(theApp.$menu.getMenus());
  useEffect(
    () =>
      theApp.$bus.on(MenuManager.EVENT_MENU_CHANGE, () => {
        setItems([...theApp.$menu.getMenus()]);
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
        <div
          key={item.name ?? `${index}`}
          onMouseEnter={() => {
            if (activePath.length !== 0) {
              setActivePath([item.name as string]);
            }
          }}
        >
          <MenuItem
            item={item}
            onActive={(act) => {
              if (act.join("#") === activePath.join("#") && act.length === 1) {
                setActivePath([]);
              } else {
                setActivePath([...act]);
              }
            }}
            active={activePath}
            trigger="click"
            onClick={(path) => {
              theApp.$bus.emit(MenuManager.EVENT_MENU_CLICK, path);
            }}
            popupDirection="bottom"
          />
        </div>
      ))}
    </div>
  );
};
export default Menu;
