import { IComponent, ISchemaNode, Renderer } from "../../engine";

@Renderer({ name: "box", slots: ["default"] })
export class Box {
    public render($component: IComponent, $schema: ISchemaNode) {
        return <div key={$component.key}>{$component.render($schema, "default")}</div>
    }
};