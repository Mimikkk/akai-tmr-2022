import cx from "classnames";
import s from "./RoomCard.module.scss";
import { Icon } from "../../../Icon";
import Link from "next/link";
import { Urls } from "../../../../urls";
import { Building, Room } from "../../../../models";

export interface RoomProps {
  building: Building;
  room: Room;
  className?: string;
}

export const RoomCard = ({ room, building, className }: RoomProps) => (
  <li className={cx(s.content, className)}>
    <div className={s.vote}>
      <Icon name={"Plus"} className={s.upvote} />
      {room.score}
      <Icon name={"Minus"} className={s.downvote} />
    </div>
    <div>
      <h2 className={cx(s.title)}>{room.name}</h2>
      <span>W budynku: {building.displayName}</span>
      <ul className={s.rooms}>
        <span className={s.room}>
          Też znana jako
          <Icon name="QuestionCircle" />:
        </span>
        {room.aliases.map((name) => (
          <li key={name} className={s.chip}>
            {name}
          </li>
        ))}
      </ul>
    </div>
    <Icon name="ArrowRight" href={`${Urls.Room}/${room.id}`} />
  </li>
);
