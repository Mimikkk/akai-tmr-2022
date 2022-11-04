import s from "./SearchField.module.scss";
import { ChangeEvent, FC, PropsWithChildren, useCallback, useId } from "react";

interface SearchFieldProps extends PropsWithChildren {
  onChange?: (query: string, event: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchField: FC<SearchFieldProps> = (props) => {
  const id = useId();
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      return props.onChange?.(event.target.value, event);
    },
    [props?.onChange],
  );

  return (
    <div className={s.container}>
      <input
        id={id}
        className={s.input}
        type="text"
        onChange={props?.onChange ? handleChange : undefined}
        placeholder=" "
      />
      <label htmlFor={id} id={`${id}-label`} className={s.label}>
        123123
      </label>
    </div>
  );
};
