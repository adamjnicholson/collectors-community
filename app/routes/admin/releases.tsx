import { Release } from "@prisma/client";
import { PropsWithChildren } from "react";
import { Outlet, useLoaderData, Link, useMatches } from "remix";

import prisma from "~/db";
import { Icon, Text, LinkButton } from "~/modules/ui";
import { LoaderData, TypedLoaderFunction } from "~/types/remix";

function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <div className="flex">
            <section className="flex-grow py-8 px-16">{children}</section>
            <Outlet />
        </div>
    );
}

function AddReleaseButton() {
    const matches = useMatches();
    const lastMatch = matches[matches.length - 1];
    const isIndexRoute = lastMatch.pathname === "/admin/releases";

    if (!isIndexRoute) {
        return null;
    }

    return (
        <div className="pt-8">
            <LinkButton to="new">
                <Icon icon="faPlus" /> Add Release
            </LinkButton>
        </div>
    );
}

export const loader: TypedLoaderFunction<Release[]> = async () => {
    const allReleases = await prisma.release.findMany();

    return allReleases;
};

export default function Index() {
    const releases = useLoaderData<LoaderData<typeof loader>>();

    if (!releases.length) {
        return (
            <Layout>
                <Text as="h2">You have no releases</Text>
                <AddReleaseButton />
            </Layout>
        );
    }

    return (
        <Layout>
            <Text as="h2">Releases</Text>
            <ul className="space-y-2">
                {releases.map((release) => (
                    <li
                        key={release.uuid}
                        className="border-b border-gray-200 block"
                    >
                        <div className="flex">
                            <span className="pb-2 block flex-grow">
                                {release.name}
                            </span>
                            <nav>
                                <ul className="flex space-x-4">
                                    <li>
                                        <Link to={`${release.slug}/edit`}>
                                            <Icon icon="faPencilAlt" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`${release.slug}/delete`}>
                                            <Icon icon="faTrash" />
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </li>
                ))}
            </ul>
            <AddReleaseButton />
        </Layout>
    );
}
