import { IComponent, Renderer, useField } from "../../engine";

@Renderer({ name: "text", mock: { content: "Text" } })
export class Text {
  public render($component: IComponent) {
    const text = useField($component, "content") as string;
    return <div key={$component.key}>{text}</div>;
  }
}
