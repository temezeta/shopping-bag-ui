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
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

const Login = (): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // const [isErrOpen, setErrOpen] = useState<boolean>(false);

    const onSubmit: SubmitHandler<LoginDto> = (data) => {
        dispatch(loginAsync(data))
            .then(unwrapResult)
            .then((result) => {
                if (result) {
                    // setErrOpen(false);
                    navigate('/list');
                }
            })
            .catch(() => {
                // setErrOpen(true);
            });
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
