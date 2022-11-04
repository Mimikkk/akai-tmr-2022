import { RoomProps } from "./components/Room";
import { faker } from "@faker-js/faker";

export const mockedRooms: RoomProps[] = Array.from({ length: 3 }, () => ({
  title: faker.word.verb(),
  roomNames: Array.from({ length: 3 }, () => faker.word.verb()),
  building: faker.word.verb(),
}));
