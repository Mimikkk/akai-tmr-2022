import { Building } from "../../models";
import { RoomCard, RoomsList } from "./RoomsList";
import { AddNewRoomCard } from "./AddNewRoomCard";

interface BuildingProps {
  building: Building;
}

export const BuildingTile = ({ building }: BuildingProps) => (
  <div>
    <span>{building.displayName}</span>
    <RoomsList>
      {building.rooms.map((room) => (
        <RoomCard key={room.id} room={room} building={building} />
      ))}
      {building.rooms.length && <AddNewRoomCard />}
    </RoomsList>
  </div>
);
