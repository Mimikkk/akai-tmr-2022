import supabase from "../supabase";

export const BuildingService = {
  getAll: async () => {
    const data = await supabase.from("buildings").select("*");

    console.log(data);
  },
};
