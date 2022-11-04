import supabase from "../supabase";

export const RoomService = {
  readAll: async () => {
    const { data: rooms, error }: any = await supabase.from("rooms").select(`*`);
    if (error) throw error;

    return rooms;
  },
};
