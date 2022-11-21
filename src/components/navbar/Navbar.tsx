import styles from './Navbar.module.css';
import Grid2 from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import AppLogo from '../logo/AppLogo';
import UserMenu from '../user-menu/UserMenu';
import OfficeMenu from '../office-menu/OfficeMenu';
import { Tabs } from '@mui/material';
import LinkTab from '../link-tab/LinkTab';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DropdownMenu from '../dropdown-menu/DropdownMenu';
import { isAdmin } from '../../utility/user-helper';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/user/user-slice';
import { selectShoppingListById } from '../../store/shopping-list/shopping-list-slice';

const Navbar = (): JSX.Element => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const user = useAppSelector(selectCurrentUser);
    const pathArray = location.pathname.split('/');
    let listOrdered: boolean | undefined;

    if (location.pathname.startsWith('/order')) {
        const list = useAppSelector(
            selectShoppingListById(Number(pathArray[2]))
        );
        listOrdered = list?.ordered;
    }

    useEffect(() => {
        const path = location.pathname;

        if (
            path.startsWith('/home') ||
            path.startsWith('/orders') ||
            listOrdered === false
        ) {
            setPage(0);
        } else if (path.startsWith('/past-orders') || listOrdered === true) {
            setPage(1);
        } else if (isAdmin(user) && path.startsWith('/management')) {
            setPage(2);
        } else {
            setPage(false);
        }
    }, [location.pathname]);

    const [currentPage, setPage] = useState<number | false>(false);

    return (
        <Box bgcolor="primary.dark" color="white">
            <Grid2 container className={styles.header}>
                <Grid2 xs={8} sm={6} className={styles.headerLogo}>
                    <AppLogo />
                </Grid2>
                <Grid2 xs={4} sm={6} className={styles.headerControls}>
                    <UserMenu />
                    <OfficeMenu />
                </Grid2>
                <Grid2 xs={12} className="flex-center">
                    <Tabs
                        variant="scrollable"
                        scrollButtons="auto"
                        color="secondary"
                        value={currentPage}
                    >
                        <LinkTab label={t('list.active_orders')} to="/home" />
                        <LinkTab
                            label={t('list.past_orders')}
                            to="/past-orders"
                        />
                        {isAdmin(user) && (
                            <DropdownMenu
                                title={t('management.management')}
                                items={[
                                    {
                                        title: t('management.offices'),
                                        onClick: () =>
                                            navigate('/management/offices'),
                                    },
                                    {
                                        title: t('management.users'),
                                        onClick: () =>
                                            navigate('/management/users'),
                                    },
                                ]}
                                isTab
                            />
                        )}
                    </Tabs>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default Navbar;
