import styles from './MainLayout.module.css';
import Navbar from '../navbar/Navbar';
import { CSSProperties, useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { refreshTokenAsync } from '../../store/auth/auth-slice';

interface MainLayoutProps {
    width?: CSSProperties['width'];
    children?: JSX.Element;
}

const MainLayout = (props: MainLayoutProps): JSX.Element => {
    const dispatch = useAppDispatch();

    const getRefreshToken = (): void => {
        const expiredToken = localStorage.getItem('authToken');
        if (expiredToken) {
            void dispatch(refreshTokenAsync({ expiredToken }));
        }
    };

    // Call refresh token every 5 minutes
    useEffect(() => {
        const timer = setInterval(getRefreshToken, 300000);
        return () => clearInterval(timer);
    });

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
