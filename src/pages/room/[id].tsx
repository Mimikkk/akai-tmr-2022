import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ImageWithDot } from "../../components/ImageWithDot";
import { LeafletMapNoSSR } from "../../components/LeafletMapNoSSR";
import { RoomService } from "../../services";

const RoomPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useQuery(["room", id], () => RoomService.get(id as string));
  console.log(data);

  return (
    <div className="max-w-lg">
      <p>Post: {id}</p>
      {data ? <LeafletMapNoSSR data={data.buildings} /> : null}
      <ImageWithDot src="/room-images/cw-level-0.png" dotX={100} dotY={200} />
    </div>
  );
};

export default RoomPage;
