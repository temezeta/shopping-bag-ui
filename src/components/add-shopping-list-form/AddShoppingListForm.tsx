import { Button, FormLabel, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AddShoppingListDto } from '../../models/shopping-list/AddShoppingListDto';
import styles from './AddShoppingListForm.module.css';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentOffice } from '../../store/user/user-slice';
import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';

interface AddShoppingListFormProps {
    initialValues?: ShoppingListDto;
    onSubmit?: SubmitHandler<AddShoppingListDto>;
}

const AddShoppingListForm = (props: AddShoppingListFormProps): JSX.Element => {
    const { t } = useTranslation();
    const { initialValues } = props;
    const currentOffice = useAppSelector(selectCurrentOffice);

    const defaultValues: Partial<AddShoppingListDto> = initialValues ?? {
        name: '',
        comment: '',
        officeId: currentOffice?.id,
        dueDate: null,
        expectedDeliveryDate: null,
    };

    const {
        control,
        handleSubmit,
        formState: { isValid, errors },
    } = useForm<AddShoppingListDto>({
        defaultValues,
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
                            {t('list.list_name')}
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
                        <FormLabel className={styles.label} id="comment">
                            {t('list.comment')}
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
                            {t('list.due_date')}
                        </FormLabel>
                        <Controller
                            name="dueDate"
                            control={control}
                            render={({ field }) => (
                                <DateTimePicker
                                    onChange={(date) =>
                                        field.onChange(
                                            moment(date).toISOString(true)
                                        )
                                    }
                                    value={field.value}
                                    renderInput={(props) => (
                                        <TextField {...props} fullWidth />
                                    )}
                                    disablePast={true}
                                    ampm={false}
                                    inputFormat="DD.MM.yyyy HH:mm"
                                    disableMaskedInput={true}
                                />
                            )}
                        />
                    </Grid2>
                    <Grid2 xs={12}>
                        <FormLabel
                            className={styles.label}
                            id="expected-delivery-date"
                        >
                            {t('list.expected_delivery_date')}
                        </FormLabel>
                        <Controller
                            name="expectedDeliveryDate"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    onChange={(date) =>
                                        field.onChange(
                                            moment(date).toISOString(true)
                                        )
                                    }
                                    value={field.value}
                                    renderInput={(props) => (
                                        <TextField {...props} fullWidth />
                                    )}
                                    disablePast={true}
                                    inputFormat="DD.MM.yyyy"
                                    disableMaskedInput={true}
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
                            {initialValues
                                ? t('actions.edit_list')
                                : t('actions.add_new_list')}
                        </Button>
                    </Grid2>
                </form>
            }
        </Grid2>
    );
};

export default AddShoppingListForm;
