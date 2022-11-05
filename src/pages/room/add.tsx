import { Icon, TextField } from "../../components";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import s from "./add.module.scss";
import cx from "classnames";
import { BuildingService, RoomService } from "../../services";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import { ImageWithDot } from "../../components/ImageWithDot";
import supabase from "../../supabase";
import { useEffect } from "react";
import { useTheme } from "next-themes";

export interface DataProps {
  aliases: string[];
  level: string;
  room: string;
  x: number;
  y: number;
}

const AddBuildingPage = () => {
  const { setValue, watch, register, handleSubmit } = useForm({
    defaultValues: {
      aliases: [] as string[],
      room: "",
      level: "",
      x: 0,
      y: 0,
    },
  });
  const chips: string[] = watch("aliases");

  const { query, push } = useRouter();
  const onSubmit = (data: DataProps) => {
    RoomService.create({ ...data, buildingId: query.buildingId as string }).then(() => push("/"));
  };
  const { theme } = useTheme();
  const { data } = useQuery(
    ["building", query.buildingId],
    () => query.buildingId && BuildingService.read(query.buildingId as string),
  );

  const level = watch("level");
  const x = watch("x");
  const y = watch("y");
  useEffect(() => {
    setValue("x", 0);
    setValue("y", 0);
  }, [level]);

  return (
    <>
      <Head>
        <title>Dodawanie sali do {query.buildingName} - MapApp</title>
      </Head>
      <main className={"w-full flex justify-center p-2"}>
        <section className="flex flex-col md:w-1/3 w-2/3">
          {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
          <h2 className={"text-5xl text-center text-gray-300 capitalize"}>{query.buildingName}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className={"[&>*]:my-3"}>
            <TextField icon={"Room"} {...register("room", { required: true })}>
              Nazwa sali
            </TextField>
            <TextField icon={"Stairs"} {...register("level", { required: true })}>
              Piętro
            </TextField>
            {data && level.length > 0 ? (
              <>
                <ImageWithDot
                  src={supabase.storage.from("mapa-pp").getPublicUrl(`${data.name}/${level}.png`).data.publicUrl}
                  dotX={x}
                  dotY={y}
                  onClick={(x, y) => {
                    setValue("x", Math.floor(x));
                    setValue("y", Math.floor(y));
                  }}
                />
                <div className="grid grid-cols-2">
                  <TextField icon={"Stairs"} {...register("x", { required: true })}>
                    X
                  </TextField>
                  <TextField icon={"Stairs"} {...register("y", { required: true })}>
                    Y
                  </TextField>
                </div>
              </>
            ) : null}

            <div>
              <TextField
                icon={"Alias"}
                onKeyDown={(event) => {
                  const { value } = event.currentTarget;
                  if (!value || event.key !== "Enter") {
                    event.stopPropagation();
                    return;
                  }

                  if (chips.includes(value)) return;
                  event.currentTarget.value = "";
                  setValue("aliases", [...chips, value]);
                  event.preventDefault();
                }}
              >
                Aliasy
              </TextField>
              <div
                className={cx(
                  s.items,
                  theme === "dark" && "dark",
                  "flex flex-wrap max-h-48 overflow-auto items-baseline",
                )}
              >
                {chips?.map((chip) => (
                  <span
                    key={chip}
                    className="bg-slate-400 flex items-center capitalize justify-center hover:bg-gray-300 transition-all m-1 px-2 rounded-xl font-medium"
                    onClick={() =>
                      setValue(
                        "aliases",
                        chips.filter((c) => c !== chip),
                      )
                    }
                  >
                    {chip}
                    <Icon name="XCircle" className="cursor-pointer -mr-1 hover:text-red-500" />
                  </span>
                ))}
              </div>
            </div>
            <button className="w-full btn btn-primary" type="submit">
              Prześlij
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default AddBuildingPage;
