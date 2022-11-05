import supabase from "../supabase";
import { Room } from "../models";

export const RoomService = {
  readAll: async () => {
    const { data: rooms, error }: any = await supabase.from("rooms").select(`*`);
    if (error) throw error;
    return rooms;
  },

  create: async ({ buildingId, name, x, y, level, aliases }: Room) => {
    const { data: rooms, error }: any = await supabase
      .from("buildings")
      .insert([{ buildingId, name, x, y, level, aliases }]);

    if (error) throw error;
    return rooms;
  },
};
