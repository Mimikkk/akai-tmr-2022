import Link from "next/link";
import { Icon } from "../Icon";
import s from "./AddNewRoomCard.module.scss";
interface Props {
  id?: string;
  name?: string;
}
export const AddNewRoomCard = ({ id, name }: Props) => {
  return (
    <Link href={{ pathname: "room/add", query: { buildingId: id, buildingName: name } }}>
      <div className={s.card}>
        <label htmlFor={"add-new"} className={"cursor-pointer"}>
          Dodaj nową sale
        </label>
        <Icon name={"ArrowRight"} id={"add-new"} />
      </div>
    </Link>
  );
};
