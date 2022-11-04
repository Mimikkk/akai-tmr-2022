export interface Building {
  id: string;
  names: string[];
  geolocation: {
    latitude: string;
    longitude: string;
  };
}
