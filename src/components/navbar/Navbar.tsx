import styles from './Navbar.module.css';
import Grid2 from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import AppLogo from '../logo/AppLogo';
import UserMenu from '../user-menu/UserMenu';

const Navbar = (): JSX.Element => {
    return (
        <Box bgcolor="primary.dark" color="white">
            <Grid2 container className={styles.header}>
                <Grid2 xs={12} sm={6} className={styles.headerLogo}>
                    <AppLogo />
                </Grid2>
                <Grid2 xs={12} sm={6} className={styles.headerControls}>
                    <UserMenu />
                    <div>OfficeDropdown</div>
                </Grid2>
                <Grid2 xs={12} className="flex-center">
                    <div>NavComponent</div>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default Navbar;
