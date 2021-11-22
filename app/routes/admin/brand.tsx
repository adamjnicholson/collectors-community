import { Brand } from "@prisma/client";
import { LoaderFunction, Outlet, useLoaderData } from "remix";

import prisma from "~/db";
import Text from "~/modules/ui/Text";

export const loader: LoaderFunction = async () => {
    const allBrands = await prisma.brand.findMany();

    return allBrands;
};

export default function Index() {
    const data = useLoaderData<Brand[]>();

    if (!data.length) {
        return <h1>You have no brands</h1>;
    }

    return (
        <>
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
            <Outlet />
        </>
    );
}
