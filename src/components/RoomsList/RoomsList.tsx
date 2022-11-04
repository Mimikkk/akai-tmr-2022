import { FC, ReactNode } from "react";
import cx from "classnames";
import s from "./Rooms.module.scss";

interface Props {
  children: ReactNode;
  className?: string;
}

export const RoomsList: FC<Props> = ({ className, children }) => {
  return <ul className={cx(s.list, className)}>{children}</ul>;
};
