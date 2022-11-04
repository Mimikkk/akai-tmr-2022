import { useRouter } from "next/router";
import { ImageWithDot } from "../../components/ImageWithDot";

const RoomPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <p>Post: {id}</p>
      <ImageWithDot src="/room-images/cw-level-0.png" dotX={100} dotY={100} />
    </div>
  );
};

export default RoomPage;
