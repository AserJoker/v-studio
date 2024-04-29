import { IComponent, ISchemaNode, Renderer } from "../../engine";
@Renderer({ name: "button", slots: ["default"] })
export class Button {
    public render($component: IComponent, $schema: ISchemaNode) {
        return <button className="button" key={$component.key} onClick={() => $component.emit("click")}>{$component.render($schema, "default")}</button>
    }
}