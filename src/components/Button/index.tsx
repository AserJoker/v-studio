import React from "react";
import "./index.less";
import { classname } from "@/util";
interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}
const Button: React.FC<IButtonProps> = ({ className, children, ...others }) => {
  return (
    <button {...others} className={classname("button", className ?? "")}>
      {children}
    </button>
  );
};
export default Button;
