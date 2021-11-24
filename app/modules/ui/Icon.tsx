import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
    FontAwesomeIcon,
    FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

import { Override } from "~/types";

const ICONS = {
    faPlus,
    faTimes,
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
