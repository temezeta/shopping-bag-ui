import { Button, FormLabel, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RegisterDto } from '../../models/auth/RegisterDto';
import { isValidEmail, isValidPassword } from '../../utility/validation-helper';
import OfficeSelect from '../office-select/OfficeSelect';
import styles from './RegistrationForm.module.css';

interface RegistrationFormProps {
    onSubmit?: SubmitHandler<RegisterDto>;
}

const RegistrationForm = (props: RegistrationFormProps): JSX.Element => {
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
            officeId: 1,
            password: '',
            repeatPassword: '',
        },
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<RegisterDto> = (data) => {
        props.onSubmit?.(data);
    };

    return (
        <Grid2 container spacing={2}>
            <form
                id="registration-form"
                className={styles.registrationForm}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Grid2 xs={12}>
                    <FormLabel className={styles.label} id="first-name">
                        {t('user.name')}
                    </FormLabel>
                    <Controller
                        name="firstName"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: t('errors.required'),
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                error={!!errors.firstName}
                                aria-labelledby="first-name"
                                helperText={errors.firstName?.message}
                                size="small"
                                fullWidth
                            />
                        )}
                    />
                </Grid2>

                <Grid2 xs={12}>
                    <FormLabel className={styles.label} id="last-name">
                        {t('user.surname')}
                    </FormLabel>
                    <Controller
                        name="lastName"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: t('errors.required'),
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                error={!!errors.lastName}
                                aria-labelledby="last-name"
                                helperText={errors.lastName?.message}
                                size="small"
                                fullWidth
                            />
                        )}
                    />
                </Grid2>

                <Grid2 xs={12}>
                    <FormLabel className={styles.label} id="officeId">
                        {t('actions.select_office')}
                    </FormLabel>
                    <Controller
                        name="officeId"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <OfficeSelect
                                {...field}
                                error={!!errors.officeId}
                                aria-labelledby="officeId"
                                fullWidth
                            />
                        )}
                    />
                </Grid2>

                <Grid2 xs={12}>
                    <FormLabel className={styles.label} id="email-address">
                        {t('user.email_address')}
                    </FormLabel>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: t('errors.required'),
                            },
                            validate: {
                                validEmail: (value: string) =>
                                    isValidEmail(value) ||
                                    t('errors.invalid_email'),
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                error={!!errors.email}
                                aria-labelledby="email-address"
                                helperText={errors.email?.message}
                                size="small"
                                fullWidth
                            />
                        )}
                    />
                </Grid2>

                <Grid2 xs={12}>
                    <FormLabel className={styles.label} id="password">
                        {t('user.password')}
                    </FormLabel>
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: t('errors.required'),
                            },
                            validate: {
                                validPassword: (value: string) =>
                                    isValidPassword(value) ||
                                    t('errors.invalid_password'),
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="password"
                                error={!!errors.password}
                                aria-labelledby="password"
                                helperText={errors.password?.message}
                                size="small"
                                fullWidth
                            />
                        )}
                    />
                </Grid2>

                <Grid2 xs={12}>
                    <FormLabel className={styles.label} id="repeat-password">
                        {t('user.repeat_password')}
                    </FormLabel>
                    <Controller
                        name="repeatPassword"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: t('errors.required'),
                            },
                            validate: {
                                matches: (value: string) =>
                                    watch('password') === value ||
                                    t('errors.password_match'),
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="password"
                                error={!!errors.repeatPassword}
                                aria-labelledby="repeat-password"
                                helperText={errors.repeatPassword?.message}
                                size="small"
                                fullWidth
                            />
                        )}
                    />
                </Grid2>

                <Grid2 xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!isValid}
                        fullWidth
                    >
                        {t('actions.sign_up')}
                    </Button>
                </Grid2>
            </form>
        </Grid2>
    );
};

export default RegistrationForm;
