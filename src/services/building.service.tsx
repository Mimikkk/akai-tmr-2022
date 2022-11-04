import supabase from "../supabase";
import { Building } from "../models";

const toBuilding = ({ id, name, lat, lon }: any) => ({
  id: id,
  names: [name],
  geolocation: {
    latitude: lat,
    longitude: lon,
  },
});
export const sortFn = <T, P>(
  query: string,
  options: Building[],
): Building[] => {
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
    const { data, error }: any = await supabase.from("buildings").select();
    if (error) throw error;
    return data.map(toBuilding);
  },

  search: async (query: string) => {
    const { data }: any = await supabase
      .from("buildings")
      .select("*")
      .ilike("name", `%${query}%`);

    return sortFn(query, data.map(toBuilding));
  },
};
