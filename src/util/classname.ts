export type ClassItem = string | Record<string, boolean>;
export const classname = (...items: ClassItem[]) => {
    const classes: string[] = [];
    items.forEach(item => {
        if (typeof item === 'string') {
            classes.push(item);
        } else {
            Object.keys(item).forEach(name => {
                if (item[name]) {
                    classes.push(name);
                }
            })
        }
    });
    return classes.filter(cz => cz !== '').join(' ');
}