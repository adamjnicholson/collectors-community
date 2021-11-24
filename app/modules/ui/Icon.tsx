import {
    faPlus,
    faTimes,
    faPencilAlt,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
    FontAwesomeIcon,
    FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

import { Override } from "~/types";

const ICONS = {
    faPlus,
    faTimes,
    faPencilAlt,
    faTrash,
};

type Props = Override<
    FontAwesomeIconProps,
    {
        icon: keyof typeof ICONS;
    }
>;

export function Icon({ icon, ...props }: Props) {
    return <FontAwesomeIcon icon={ICONS[icon]} {...props} />;
}
