import { TextField } from "../../components";

const AddBuildingPage = () => (
  <main className={"bg-slate-500 w-full flex justify-center p-2"}>
    <section>
      <TextField icon={"Room"}> Nazwa sali </TextField>
      <TextField icon={"Building"}> Budynek </TextField>
      <TextField icon={"Level"}> Piętro </TextField>
    </section>
  </main>
);

export default AddBuildingPage;
