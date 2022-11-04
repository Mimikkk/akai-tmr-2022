import cx from "classnames";
import s from "./Room.module.scss";

export interface RoomProps {
  title: string;
  building: string;
  roomNames: string[];
  className?: string;
}

export const Room = ({ title, roomNames, building, className }: RoomProps) => (
  <li className={cx(s.content, className)}>
    <div>
      <h2 className={cx(s.title)}>{title}</h2>
      <span>Building: {building}</span>
      <ul className={"flex list-none"}>
        <span className={"flex justify-center items-center gap-2"}>
          Also known as
          <QuestionCircle className={"w-6 h-6"} />:
        </span>
        {roomNames.map((name) => (
          <li key={name} className={"m-1 px-2 rounded-xl bg-gray-300 font-medium"}>
            {name}
          </li>
        ))}
      </ul>
    </div>
    <div className={"flex items-center"}>
      <ArrowRight className={s.arrow} />
    </div>
  </li>
);
const ArrowRight = (props: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    {...props}
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);
const QuestionCircle = (props: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      {...props}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
      />
    </svg>
  );
};
