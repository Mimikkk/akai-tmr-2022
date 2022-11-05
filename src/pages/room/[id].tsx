import { useRouter } from "next/router";
import { ImageWithDot } from "../../components/ImageWithDot";

const RoomPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="max-w-lg">
      <p>Post: {id}</p>
      <ImageWithDot src="/room-images/cw-level-0.png" dotX={100} dotY={200} />
    </div>
  );
};

export default RoomPage;
