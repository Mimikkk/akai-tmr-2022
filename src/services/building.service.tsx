import supabase from "../supabase";

const toBuilding = ({ id, name, lat, lon }: any) => ({
  id: id,
  names: [name],
  geolocation: {
    latitude: lat,
    longitude: lon,
  },
});

export const BuildingService = {
  readAll: async () => {
    const { data, error } = await supabase.from("buildings").select();
    if (error) throw error;
    return data.map(toBuilding);
  },
  search: async (query: string) => {
    const { data }: any = await supabase
      .from("buildings")
      .select("*")
      .like("name", `%${query}%`);

    return data.map(toBuilding);
  },
};
