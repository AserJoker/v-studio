import { Component, IComponent, IRenderer, ISchemaNode, useField } from "@/engine";
import React, { useEffect } from "react";
import './index.less'
const getSchema = (name: string, renderer: IRenderer) => {
    const schema: ISchemaNode = { renderer: name };
    const slots: Record<string, ISchemaNode[]> = {};
    renderer.slots.forEach(slot => {
        slots[slot] = [{
            renderer: "slot",
            state: {
                name: slot
            }
        }]
    })
    schema.slots = slots;
    return schema;
}
const $previews: Record<string, IComponent> = {};
Component.renderer("slot", {
    props: {},
    emits: [],
    slots: [],
    render($component) {
        const name = useField($component, "name") as string;
        return <div key={$component.key}>{`[[${name}]]`}</div>
    }
});
export const ComponentPreview: React.FC<{ name: string }> = ({ name }) => {
    const renderer = Component.getRenderer(name);
    const $preview = $previews[name] ?? new Component(renderer.mock);
    if (!$previews[name]) {
        $previews[name] = $preview;
    }
    useEffect(() => {
        return () => {
            delete $previews[name];
        }
    }, []);
    return <div
        className="preview"
        tabIndex={1}
        onKeyDown={(e) => {
            e.preventDefault();
        }}
        draggable
        onDragStart={e => {
            e.dataTransfer.setData("widget", name);
        }}
    >
        <div className="content">
            {$preview.render(getSchema(name, renderer))}
            <div className="mask" />
        </div>
        <div className="title">{name}</div>
    </div>;
}