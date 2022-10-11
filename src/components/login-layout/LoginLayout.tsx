import AppLogo from '../logo/AppLogo';
import styles from './LoginLayout.module.css';

interface LoginLayoutProps {
    children?: JSX.Element;
}

const LoginLayout = (props: LoginLayoutProps): JSX.Element => {
    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <AppLogo />
            </header>
            <div className={`${styles.contentContainer} flex-center`}>
                <div className={styles.formContainer}>{props.children}</div>
            </div>
        </div>
    );
};

export default LoginLayout;
