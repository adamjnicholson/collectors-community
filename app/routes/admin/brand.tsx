import { Brand } from "@prisma/client";
import { useMatch } from "react-router-dom";
import { LoaderFunction, Outlet, useLoaderData } from "remix";

import prisma from "~/db";
import { Icon, LinkButton, Text } from "~/modules/ui";

export const loader: LoaderFunction = async () => {
    const allBrands = await prisma.brand.findMany();

    return allBrands;
};

export default function Index() {
    const isIndexRoute = useMatch("/admin/brand");

    const data = useLoaderData<Brand[]>();

    if (!data.length) {
        return <h1>You have no brands</h1>;
    }

    return (
        <div className="flex">
            <section className="flex-grow py-8 px-16">
                <Text as="h2">Brands</Text>
                <ul className="space-y-2">
                    {data.map((brand) => (
                        <li
                            key={brand.uuid}
                            className="border-b border-gray-200 block"
                        >
                            <span className="pb-2 block">{brand.name}</span>
                        </li>
                    ))}
                </ul>
                {isIndexRoute ? (
                    <div className="pt-8">
                        <LinkButton to="new">
                            <Icon icon="faPlus" /> Add Brand
                        </LinkButton>
                    </div>
                ) : null}
            </section>
            <Outlet />
        </div>
    );
}
