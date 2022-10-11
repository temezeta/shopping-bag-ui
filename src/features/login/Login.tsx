import { LoginDto } from '../../models/auth/LoginDto';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import LoginLayout from '../../components/login-layout/LoginLayout';
import LoginForm from '../../components/login-form/LoginForm';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Link, Typography } from '@mui/material';
import { useAppDispatch } from '../../store/hooks';
import { unwrapResult } from '@reduxjs/toolkit';
import { loginAsync } from '../../store/auth/auth-slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUserAsync } from '../../store/user/user-slice';

const Login = (): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit: SubmitHandler<LoginDto> = async (data) => {
        try {
            unwrapResult(await dispatch(loginAsync(data)));
            unwrapResult(await dispatch(getCurrentUserAsync()));
            // Login success && user found => navigate to home
            const previousLocation = location.state?.from;
            navigate(previousLocation ? previousLocation.pathname : '/home');
        } catch {
            // setErrOpen(true);
        }
    };

    return (
        <LoginLayout>
            <Grid2 container spacing={1}>
                <Grid2 xs={12} className="flex-center">
                    <Typography
                        variant="h1"
                        display="flex"
                        justifyContent="center"
                    >
                        {t('actions.login')}
                    </Typography>
                </Grid2>
                <Grid2 xs={12}>
                    <LoginForm onSubmit={onSubmit} />
                </Grid2>
                <Grid2 xs={12}>
                    <Link href="/register">{t('actions.no_account')}</Link>
                </Grid2>
            </Grid2>
        </LoginLayout>
    );
};

export default Login;
