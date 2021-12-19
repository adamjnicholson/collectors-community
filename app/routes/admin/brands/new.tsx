import { ActionFunction, redirect, useActionData } from "remix";
import { z } from "zod";

import prisma from "~/db";
import { Sidebar } from "~/modules/brand";
import { InputGroup, Input, Button, Form } from "~/modules/ui";
import { Awaited, GetActionData } from "~/types";

type ActionFunctionArgs = Parameters<ActionFunction>[0];

const nameSchema = z
    .string({
        required_error: "Brand name is required",
        invalid_type_error: "Brand name must only contain letters",
    })
    .min(3, {
        message: "Brand names must be atleast 3 characters long",
    });

const slugSchema = z
    .string({
        required_error: "A slug is required",
        invalid_type_error: "A slug must only contain letters",
    })
    .min(3, {
        message: "A slug must be atleast 3 characters long",
    });

const formSchema = z.object({
    name: nameSchema,
    slug: slugSchema,
});

const validateForm = <
    Fields extends Record<string, string | number | boolean | null | undefined>,
    Schema extends z.ZodObject<{
        [Key in keyof Fields]: z.ZodType<NonNullable<Fields[Key]>>;
    }>
>(
    fields: Fields,
    schema: Schema
) => {
    const result = schema.safeParse(fields);

    if (!result.success) {
        return {
            success: result.success,
            fields,
            fieldErrors: result.error.issues.reduce(
                (fieldErrors, error) => ({
                    ...fieldErrors,
                    [error.path[0]]: error.message,
                }),
                fields
            ),
        };
    }

    return {
        success: result.success,
        fields: result.data,
        fieldErrors: fields,
    };
};

export const action = async ({
    request,
}: ActionFunctionArgs): Promise<
    Response | GetActionData<typeof formSchema>
> => {
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

    return redirect("/admin/brand");
};

type ActionFormValidation<
    T extends (args: ActionFunctionArgs) => Promise<Response | GetActionData>,
    Returned = Awaited<ReturnType<T>>
> = Returned extends Response ? never : Returned;

const useTypedActionData = <Action extends ActionFunction>() =>
    useActionData<ActionFormValidation<Action> | undefined>();

export default function New() {
    const actionData = useTypedActionData<typeof action>();

    return (
        <Sidebar title="Create a new brand">
            <Form method="post" errors={actionData?.formError}>
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
                            defaultValue={actionData?.fields?.name ?? ""}
                            placeholder="Pokemon"
                        />
                    </InputGroup>
                    <InputGroup htmlFor="slug" label="Slug" errors={actionData}>
                        <Input
                            id="slug"
                            type="text"
                            name="slug"
                            defaultValue={actionData?.fields?.slug ?? ""}
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
