import { RoomsList, SearchField } from "../components";
import { useCallback, useState } from "react";
import { throttle } from "lodash-es";
import mockData from "../mock-data";
import { Building, Room } from "../models";
import { BuildingService } from "../services";

const App = () => {
  const [isSearching, toggleSearching] = useState(false);
  const [building, setBuilding] = useState<Building[]>([]);

  const handleSearch = useCallback(
    throttle(async (query: string) => {
      try {
        if (isSearching) return;
        if (query.length < 2) {
          setBuilding([]);
          return;
        }
        toggleSearching(true);
        setBuilding(await BuildingService.search(query));
      } finally {
        toggleSearching(false);
      }
    }, 300),
    [],
  );

  return (
    <div className={"h-full w-full bg-gray grid grid-cols-1 md:grid-cols-2 rounded"}>
      <div className="bg-gray-800 p-4">
        <SearchField onChange={handleSearch}>Wyszukaj salę</SearchField>
        <div>
          {building.map((building) => (
            <BuildingTile building={building} key={building.id} />
          ))}
        </div>
      </div>
      <div className="bg-gray-700"></div>
    </div>
  );
};

interface BuildingProps {
  building: Building;
}

interface RoomProps {
  room: Room;
}

const RoomCard = ({ room }: RoomProps) => {
  return <div className="bg-gray-800 p-4"></div>;
};

const BuildingTile = ({ building }: BuildingProps) => (
  <div>
    <span>{building.displayName}</span>
    <div>
      {building.rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  </div>
);

export default App;
