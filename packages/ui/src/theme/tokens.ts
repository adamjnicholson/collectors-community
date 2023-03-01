import { Vars, vars } from "./theme.css";

type TokenMap<T extends keyof Vars> = Record<string, keyof Vars[T]>;

const borderColor = {
  default: "gray-400",
} satisfies TokenMap<"color">;

export const tokens = {
  borderColor,
};

export function buildThemeMapFromTokens<ThemeKey extends keyof Vars>(
  themeKey: ThemeKey,
  tokenMap: TokenMap<ThemeKey>
) {
  return Object.entries(tokenMap).reduce<
    Partial<
      Record<keyof TokenMap<ThemeKey>, Vars[ThemeKey][keyof Vars[ThemeKey]]>
    >
  >((themeMap, [key, token]) => {
    const themeSlice = vars[themeKey];
    if (token in themeSlice) {
      return {
        ...themeMap,
        [key]: themeSlice[token],
      };
    }
    return themeMap;
  }, {});
}
