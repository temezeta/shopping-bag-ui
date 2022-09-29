import { Button, FormLabel, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RegisterDto } from '../../models/user/RegisterDto';
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
            officeId: -1, // Use -1 to indicate no officeId selected
            password: '',
            repeatPassword: '',
        },
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<RegisterDto> = (data) => {
        if (data.officeId === -1) {
            data.officeId = undefined;
        }

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
                        {t('name')}
                    </FormLabel>
                    <Controller
                        name="firstName"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                error={!!errors.firstName}
                                aria-labelledby="first-name"
                                fullWidth
                            />
                        )}
                    />
                </Grid2>

                <Grid2 xs={12}>
                    <FormLabel className={styles.label} id="last-name">
                        {t('surname')}
                    </FormLabel>
                    <Controller
                        name="lastName"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                error={!!errors.lastName}
                                aria-labelledby="last-name"
                                fullWidth
                            />
                        )}
                    />
                </Grid2>

                <Grid2 xs={12}>
                    <FormLabel className={styles.label} id="officeId">
                        {t('select_office')}
                    </FormLabel>
                    <Controller
                        name="officeId"
                        control={control}
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
                        {t('email_address')}
                    </FormLabel>
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
                                error={!!errors.email}
                                aria-labelledby="email-address"
                                fullWidth
                            />
                        )}
                    />
                </Grid2>

                <Grid2 xs={12}>
                    <FormLabel className={styles.label} id="password">
                        {t('password')}
                    </FormLabel>
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="password"
                                error={!!errors.password}
                                aria-labelledby="password"
                                fullWidth
                            />
                        )}
                    />
                </Grid2>

                <Grid2 xs={12}>
                    <FormLabel className={styles.label} id="repeat-password">
                        {t('repeat_password')}
                    </FormLabel>
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
                                error={!!errors.repeatPassword}
                                aria-labelledby="repeat-password"
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
                        {t('sign_up')}
                    </Button>
                </Grid2>
            </form>
        </Grid2>
    );
};

export default RegistrationForm;
