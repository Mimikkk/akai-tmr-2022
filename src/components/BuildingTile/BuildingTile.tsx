import { Building } from "../../models";
import { RoomCard, RoomsList } from "./RoomsList";
import { AddNewRoomCard } from "./AddNewRoomCard";
import s from "./BuildingTile.module.scss";

interface BuildingProps {
  building: Building;
}

export const BuildingTile = ({ building }: BuildingProps) => (
  <div className={s.tile}>
    <span className={s.title}>Budynek: {building.displayName}</span>
    <RoomsList>
      {building.rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
      <AddNewRoomCard />
    </RoomsList>
  </div>
);
