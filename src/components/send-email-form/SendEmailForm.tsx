import { Button, FormLabel, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { isValidEmail } from '../../utility/validation-helper';

export interface EmailInformation {
    email: string;
}

interface SendEmailFormProps {
    onSubmit?: SubmitHandler<EmailInformation>;
}

const SendEmailForm = (props: SendEmailFormProps): JSX.Element => {
    const { t } = useTranslation();
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<EmailInformation>({
        defaultValues: {
            email: '',
        },
        mode: 'onChange',
    });

    const onSubmitEmail: SubmitHandler<EmailInformation> = (data) => {
        props.onSubmit?.(data);
        reset();
    };

    return (
        <Grid2 container>
            <form
                id="email-form"
                className="full-width"
                onSubmit={handleSubmit(onSubmitEmail)}
            >
                <Grid2 xs={12}>
                    <FormLabel id="email-address">
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

export default SendEmailForm;
