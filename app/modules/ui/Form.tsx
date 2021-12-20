import { createContext, PropsWithChildren, useContext } from "react";
import { Form as RemixForm } from "remix";
import { z } from "zod";

import { Override } from "~/types/global";
import { ActionFormValidation } from "~/types/remix";

function FormError({ children }: PropsWithChildren<unknown>) {
    if (!children) {
        return null;
    }
    return <p className="text-red-700 pt-2">{children}</p>;
}

const FormContext = createContext<ActionFormValidation | undefined | null>(
    null
);

const useFormContext = () => {
    const context = useContext(FormContext);

    if (context === null) {
        throw new Error(
            "useFormContext must be used within a FormContext.Provider"
        );
    }

    return context;
};

type FormProps = React.ComponentProps<typeof RemixForm> & {
    context?: ActionFormValidation;
};

export function Form({ context, children, ...formProps }: FormProps) {
    return (
        <FormContext.Provider value={context}>
            <RemixForm {...formProps}>
                <FormError>{context?.formError}</FormError>
                {children}
            </RemixForm>
        </FormContext.Provider>
    );
}

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
export function InputGroup({
    htmlFor,
    children,
    label,
    className,
    ...props
}: InputGroupProps) {
    const formContext = useFormContext();
    const inputError = formContext?.fieldErrors?.[htmlFor];

    return (
        <label htmlFor={htmlFor} className={`block ${className}`} {...props}>
            {label ? <Label>{label}</Label> : null}
            {children}
            <FormError>{inputError}</FormError>
        </label>
    );
}

type InputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

const validDefaultValue = z.union([z.string(), z.number(), z.undefined()]);
const getTypecastedDefaultValue = (
    defaultValue: InputProps["defaultValue"] | null | boolean
) => {
    const parseDefaultValue = validDefaultValue.safeParse(defaultValue);
    return parseDefaultValue.success
        ? parseDefaultValue.data
        : defaultValue?.toString();
};

export function Input({ defaultValue, name, ...props }: InputProps) {
    const formContext = useFormContext();

    const defaultValueToUse = defaultValue ?? formContext?.fields[name ?? ""];

    return (
        <input
            className="block w-full px-4 py-2 rounded-md"
            {...props}
            defaultValue={getTypecastedDefaultValue(defaultValueToUse)}
            name={name}
        />
    );
}

type SelectProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
>;

export function Select({
    defaultValue,
    name,
    ...props
}: PropsWithChildren<SelectProps>) {
    const formContext = useFormContext();

    const defaultValueToUse =
        defaultValue ?? formContext?.fields[name ?? ""] ?? "";

    return (
        <div className="px-4 bg-white rounded-md">
            <select
                className="block w-full py-2"
                name={name}
                defaultValue={getTypecastedDefaultValue(defaultValueToUse)}
                {...props}
            />
        </div>
    );
}
