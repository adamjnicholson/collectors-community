import { PropsWithChildren } from "react";

import { Override } from "~/types";

type LabelProps = PropsWithChildren<unknown>;

export function Label(props: LabelProps) {
    return <span className="block font-bold pb-2" {...props} />;
}

type HTMLInputProps = React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
>;

type RequiredInputHTMLFor = Override<
    HTMLInputProps,
    Required<Pick<HTMLInputProps, "htmlFor">>
>;

type InputGroupProps = PropsWithChildren<{
    label?: string;
}> &
    RequiredInputHTMLFor;

type InputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

export function Input(props: InputProps) {
    return <input className="block w-full px-4 py-2 rounded-md" {...props} />;
}

export function InputGroup({
    htmlFor,
    children,
    label,
    className,
    ...props
}: InputGroupProps) {
    return (
        <label htmlFor={htmlFor} className={`block ${className}`} {...props}>
            {label ? <Label>{label}</Label> : null}
            {children}
        </label>
    );
}
