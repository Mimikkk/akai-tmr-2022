import { BuildingTile, TextField } from "../components";
import { useState } from "react";
import { Building } from "../models";
import { BuildingService } from "../services";
import s from "./index.module.scss";
import cx from "classnames";
import { useDebounce } from "react-use";
import { useQuery } from "@tanstack/react-query";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { usePartyModeStore } from "../usePartyMode";
import buildingTileStyles from "../components/BuildingTile/BuildingTile.module.scss";

const App = () => {
  const [query, setQuery] = useState("");
  const [formData, setFormData] = useState("");
  const { data: buildings, isLoading } = useQuery<Building[]>(["buildings", query], () =>
    BuildingService.search(query),
  );
  const { height, width } = useWindowSize();

  useDebounce(
    () => {
      setQuery(formData);
    },
    300,
    [formData],
  );

  const { isPartyModeEnabled } = usePartyModeStore();

  return (
    <>
      {buildings?.length && isPartyModeEnabled ? <Confetti width={width} height={height} /> : null}
      <div className={"h-full w-full bg-gray grid grid-cols-1 md:grid-cols-1 max-w-5xl rounded"}>
        <div className={cx(s.items, "bg-gray-100 dark:bg-gray-900 p-4 h-full overflow-hidden flex flex-col gap-2")}>
          <div>
            <TextField onChange={(event) => setFormData(event.target.value)} icon={"Magnifier"}>
              Wyszukaj salę
            </TextField>
          </div>
          <div className={cx(s.items, "flex flex-col gap-2")}>
            {isLoading ? null : !buildings || buildings?.length === 0 ? (
              <div className={buildingTileStyles.tile}>Nie znaleźliśmy takiej sali lub budynku.</div>
            ) : (
              <>
                {buildings.map((building) => (
                  <BuildingTile building={building} key={building.id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
