import { RoomsList, SearchField } from "../components";
import { useCallback, useState } from "react";
import { throttle } from "lodash-es";
import { Room } from "../components/RoomsList/components/Room";
import mockData from "../mock-data";
import { Building } from "../models";
import { BuildingService } from "../services";
import { useRouter } from "next/router";
import { URLS } from "../urls.enum";

const App = () => {
  const [isSearching, toggleSearching] = useState(false);
  const [building, setBuilding] = useState<Building[]>([]);
  const { push } = useRouter();

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
          <RoomsList>
            {building.map((building, index) => {
              return (
                <Room
                  key={index}
                  title={building.defaultName}
                  roomNames={building.rooms.map((room) => room.names.join(","))}
                  building={mockData.buildings.find((building) => building.id === building.id)!.names.join(", ")}
                />
              );
            })}
          </RoomsList>
          <button onClick={() => push(URLS.AddRoom)} className="btn btn-primary">
            Dodaj pokój
          </button>
        </div>
      </div>
      <div className="bg-gray-700"></div>
    </div>
  );
};

export default App;
