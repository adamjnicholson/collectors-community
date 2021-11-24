import { Link } from "react-router-dom";
import { Form, ActionFunction, redirect } from "remix";

import prisma from "~/db";
import { InputGroup, Input, Button, Icon, Text } from "~/modules/ui";

export const action: ActionFunction = async ({ request }) => {
    const body = new URLSearchParams(await request.text());

    const brandName = body.get("name");

    if (typeof brandName !== "string") {
        return {
            fieldErrors: {
                name: "Please enter a valid brand name",
            },
        };
    }

    await prisma.brand.create({
        data: {
            name: brandName,
        },
    });

    return redirect("/admin/brand");
};

export default function New() {
    return (
        <aside className="bg-gray-100 min-h-screen w-1/3 p-8">
            <div className="flex">
                <Text as="h2" className="flex-grow">
                    Create a new brand
                </Text>
                <Link to="/admin/brand">
                    <Icon size="lg" icon="faTimes" />
                </Link>
            </div>
            <Form replace method="post">
                <InputGroup htmlFor="name" label="Brand Name">
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Pokemon"
                    />
                </InputGroup>
                <div className="max-w-md pt-8">
                    <Button type="submit">Create brand</Button>
                </div>
            </Form>
        </aside>
    );
}
