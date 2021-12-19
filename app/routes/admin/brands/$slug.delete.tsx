import { Brand } from "@prisma/client";
import { useParams } from "react-router-dom";
import {
    ActionFunction,
    LoaderFunction,
    redirect,
    useActionData,
    useCatch,
    useLoaderData,
} from "remix";

import prisma from "~/db";
import { Sidebar } from "~/modules/brand";
import { Form, Button } from "~/modules/ui";
import { GetActionData } from "~/types";

function validateUuid(name: unknown) {
    if (typeof name !== "string" || name.length < 1) {
        return [`Form not submitted correctly`];
    }

    return [];
}

type ActionData = GetActionData<"uuid">;

export const action: ActionFunction = async ({
    request,
}): Promise<Response | ActionData> => {
    const body = new URLSearchParams(await request.text());

    const uuid = body.get("uuid") ?? "";

    const fields = { uuid };

    const formError = validateUuid(uuid);

    if (formError.length > 0) {
        return {
            formError,
            fields,
        };
    }

    await prisma.brand.delete({
        where: {
            uuid,
        },
    });

    return redirect("/admin/brands");
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
    const actionData = useActionData<ActionData>();
    const { brand } = useLoaderData<LoaderData>();

    return (
        <Sidebar title={` Delete ${brand.name}`}>
            <p>Are you sure that you want to delete {brand.name}?</p>
            <Form replace method="post" errors={actionData?.formError}>
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
