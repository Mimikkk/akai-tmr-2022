import { RoomsList, SearchField } from "../components";
import { useCallback, useState } from "react";
import { throttle } from "lodash-es";
import { Room } from "../components/RoomsList/components/Room";
import mockData from "../mock-data";
import axios from "axios";
import { Building } from "../models";
import { BuildingService } from "../services/building.service";

const mapData = <T,>(x: { data: T }): T => x.data;
const SearchService = {
  search: (query: string): Promise<Building[]> =>
    axios.get(`/api/buildings/search`, { params: { query } }).then(mapData),
};

const App = () => {
  const [isSearching, toggleSearching] = useState(false);
  const [rooms, setRooms] = useState<Building[]>([]);

  const handleSearch = useCallback(
    throttle(async (query: string) => {
      try {
        if (query.length < 2 || isSearching) return;
        toggleSearching(true);
        setRooms(await SearchService.search(query));
      } finally {
        toggleSearching(false);
      }
    }, 300),
    [],
  );

  BuildingService.getAll();

  return (
    <div
      className={
        "h-full w-full bg-gray grid grid-cols-1 md:grid-cols-2 rounded"
      }
    >
      <div className="bg-gray-800 p-4">
        <SearchField onChange={handleSearch}>Wyszukaj mnie ;3</SearchField>
        <div>
          <RoomsList>
            {rooms.map((building, index) => {
              return (
                <Room
                  key={index}
                  title={building.names[0]}
                  roomNames={building.names.slice(1)}
                  building={mockData.buildings
                  .find((building) => building.id === building.id)!
                  .names.join(", ")}
                />
              );
            })}
          </RoomsList>
        </div>
      </div>
      <div className="bg-gray-700"></div>
    </div>
  );
};

export default App;
