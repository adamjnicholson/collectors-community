import { Link } from "react-router-dom";

import { BUTTON_CLASSNAMES } from "~/modules/ui";

type LinkButtonProps = React.ComponentProps<typeof Link>;

export function LinkButton(props: LinkButtonProps) {
    return <Link className={BUTTON_CLASSNAMES} {...props} />;
}
