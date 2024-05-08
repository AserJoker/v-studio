import { Runtime, IMenuItem, MenuManager } from "@/studio";
import React, { useEffect, useState } from "react";
import "./index.less";
import MenuItem from "../MenuItem";

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
        <MenuItem
          item={item}
          key={item.name ?? `${index}`}
          onActive={(act) => {
            setActivePath([...act]);
          }}
          active={activePath}
          trigger="click"
          onClick={(path) => {
            theApp.$bus.emit(MenuManager.EVENT_MENU_CLICK, path);
          }}
          popupDirection="bottom"
        />
      ))}
    </div>
  );
};
export default Menu;
