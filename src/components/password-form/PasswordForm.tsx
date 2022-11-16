import { Button, FormLabel, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ChangePasswordDto } from '../../models/user/UserDto';
import { isValidPassword } from '../../utility/validation-helper';

interface PasswordFormProps {
    onSubmit?: SubmitHandler<ChangePasswordDto>;
}

const PasswordForm = (props: PasswordFormProps): JSX.Element => {
    const { t } = useTranslation();

    const {
        control,
        handleSubmit,
        watch,
        formState: { isValid, errors },
    } = useForm<ChangePasswordDto>({
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            repeatNewPassword: '',
        },
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<ChangePasswordDto> = (data) => {
        props.onSubmit?.(data);
    };

    return (
        <Grid2 container spacing={2}>
            <form
                id="password-form"
                className="full-width"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Grid2 xs={12}>
                    <FormLabel id="password">
                        {t('user.current_password')}
                    </FormLabel>
                    <Controller
                        name="currentPassword"
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
                                error={!!errors.currentPassword}
                                aria-labelledby="password"
                                helperText={errors.currentPassword?.message}
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
                        name="newPassword"
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
                                error={!!errors.newPassword}
                                aria-labelledby="password"
                                helperText={errors.newPassword?.message}
                                size="small"
                                fullWidth
                            />
                        )}
                    />
                </Grid2>

                <Grid2 xs={12}>
                    <FormLabel id="repeat-password">
                        {t('user.repeat_new_password')}
                    </FormLabel>
                    <Controller
                        name="repeatNewPassword"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: t('errors.required'),
                            },
                            validate: {
                                matches: (value: string) =>
                                    watch('newPassword') === value ||
                                    t('errors.password_match'),
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="password"
                                error={!!errors.repeatNewPassword}
                                aria-labelledby="repeat-password"
                                helperText={errors.repeatNewPassword?.message}
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
                        {t('actions.save')}
                    </Button>
                </Grid2>
            </form>
        </Grid2>
    );
};

export default PasswordForm;
