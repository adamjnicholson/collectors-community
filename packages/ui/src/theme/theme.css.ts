import fontMetrics from "@capsizecss/metrics/montserrat";
import { createTheme, createThemeContract } from "@vanilla-extract/css";

import { precomputeValues } from "@capsizecss/vanilla-extract";

const defaultCapsizeValues = precomputeValues({
  fontSize: 0,
  leading: 0,
  fontMetrics,
});

export const vars = createThemeContract({
  fontSize: {
    "14": defaultCapsizeValues,
    "18": defaultCapsizeValues,
  },
  space: {
    "2": "",
    "4": "",
  },
  width: {
    full: "",
  },
});

export type Vars = typeof vars;

export const lightThemeClassName = createTheme(vars, {
  fontSize: {
    "14": precomputeValues({
      fontSize: 14,
      leading: 21,
      fontMetrics,
    }),
    "18": precomputeValues({
      fontSize: 18,
      leading: 22,
      fontMetrics,
    }),
  },
  space: {
    "2": "8px",
    "4": "16px",
  },
  width: {
    full: "100%",
  },
});
