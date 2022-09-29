import { ArrowBackIos } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import RegistrationForm from '../../components/registration-form/RegistrationForm';
import { RegisterDto } from '../../models/user/RegisterDto';

const Register = (): JSX.Element => {
    const { t } = useTranslation();

    const onSubmit: SubmitHandler<RegisterDto> = (data) => {
        console.log(data);
    };

    // TODO Replace the div with the Login & Registration page layout
    return (
        <div style={{ width: '500px' }}>
            <Grid2 container spacing={0}>
                <Grid2 xs={1}>
                    <IconButton
                        color="primary"
                        aria-label="return to previous page"
                    >
                        <ArrowBackIos />
                    </IconButton>
                </Grid2>
                <Grid2 xs={11}>
                    <Typography variant="h1">{t('registration')}</Typography>
                    <RegistrationForm onSubmit={onSubmit} />
                </Grid2>
            </Grid2>
        </div>
    );
};

export default Register;
