import styles from './Navbar.module.css';
import Grid2 from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import AppLogo from '../logo/AppLogo';
import UserMenu from '../user-menu/UserMenu';
import OfficeMenu from '../office-menu/OfficeMenu';
import { Tabs } from '@mui/material';
import LinkTab from '../link-tab/LinkTab';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const Navbar = (): JSX.Element => {
    const { t } = useTranslation();
    const [currentPage, setPage] = useState<number>(0);
    const handlePageChange = (
        _: React.SyntheticEvent,
        newValue: number
    ): void => {
        setPage(newValue);
    };
    return (
        <Box bgcolor="primary.dark" color="white">
            <Grid2 container className={styles.header}>
                <Grid2 xs={12} sm={6} className={styles.headerLogo}>
                    <AppLogo />
                </Grid2>
                <Grid2 xs={12} sm={6} className={styles.headerControls}>
                    <UserMenu />
                    <OfficeMenu />
                </Grid2>
                <Grid2 xs={12} className="flex-center">
                    <Tabs
                        variant="scrollable"
                        scrollButtons="auto"
                        color="secondary"
                        value={currentPage}
                        onChange={handlePageChange}
                    >
                        <LinkTab label={t('list.active_orders')} to="/home" />
                        <LinkTab
                            label={t('list.past_orders')}
                            to="/home?showPast=1"
                        />
                    </Tabs>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default Navbar;
