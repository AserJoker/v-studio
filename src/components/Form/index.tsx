import React from "react";
import "./index.less";
interface IFormContext {
  state: Record<string, unknown>;
  onChange: (val: Record<string, unknown>) => void;
  col: number;
}
const FormContext = React.createContext<IFormContext>({
  state: {},
  onChange() {},
  col: 12,
});
interface IFromItemProps {
  name: string;
  label: string;
  children?: JSX.Element | string | null;
  span?: number;
}
interface IFormItemContext {
  state: unknown;
  onChange: (val: unknown) => void;
}
const FormItemContext = React.createContext<IFormItemContext>({
  state: "",
  onChange: () => {},
});
export const FormItem: React.FC<IFromItemProps> = ({
  name,
  label,
  children,
  span,
}) => {
  const ctx = React.useContext(FormContext);
  return (
    <FormItemContext.Provider
      value={{
        state: ctx.state[name],
        onChange(val) {
          ctx.onChange({ ...ctx.state, [name]: val });
        },
      }}
    >
      <div
        className="form-item"
        style={{ width: `${((span ?? ctx.col) / ctx.col) * 100}%` }}
      >
        <div className="form-item-label">{label}</div>
        <div className="form-item-content">{children}</div>
      </div>
    </FormItemContext.Provider>
  );
};
interface IFormProps {
  value?: Record<string, unknown>;
  onChange?: (val: Record<string, unknown>) => void;
  children?: JSX.Element | string | null | JSX.Element[];
  col?: number;
}
const Form: React.FC<IFormProps> = ({
  value = {},
  onChange,
  children,
  col,
}) => {
  const [current, setCurrent] = React.useState(value);
  React.useEffect(() => {
    setCurrent(value);
  }, [value]);
  return (
    <FormContext.Provider
      value={{
        state: current,
        onChange: (val) => {
          if (onChange) {
            onChange(val);
          } else {
            setCurrent(val);
          }
        },
        col: col ?? 12,
      }}
    >
      <div className="form">{children}</div>
    </FormContext.Provider>
  );
};
export const withFormItem = function <T extends {}>(Comp: React.FC<T>) {
  return (props: T) => {
    const ctx = React.useContext(FormItemContext);
    return (
      <Comp
        {...props}
        value={ctx.state}
        onChange={(val: unknown) => {
          ctx.onChange(val);
        }}
      />
    );
  };
};
export default Form;
