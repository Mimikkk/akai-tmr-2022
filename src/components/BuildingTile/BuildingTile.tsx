import { Building } from "../../models";
import { RoomCard, RoomsList } from "./RoomsList";
import { AddNewRoomCard } from "./AddNewRoomCard";
import s from "./BuildingTile.module.scss";
import cx from "classnames";

interface BuildingProps {
  building: Building;
}

export const BuildingTile = ({ building }: BuildingProps) => (
  <div className={cx(s.tile, "bg-gray-300 dark:bg-gray-700")}>
    <RoomsList className="flex flex-col gap-3">
      <span className={cx(s.title, "text-slate-800 dark:text-slate-200")}>{building.displayName}</span>
      {building.rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
      <AddNewRoomCard name={building.displayName} id={building.id} />
    </RoomsList>
  </div>
);
