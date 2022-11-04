export interface Building {
  id: string;
  defaultName: string;
  names: string[];
  shortNames: string[];
  geolocation: {
    latitude: string;
    longitude: string;
  };
  rooms: Room[];
}

export interface Room {
  id: string;
  names: string[];
  geolocation: {
    x: number;
    y: number;
  };
}
