import { Button, FormLabel, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from './UserForm.module.css';
import { isValidEmail } from '../../utility/validation-helper';
import React, { useEffect } from 'react';
import { ModifyUserDto, UserDto } from '../../models/user/UserDto';
import OfficeSelect from '../office-select/OfficeSelect';
import RoleSelect from '../role-select/RoleSelect';

interface UserFormProps {
    initialValues?: UserDto;
    onSubmit?: SubmitHandler<ModifyUserDto>;
    canModifyRoles: boolean;
}

const UserForm = (props: UserFormProps): JSX.Element => {
    const { t } = useTranslation();
    const { initialValues, canModifyRoles } = props;

    const defaultValues: Partial<ModifyUserDto> = initialValues
        ? {
              firstName: initialValues.firstName,
              lastName: initialValues.lastName,
              email: initialValues.email,
              officeId: initialValues.homeOffice.id,
              roleIds: canModifyRoles
                  ? initialValues.userRoles.map((it) => it.roleId)
                  : undefined,
          }
        : {
              firstName: '',
              lastName: '',
              email: '',
              officeId: undefined,
              roleIds: undefined,
          };

    const {
        control,
        handleSubmit,
        reset,
        formState: { isValid, errors },
    } = useForm<ModifyUserDto>({
        defaultValues,
        mode: 'onChange',
    });

    useEffect(() => {
        reset(defaultValues);
    }, [initialValues]);

    const onSubmit: SubmitHandler<ModifyUserDto> = (data) => {
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

            {props.canModifyRoles && (
                <Grid2 xs={12}>
                    <FormLabel className={styles.label} id="roleIds">
                        {t('actions.role')}
                    </FormLabel>
                    <Controller
                        name="roleIds"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <RoleSelect
                                {...field}
                                error={!!errors.roleIds}
                                aria-labelledby="roleIds"
                                fullWidth
                            />
                        )}
                    />
                </Grid2>
            )}
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
