import styles from './MainLayout.module.css';
import Navbar from '../navbar/Navbar';
import { CSSProperties } from 'react';

interface MainLayoutProps {
    width?: CSSProperties['width'];
    children?: JSX.Element;
}

const MainLayout = (props: MainLayoutProps): JSX.Element => {
    return (
        <div className={styles.pageContainer}>
            <Navbar />
            <div className={styles.contentContainer}>
                <div
                    className={styles.formContainer}
                    style={{
                        width: props.width,
                    }}
                >
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
