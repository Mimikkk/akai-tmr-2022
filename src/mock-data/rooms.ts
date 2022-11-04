export interface Room {
  buildingId: string;
  names: string[];
  level: string;
  x: number;
  y: number;
}

export const rooms: Room[] = [
  {
    buildingId: "A-1",
    names: ["100", "L100"],
    level: "0",
    x: 0,
    y: 0,
  },
];
