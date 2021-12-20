import { Release } from "@prisma/client";
import { redirect, useActionData, useLoaderData } from "remix";
import { z } from "zod";

import prisma from "~/db";
import { releaseUuidSchema } from "~/modules/release/schema";
import { Form, Button, Sidebar } from "~/modules/ui";
import { validateForm } from "~/modules/utils/validateForm";
import {
    ActionData,
    ActionFormValidation,
    LoaderData,
    TypedActionFunction,
    TypedLoaderFunction,
} from "~/types/remix";

const formSchema = z.object({
    uuid: releaseUuidSchema,
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

    const existingRelease = await prisma.release.findUnique({
        where: {
            uuid: result.fieldErrors.uuid ?? "",
        },
    });

    if (!existingRelease) {
        return {
            fields: result.fields,
            fieldErrors: {},
            formError: "Release does not exist",
        };
    }

    await prisma.release.delete({
        where: {
            uuid: result.fields.uuid,
        },
    });

    return redirect("/admin/releases");
};

export const loader: TypedLoaderFunction<Release> = async ({ params }) => {
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

    return release;
};

export default function Edit() {
    const actionData = useActionData<ActionData<typeof action>>();
    const release = useLoaderData<LoaderData<typeof loader>>();

    return (
        <Sidebar title={` Delete ${release.name}`}>
            <p>Are you sure that you want to delete {release.name}?</p>
            <Form replace method="post" context={actionData}>
                <input
                    type="hidden"
                    name="uuid"
                    value={release.uuid}
                    required
                />
                <div className="max-w-md pt-8">
                    <Button type="submit">Delete {release.name}</Button>
                </div>
            </Form>
        </Sidebar>
    );
}
