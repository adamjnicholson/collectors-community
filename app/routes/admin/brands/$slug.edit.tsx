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
import { InputGroup, Input, Button, Form } from "~/modules/ui";
import { GetActionData } from "~/types";

function validateName(name: unknown) {
    if (typeof name !== "string" || name.length < 3) {
        return [`Brand names must be at least 3 characters long`];
    }

    return [];
}

function validateUuid(name: unknown) {
    if (typeof name !== "string" || name.length < 1) {
        return [`Form not submitted correctly`];
    }

    return [];
}

type ActionData = GetActionData<"name" | "uuid">;

export const action: ActionFunction = async ({
    request,
}): Promise<Response | ActionData> => {
    const body = new URLSearchParams(await request.text());

    const name = body.get("name");
    const uuid = body.get("uuid");

    if (typeof name !== "string" || typeof uuid !== "string") {
        return { formError: [`Form not submitted correctly.`] };
    }

    const fields = { name, uuid };
    const fieldErrors = {
        name: validateName(name),
    };
    const formError = validateUuid(uuid);

    if (
        Object.values(fieldErrors).some((error) => error.length > 0) ||
        formError.length > 0
    ) {
        return { formError, fieldErrors, fields };
    }

    const existingBrand = await prisma.brand.findUnique({
        where: {
            name,
        },
    });

    if (existingBrand) {
        return {
            fieldErrors: {
                name: ["Brand name already exists"],
            },
            fields,
        };
    }

    await prisma.brand.update({
        where: {
            uuid,
        },
        data: {
            name,
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
        <Sidebar title={`Edit ${brand.name}`}>
            <Form replace method="post" errors={actionData?.formError}>
                <InputGroup
                    htmlFor="name"
                    label="Brand Name"
                    errors={actionData}
                >
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
