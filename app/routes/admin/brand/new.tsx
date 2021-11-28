import { ActionFunction, redirect, useActionData } from "remix";

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

function validateSlug(slug: unknown) {
    if (typeof slug !== "string" || slug.length < 3) {
        return [`Slugs must be at least 3 characters long`];
    }

    return [];
}

type ActionData = GetActionData<"name" | "slug">;

export const action: ActionFunction = async ({
    request,
}): Promise<Response | ActionData> => {
    const body = new URLSearchParams(await request.text());

    const name = body.get("name");
    const slug = body.get("slug");

    if (typeof name !== "string" || typeof slug !== "string") {
        return { formError: [`Form not submitted correctly.`] };
    }

    const fields = { name, slug };
    const fieldErrors = {
        name: validateName(name),
        slug: validateSlug(slug),
    };

    if (Object.values(fieldErrors).some(Boolean))
        return { fieldErrors, fields };

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
            fieldErrors.slug = ["Slug already exists"];
        }

        if (existingBrand.name === name) {
            fieldErrors.name = ["Brand name already exists"];
        }

        return { fields, fieldErrors };
    }

    await prisma.brand.create({
        data: {
            name,
            slug,
        },
    });
    return redirect("/admin/brand");
};

export default function New() {
    const actionData = useActionData<ActionData | undefined>();

    return (
        <Sidebar title="Create a new brand">
            <Form replace method="post" errors={actionData?.formError}>
                <div className="space-y-4">
                    <InputGroup
                        htmlFor="name"
                        label="Brand Name"
                        errors={actionData}
                    >
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            defaultValue={actionData?.fields?.name}
                            placeholder="Pokemon"
                        />
                    </InputGroup>
                    <InputGroup htmlFor="slug" label="Slug" errors={actionData}>
                        <Input
                            id="slug"
                            type="text"
                            name="slug"
                            defaultValue={actionData?.fields?.slug}
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
