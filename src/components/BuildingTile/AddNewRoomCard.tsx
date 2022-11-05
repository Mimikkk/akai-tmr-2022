import Link from "next/link";
import { Icon } from "../Icon";
import s from "./AddNewRoomCard.module.scss";

export const AddNewRoomCard = () => (
  <Link href={"room/add"}>
    <div className={s.card}>
      <label htmlFor={"add-new"} className={s.label}>
        Dodaj nową sale
      </label>
      <Icon name={"ArrowRight"} id={"add-new"} />
    </div>
  </Link>
);
