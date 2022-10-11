import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectCurrentUser } from '../../store/user/user-slice';

interface AuthGuardProps {
    roles?: string[];
}

const AuthGuard = (props: AuthGuardProps): JSX.Element => {
    const currentUser = useSelector(selectCurrentUser);
    const location = useLocation();

    /**
     * Checks if user is logged in AND if role is required, checks that user has that role
     */
    const hasAccess = (): boolean => {
        const requiredRoles = props.roles;
        if (!currentUser) {
            return false;
        } else if (requiredRoles) {
            return currentUser.userRoles.some((it) =>
                requiredRoles.includes(it.roleName)
            );
        }
        return true;
    };

    return hasAccess() ? (
        <Outlet />
    ) : (
        <Navigate to={''} state={{ from: location }} replace />
    );
};

export default AuthGuard;
