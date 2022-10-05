import {
    Button,
    Checkbox,
    FormControlLabel,
    FormLabel,
    Link,
    TextField,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import styles from './LoginForm.module.css';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { LoginDto } from '../../models/auth/LoginDto';
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
    onSubmit?: SubmitHandler<LoginDto>;
}

const LoginForm = (props: LoginFormProps): JSX.Element => {
    const { t } = useTranslation();

    const {
        control,
        handleSubmit,
        formState: { isValid, errors },
    } = useForm<LoginDto>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<LoginDto> = (data) => {
        props.onSubmit?.(data);
    };

    return (
        <Grid2 container spacing={2}>
            <form
                id="Login-form"
                className={styles.loginForm}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Grid2 xs={12}>
                    <FormLabel className={styles.label} id="email_address">
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
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                error={!!errors.email}
                                aria-labelledby="email_address"
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
                    <Link href="/recover" color="#ff5e89">
                        {t('actions.recover_password')}
                        {/* need to create recover pop up */}
                    </Link>
                </Grid2>
                <Grid2 xs={12}>
                    <FormControlLabel
                        value="end"
                        control={
                            <Checkbox
                                sx={{
                                    color: '#c2d1fa',
                                    '&.Mui-checked': {
                                        color: '#0047f2',
                                    },
                                }}
                            />
                        }
                        label={t('actions.remember_user')}
                        labelPlacement="end"
                    />
                </Grid2>
                <Grid2 xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!isValid}
                        fullWidth
                    >
                        {t('actions.login')}
                    </Button>
                </Grid2>
            </form>
        </Grid2>
    );
};

export default LoginForm;
