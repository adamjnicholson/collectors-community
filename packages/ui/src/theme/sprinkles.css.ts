import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { vars } from "./theme.css";
import { tokens, buildThemeMapFromTokens } from "./tokens";

const unresponsiveProperties = defineProperties({
  properties: {
    borderTopWidth: vars.borderWidth,
    borderRightWidth: vars.borderWidth,
    borderBottomWidth: vars.borderWidth,
    borderLeftWidth: vars.borderWidth,
    borderColor: buildThemeMapFromTokens("color", tokens.borderColor),
    borderRadius: vars.borderRadius,
    borderStyle: ["solid"],
    display: ["block", "flex"],
    flexDirection: ["column"],
    fontWeight: ["500", "600", "800"],
    fontSize: vars.fontSize,
    paddingTop: vars.space,
    paddingRight: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    width: vars.width,
  },
  shorthands: {
    borderWidth: [
      "borderTopWidth",
      "borderRightWidth",
      "borderBottomWidth",
      "borderLeftWidth",
    ],
    paddingY: ["paddingTop", "paddingBottom"],
    paddingX: ["paddingLeft", "paddingRight"],
    padding: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
  },
});

export const baseSprinkles = createSprinkles(unresponsiveProperties);
export type BaseSprinkles = Parameters<typeof baseSprinkles>[0];
