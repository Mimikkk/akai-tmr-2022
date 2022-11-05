import { TextField } from "../../components";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const AddBuildingPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { query } = useRouter();

  const onSubmit = (data: any) => console.log(data);

  console.log(query.buildingName);

  return (
    <main className={"bg-slate-500 w-full flex items-center flex-col p-2"}>
      <section className="flex">
        <form onSubmit={handleSubmit(onSubmit)} className={"[&>*]:my-3"}>
          <TextField icon={"Room"} {...register("room", { required: true })}>
            Nazwa sali
          </TextField>
          <TextField icon={"Building"} {...register("building", { required: true })}>
            Budynek
          </TextField>
          <TextField icon={"Level"} {...register("level", { required: true })}>
            Piętro
          </TextField>
          <input className={"btn btn-primary"} type={"submit"} />
        </form>
      </section>
    </main>
  );
};

export default AddBuildingPage;
