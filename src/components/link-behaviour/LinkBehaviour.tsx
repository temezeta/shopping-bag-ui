import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { ForwardedRef, forwardRef } from 'react';

type LinkBehaviorProps = Omit<RouterLinkProps, 'to'> & {
    href: RouterLinkProps['to'];
};

const LinkBehaviour = (
    props: LinkBehaviorProps,
    ref: ForwardedRef<HTMLAnchorElement>
): JSX.Element => {
    const { href, ...other } = props;
    // Map href (MUI) -> to (react-router)
    return <RouterLink ref={ref} to={href} {...other} />;
};

export default forwardRef(LinkBehaviour);
