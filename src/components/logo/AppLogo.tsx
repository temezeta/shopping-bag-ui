import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { ReactComponent as HuldLogo } from '../../resources/img/huld_logo_blue.svg';
import styles from './AppLogo.module.css';

const AppLogo = (): JSX.Element => {
    return (
        <div>
            <Box
                className={styles.logoWrapper}
                display={{ xs: 'none', sm: 'flex' }}
            >
                <SvgIcon
                    component={HuldLogo}
                    inheritViewBox
                    sx={{ fontSize: '70px', height: 'fit-content' }}
                />
                <Typography component="span" variant="h3" fontWeight="bold">
                    - Shopping bag
                </Typography>
            </Box>
            <Box display={{ xs: 'inline', sm: 'none' }}>
                <div>
                    <Typography
                        component="span"
                        variant="body2"
                        fontWeight="bold"
                    >
                        Huld
                    </Typography>
                </div>
                <div>
                    <Typography
                        component="span"
                        variant="body2"
                        fontWeight="bold"
                    >
                        Shopping bag
                    </Typography>
                </div>
            </Box>
        </div>
    );
};

export default AppLogo;
