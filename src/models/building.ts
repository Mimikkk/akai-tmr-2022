import { Room } from "./room";

export interface Building {
  id: string;
  name: string;
  displayName: string;
  aliases: string[];
  latitude: string;
  longitude: string;
  rooms: Room[];
}
