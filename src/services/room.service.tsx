import supabase from "../supabase";
import { Room } from "../models";

type RoomProps = Omit<Room, "score">;

export const RoomService = {
  readAll: async (): Promise<Room[]> => {
    const { data: rooms, error }: any = await supabase.from("rooms").select(`*`);
    if (error) throw error;
    return rooms;
  },

  create: async (room: RoomProps) => {
    const { data: rooms, error }: any = await supabase.from("rooms").insert([room]);

    if (error) throw error;
    return rooms;
  },

  get: async (id: string) => {
    const { data, error } = await supabase
      .from("rooms")
      .select("*, buildings(name, displayName, latitude, longitude)")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error("Room not found");
    }

    return data;
  },
};
