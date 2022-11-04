import { useMemo } from "react";
import { IconRegistry, IconName } from "./IconRegistry";

interface IconProps {
  className?: string;
  name: IconName;
}

export const Icon = ({ name, ...props }: IconProps) => useMemo(() => IconRegistry[name], [name])(props);
