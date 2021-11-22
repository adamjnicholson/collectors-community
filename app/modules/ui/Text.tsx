import { createElement, PropsWithChildren } from "react";

type TextElements = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

const TEXT_STYLES: Record<TextElements, string> = {
    h1: "",
    h2: "font-bold text-2xl pb-4",
    h3: "",
    h4: "",
    h5: "",
    h6: "",
    p: "",
    span: "",
};

type Props = PropsWithChildren<{
    as: TextElements;
    className?: string;
}>;

export default function Text({ as, className = "", ...props }: Props) {
    const x = createElement(as, {
        ...props,
        className: `${TEXT_STYLES[as]} ${className}`,
    });

    return x;
}
