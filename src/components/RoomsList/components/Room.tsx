export interface RoomProps {
  title: string;
  building: string;
  roomNames: string[];
}

export const Room = ({ title, roomNames, building }: RoomProps) => (
  <div>
    <h2>{title}</h2>
    <span>Building: {building}</span>
    <ul>
      {roomNames.map((name) => (
        <li>{name}</li>
      ))}
    </ul>
  </div>
);
