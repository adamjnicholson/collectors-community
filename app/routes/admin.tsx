import { Outlet, Link } from "remix";

import { Text } from "~/modules/ui";

export default function Index() {
    return (
        <section className="flex min-h-screen">
            {/* TODO replace with sidebar */}
            <aside className="bg-gray-100 min-h-screen w-1/6 p-8">
                <Text as="h2">Categories</Text>
                <nav>
                    <ul>
                        <li className="font-bold text-blue-700 tracking-wide">
                            <Link to="brands">Brands</Link>
                        </li>
                        <li className="font-bold text-blue-700 tracking-wide">
                            <Link to="releases">Releases</Link>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className=" flex-grow">
                <Outlet />
            </main>
        </section>
    );
}
