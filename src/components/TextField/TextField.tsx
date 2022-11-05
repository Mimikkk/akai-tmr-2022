import { ChangeEvent, FC, InputHTMLAttributes, PropsWithChildren, useCallback, useId } from "react";
import s from "./TextField.module.scss";
import { Icon } from "../Icon";
import { IconName } from "../Icon/IconRegistry";
import cx from "classnames";

interface TextFieldProps extends PropsWithChildren, InputHTMLAttributes<HTMLInputElement> {
  icon?: IconName;
  className?: string;
}

export const TextField: FC<TextFieldProps> = ({ onChange, icon, className, children, ...props }) => {
  const id = useId();
  return (
    <div className={cx(s.container, className)}>
      {icon && (
        <div className={s.iconContainer}>
          <Icon name={icon} className={s.icon} />
        </div>
      )}
      <input {...props} id={id} className={s.input} type="text" placeholder=" " />
      <label htmlFor={id} id={`${id}-label`} className={s.label}>
        {children}
      </label>
    </div>
  );
};
