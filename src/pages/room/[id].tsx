import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ImageWithDot } from "../../components/ImageWithDot";
import { LeafletMapNoSSR } from "../../components/LeafletMapNoSSR";
import { RoomService } from "../../services";
import supabase from "../../supabase";
import s from "./[id].module.scss";

const RoomPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useQuery(["room", id], () => id && RoomService.read(id as string));

  const { data: urlData } = data
    ? supabase.storage.from("mapa-pp").getPublicUrl(`${data.buildings.name}/${data.level}.png`)
    : { data: undefined };

  return (
    <div className={s.scroller}>
      <p>Post: {id}</p>
      {urlData && !isLoading && (
        <>
          <LeafletMapNoSSR data={data.buildings} />
          <ImageWithDot src={urlData.publicUrl} dotX={data.x} dotY={data.y} />
        </>
      )}
    </div>
  );
};

export default RoomPage;
