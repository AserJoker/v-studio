import "./index.less";
import { $modal, EVENT_HIDE_MODAL } from "../ModalContainer";
import Input from "../Input";
import { createAndShowFormModal } from "../FormModal";
import { Runtime } from "@/runtime";
import Form, { FormItem, withFormItem } from "../Form";
const InputEx = withFormItem(Input);
export const createAndShowNewProjectModal = () => {
  return createAndShowFormModal({
    identity: "new-project",
    title: "modal.new_project.name",
    content(state, setState) {
      return (
        <div style={{ width: "30rem" }}>
          <Form onChange={setState} value={state}>
            <FormItem name="projectName" label="name :">
              <InputEx />
            </FormItem>
          </Form>
        </div>
      );
    },
    onOk(state) {
      const { projectName } = state;
      Runtime.theApp.$project.setProject({
        name: (projectName as string) ?? "",
        resource: { name: "res://", type: "set", children: [] },
      });
      $modal.emit(EVENT_HIDE_MODAL, "new-project");
    },
  });
};
