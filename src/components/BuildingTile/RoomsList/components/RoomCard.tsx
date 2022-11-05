import cx from "classnames";
import s from "./RoomCard.module.scss";
import { Icon } from "../../../Icon";
import { Urls } from "../../../../urls";
import { Room } from "../../../../models";
import { RoomService } from "../../../../services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export interface RoomProps {
  room: Room;
  className?: string;
}

export const RoomCard = ({ room, className }: RoomProps) => {
  const queryClient = useQueryClient();

  const addPoint = useMutation({
    mutationFn: () => RoomService.updateScore(room.score + 1, room.id!),
    onSuccess: () => queryClient.invalidateQueries(),
  });

  const removePoint = useMutation({
    mutationFn: () => RoomService.updateScore(room.score - 1, room.id!),
    onSuccess: () => queryClient.invalidateQueries(),
  });

  return (
    <li className={cx(s.content, className)}>
      <div className={s.vote}>
        <Icon name={"ThumbsUp"} className={s.upvote} onClick={() => addPoint.mutate()} />
        {room.score}
        <Icon name={"ThumbsDown"} className={s.downvote} onClick={() => removePoint.mutate()} />
      </div>

      <Link href={`${Urls.Room}/${room.id}`} className="flex grow mx-2">
        <div className="grow mx-2">
          <h2 className={cx(s.title)}>{room.name}</h2>
          <div>
            <span className={s.room}>Piętro: {room.level}</span>
          </div>
          <div className={s.rooms}>
            <span className={s.room} title="Alternatywne nazwy dla sali">
              Inne nazwy:
            </span>
            <ul className="flex">
              {room.aliases.map((name) => (
                <li key={name} className={s.chip}>
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Icon name="ArrowRight" />
      </Link>
    </li>
  );
};
