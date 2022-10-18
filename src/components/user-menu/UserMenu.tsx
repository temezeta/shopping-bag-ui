import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { logoutAsync } from '../../store/auth/auth-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/user/user-slice';
import DropdownMenu, { DropdownMenuItem } from '../dropdown-menu/DropdownMenu';

const UserMenu = (): JSX.Element | null => {
    const user = useAppSelector(selectCurrentUser);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logout = async (): Promise<void> => {
        await dispatch(logoutAsync());
        navigate('/login');
    };

    const items: DropdownMenuItem[] = [
        {
            title: t('user.account_settings'),
            onClick: () => navigate('/account-settings'),
        },
        {
            title: t('actions.logout'),
            onClick: logout,
        },
    ];

    return user ? (
        <DropdownMenu
            title={`${user.firstName} ${user.lastName}`}
            items={items}
        />
    ) : null;
};

export default UserMenu;
