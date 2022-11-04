import "../../styles/globals.css";
import { SearchField } from "../components";
import { useCallback, useEffect, useState } from "react";
import { throttle } from "lodash-es";

const App = () => {
  const [query, setQuery] = useState("");
  const [isSearching, toggleSearching] = useState(false);

  const handleSearch = useCallback(
    throttle((query: string) => {
      try {
        if (query.length < 2 || isSearching) return;
        toggleSearching(true);

        console.log("searching for", query);
        setQuery(query);
      } catch (e: any) {
        toggleSearching(false);
      }
    }, 300),
    [],
  );

  useEffect(() => {
    console.log({ query });
  }, [query]);
  return (
    <div className="bg-gray-500 w-screen h-screen">
      <SearchField onChange={handleSearch}>Wyszukaj mnie :3 uwu</SearchField>
    </div>
  );
};

export default App;
