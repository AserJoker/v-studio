import { EventBus } from "@/util";
import React, { useState, useEffect } from "react";
import Modal, { IModalProps } from "../Modal";
import { Runtime } from "@/runtime";
export const $modal = new EventBus();
export const EVENT_SHOW_MODAL = "modal:show";
export const EVENT_HIDE_MODAL = "modal:hide";
export const EVENT_TOGGLE_MODAL = "modal:toggle";
export const EVENT_CREATE_MODAL = "modal:create";
export const EVENT_CREATE_AND_SHOW_MODAL = "modal:create_and_show";
type IModal = Omit<
  Omit<Omit<IModalProps, "visible">, "onClose">,
  "children"
> & {
  identity: string;
  content?: () => JSX.Element | string | null;
};
const ModalContainer: React.FC = () => {
  const [visibles, setVisibles] = useState<Record<string, boolean>>({});
  const [modals, setModals] = useState<IModal[]>([]);
  useEffect(() => {
    return $modal.on(EVENT_SHOW_MODAL, (identity: string) => {
      setVisibles({ ...visibles, [identity]: true });
    });
  }, []);
  useEffect(() => {
    return $modal.on(EVENT_HIDE_MODAL, (identity: string) => {
      setVisibles({ ...visibles, [identity]: false });
    });
  }, []);
  useEffect(() => {
    return $modal.on(EVENT_TOGGLE_MODAL, (identity: string) => {
      setVisibles({ ...visibles, [identity]: !visibles[identity] });
    });
  }, []);
  useEffect(() => {
    return $modal.on(EVENT_CREATE_MODAL, (modal: IModal) => {
      const index = modals.findIndex((m) => m.identity === modal.identity);
      if (index !== -1) {
        modals.splice(index);
      }
      modals.push(modal);
      setModals([...modals]);
    });
  }, []);
  useEffect(() => {
    return $modal.on(EVENT_CREATE_AND_SHOW_MODAL, (modal: IModal) => {
      $modal.emit(EVENT_CREATE_MODAL, modal);
      $modal.emit(EVENT_SHOW_MODAL, modal.identity);
    });
  }, []);
  return (
    <>
      {modals.map(({ identity, content, title, ...modal }) => {
        return (
          <Modal
            key={identity}
            {...modal}
            visible={visibles[identity]}
            onClose={() => {
              setVisibles({ ...visibles, [identity]: false });
            }}
            title={Runtime.theApp.$locale.get(title ?? "")}
          >
            {content && content()}
          </Modal>
        );
      })}
    </>
  );
};
export default ModalContainer;
