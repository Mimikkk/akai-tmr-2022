import supabase from "../supabase";
import { Room } from "../models";

interface Props {
  aliases: string[];
  level: string;
  room: string;
  buildingId: string;
  x: number;
  y: number;
}

export const RoomService = {
  readAll: async (): Promise<Room[]> => {
    const { data: rooms, error }: any = await supabase.from("rooms").select(`*`);
    if (error) throw error;
    return rooms;
  },

  create: async ({ aliases, level, room: name, buildingId, x, y }: Props) => {
    const { data, error }: any = await supabase.from("rooms").insert([{ aliases, level, name, buildingId, x, y }]);

    if (error) throw error;
    return data;
  },

  updateScore: async (score: number, id: string) => {
    const { data, error } = await supabase.from("rooms").update({ score }).eq("id", id);

    if (error) throw error;
    return data;
  },

  read: async (id: string) => {
    const { data, error } = await supabase.from("rooms").select("*, buildings(*)").eq("id", id).single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error("Room not found");
    }

    return data;
  },
};

