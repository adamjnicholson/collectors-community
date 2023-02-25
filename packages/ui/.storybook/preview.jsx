import "../src/theme/reset.css";
import "../src/theme/global.css";
import { lightThemeClassName } from "../src/theme/theme.css";

export const decorators = [
  (Story) => <div className={lightThemeClassName}>{Story()}</div>,
];
