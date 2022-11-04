import "../../styles/globals.css";
import { RoomsList, SearchField } from "../components";
import { useCallback, useEffect, useState } from "react";
import { throttle } from "lodash-es";
import { mockedRooms } from "../components/RoomsList/mockedRooms";
import { Room } from "../components/RoomsList/components/Room";

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
    <div className="bg-gray-700 w-screen h-screen">
      <div className={"h-full w-full p-4 bg-gray grid grid-cols-1 md:grid-cols-2"}>
        <div className="bg-gray-500 p-4">
          <SearchField onChange={handleSearch}>Wyszukaj mnie :3 uwu</SearchField>
          <div>
            <RoomsList>
              {mockedRooms.map((room, index) => (
                <Room key={index} title={room.title} roomNames={room.roomNames} building={room.building} />
              ))}
            </RoomsList>
          </div>
        </div>
        <div className="bg-gray-300"></div>
      </div>
    </div>
  );
};

export default App;
