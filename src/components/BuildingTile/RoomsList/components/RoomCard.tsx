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
    <Link href={`${Urls.Room}/${room.id}`}>
      <li className={cx(s.content, className)}>
        <div className={s.vote}>
          <Icon name={"ThumbsUp"} className={s.upvote} onClick={() => addPoint.mutate()} />
          {room.score}
          <Icon name={"ThumbsDown"} className={s.downvote} onClick={() => removePoint.mutate()} />
        </div>
        <div className={"grow mx-2"}>
          <h2 className={cx(s.title)}>{room.name}</h2>
          <ul className={s.rooms}>
            <span className={s.room} title="Alternatywne nazwy dla sali">
              Inne nazwy:
            </span>
            {room.aliases.map((name) => (
              <li key={name} className={s.chip}>
                {name}
              </li>
            ))}
          </ul>
        </div>
        <Icon name="ArrowRight" />
      </li>
    </Link>
  );
};
