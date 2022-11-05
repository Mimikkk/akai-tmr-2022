import { TextField } from "../../components";
import { useForm } from "react-hook-form";

const AddBuildingPage = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <main className={"bg-slate-500 w-full flex justify-center p-2"}>
      <section className="flex flex-col gap-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("firstName")} />
          <TextField icon={"Room"} {...register("room")}>
            Nazwa sali
          </TextField>
          <TextField icon={"Building"} {...register("building")}>
            Budynek
          </TextField>
          <TextField icon={"Level"} {...register("level")}>
            {" "}
            Piętro{" "}
          </TextField>
          <input type="submit" />
        </form>
      </section>
    </main>
  );
};

export default AddBuildingPage;
