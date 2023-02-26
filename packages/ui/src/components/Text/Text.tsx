type TextProps = {
  children: React.ReactNode;
};

export function Text({ children }: TextProps) {
  return <p>{children}</p>;
}
