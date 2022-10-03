import { Link, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import LoginLayout from '../../components/login-layout/LoginLayout';
import RegistrationForm from '../../components/registration-form/RegistrationForm';
import { RegisterDto } from '../../models/user/RegisterDto';

const Register = (): JSX.Element => {
    const { t } = useTranslation();

    const onSubmit: SubmitHandler<RegisterDto> = (data) => {
        console.log(data);
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
