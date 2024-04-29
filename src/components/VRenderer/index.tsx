import { IComponent, ISchemaNode } from '@/engine';

const VRenderer: React.FC<{ $component: IComponent<any, {}>, $schema: ISchemaNode }> = ({ $component, $schema }) => {
    return <>{$component.render($schema)}</>;
}
export default VRenderer