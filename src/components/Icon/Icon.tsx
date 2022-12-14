import { useMemo, MouseEvent, PropsWithChildren, useId } from "react";
import { IconRegistry, IconName } from "./IconRegistry";
import cx from "classnames";
import s from "./Icon.module.scss";
import Link from "next/link";

interface IconProps {
  className?: string;
  name: IconName;
  href?: string;
  id?: string;
  onClick?: (event: MouseEvent<SVGElement>) => void;
}

export const Icon = ({ name, href, ...props }: IconProps) => {
  const Component = useMemo(() => IconRegistry[name], [name]);

  const result = <Component {...props} className={cx(props?.className, s.icon, { [s.background]: props.onClick })} />;

  if (href) return <Link href={href}>{result}</Link>;
  return result;
};
