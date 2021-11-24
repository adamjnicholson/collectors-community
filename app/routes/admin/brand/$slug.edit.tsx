import { Brand } from "@prisma/client";
import { Link, useParams } from "react-router-dom";
import {
    ActionFunction,
    Form,
    LoaderFunction,
    redirect,
    useCatch,
    useLoaderData,
} from "remix";

import prisma from "~/db";
import { Text, InputGroup, Input, Button, Icon } from "~/modules/ui";

export const action: ActionFunction = async ({ request }) => {
    const body = new URLSearchParams(await request.text());

    const name = body.get("name") ?? "";
    const uuid = body.get("uuid") ?? "";

    await prisma.brand.update({
        where: {
            uuid,
        },
        data: {
            name,
        },
    });

    return redirect("/admin/brand");
};

type LoaderData = {
    brand: Brand;
};

export const loader: LoaderFunction = async ({ params }) => {
    const brand = await prisma.brand.findFirst({
        where: {
            slug: params.slug,
        },
    });

    if (!brand) {
        throw new Response("Not Found", {
            status: 404,
        });
    }

    return { brand };
};

export default function Edit() {
    const { brand } = useLoaderData<LoaderData>();
    return (
        <aside className="bg-gray-100 min-h-screen w-1/3 p-8">
            <div className="flex">
                <Text as="h2" className="flex-grow">
                    Edit {brand.name}
                </Text>
                <Link to="/admin/brand">
                    <Icon size="lg" icon="faTimes" />
                </Link>
            </div>
            <Form replace method="post">
                <InputGroup htmlFor="name" label="Brand Name">
                    <input type="hidden" name="uuid" value={brand.uuid} />
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        defaultValue={brand.name}
                        placeholder="Pokemon"
                    />
                </InputGroup>
                <div className="max-w-md pt-8">
                    <Button type="submit">Edit {brand.name}</Button>
                </div>
            </Form>
        </aside>
    );
}

export function CatchBoundary() {
    const params = useParams();
    const caught = useCatch();

    switch (caught.status) {
        case 401:
        case 404:
            return (
                <aside className="bg-gray-100 min-h-screen w-1/3 p-8">
                    <Text as="h2">The brand {params.slug} does not exist</Text>
                </aside>
            );

        default:
            throw new Error(
                `Unexpected caught response with status: ${caught.status}`
            );
    }
}
