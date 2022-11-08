import { Button, FormLabel, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from './UserForm.module.css';
import { isValidEmail } from '../../utility/validation-helper';
import { useEffect } from 'react';
import { UserDto } from '../../models/user/UserDto';
import OfficeSelect from '../office-select/OfficeSelect';

interface ItemFormProps {
    initialValues?: UserDto;
    onSubmit?: SubmitHandler<UserDto>;
}

const UserForm = (props: ItemFormProps): JSX.Element => {
    const { t } = useTranslation();
    const { initialValues } = props;

    const defaultValues: Partial<UserDto> = initialValues ?? {
        firstName: '',
        lastName: '',
        email: '',
        homeOffice: undefined,
    };

    const {
        control,
        handleSubmit,
        reset,
        formState: { isValid, errors },
    } = useForm<UserDto>({
        defaultValues,
        mode: 'onChange',
    });

    useEffect(() => {
        reset(defaultValues);
    }, [initialValues]);

    const onSubmit: SubmitHandler<UserDto> = (data) => {
        props.onSubmit?.(data);
    };

    return (
        <form
            id="Account-Settings-Form"
            className={styles.form}
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
                    name="homeOffice.id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <OfficeSelect
                            {...field}
                            error={!!errors.homeOffice?.id}
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
            {/* TODO: Add notifications controls */}
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
    );
};
export default UserForm;
