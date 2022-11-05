import supabase from "../supabase";
import { Room } from "../models";

export const RoomService = {
  readAll: async (): Promise<Room[]> => {
    const { data: rooms, error }: any = await supabase.from("rooms").select(`*`);
    if (error) throw error;
    return rooms;
  },

  create: async ({ buildingId, name, x, y, level, aliases }: Room) => {
    const { data: rooms, error }: any = await supabase
      .from("rooms")
      .insert([{ buildingId, name, x, y, level, aliases }]);

    if (error) throw error;
    return rooms;
  },

  get: async (id: string) => {
    const { data, error } = await supabase.from("rooms").select("*, buildings (*)").eq("id", id).single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error("Room not found");
    }

    return data;
  },
};

