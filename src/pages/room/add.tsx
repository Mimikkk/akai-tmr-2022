import { Icon, TextField } from "../../components";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

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

  const onSubmit = (data: any) => console.log(data);

  return (
    <main className={"bg-slate-700 w-full flex justify-center p-2"}>
      <section className="flex flex-col">
        <h2 className={"text-2xl font-bold text-center"}>{query.buildingName}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={"[&>*]:my-3"}>
          <TextField icon={"Room"} {...register("room", { required: true })}>
            Nazwa sali
          </TextField>
          <TextField icon={"Level"} {...register("level", { required: true })}>
            Piętro
          </TextField>
          <div className="afe">
            <TextField
              icon={"Level"}
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
            <div className="flex flex-col">
              {chips?.map((chip) => (
                <span
                  key={chip}
                  className="bg-slate-400 flex items-center justify-center hover:bg-gray-300 transition-all m-1 px-2 rounded-xl font-medium"
                >
                  {chip}
                  <Icon
                    name="Minus"
                    className="cursor-pointer hover:text-red-500"
                    onClick={() =>
                      setValue(
                        "aliases",
                        chips.filter((c) => c !== chip),
                      )
                    }
                  />
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
