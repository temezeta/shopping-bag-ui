import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/user/user-slice';
import DropdownMenu, { DropdownMenuItem } from '../dropdown-menu/DropdownMenu';

const UserMenu = (): JSX.Element | null => {
    const user = useAppSelector(selectCurrentUser);
    const { t } = useTranslation();

    const items: DropdownMenuItem[] = [
        {
            title: t('user.account_settings'),
        },
        {
            title: t('actions.logout'),
        },
    ];

    return user ? (
        <DropdownMenu
            title={`${user?.firstName} ${user?.lastName}`}
            items={items}
        />
    ) : null;
};

export default UserMenu;
