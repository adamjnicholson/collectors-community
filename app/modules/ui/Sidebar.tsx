import { PropsWithChildren } from "react";
import { Link } from "remix";

import { Text, Icon } from "~/modules/ui";

type Props = PropsWithChildren<{
    title: string;
}>;

function SidebarTitle(props: PropsWithChildren<unknown>) {
    return <Text as="h2" className="flex-grow" {...props} />;
}

export function Sidebar({ children, title }: Props) {
    return (
        <aside className="bg-gray-100 min-h-screen w-1/3 p-8">
            <div className="flex">
                <SidebarTitle>{title}</SidebarTitle>
                <Link to="/admin/brands">
                    <Icon size="lg" icon="faTimes" />
                </Link>
            </div>
            {children}
        </aside>
    );
}
