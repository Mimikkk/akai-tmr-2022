import { ChangeEvent, FC, PropsWithChildren, useCallback, useId } from "react";
import s from "../Input/Input.module.scss";
import { Icon } from "../Icon";
import { IconName } from "../Icon/IconRegistry";

interface SearchFieldProps extends PropsWithChildren {
  onChange?: (query: string, event: ChangeEvent<HTMLInputElement>) => void;
  icon: IconName;
}

export const Input: FC<SearchFieldProps> = (props) => {
  const id = useId();
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      return props.onChange?.(event.target.value, event);
    },
    [props?.onChange],
  );

  return (
    <div className={s.container}>
      <Icon name={props.icon} className={s.icon} />
      <input
        id={id}
        className={s.input}
        type="text"
        onChange={props?.onChange ? handleChange : undefined}
        placeholder=" "
      />
      <label htmlFor={id} id={`${id}-label`} className={s.label}>
        {props?.children}
      </label>
    </div>
  );
};
