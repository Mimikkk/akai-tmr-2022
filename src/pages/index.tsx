import { BuildingTile, Icon, SearchField } from "../components";
import { useCallback, useState } from "react";
import { throttle } from "lodash-es";
import { Building } from "../models";
import { BuildingService } from "../services";
import Link from "next/link";

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
      <div className="bg-gray-800 p-4 flex flex-col gap-2">
        <div>
          <SearchField onChange={handleSearch}>Wyszukaj salę</SearchField>
        </div>
        <div>
          {building.map((building) => (
            <BuildingTile building={building} key={building.id} />
          ))}
          {!building.length ? (
            <Link href={"room/add"}>
              <div className="w-full h-full justify-center items-center transition-all text-lg flex bg-slate-500 hover:bg-slate-400 cursor-pointer p-4 rounded">
                <label htmlFor={"add-new"} className={"cursor-pointer"}>
                  Dodaj nową sale
                </label>
                <Icon name={"ArrowRight"} id={"add-new"} />
              </div>
            </Link>
          ) : null}
        </div>
      </div>
      <div className="bg-gray-700"></div>
    </div>
  );
};

export default App;
