import {
    MetaFunction,
    LinksFunction,
    LoaderFunction,
    ActionFunction,
    redirect,
    useLoaderData,
    Form,
} from "remix";

import prisma from "~/db";
import stylesUrl from "~/styles/index.css";

export const meta: MetaFunction = () => ({
    title: "Remix Starter",
    description: "Welcome to remix!",
});

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: stylesUrl },
];

export const action: ActionFunction = async ({ request }) => {
    const body = new URLSearchParams(await request.text());

    const name = body.get("name") ?? "";
    const email = body.get("email") ?? "";

    if (!name || !email) {
        // handle error case
        return redirect("/");
    }

    await prisma.user.create({
        data: {
            name,
            email,
        },
    });

    return redirect("/");
};

export const loader: LoaderFunction = async () => {
    const allUsers = await prisma.user.findMany();
    return allUsers;
};

export default function Index() {
    const data = useLoaderData();

    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <Form method="post">
                <p>
                    name <input type="text" name="name" />
                </p>
                <p>
                    email <input type="email" name="email" />
                </p>
                <p>
                    <button type="submit">Submit</button>
                </p>
            </Form>
        </div>
    );
}
