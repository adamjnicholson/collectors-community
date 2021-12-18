import { ActionFunction, redirect, useActionData } from "remix";
import { z, ZodTypeAny } from "zod";

import prisma from "~/db";
import { Sidebar } from "~/modules/brand";
import { InputGroup, Input, Button, Form } from "~/modules/ui";
import { GetActionData } from "~/types";

type ActionData = GetActionData<"name" | "slug">;

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

type FieldNames<T extends ActionData> = keyof T["fields"];
type FormSchema<T extends ActionData> = Record<
    FieldNames<T>,
    {
        value: string | null;
        schema: ZodTypeAny;
    }
>;

const validateForm = <T extends ActionData>(validator: FormSchema<T>) => {
    const fieldNames = Object.keys(validator) as unknown as Array<
        keyof typeof validator
    >;

    return fieldNames.reduce<Pick<T, "fields" | "fieldErrors">>(
        (prev, curr) => {
            const { value, schema } = validator[curr];
            const parsedValue = schema.safeParse(value);

            const fields = {
                ...prev.fields,
                [curr]: value,
            };

            const fieldErrors = {
                ...prev.fieldErrors,
                [curr]: parsedValue.success ? "" : parsedValue.error.message,
            };

            return { fields, fieldErrors };
        },
        {
            fields: {},
            fieldErrors: {},
        }
    );
};

const isFormValid = <T extends ActionData>(fieldErrors: T["fieldErrors"]) =>
    Object.values(fieldErrors ?? {}).some((error) => !!error);

export const action: ActionFunction = async ({
    request,
}): Promise<Response | ActionData> => {
    const body = new URLSearchParams(await request.text());
    const name = body.get("name");
    const slug = body.get("slug");

    const { fields, fieldErrors } = validateForm<ActionData>({
        name: {
            value: name,
            schema: nameSchema,
        },
        slug: {
            value: slug,
            schema: slugSchema,
        },
    });

    if (!isFormValid(fieldErrors)) {
        return { fieldErrors, fields };
    }

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

export default function New() {
    const actionData = useActionData<ActionData | undefined>();

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
