import { redirect, useActionData } from "remix";
import { z } from "zod";

import prisma from "~/db";
import { Sidebar } from "~/modules/brand";
import { brandNameSchema, brandSlugSchema } from "~/modules/brand/schema";
import { InputGroup, Input, Button, Form } from "~/modules/ui";
import { validateForm } from "~/modules/utils/validateForm";
import {
    ActionData,
    ActionFormValidation,
    TypedActionFunction,
} from "~/types/remix";

const formSchema = z.object({
    name: brandNameSchema,
    slug: brandSlugSchema,
});

export const action: TypedActionFunction<
    ActionFormValidation<typeof formSchema>
> = async ({ request }) => {
    const body = new URLSearchParams(await request.text());

    const result = validateForm(
        { name: body.get("name"), slug: body.get("slug") },
        formSchema
    );

    if (!result.success) {
        return {
            fields: result.fields,
            fieldErrors: result.fieldErrors,
        };
    }

    const { fields, fieldErrors } = result;
    const { name, slug } = fields;

    const existingBrand = await prisma.brand.findFirst({
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

    if (existingBrand) {
        if (existingBrand.slug === slug) {
            fieldErrors.slug = "Slug already exists";
        }

        if (existingBrand.name === name) {
            fieldErrors.name = "Brand name already exists";
        }

        return { fields, fieldErrors };
    }

    await prisma.brand.create({
        data: {
            name,
            slug,
        },
    });

    return redirect("/admin/brands");
};

export default function New() {
    const actionData = useActionData<ActionData<typeof action>>();

    return (
        <Sidebar title="Create a new brand">
            <Form method="post" context={actionData}>
                <div className="space-y-4">
                    <InputGroup htmlFor="name" label="Brand Name">
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Pokemon"
                        />
                    </InputGroup>
                    <InputGroup htmlFor="slug" label="Slug">
                        <Input
                            id="slug"
                            type="text"
                            name="slug"
                            placeholder="pokemon"
                        />
                    </InputGroup>
                </div>
                <div className="max-w-md pt-8">
                    <Button type="submit">Create brand</Button>
                </div>
            </Form>
        </Sidebar>
    );
}
