import "../../styles/globals.css";
import { RoomsList, SearchField } from "../components";
import { useCallback, useState } from "react";
import { throttle } from "lodash-es";
import { Room } from "../components/RoomsList/components/Room";
import mockData from "../mock-data";

const SearchService = {
  search: async (query: string) => {
    return [];
  },
};
const App = () => {
  const [isSearching, toggleSearching] = useState(false);
  const [rooms, setRooms] = useState([]);

  const handleSearch = useCallback(
    throttle(async (query: string) => {
      try {
        if (query.length < 2 || isSearching) return;
        toggleSearching(true);

        setRooms(await SearchService.search(query));
      } catch (e: any) {
        toggleSearching(false);
      }
    }, 300),
    [],
  );

  return (
    <div className="bg-gray-900 w-screen h-screen">
      <div className={"h-full w-full p-4 bg-gray grid grid-cols-1 md:grid-cols-2 rounded"}>
        <div className="bg-gray-800 p-4">
          <SearchField onChange={handleSearch}>Wyszukaj mnie ;3</SearchField>
          <div>
            <RoomsList>
              {mockData.rooms.map((room, index) => (
                <Room
                  key={index}
                  title={room.names[0]}
                  roomNames={room.names.slice(1)}
                  building={mockData.buildings
                    .filter((building) => room.buildingId === building.id)[0]
                    .names.join(", ")}
                />
              ))}
            </RoomsList>
          </div>
        </div>
        <div className="bg-gray-700"></div>
      </div>
    </div>
  );
};

export default App;
