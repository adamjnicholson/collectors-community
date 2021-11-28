import { PropsWithChildren } from "react";
import { Form as RemixForm } from "remix";

import { GetActionData, Override } from "~/types";

function FormError({ children }: PropsWithChildren<unknown>) {
    if (!children) {
        return null;
    }
    return <p className="text-red-700 pt-2">{children}</p>;
}

type LabelProps = PropsWithChildren<unknown>;

export function Label(props: LabelProps) {
    return <span className="block font-bold pb-2" {...props} />;
}

type HTMLInputProps = React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
>;

type InputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

export function Input(props: InputProps) {
    return <input className="block w-full px-4 py-2 rounded-md" {...props} />;
}

type RequiredInputHTMLFor = Override<
    HTMLInputProps,
    Required<Pick<HTMLInputProps, "htmlFor">>
>;

type InputGroupProps<T extends string> = PropsWithChildren<{
    label?: string;
    errors?: GetActionData<T>;
}> &
    RequiredInputHTMLFor;
export function InputGroup({
    htmlFor,
    children,
    label,
    className,
    errors,
    ...props
}: InputGroupProps<string>) {
    const inputError = errors?.fieldErrors?.[htmlFor]?.[0];

    return (
        <label htmlFor={htmlFor} className={`block ${className}`} {...props}>
            {label ? <Label>{label}</Label> : null}
            {children}
            <FormError>{inputError}</FormError>
        </label>
    );
}

type FormProps = React.ComponentProps<typeof RemixForm> & {
    errors?: string[];
};

export function Form({ errors, children, ...formProps }: FormProps) {
    return (
        <RemixForm {...formProps}>
            <FormError>{errors?.[0]}</FormError>
            {children}
        </RemixForm>
    );
}
