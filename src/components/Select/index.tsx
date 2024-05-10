import React, { useEffect, useState } from "react";
import "./index.less";
export interface ISelectOption {
  name: string;
  displayName: string;
}
export interface ISelectProps {
  value?: string;
  onChange?: (val: string) => void;
  options?: ISelectOption[];
}
const Select: React.FC<ISelectProps> = ({ value, onChange, options = [] }) => {
  const [current, setCurrent] = useState(value);
  const [isPopup, setIsPopup] = useState(false);
  useEffect(() => {
    setCurrent(value);
  }, [value]);
  useEffect(() => {
    const onBlur = () => {
      setIsPopup(false);
    };
    document.addEventListener("click", onBlur);
    return () => {
      document.removeEventListener("click", onBlur);
    };
  }, []);
  return (
    <div className="select">
      <div
        className="select-content"
        onClick={(e) => {
          setIsPopup(!isPopup);
          e.stopPropagation();
        }}
      >
        <span>
          {options.find((o) => o.name === current)?.displayName ?? current}
        </span>
        <span className="iconfont">&#xe666;</span>
      </div>
      <div
        className="select-popup"
        style={{ display: isPopup ? "block" : "none" }}
      >
        {options.map(({ name, displayName }) => {
          return (
            <div
              className="select-popup-option"
              key={name}
              onClick={() => {
                if (onChange) {
                  onChange(name);
                } else {
                  setCurrent(name);
                }
              }}
            >
              {displayName}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Select;
