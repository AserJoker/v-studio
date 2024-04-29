import { classname } from '@/util';
import React from 'react';
import "./index.less";
interface IHorizonalProps extends React.HTMLAttributes<HTMLDivElement> {
    reverse?: boolean;
    layout?: "between" | "start" | "end";
    fill?: boolean;
}
const Horizontal: React.FC<IHorizonalProps> = ({ children, className, reverse, layout, fill, ...args }) => {
    return <div {...args} className={classname('horizontal', className ?? '', {
        reverse: reverse === true,
        start: layout === "start",
        between: layout === "between",
        end: layout === "end",
        fill: fill === true,
    })}>{children}</div>
}
export default Horizontal;
