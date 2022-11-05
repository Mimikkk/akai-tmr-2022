import { Icon, TextField } from "../../components";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import s from "./add.module.scss";
import cx from "classnames";
import { RoomService } from "../../services";

export interface DataProps {
  aliases: string[];
  level: string;
  room: string;
}

const AddBuildingPage = () => {
  const { setValue, watch, register, handleSubmit } = useForm({
    defaultValues: {
      aliases: [] as string[],
      room: "",
      level: "",
    },
  });
  const chips: string[] = watch("aliases");

  const { query } = useRouter();

  const onSubmit = (data: DataProps) => {
    RoomService.create({ ...data, buildingId: query.buildingId as string }).then();
  };

  return (
    <main className={"bg-slate-700 w-full flex justify-center p-2"}>
      <section className="flex flex-col w-1/3">
        <h2 className={"text-6xl text-center text-gray-500"}>{query.buildingName}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={"[&>*]:my-3"}>
          <TextField icon={"Room"} {...register("room")}>
            Nazwa sali
          </TextField>
          <TextField icon={"Stairs"} {...register("level")}>
            Piętro
          </TextField>
          <div className="">
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
            <div className={cx(s.items, "flex flex-wrap max-h-48 overflow-auto items-baseline")}>
              {chips?.map((chip) => (
                <span
                  key={chip}
                  className="bg-slate-400 flex items-center justify-center hover:bg-gray-300 transition-all m-1 px-2 rounded-xl font-medium"
                  onClick={() =>
                    setValue(
                      "aliases",
                      chips.filter((c) => c !== chip),
                    )
                  }
                >
                  {chip}
                  <Icon name="XCircle" className="cursor-pointer hover:text-red-500" />
                </span>
              ))}
            </div>
          </div>
          <button className={"w-full btn btn-primary"} type={"submit"}>
            Prześlij
          </button>
        </form>
      </section>
    </main>
  );
};

export default AddBuildingPage;
