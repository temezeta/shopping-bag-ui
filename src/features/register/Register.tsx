import { Button, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RegisterDto } from '../../models/user/RegisterDto';

const Register = (): JSX.Element => {
    const { t } = useTranslation();
    const {
        control,
        handleSubmit,
        watch,
        formState: { isValid, errors },
    } = useForm<RegisterDto>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repeatPassword: '',
        },
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<RegisterDto> = (data) => {
        console.log(data);
    };

    return (
        <div>
            <h1>{t('registration')}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="firstName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={t('name')}
                            error={!!errors.firstName}
                        />
                    )}
                />
                <Controller
                    name="lastName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={t('surname')}
                            error={!!errors.lastName}
                        />
                    )}
                />
                {/** TODO: Office select */}
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: true,
                        pattern: /\S+@\S+\.\S+/,
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={t('email_address')}
                            error={!!errors.email}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            type="password"
                            label={t('password')}
                            error={!!errors.password}
                        />
                    )}
                />
                <Controller
                    name="repeatPassword"
                    control={control}
                    rules={{
                        required: true,
                        validate: (value: string) =>
                            watch('password') === value,
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            type="password"
                            label={t('repeat_password')}
                            error={!!errors.repeatPassword}
                        />
                    )}
                />

                <Button type="submit" variant="contained" disabled={!isValid}>
                    {t('sign_up')}
                </Button>
            </form>
        </div>
    );
};

export default Register;
