import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { ImageWithDot } from "../../components/ImageWithDot";
import { LeafletMapNoSSR } from "../../components/LeafletMapNoSSR";
import { RoomService } from "../../services";
import supabase from "../../supabase";
import s from "./[id].module.scss";
import cx from "classnames";
import Head from "next/head";

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
    <>
      <Head>
        <title>{[data?.aliases[0], data?.buildings.displayName, "MapaPP"].filter(Boolean).join(" - ")}</title>
      </Head>
      <div className={cx(s.scroller, "flex flex-col gap-3")}>
        {url && !isLoading && (
          <>
            <h1 className="font-bold text-3xl">{data.aliases[0]}</h1>
            <div>
              <span className="font-bold">Inne nazwy sali:</span>{" "}
              <ul className="list-disc list-inside">
                {data.aliases.slice(1).map((alias: string) => (
                  <li>{alias}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-bold">Piętro:</span> {data.level}
            </div>
            <div>
              <span className="font-bold">Budynek:</span> {data.buildings.displayName}
              {data.buildings.aliases.map((alias: string) => (
                <li>{alias}</li>
              ))}
            </div>
            <div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${data.buildings.latitude},${data.buildings.longitude}`}
                className="font-bold underline text-blue-500 hover:text-blue-600 transition-all"
                target="_blank"
              >
                Link do budynku w Google Maps
              </a>
            </div>

            <LeafletMapNoSSR data={data.buildings} />
            <ImageWithDot src={url} dotX={data.x} dotY={data.y} />
          </>
        )}
      </div>
    </>
  );
};

export default RoomPage;
