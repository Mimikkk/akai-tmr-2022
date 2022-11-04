import cx from "classnames";
import s from "./Room.module.scss";

export interface RoomProps {
  title: string;
  building: string;
  roomNames: string[];
  className?: string;
}

export const Room = ({ title, roomNames, building, className }: RoomProps) => (
  <li className={cx(s.content, className)}>
    <h2 className={cx(s.title)}>{title}</h2>
    <span>Building: {building}</span>
    <ul>
      {roomNames.map((name) => (
        <li>{name}</li>
      ))}
    </ul>
  </li>
);
