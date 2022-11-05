import type { NextApiRequest, NextApiResponse } from "next";
import { compact, times } from "lodash-es";
import { Building } from "../../models";
import supabase from "../../backend/supabase";

const containsName = (query: string, names: string[]) =>
  compact(names).find((name) => name.toLowerCase().includes(query.toLowerCase()));

const sortFn = <T, P>(query: string, options: Building[]): Building[] => {
  const startsWith = [];
  const included = [];
  const rest = [];
  for (const option of options) {
    const a = option.displayName.toLowerCase();
    const b = query.toLowerCase();
    if (a.startsWith(b)) {
      startsWith.push(option);
    } else if (a.includes(b)) {
      included.push(option);
    } else {
      rest.push(option);
    }
  }

  return startsWith.concat(included).concat(rest);
};

export default async (request: NextApiRequest, response: NextApiResponse<Building[]>) => {
  let { query = "" } = request.query as any;

  const { data: buildings = [] }: any = await supabase.from("buildings").select();
  const { data: rooms = [] }: any = await supabase.from("rooms").select();

  buildings.forEach((building: any) => (building.aliases ??= []));
  buildings.forEach((room: any) => (room.rooms ??= []));
  rooms.forEach((room: any) => (room.aliases ??= []));

  const filteredBuildings = buildings?.filter((building: any) =>
    containsName(query, [building.name, building.displayName, ...(building?.aliases ?? [])]),
  );
  const filteredRooms = rooms?.filter((room: any) =>
    containsName(query, compact([room.name, ...(room?.aliases ?? [])])),
  );

  const results = filteredBuildings;
  for (const room of filteredRooms) {
    const building = results.find((building: any) => building.id === room.buildingId);

    if (building) {
      building.rooms.push(room);
    } else {
      const building = buildings.find((building: any) => building.id === room.buildingId);
      results.push({ ...building, rooms: [room] });
    }
  }

  response.status(200).json(sortFn(query, results));
};
