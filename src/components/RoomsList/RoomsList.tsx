import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export const RoomsList: FC<Props> = ({ className, children }) => {
  return <ul className={className}>{children}</ul>;
};
