import { Brand } from "@prisma/client";
import {
    redirect,
    useActionData,
    useCatch,
    useLoaderData,
    useParams,
} from "remix";
import { z } from "zod";

import prisma from "~/db";
import { Sidebar } from "~/modules/brand";
import { brandUuidSchema } from "~/modules/brand/schema";
import { Form, Button } from "~/modules/ui";
import { validateForm } from "~/modules/utils/validateForm";
import {
    ActionData,
    ActionFormValidation,
    LoaderData,
    TypedActionFunction,
    TypedLoaderFunction,
} from "~/types/remix";

const formSchema = z.object({
    uuid: brandUuidSchema,
});

export const action: TypedActionFunction<
    ActionFormValidation<typeof formSchema>
> = async ({ request }) => {
    const body = new URLSearchParams(await request.text());

    const result = validateForm(
        {
            uuid: body.get("uuid"),
        },
        formSchema
    );

    if (!result.success) {
        return {
            formError: result.fieldErrors.uuid,
            fieldErrors: {},
            fields: result.fieldErrors,
        };
    }

    try {
        await prisma.brand.delete({
            where: {
                uuid: result.fields.uuid,
            },
        });

        return redirect("/admin/brands");
    } catch (e) {
        throw new Response("Not Found", {
            status: 404,
        });
    }
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
        <Sidebar title={` Delete ${brand.name}`}>
            <p>Are you sure that you want to delete {brand.name}?</p>
            <Form replace method="post" context={actionData}>
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
