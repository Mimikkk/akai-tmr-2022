import "../../styles/globals.css";
import { Rooms } from "../components";
import { Room } from "../components/RoomsList/components/Room";
import { mockedRooms } from "../components/RoomsList/mockedRooms";

const App = () => {
  return (
    <div>
      <Rooms>
        {mockedRooms.map((room) => (
          <Room title={room.title} roomNames={room.roomNames} building={room.building} />
        ))}
      </Rooms>
    </div>
  );
};

export default App;
