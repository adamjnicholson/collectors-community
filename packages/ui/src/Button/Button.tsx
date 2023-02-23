import { container } from "./Button.css";

export type ButtonProps = {
  primary?: boolean;
  size?: "small" | "large";
  label?: string;
};

export const Button = ({
  primary = false,
  label = "Boop",
  size = "small",
}: ButtonProps) => {
  return (
    <button
      className={container}
      style={{
        backgroundColor: primary ? "red" : "blue",
        fontSize: size === "large" ? "24px" : "14px",
      }}
    >
      {label}
    </button>
  );
};
