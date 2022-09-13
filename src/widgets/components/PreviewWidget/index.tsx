import { HTMLAttributes, useContext, useEffect, useRef } from "react";
import { EditorContext } from "../../context";
import { IWidget } from "../../types";
import "./index.less";
interface IPreviewWidgetProps extends HTMLAttributes<HTMLDivElement> {
  widget: IWidget;
  path: string[];
}
const PreviewWidget: React.FC<IPreviewWidgetProps> = (props) => {
  const { path, widget, children } = props;
  const ctx = useContext(EditorContext);
  const mask = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const name = `${widget.identity}`;
    const dom = mask.current;
    if (ctx && dom) {
      const rc = dom.getBoundingClientRect();
      ctx.updateElement(name, {
        x: rc.x,
        y: rc.y,
        width: rc.width,
        height: rc.height,
        zIndex: path.length,
        onSelect() {
          console.log(widget);
        }
      });
    }
  }, []);
  if (widget.definition.name === "Placeholder") {
    return <>{children}</>;
  }
  return (
    <div className="preview-widget-wrapper">
      {children}
      <div className="mask" ref={mask} />
    </div>
  );
};
export default PreviewWidget;
