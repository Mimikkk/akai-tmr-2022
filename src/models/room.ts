export interface Room {
  id?: string;
  name: string;
  x: number;
  y: number;
  level: number;
  buildingId: string;
  aliases: string[];
  score: number;
}
