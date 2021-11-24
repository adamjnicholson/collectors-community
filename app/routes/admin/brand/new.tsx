import { Form, ActionFunction, redirect } from "remix";

import prisma from "~/db";
import { Sidebar } from "~/modules/brand";
import { InputGroup, Input, Button } from "~/modules/ui";

export const action: ActionFunction = async ({ request }) => {
    const body = new URLSearchParams(await request.text());

    const name = body.get("name") ?? "";
    const slug = body.get("slug") ?? "";

    await prisma.brand.create({
        data: {
            name,
            slug,
        },
    });

    return redirect("/admin/brand");
};

export default function New() {
    return (
        <Sidebar title="Create a new brand">
            <Form replace method="post">
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
