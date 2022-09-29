import { Typography } from '@mui/material';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import RegistrationForm from '../../components/registration-form/RegistrationForm';
import { RegisterDto } from '../../models/user/RegisterDto';

const Register = (): JSX.Element => {
    const { t } = useTranslation();

    const onSubmit: SubmitHandler<RegisterDto> = (data) => {
        console.log(data);
    };

    return (
        <div>
            <Typography variant="h1">{t('registration')}</Typography>
            <RegistrationForm onSubmit={onSubmit} />
        </div>
    );
};

export default Register;
