import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { refreshTokenAsync } from '../../store/auth/auth-slice';
import { useAppDispatch } from '../../store/hooks';
import { getCurrentUserAsync } from '../../store/user/user-slice';

interface LocationState {
    from?: Location;
}

const SessionGuard = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const restoreUserSession = async (): Promise<void> => {
            const expiredToken = localStorage.getItem('authToken');
            let isSuccess = false;
            if (expiredToken) {
                try {
                    unwrapResult(
                        await dispatch(refreshTokenAsync({ expiredToken }))
                    );
                    unwrapResult(await dispatch(getCurrentUserAsync()));
                    isSuccess = true;
                    const prevLoc = (
                        location.state as LocationState | undefined
                    )?.from;
                    navigate(prevLoc ? prevLoc.pathname : '/home');
                } catch {}
            }

            if (!isSuccess) {
                navigate('/login');
            }
        };

        void restoreUserSession();
    }, []);

    return <></>;
};

export default SessionGuard;
