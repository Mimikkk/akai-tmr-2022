import "../../styles/globals.css";
import { SearchField } from "../components";
import { useCallback, useEffect, useState } from "react";
import { throttle } from "lodash-es";

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
    <div className="bg-gray-500 w-screen h-screen">
      <SearchField onChange={handleSearch}>Wyszukaj mnie :3 uwu</SearchField>
    </div>
  );
};

export default App;
