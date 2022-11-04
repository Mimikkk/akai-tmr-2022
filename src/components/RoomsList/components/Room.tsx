import cx from "classnames";
import s from "./Room.module.scss";
import { Icon } from "../../Icon";

export interface RoomProps {
  title: string;
  building: string;
  roomNames: string[];
  className?: string;
}

export const Room = ({ title, roomNames, building, className }: RoomProps) => (
  <li className={cx(s.content, className)}>
    <div>
      <h2 className={cx(s.title)}>{title}</h2>
      <span>Building: {building}</span>
      <ul className={"flex list-none flex-wrap"}>
        <span className={"flex justify-center items-center gap-2"}>
          Also known as
          <Icon name="QuestionCircle" className={"w-6 h-6"} />:
        </span>
        {roomNames.map((name) => (
          <li key={name} className={"m-1 px-2 rounded-xl bg-gray-300 font-medium"}>
            {name}
          </li>
        ))}
      </ul>
    </div>
    <div className={"flex items-center"}>
      <Icon name="ArrowRight" className={s.arrow} />
    </div>
  </li>
);
