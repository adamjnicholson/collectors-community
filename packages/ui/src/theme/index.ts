import { baseSprinkles, BaseSprinkles } from "./sprinkles.css";
import { spaceY } from "./utilityClasses.css";

export type Sprinkles = BaseSprinkles &
  Partial<{
    spaceY: keyof typeof spaceY;
  }>;

export const sprinkles = ({ spaceY: spaceYProp, ...props }: Sprinkles) => {
  let classNames = [];
  if (spaceYProp) {
    classNames.push(spaceY[spaceYProp]);
  }

  classNames.push(baseSprinkles(props));

  return classNames.join(" ");
};
