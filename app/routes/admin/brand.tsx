import { Brand } from "@prisma/client";
import { LoaderFunction, Outlet, useLoaderData } from "remix";
import { prisma } from "../../db";

export let loader: LoaderFunction = async () => {
  let allBrands = await prisma.brand.findMany();

  return allBrands;
};

export default function Index() {
  let data = useLoaderData<Brand[]>();

  if (!data.length) {
    return <h1>You have no brands</h1>;
  }

  return (
    <section>
      {data.map((brand) => {
        return <li key={brand.uuid}>{brand.name}</li>;
      })}
      <Outlet />
    </section>
  );
}
