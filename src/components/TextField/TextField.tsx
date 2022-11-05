import { ChangeEvent, FC, forwardRef, InputHTMLAttributes, PropsWithChildren, useCallback, useId } from "react";
import s from "./TextField.module.scss";
import { Icon } from "../Icon";
import { IconName } from "../Icon/IconRegistry";
import cx from "classnames";

interface TextFieldProps extends PropsWithChildren, InputHTMLAttributes<HTMLInputElement> {
  icon?: IconName;
  className?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ icon, className, children, ...props }, ref) => {
    let id = useId();
    id = props?.name ?? id;

    return (
      <div className={cx(s.container, className)}>
        {icon && (
          <div className={s.iconContainer}>
            <Icon name={icon} className={s.icon} />
          </div>
        )}
        <input ref={ref} id={id} className={s.input} type="text" placeholder=" " {...props} />
        <label htmlFor={id} id={`${id}-label`} className={s.label}>
          {children}
        </label>
      </div>
    );
  },
);
