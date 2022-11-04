import { useRouter } from "next/router";
import { ImageWithDot } from "../../components/ImageWithDot";
import { LeafletMapNoSSR } from "../../components/LeafletMapNoSSR";

const RoomPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="max-w-lg">
      <p>Post: {id}</p>
      <LeafletMapNoSSR />
      <ImageWithDot src="/room-images/cw-level-0.png" dotX={100} dotY={200} />
    </div>
  );
};

export default RoomPage;
