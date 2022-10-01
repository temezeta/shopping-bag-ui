import { ArrowBackIos } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LoginLayout from '../../components/login-layout/LoginLayout';
import RegistrationForm from '../../components/registration-form/RegistrationForm';
import { RegisterDto } from '../../models/user/RegisterDto';

const Register = (): JSX.Element => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<RegisterDto> = (data) => {
        console.log(data);
    };

    return (
        <LoginLayout>
            <Grid2 container spacing={0}>
                <Grid2 xs={1} className="flex-center">
                    <IconButton
                        color="info"
                        aria-label="return to previous page"
                        onClick={() => navigate('/')}
                    >
                        <ArrowBackIos />
                    </IconButton>
                </Grid2>
                <Grid2 xs={11} className="flex-center">
                    <Typography
                        variant="h1"
                        display="flex"
                        justifyContent="center"
                    >
                        {t('actions.registration')}
                    </Typography>
                </Grid2>
                <Grid2 xs={1}></Grid2>
                <Grid2 xs={11}>
                    <RegistrationForm onSubmit={onSubmit} />
                </Grid2>
            </Grid2>
        </LoginLayout>
    );
};

export default Register;
