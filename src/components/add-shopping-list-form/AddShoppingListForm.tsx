import { Button, FormLabel, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AddShoppingListDto } from '../../models/shopping-list/AddShoppingListDto';
import styles from './AddShoppingListForm.module.css';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import OfficeSelect from '../office-select/OfficeSelect';

interface AddShoppingListFormProps {
    onSubmit?: SubmitHandler<AddShoppingListDto>;
}

const AddShoppingListForm = (props: AddShoppingListFormProps): JSX.Element => {
    const { t } = useTranslation();

    const {
        control,
        handleSubmit,
        formState: { isValid, errors },
    } = useForm<AddShoppingListDto>({
        defaultValues: {
            name: '',
            comment: '',
            dueDate: null,
            expectedDeliveryDate: null,
        },
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<AddShoppingListDto> = (data) => {
        props.onSubmit?.(data);
    };

    return (
        <Grid2 container spacing={2}>
            {
                <form
                    id="addshoppinglist-form"
                    className={styles.addShoppingListForm}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Grid2 xs={12}>
                        <FormLabel className={styles.label} id="list-name">
                            List name
                        </FormLabel>
                        <Controller
                            name="name"
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
                                    error={!!errors.name}
                                    aria-labelledby="first-name"
                                    helperText={errors.name?.message}
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
                        <FormLabel className={styles.label} id="comment">
                            Comment
                        </FormLabel>
                        <Controller
                            name="comment"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    error={!!errors.comment}
                                    aria-labelledby="comment"
                                    helperText={errors.comment?.message}
                                    size="small"
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                            )}
                        />
                    </Grid2>
                    <Grid2 xs={12}>
                        <FormLabel className={styles.label} id="due-date">
                            Due Date
                        </FormLabel>
                        <Controller
                            name="dueDate"
                            control={control}
                            render={({ field }) => (
                                <LocalizationProvider
                                    dateAdapter={AdapterMoment}
                                >
                                    <DateTimePicker
                                        onChange={(date) =>
                                            field.onChange(
                                                moment(date).toISOString()
                                            )
                                        }
                                        value={field.value}
                                        renderInput={(props) => (
                                            <TextField {...props} />
                                        )}
                                        disablePast={true}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                    </Grid2>
                    <Grid2 xs={12}>
                        <FormLabel
                            className={styles.label}
                            id="expected-delivery-date"
                        >
                            Expected Delivery Date
                        </FormLabel>
                        <Controller
                            name="expectedDeliveryDate"
                            control={control}
                            render={({ field }) => (
                                <LocalizationProvider
                                    dateAdapter={AdapterMoment}
                                >
                                    <DateTimePicker
                                        onChange={(date) =>
                                            field.onChange(
                                                moment(date).toISOString()
                                            )
                                        }
                                        value={field.value}
                                        renderInput={(props) => (
                                            <TextField {...props} />
                                        )}
                                        disablePast={true}
                                    />
                                </LocalizationProvider>
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
                            Add List
                        </Button>
                    </Grid2>
                </form>
            }
        </Grid2>
    );
};

export default AddShoppingListForm;
