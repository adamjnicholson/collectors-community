import { Brand } from "@prisma/client";
import { useParams } from "react-router-dom";
import { redirect, useActionData, useCatch, useLoaderData } from "remix";
import { z } from "zod";

import prisma from "~/db";
import { brandNameSchema, brandUuidSchema } from "~/modules/brand/schema";
import { InputGroup, Input, Button, Form, Sidebar } from "~/modules/ui";
import { validateForm } from "~/modules/utils/validateForm";
import {
    ActionData,
    ActionFormValidation,
    LoaderData,
    TypedActionFunction,
    TypedLoaderFunction,
} from "~/types/remix";

const formSchema = z.object({
    name: brandNameSchema,
    uuid: brandUuidSchema,
});

export const action: TypedActionFunction<
    ActionFormValidation<typeof formSchema>
> = async ({ request }) => {
    const body = new URLSearchParams(await request.text());

    const result = validateForm(
        {
            name: body.get("name"),
            uuid: body.get("uuid"),
        },
        formSchema
    );

    if (!result.success) {
        return {
            formError: result.fieldErrors.uuid,
            fields: result.fields,
            fieldErrors: result.fieldErrors,
        };
    }

    const { fields } = result;
    const { name, uuid } = fields;

    const existingBrand = await prisma.brand.findUnique({
        where: {
            name,
        },
    });

    if (existingBrand) {
        return {
            fieldErrors: {
                name: "Brand name already exists",
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

export const loader: TypedLoaderFunction<Brand> = async ({ params }) => {
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

    return brand;
};

export default function Edit() {
    const actionData = useActionData<ActionData<typeof action>>();
    const brand = useLoaderData<LoaderData<typeof loader>>();

    return (
        <Sidebar title={`Edit ${brand.name}`}>
            <Form replace method="post" context={actionData}>
                <InputGroup htmlFor="name" label="Brand Name">
                    <input
                        type="hidden"
                        name="uuid"
                        value={brand.uuid}
                        required
                    />
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Pokemon"
                        defaultValue={actionData?.fields.name ?? brand.name}
                        required
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
