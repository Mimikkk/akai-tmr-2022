import Link from "next/link";
import { Icon } from "../Icon";
import s from "./AddNewRoomCard.module.scss";
import cx from "classnames";

interface Props {
  id?: string;
  name?: string;
}

export const AddNewRoomCard = ({ id, name }: Props) => (
  <Link href={{ pathname: "room/add", query: { buildingId: id, buildingName: name } }}>
    <div className={cx(s.card, "text-slate-200 hover:text-slate-300")}>
      <label className={cx(s.label)} htmlFor="add-new">
        Dodaj nową salę
      </label>
      <Icon name="ArrowRight" id="add-new" />
    </div>
  </Link>
);
