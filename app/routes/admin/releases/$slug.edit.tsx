import { Brand, Release } from "@prisma/client";
import { useParams } from "react-router-dom";
import { redirect, useActionData, useCatch, useLoaderData } from "remix";
import { z } from "zod";

import prisma from "~/db";
import {
    releaseBrandUuidSchema,
    releaseItemCountSchema,
    releaseNameSchema,
    releaseUuidSchema,
} from "~/modules/release/schema";
import { InputGroup, Input, Button, Form, Sidebar, Select } from "~/modules/ui";
import { validateForm } from "~/modules/utils/validateForm";
import {
    ActionData,
    ActionFormValidation,
    LoaderData,
    TypedActionFunction,
    TypedLoaderFunction,
} from "~/types/remix";

const formSchema = z.object({
    name: releaseNameSchema,
    maxCards: releaseItemCountSchema,
    brand: releaseBrandUuidSchema,
    uuid: releaseUuidSchema,
});

export const action: TypedActionFunction<
    ActionFormValidation<typeof formSchema>
> = async ({ request }) => {
    const body = new URLSearchParams(await request.text());

    const result = validateForm(
        {
            name: body.get("name"),
            uuid: body.get("uuid"),
            maxCards: parseInt(body.get("maxCards") ?? "", 10),
            brand: body.get("brand"),
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
    const { name, uuid, maxCards, brand } = fields;

    const existingReleases = await prisma.release.findMany({
        where: {
            OR: [
                {
                    name,
                },
                {
                    uuid,
                },
            ],
        },
    });

    if (existingReleases.length > 1) {
        return {
            fields,
            fieldErrors: {
                name: "Release name already exists",
            },
        };
    }

    if (!existingReleases[0].uuid) {
        return {
            fields,
            fieldErrors: {},
            formError: "Release does not exist",
        };
    }

    await prisma.release.update({
        where: {
            uuid,
        },
        data: {
            name,
            itemCount: maxCards,
            brandUuid: brand,
        },
    });

    return redirect("/admin/releases");
};

export const loader: TypedLoaderFunction<{
    release: Release;
    brands: Brand[];
}> = async ({ params }) => {
    const brands = await prisma.brand.findMany();
    const release = await prisma.release.findFirst({
        where: {
            slug: params.slug,
        },
    });

    if (!release) {
        throw new Response("Not Found", {
            status: 404,
        });
    }

    return { release, brands };
};

export default function Edit() {
    const actionData = useActionData<ActionData<typeof action>>();
    const { release, brands } = useLoaderData<LoaderData<typeof loader>>();

    return (
        <Sidebar title={`Edit ${release.name}`}>
            <Form method="post" context={actionData}>
                <div className="space-y-4">
                    <InputGroup htmlFor="name" label="Release Name">
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Base Set"
                            defaultValue={
                                actionData?.fields.name ?? release.name
                            }
                            required
                        />
                    </InputGroup>
                    <InputGroup htmlFor="maxCards" label="Cards in set">
                        <Input
                            id="maxCards"
                            type="text"
                            name="maxCards"
                            placeholder="base-set"
                            defaultValue={
                                actionData?.fields.maxCards ?? release.itemCount
                            }
                            required
                        />
                    </InputGroup>
                    <InputGroup htmlFor="brand" label="Brand">
                        <Select
                            id="brand"
                            name="brand"
                            required
                            defaultValue={
                                actionData?.fields.brand ?? release.brandUuid
                            }
                        >
                            {brands.map((brand) => (
                                <option value={brand.uuid}>{brand.name}</option>
                            ))}
                        </Select>
                    </InputGroup>
                </div>
                <input
                    type="hidden"
                    name="uuid"
                    value={release.uuid}
                    required
                />
                <div className="max-w-md pt-8">
                    <Button type="submit">Edit {release.name}</Button>
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
                <Sidebar title={`The release ${params.slug} does not exist`} />
            );

        default:
            throw new Error(
                `Unexpected caught response with status: ${caught.status}`
            );
    }
}
