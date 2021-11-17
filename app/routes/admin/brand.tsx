import { Brand } from "@prisma/client";
import { LoaderFunction, Outlet, useLoaderData } from "remix";
import { prisma } from "../../db";

export const loader: LoaderFunction = async () => {
    const allBrands = await prisma.brand.findMany();

    return allBrands;
};

function Index() {
    const data = useLoaderData<Brand[]>();

    if (!data.length) {
        return <h1>You have no brands</h1>;
    }

    return (
        <section>
            {data.map((brand) => (
                <li key={brand.uuid}>{brand.name}</li>
            ))}
            <Outlet />
        </section>
    );
}

export default Index;
