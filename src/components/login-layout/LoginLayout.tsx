import { Typography } from '@mui/material';
import styles from './LoginLayout.module.css';

interface LoginLayoutProps {
    children?: JSX.Element;
}

const LoginLayout = (props: LoginLayoutProps): JSX.Element => {
    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <Typography variant="h3" fontWeight="bold">
                    Huld - Shopping bag
                </Typography>
            </header>
            <div className={`${styles.contentContainer} flex-center`}>
                <div className={styles.formContainer}>{props.children}</div>
            </div>
        </div>
    );
};

export default LoginLayout;
