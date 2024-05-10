import { classname } from "@/util";
import React, { useEffect, useState, JSX } from "react";
import "./index.less";
interface IInputProps {
  value?: string;
  onChange?: (val: string) => void;
  className?: string;
  children?: JSX.Element | string | null;
  prefix?: () => JSX.Element | string | null;
  stuffix?: () => JSX.Element | string | null;
}
const Input: React.FC<IInputProps> = ({
  value,
  onChange,
  className,
  children,
  prefix,
  stuffix,
}) => {
  const [current, setCurrent] = useState(value);
  useEffect(() => {
    setCurrent(value);
  }, [value]);
  return (
    <div className={classname("input", className ?? "")}>
      {prefix && prefix()}
      <input
        value={current}
        onInput={(e) => {
          const value = e.currentTarget.value;
          if (onChange) {
            onChange(value);
          } else {
            setCurrent(value);
          }
        }}
        className="input-content"
      >
        {children}
      </input>
      {stuffix && stuffix()}
    </div>
  );
};
export default Input;
