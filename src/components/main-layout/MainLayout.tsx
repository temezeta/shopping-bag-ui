import styles from './MainLayout.module.css';
import Navbar from '../navbar/Navbar';
import { CSSProperties } from 'react';
import { IconButton } from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';

interface MainLayoutProps {
    width?: CSSProperties['width'];
    children?: JSX.Element;
    onBackButton?: () => void;
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

export default MainLayout;
