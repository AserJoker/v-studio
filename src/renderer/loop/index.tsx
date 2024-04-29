import { IComponent, ISchemaNode, Renderer, useField } from "../../engine";

@Renderer({ name: "loop", slots: ["default"], mock: { items: ["item1"] } })
export class Loop {
    public render($component: IComponent, $schema: ISchemaNode) {
        const items = useField($component, "items") as unknown[] ?? [];
        const $body = $component.field("items");
        return <div key={$component.key}>{items.map((_, index) => {
            const $comp = $body.field(`${index}`);
            return $comp.render($schema, "default");
        })}</div>;
    }
}