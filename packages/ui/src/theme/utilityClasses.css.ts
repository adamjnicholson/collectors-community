import { globalStyle, style } from "@vanilla-extract/css";
import { vars, Vars } from "./theme.css";

export const spaceY = Object.entries(vars.space).reduce<
  Partial<{
    [Key in keyof Vars["space"]]: `space-y-${Key}`;
  }>
>((acc, [key, value]) => {
  const className = `space-y-${key}`;

  globalStyle(`.${className}>:not([hidden])~:not([hidden])`, {
    marginTop: value,
  });

  return {
    ...acc,
    [key]: className,
  };
}, {});
