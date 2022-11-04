import s from "./SearchField.module.scss";
import { ChangeEvent, FC, PropsWithChildren, useCallback, useId } from "react";
import cx from "classnames";

interface SearchFieldProps extends PropsWithChildren {
  onChange?: (query: string, event: ChangeEvent<HTMLInputElement>) => void;
}

const Magnifier = (props: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    className={cx("w-6 h-6", props?.className)}
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

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
      <Magnifier className={s.icon} />
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
