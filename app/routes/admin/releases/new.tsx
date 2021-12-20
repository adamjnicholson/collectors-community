import { Brand } from "@prisma/client";
import { redirect, useActionData, useLoaderData } from "remix";
import { z } from "zod";

import prisma from "~/db";
import {
    releaseBrandUuidSchema,
    releaseItemCountSchema,
    releaseNameSchema,
    releaseSlugSchema,
} from "~/modules/release/schema";
import { Form, InputGroup, Input, Select, Button, Sidebar } from "~/modules/ui";
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
    slug: releaseSlugSchema,
    maxCards: releaseItemCountSchema,
    brand: releaseBrandUuidSchema,
});

export const action: TypedActionFunction<
    ActionFormValidation<typeof formSchema>
> = async ({ request }) => {
    const body = new URLSearchParams(await request.text());

    const result = validateForm(
        {
            name: body.get("name"),
            slug: body.get("slug"),
            maxCards: parseInt(body.get("maxCards") ?? "", 10),
            brand: body.get("brand"),
        },
        formSchema
    );

    if (!result.success) {
        return {
            fields: result.fields,
            fieldErrors: result.fieldErrors,
        };
    }

    const { fields, fieldErrors } = result;
    const { name, slug, maxCards, brand } = fields;

    const existingRelease = await prisma.release.findFirst({
        where: {
            OR: [
                {
                    name,
                },
                {
                    slug,
                },
            ],
        },
    });

    if (existingRelease) {
        if (existingRelease.slug === slug) {
            fieldErrors.slug = "Slug already exists";
        }

        if (existingRelease.name === name) {
            fieldErrors.name = "Release name already exists";
        }

        return { fields, fieldErrors };
    }

    await prisma.release.create({
        data: {
            name,
            slug,
            itemCount: +maxCards,
            brandUuid: brand,
        },
    });

    return redirect("/admin/releases");
};

export const loader: TypedLoaderFunction<Brand[]> = async () => {
    const allBrands = await prisma.brand.findMany();

    return allBrands;
};

export default function New() {
    const actionData = useActionData<ActionData<typeof action>>();
    const brands = useLoaderData<LoaderData<typeof loader>>();

    return (
        <Sidebar title="Create a new release">
            <Form method="post" context={actionData}>
                <div className="space-y-4">
                    <InputGroup htmlFor="name" label="Release Name">
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Base Set"
                            required
                        />
                    </InputGroup>
                    <InputGroup htmlFor="slug" label="Slug">
                        <Input
                            id="slug"
                            type="text"
                            name="slug"
                            placeholder="base-set"
                            required
                        />
                    </InputGroup>
                    <InputGroup htmlFor="maxCards" label="Cards in set">
                        <Input
                            id="maxCards"
                            type="text"
                            name="maxCards"
                            placeholder="base-set"
                            required
                        />
                    </InputGroup>
                    <InputGroup htmlFor="brand" label="Brand">
                        <Select id="brand" name="brand" required>
                            {brands.map((brand) => (
                                <option value={brand.uuid}>{brand.name}</option>
                            ))}
                        </Select>
                    </InputGroup>
                </div>
                <div className="max-w-md pt-8">
                    <Button type="submit">Create brand</Button>
                </div>
            </Form>
        </Sidebar>
    );
}
