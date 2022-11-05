import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { ImageWithDot } from "../../components/ImageWithDot";
import { LeafletMapNoSSR } from "../../components/LeafletMapNoSSR";
import { RoomService } from "../../services";
import supabase from "../../supabase";
import s from "./[id].module.scss";

const RoomPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [url, setUrl] = useState("");
  const { data, isLoading } = useQuery(["room", id], () => id && RoomService.read(id as string), {
    onSuccess: (data) => {
      setUrl(supabase.storage.from("mapa-pp").getPublicUrl(`${data.buildings.name}/${data.level}.png`).data.publicUrl);
    },
  });

  return (
    <div className={s.scroller}>
      {url && !isLoading && (
        <>
          <LeafletMapNoSSR data={data.buildings} />
          <ImageWithDot src={url} dotX={data.x} dotY={data.y} />
        </>
      )}
    </div>
  );
};

export default RoomPage;
