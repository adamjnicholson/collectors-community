import { PropsWithChildren } from "react";
import {
    Meta,
    Links,
    Scripts,
    LiveReload,
    useCatch,
    LinksFunction,
    ScrollRestoration,
    Outlet,
} from "remix";

import tailwindUrl from "~/styles/tailwind.css";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: tailwindUrl },
];

type DocumentProps = PropsWithChildren<{
    title?: string;
}>;

function Document({ children, title }: DocumentProps) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1"
                />
                {title ? <title>{title}</title> : null}
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
                {process.env.NODE_ENV === "development" && <LiveReload />}
            </body>
        </html>
    );
}

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
    return (
        <Document>
            <div className="mx-auto min-h-screen">
                <Outlet />
            </div>
        </Document>
    );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
    const caught = useCatch();

    let message;
    switch (caught.status) {
        case 401:
            message = (
                <p>
                    Oops! Looks like you tried to visit a page that you do not
                    have access to.
                </p>
            );
            break;
        case 404:
            message = (
                <p>
                    Oops! Looks like you tried to visit a page that does not
                    exist.
                </p>
            );
            break;

        default:
            throw new Error(caught.data || caught.statusText);
    }

    return (
        <Document title={`${caught.status} ${caught.statusText}`}>
            <h1>
                {caught.status}: {caught.statusText}
            </h1>
            {message}
        </Document>
    );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
    // eslint-disable-next-line no-console
    console.error(error);
    return (
        <Document title="Error!">
            <div>
                <h1>There was an error</h1>
                <p>{error.message}</p>
                <hr />
                <p>
                    Hey, developer, you should replace this with what you want
                    your users to see.
                </p>
            </div>
        </Document>
    );
}
