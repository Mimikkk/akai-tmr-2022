import { ChangeEvent, FC, InputHTMLAttributes, PropsWithChildren, useCallback, useId } from "react";
import s from "./TextField.module.scss";
import { Icon } from "../Icon";
import { IconName } from "../Icon/IconRegistry";
import cx from "classnames";

interface SearchFieldProps extends PropsWithChildren, Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange?: (query: string, event: ChangeEvent<HTMLInputElement>) => void;
  icon?: IconName;
  className?: string;
}

export const TextField: FC<SearchFieldProps> = ({ onChange, icon, className, ...props }) => {
  const id = useId();
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => onChange?.(event.target.value, event),
    [onChange],
  );

  return (
    <div className={cx(s.container, className)}>
      {icon && (
        <div className={s.iconContainer}>
          <Icon name={icon} className={s.icon} />
        </div>
      )}
      <input
        id={id}
        className={s.input}
        {...props}
        type="text"
        onChange={onChange ? handleChange : undefined}
        placeholder=" "
      />
      <label htmlFor={id} id={`${id}-label`} className={s.label}>
        {props?.children}
      </label>
    </div>
  );
};
