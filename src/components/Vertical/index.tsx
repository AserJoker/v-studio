import { classname } from '@/util';
import React from 'react';
import "./index.less";
interface IVerticalProps extends React.HTMLAttributes<HTMLDivElement> {
    reverse?: boolean;
    layout?: "between" | "start" | "end";
}
const Vertical: React.FC<IVerticalProps> = ({ children, className, reverse, layout, ...args }) => {
    return <div {...args} className={classname('vertical', className ?? '', {
        reverse: reverse === true,
        start: layout === "start",
        between: layout === "between",
        end: layout === "end"
    })}>{children}</div>
}
export default Vertical;
