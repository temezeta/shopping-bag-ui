import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { refreshTokenAsync } from '../../store/auth/auth-slice';
import { useAppDispatch } from '../../store/hooks';
import { getCurrentUserAsync } from '../../store/user/user-slice';

const SessionGuard = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const getRedirect = (): string | undefined => {
        const from = location.state?.from as Location | undefined;
        if (from) {
            return from.pathname + from.search;
        }
        return undefined;
    };

    useEffect(() => {
        const restoreUserSession = async (): Promise<void> => {
            const expiredToken = localStorage.getItem('authToken');
            const redirect = getRedirect();
            let isSuccess = false;
            if (expiredToken) {
                try {
                    unwrapResult(
                        await dispatch(refreshTokenAsync({ expiredToken }))
                    );
                    unwrapResult(await dispatch(getCurrentUserAsync()));
                    isSuccess = true;
                    navigate(redirect ?? '/home');
                } catch {}
            }

            if (!isSuccess) {
                navigate(redirect ? `/login?redirect=${redirect}` : `/login`);
            }
        };

        void restoreUserSession();
    }, []);

    return <></>;
};

export default SessionGuard;
