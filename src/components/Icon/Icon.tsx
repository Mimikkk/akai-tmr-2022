import { useMemo, MouseEvent } from "react";
import { IconRegistry, IconName } from "./IconRegistry";
import cx from "classnames";
import s from "./Icon.module.scss";

interface IconProps {
  className?: string;
  name: IconName;
  onClick?: (event: MouseEvent<SVGElement>) => void;
}

export const Icon = ({ name, ...props }: IconProps) => {
  const Component = useMemo(() => IconRegistry[name], [name]);

  return <Component {...props} className={cx(props?.className, s.icon, { [s.background]: props.onClick })} />;
};
