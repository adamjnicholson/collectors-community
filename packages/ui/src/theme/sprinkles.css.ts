import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { vars } from "./theme.css";

const unresponsiveProperties = defineProperties({
  properties: {
    display: ["block", "flex"],
    flexDirection: ["column"],
    fontWeight: ["500", "600", "800"],
    fontSize: vars.fontSize,
    width: vars.width,
  },
});

export const baseSprinkles = createSprinkles(unresponsiveProperties);
export type BaseSprinkles = Parameters<typeof baseSprinkles>[0];
