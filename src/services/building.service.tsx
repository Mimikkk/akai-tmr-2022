import { Building } from "../models";
import supabase from "../supabase";
import { compact } from "lodash-es";

type BuildingProps = Omit<Building, "rooms">;

export const BuildingService = {
  search: async (query: string): Promise<Building[]> =>
    ((await supabase.rpc("search", { searchText: query })) as any).data.map(({ building }: any) => ({
      ...building,
      rooms: compact(building?.rooms ?? []).sort((a: any, b: any) => b.score - a.score),
    })),
  create: async (building: BuildingProps) => {
    const { data: buildings, error }: any = await supabase.from("buildings").insert([building]);

    if (error) throw error;
    return buildings;
  },

  read: async (id: string) => {
    const { data, error } = await supabase.from("buildings").select("*").eq("id", id).single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error("Building not found");
    }

    return data;
  },
};
