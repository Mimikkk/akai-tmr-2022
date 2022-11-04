import { Building, buildings } from "./buildings";
import { rooms, Rooms } from "./rooms";
import { Campus, campuses } from "./campuses";

interface MockData {
  campuses: Campus[];
  buildings: Building[];
  rooms: Rooms[];
}

export const mockData: MockData = {
  campuses,
  buildings,
  rooms,
};

export default mockData;
