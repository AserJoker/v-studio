import React, { useEffect, useState } from "react";
import "./index.less";
export interface IModalProps {
  visible?: boolean;
  onClose?: () => void;
  width?: string;
  height?: string;
  title?: string;
  children?: JSX.Element | string | null;
}
const Modal: React.FC<IModalProps> = ({
  visible = false,
  onClose,
  width = "20rem",
  height = "15rem",
  title,
  children,
}) => {
  const [isVisible, setVisible] = useState(visible);
  useEffect(() => {
    setVisible(visible);
  }, [visible]);
  if (!isVisible) {
    return null;
  }
  return (
    <div className="modal">
      <div className="mask" />
      <div className="modal-box" style={{ minWidth: width, minHeight: height }}>
        <div className="modal-box-top">
          <div className="modal-box-top-title">{title}</div>
          <div
            className="modal-box-top-close"
            onClick={() => {
              if (onClose) {
                onClose();
              } else {
                setVisible(false);
              }
            }}
          >
            x
          </div>
        </div>
        <div className="modal-box-content">{children}</div>
      </div>
    </div>
  );
};
export default Modal;
