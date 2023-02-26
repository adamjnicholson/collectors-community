import React from "react";

type UnknownObject = Record<string | number | symbol, unknown>;

const DEFAULT_AS = "div" as const;
type DEAFULT_AS_TYPE = typeof DEFAULT_AS;

type PolymorphicProps<
  As extends React.ElementType,
  Props extends UnknownObject = {}
> = {
  as?: As;
} & Props &
  Omit<React.ComponentPropsWithoutRef<As>, keyof Props>;

type PolymorphicRef<As extends React.ElementType> =
  React.ComponentPropsWithRef<As>["ref"];

type PolymorphicPropsWithRef<
  As extends React.ElementType = DEAFULT_AS_TYPE,
  Props extends UnknownObject = {}
> = PolymorphicProps<As, Props> & { ref?: PolymorphicRef<As> };

type PolymorphicComponent<
  As extends React.ElementType = DEAFULT_AS_TYPE,
  Props extends UnknownObject = {}
> = (props: PolymorphicPropsWithRef<As, Props>) => React.ReactElement | null;

export const Polymorphic = React.forwardRef(
  <
    As extends React.ElementType = DEAFULT_AS_TYPE,
    Props extends UnknownObject = {}
  >(
    { as, ...props }: PolymorphicPropsWithRef<As, Props>,
    ref?: PolymorphicRef<As>
  ) => {
    const Component = as || DEFAULT_AS;

    return <Component {...props} ref={ref} />;
  }
);
