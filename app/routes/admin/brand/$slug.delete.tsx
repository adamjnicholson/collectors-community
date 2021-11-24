import { Brand } from "@prisma/client";
import { useParams } from "react-router-dom";
import {
    ActionFunction,
    Form,
    LoaderFunction,
    redirect,
    useCatch,
    useLoaderData,
} from "remix";

import prisma from "~/db";
import { Sidebar } from "~/modules/brand";
import { Text, Button } from "~/modules/ui";

export const action: ActionFunction = async ({ request }) => {
    const body = new URLSearchParams(await request.text());

    const uuid = body.get("uuid") ?? "";

    await prisma.brand.delete({
        where: {
            uuid,
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
            name: params.slug,
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
        <Sidebar title={` Delete ${brand.name}`}>
            <p>Are you sure that you want to delete {brand.name}?</p>
            <Form replace method="post">
                <input type="hidden" name="uuid" value={brand.uuid} />
                <div className="max-w-md pt-8">
                    <Button type="submit">Delete {brand.name}</Button>
                </div>
            </Form>
        </Sidebar>
    );
}

export function CatchBoundary() {
    const params = useParams();
    const caught = useCatch();

    switch (caught.status) {
        case 401:
        case 404:
            return (
                <Sidebar title={`The brand ${params.slug} does not exist`} />
            );

        default:
            throw new Error(
                `Unexpected caught response with status: ${caught.status}`
            );
    }
}
