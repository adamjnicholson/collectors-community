import { Sprinkles, sprinkles } from "../../theme";

type StackProps = {
  children: React.ReactNode;
  space?: Sprinkles["spaceY"];
};

export function Stack({ space, ...props }: StackProps) {
  return (
    <div
      className={sprinkles({
        spaceY: space,
        display: "flex",
        flexDirection: "column",
      })}
      {...props}
    />
  );
}
