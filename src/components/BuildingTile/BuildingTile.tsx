import { Building } from "../../models";
import { RoomCard, RoomsList } from "./RoomsList";

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
    </RoomsList>
  </div>
);
