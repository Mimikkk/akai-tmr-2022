import { RoomsList, SearchField } from "../components";
import { useCallback, useState } from "react";
import { throttle } from "lodash-es";
import { Room } from "../components/RoomsList/components/Room";
import mockData from "../mock-data";
import { Building } from "../models";
import { BuildingService } from "../services/building.service";

const App = () => {
  const [isSearching, toggleSearching] = useState(false);
  const [rooms, setRooms] = useState<Building[]>([]);

  const handleSearch = useCallback(
    throttle(async (query: string) => {
      try {
        if (isSearching) return;
        if (query.length < 2) {
          setRooms([]);
          return;
        }
        toggleSearching(true);
        setRooms(await BuildingService.search(query));
      } finally {
        toggleSearching(false);
      }
    }, 300),
    [],
  );

  return (
    <div
      className={
        "h-full w-full bg-gray grid grid-cols-1 md:grid-cols-2 rounded"
      }
    >
      <div className="bg-gray-800 p-4">
        <SearchField onChange={handleSearch}>Wyszukaj salę</SearchField>
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
