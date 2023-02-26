import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { vars } from "./theme.css";

const unresponsiveProperties = defineProperties({
  properties: {
    fontWeight: ["500", "600", "800"],
    fontSize: vars.fontSize,
  },
});

export const sprinkles = createSprinkles(unresponsiveProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];
