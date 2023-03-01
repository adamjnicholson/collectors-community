import classNames from "classnames";
import React, { ComponentPropsWithoutRef } from "react";
import { Stack } from "../../design-system/Stack/Stack";
import { sprinkles } from "../../theme";
import { Overwrite } from "../../types";
import { Label } from "../Label/Label";

type InputProps = React.ComponentPropsWithoutRef<"input">;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return (
      <input
        {...props}
        className={classNames(
          props.className,
          sprinkles({
            borderWidth: "1",
            borderColor: "default",
            borderStyle: "solid",
            borderRadius: "8",
            fontSize: "13",
            paddingY: "2",
            paddingX: "4",
            width: "full",
          })
        )}
        ref={ref}
      />
    );
  }
);

type InputGroupProps = Overwrite<
  ComponentPropsWithoutRef<typeof Input>,
  {
    label: React.ReactNode;
    name: string;
  }
>;

export function InputGroup({ label, name, ...props }: InputGroupProps) {
  return (
    <Stack space="2">
      <Label htmlFor={name}>{label}</Label>
      <Input {...props} />
    </Stack>
  );
}
