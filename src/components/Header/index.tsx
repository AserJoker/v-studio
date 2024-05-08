import React from "react";
import "./index.less";
import Menu from "../Menu";
const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header-icon-menu">
        <div className="icon">&#xe63a;</div>
        <Menu />
      </div>
    </div>
  );
};
export default Header;
