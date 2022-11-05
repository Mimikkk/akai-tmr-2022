import { AddNewRoomCard, BuildingTile, Icon, TextField } from "../components";
import { useCallback, useState } from "react";
import { throttle } from "lodash-es";
import { Building } from "../models";
import { BuildingService } from "../services";
import Link from "next/link";
import s from "./index.module.scss";
import cx from "classnames";

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
      <div className={cx(s.items, "bg-gray-800 p-4 h-full overflow-hidden flex flex-col gap-2")}>
        <div>
          <TextField onChange={(event) => handleSearch(event.target.value)} icon={"Magnifier"}>
            Wyszukaj salę
          </TextField>
        </div>
        <div className={cx(s.items, "flex flex-col gap-2")}>
          {building.map((building) => (
            <BuildingTile building={building} key={building.id} />
          ))}
          {!building.length && <AddNewRoomCard />}
        </div>
      </div>
      <div className="bg-gray-700"></div>
    </div>
  );
};

export default App;
