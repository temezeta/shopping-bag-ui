import { ArrowBackIosNew } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import AppLogo from '../logo/AppLogo';
import styles from './LoginLayout.module.css';

interface LoginLayoutProps {
    children?: JSX.Element;
    onBackButton?: () => void;
}

const LoginLayout = (props: LoginLayoutProps): JSX.Element => {
    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <AppLogo />
            </header>
            <div className={`${styles.contentContainer} flex-center`}>
                <div className={styles.formContainer}>
                    {props.onBackButton && (
                        <div>
                            <IconButton
                                onClick={props.onBackButton}
                                color="secondary"
                            >
                                <ArrowBackIosNew />
                            </IconButton>
                        </div>
                    )}
                    <div>{props.children}</div>
                </div>
            </div>
        </div>
    );
};

export default LoginLayout;
