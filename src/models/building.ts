export interface Building {
  id: string;
  name: string;
  displayName: string;
  aliases: string[];
  latitude: string;
  longitude: string;
  rooms: Room[];
}

export interface Room {
  id: string;
  name: string;
  aliases: string[];
  x: number;
  y: number;
}
