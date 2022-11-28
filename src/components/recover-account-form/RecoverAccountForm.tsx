import { Button, FormLabel, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ResetPasswordDto } from '../../models/auth/ResetPasswordDto';
import { isValidPassword } from '../../utility/validation-helper';

interface RecoverAccountFormProps {
    onSubmit?: SubmitHandler<ResetPasswordDto>;
}

const RecoverAccountForm = (props: RecoverAccountFormProps): JSX.Element => {
    const { t } = useTranslation();
    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isValid },
    } = useForm<ResetPasswordDto>({
        defaultValues: {
            resetToken: '',
            password: '',
            repeatPassword: '',
        },
        mode: 'onChange',
    });

    const onSubmitRecoveryData: SubmitHandler<ResetPasswordDto> = (data) => {
        props.onSubmit?.(data);
        reset();
    };

    return (
        <Grid2 container>
            <form
                id="recover-account-form"
                className="full-width"
                onSubmit={handleSubmit(onSubmitRecoveryData)}
            >
                <Grid2 xs={12}>
                    <FormLabel id="recovery-token">
                        {t('user.recovery_token')}
                    </FormLabel>
                    <Controller
                        name="resetToken"
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
                                error={!!errors.resetToken}
                                aria-labelledby="recovery-token"
                                helperText={errors.resetToken?.message}
                                size="small"
                                fullWidth
                            />
                        )}
                    />
                </Grid2>
                <Grid2 xs={12}>
                    <FormLabel id="password">
                        {t('user.new_password')}
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
                    <FormLabel id="repeat-password">
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
                        {t('actions.submit')}
                    </Button>
                </Grid2>
            </form>
        </Grid2>
    );
};

export default RecoverAccountForm;
