import * as RadixLabel from "@radix-ui/react-label";
import classNames from "classnames";
import { sprinkles } from "../../theme";

type LabelProps = React.ComponentPropsWithoutRef<typeof RadixLabel.Root>;

export function Label({ className, ...props }: LabelProps) {
  return (
    <RadixLabel.Root
      {...props}
      className={classNames(
        className,
        sprinkles({
          fontSize: "13",
          fontWeight: "600",
        })
      )}
    />
  );
}
