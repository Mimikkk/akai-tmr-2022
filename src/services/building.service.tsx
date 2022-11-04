import supabase from "../supabase";
import { Building, Room } from "../models";
import { map } from "lodash-es";

const toBuilding = ({
  id,
  defaultName,
  buildingNames,
  buildingShortNames,
  latitude,
  longitude,
  rooms,
  roomNames,
}: any): Building => ({
  id,
  rooms,
  defaultName,
  names: map(buildingNames, "name"),
  shortNames: map(buildingShortNames, "name"),
  geolocation: {
    latitude: latitude,
    longitude: longitude,
  },
});

export const sortFn = <T, P>(query: string, options: Building[]): Building[] => {
  const startsWith = [];
  const included = [];

  for (const option of options) {
    const a = option.names[0].toLowerCase();
    const b = query.toLowerCase();
    if (a.startsWith(b)) {
      startsWith.push(option);
    } else if (a.includes(b)) {
      included.push(option);
    }
  }

  return startsWith.concat(included);
};

export const BuildingService = {
  readAll: async () => {
    const { data, error }: any = await supabase
      .from("buildings")
      .select(`*, buildingNames(name), buildingShortNames(name), rooms(id, x, y, level)`);
    if (error) throw error;
    return data.map(toBuilding);
  },

  search: async (query: string) => {
    const { data }: any = await supabase
      .from("buildings")
      .select(`*, buildingNames(name), buildingShortNames(name), rooms(id, x, y, level)`)
      .ilike("name", `%${query}%`);

    console.log("hihi");
    return sortFn(query, data.map(toBuilding));
  },
};
