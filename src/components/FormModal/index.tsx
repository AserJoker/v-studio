import { Runtime } from "@/runtime";
import Button from "../Button";
import "./index.less";
import {
  $modal,
  EVENT_CREATE_AND_SHOW_MODAL,
  EVENT_HIDE_MODAL,
} from "../ModalContainer";
import React, { useState } from "react";
interface IFormModalProps {
  onOk?: (state: Record<string, unknown>) => void;
  content?: (
    state: Record<string, unknown>,
    setState: (newValue: Record<string, unknown>) => void
  ) => JSX.Element | string | null;
  identity: string;
}
const FormModal: React.FC<IFormModalProps> = ({ onOk, content, identity }) => {
  const [state, setState] = useState<Record<string, unknown>>({});
  return (
    <div className="form-modal">
      <div className="form-modal-content">
        {content && content(state, setState)}
      </div>
      <div className="form-modal-action-bar">
        <Button
          className="form-modal-action"
          onClick={() => {
            $modal.emit(EVENT_HIDE_MODAL, identity);
          }}
        >
          {Runtime.theApp.$locale.get("btn.cancel.name")}
        </Button>
        <Button
          className="form-modal-action"
          onClick={() => {
            onOk?.(state);
          }}
        >
          {Runtime.theApp.$locale.get("btn.ok.name")}
        </Button>
      </div>
    </div>
  );
};
export const createAndShowFormModal = ({
  identity,
  title,
  ...props
}: IFormModalProps & { identity: string; title?: string }) => {
  $modal.emit(EVENT_CREATE_AND_SHOW_MODAL, {
    identity,
    title,
    content: () => <FormModal {...props} identity={identity} />,
  });
};
