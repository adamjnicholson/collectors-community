import { PropsWithChildren } from "react";

import { Override } from "~/types";

type HTMLButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

type RequiredButtonType = Override<
    HTMLButtonProps,
    Required<Pick<HTMLButtonProps, "type">>
>;

type ButtonProps = PropsWithChildren<
    RequiredButtonType & {
        className?: string;
    }
>;

export const BUTTON_CLASSNAMES =
    "rounded-md bg-blue-700 text-white px-8 py-2 transition-colors hover:bg-blue-500";

export function Button({ className = "", ...props }: ButtonProps) {
    return (
        <button className={`${className} ${BUTTON_CLASSNAMES}`} {...props} />
    );
}
