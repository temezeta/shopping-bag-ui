import { DialogContentText, Link, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { unwrapResult } from '@reduxjs/toolkit';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ConfirmationDialog from '../../components/confirmation-popup/ConfirmationDialog';
import LoginLayout from '../../components/login-layout/LoginLayout';
import RegistrationForm from '../../components/registration-form/RegistrationForm';
import { RegisterDto } from '../../models/auth/RegisterDto';
import { registerAsync } from '../../store/auth/auth-slice';
import { useAppDispatch } from '../../store/hooks';

const Register = (): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
    const [email, setEmail] = useState<string | undefined>(undefined);

    const onSubmit: SubmitHandler<RegisterDto> = (data) => {
        setEmail(data.email);
        dispatch(registerAsync(data))
            .then(unwrapResult)
            .then((result) => {
                if (result) {
                    setDialogOpen(true);
                }
            })
            .catch(() => {
                setEmail(undefined);
            });
    };

    const onModalConfirm = (): void => {
        setDialogOpen(false);
        setEmail(undefined);
        navigate('/login');
    };

    return (
        <>
            <LoginLayout onBackButton={() => navigate('/login')}>
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
                    <Grid2 xs={12} className="flex-center">
                        <Link href="/login">
                            {t('actions.already_have_account')}
                        </Link>
                    </Grid2>
                </Grid2>
            </LoginLayout>
            <ConfirmationDialog
                open={isDialogOpen}
                onConfirm={onModalConfirm}
                title={t('dialogs.verify_account')}
            >
                <DialogContentText>
                    {t('dialogs.email_verification', { email })}
                </DialogContentText>
            </ConfirmationDialog>
        </>
    );
};

export default Register;
