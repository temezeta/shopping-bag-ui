import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectCurrentUser } from '../../store/user/user-slice';

interface AuthGuardProps {
    roles?: string[];
}

const AuthGuard = (props: AuthGuardProps): JSX.Element => {
    const currentUser = useSelector(selectCurrentUser);
    const location = useLocation();
    const { t } = useTranslation();

    /**
     * 1. If user is not logged in -> redirect to login
     * 2. If user is logged in but doesn't have appropriate role -> show error
     * 3. If user has appropriate role -> show page
     */
    const getAuthorizedRoute = (): JSX.Element => {
        const requiredRoles = props.roles;
        if (!currentUser) {
            return (
                <Navigate to={'/login'} state={{ from: location }} replace />
            );
        } else if (
            requiredRoles &&
            !currentUser.userRoles.some((it) =>
                requiredRoles.includes(it.roleName)
            )
        ) {
            return <div>{t('errors.access_denied')}</div>;
        }
        return <Outlet />;
    };

    return getAuthorizedRoute();
};

export default AuthGuard;
