import { Link, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { unwrapResult } from '@reduxjs/toolkit';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LoginLayout from '../../components/login-layout/LoginLayout';
import RegistrationForm from '../../components/registration-form/RegistrationForm';
import { RegisterDto } from '../../models/user/RegisterDto';
import { registerAsync } from '../../store/auth/auth-slice';
import { useAppDispatch } from '../../store/hooks';

const Register = (): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<RegisterDto> = (data) => {
        dispatch(registerAsync(data))
            .then(unwrapResult)
            .then((result) => {
                if (result) {
                    navigate('/login');
                }
            })
            .catch((error) => {
                console.log(error);
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
                        {t('actions.registration')}
                    </Typography>
                </Grid2>
                <Grid2 xs={12}>
                    <RegistrationForm onSubmit={onSubmit} />
                </Grid2>
                <Grid2 xs={12}>
                    <Link href="/login">
                        {t('actions.already_have_account')}
                    </Link>
                </Grid2>
            </Grid2>
        </LoginLayout>
    );
};

export default Register;
