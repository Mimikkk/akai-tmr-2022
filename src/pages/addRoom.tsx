import { Input } from "../components";

const AddBuildingPage = () => {
  return (
    <main className={"bg-slate-500 w-full flex justify-center p-2"}>
      <section className={"[&>*]:my-4"}>
        <Input icon={"Room"}> Nazwa sali </Input>
        <Input icon={"Building"}> Budynek </Input>
        <Input icon={"Level"}> Piętro </Input>
      </section>
    </main>
  );
};

export default AddBuildingPage;
