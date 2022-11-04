import cx from "classnames";
import s from "./Room.module.scss";
import { Icon } from "../../Icon";
import Link from "next/link";

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
      <ul className={s.rooms}>
        <span className={s.room}>
          Also known as
          <Icon name="QuestionCircle" />:
        </span>
        {roomNames.map((name) => (
          <li key={name} className={s.chip}>
            {name}
          </li>
        ))}
      </ul>
    </div>
    <Link href={`room/${title}`}>
      <Icon
        name="ArrowRight"
        onClick={() => {
          console.log("Clicked");
        }}
      />
    </Link>
  </li>
);
