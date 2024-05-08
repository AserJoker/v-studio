import { Component } from "../runtime";
import { IPropType, Render } from "../types";

interface IRenderer {
  render: Render;
}
const Renderer = (
  options: Partial<{
    name: string;
    props: IPropType;
    slots: string[];
    emits: string[];
    mock: Record<string, unknown>;
  }>,
) => {
  return <C extends { new (): IRenderer }>(
    target: C,
    _desc: ClassDecoratorContext<C>,
  ) => {
    const item = new target();
    Component.renderer(options.name ?? target.name, {
      render: ($comp, $schema) => item.render($comp, $schema),
      props: options.props ?? {},
      slots: options.slots ?? [],
      emits: options.emits ?? [],
      mock: options.mock,
    });
  };
};
export { Renderer };
