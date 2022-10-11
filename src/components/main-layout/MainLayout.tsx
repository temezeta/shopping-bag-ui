import styles from './MainLayout.module.css';
import Navbar from '../navbar/Navbar';

interface MainLayoutProps {
    children?: JSX.Element;
}

const MainLayout = (props: MainLayoutProps): JSX.Element => {
    return (
        <div className={styles.pageContainer}>
            <Navbar />
            <div className={styles.contentContainer}>
                <div className={styles.formContainer}>{props.children}</div>
            </div>
        </div>
    );
};

export default MainLayout;
