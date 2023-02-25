import fontMetrics from "@capsizecss/metrics/montserrat";
import { createTheme, createThemeContract } from "@vanilla-extract/css";

import { precomputeValues } from "@capsizecss/vanilla-extract";

const defaultCapsizeValues = precomputeValues({
  fontSize: 0,
  leading: 0,
  fontMetrics,
});

const vars = createThemeContract({
  capsize: {
    body14: defaultCapsizeValues,
    body18: defaultCapsizeValues,
  },
});

export const lightThemeClassName = createTheme(vars, {
  capsize: {
    body14: precomputeValues({
      fontSize: 14,
      leading: 21,
      fontMetrics,
    }),
    body18: precomputeValues({
      fontSize: 18,
      leading: 22,
      fontMetrics,
    }),
  },
});
