import { Building, buildings } from "./buildings";
import { rooms, Room } from "./rooms";
import { Campus, campuses } from "./campuses";

interface MockData {
  campuses: Campus[];
  buildings: Building[];
  rooms: Room[];
}

export const mockData: MockData = {
  campuses,
  buildings,
  rooms,
};

export default mockData;
