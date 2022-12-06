import {
    Button,
    FormLabel,
    TextField,
    Tabs,
    Tab,
    Paper,
    Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from './ShoppingListForm.module.css';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';
import { ModifyShoppingListDto } from '../../models/shopping-list/ModifyShoppingListDto';
import { useEffect, useState } from 'react';
import TabPanel from '../tab-panel/TabPanel';
import Markdown from '../markdown/Markdown';

interface ShoppingListFormProps {
    initialValues?: ShoppingListDto;
    onSubmit?: SubmitHandler<ModifyShoppingListDto>;
    onDelete?: SubmitHandler<ShoppingListDto>;
}

const ShoppingListForm = (props: ShoppingListFormProps): JSX.Element => {
    const { t } = useTranslation();
    const { initialValues } = props;
    const [tabIndex, setTabIndex] = useState<number>(0);

    const defaultValues: Partial<ModifyShoppingListDto> = initialValues ?? {
        name: '',
        comment: '',
        dueDate: null,
        expectedDeliveryDate: null,
    };

    const {
        control,
        handleSubmit,
        reset,
        trigger,
        watch,
        formState: { isValid, errors },
    } = useForm<ModifyShoppingListDto>({
        defaultValues,
        mode: 'onChange',
    });

    useEffect(() => {
        reset(defaultValues);
    }, [initialValues]);

    const onSubmit: SubmitHandler<ModifyShoppingListDto> = (data) => {
        props.onSubmit?.(data);
    };

    const onDelete = async (): Promise<void> => {
        if (initialValues) {
            await props.onDelete?.(initialValues);
        }
    };

    const handleChange = (_: React.SyntheticEvent, value: number): void => {
        setTabIndex(value);
    };

    const watchDates = watch(['dueDate', 'expectedDeliveryDate']);

    const dateValidation = (value: moment.MomentInput): boolean => {
        const dueDate = moment(watchDates[0], true);
        const expectedDeliveryDate = moment(value, true);
        if (expectedDeliveryDate.isBefore(dueDate)) {
            return false;
        }
        return true;
    };

    useEffect(() => {
        void trigger(['dueDate', 'expectedDeliveryDate']);
    }, [watchDates[0], watchDates[1]]);

    useEffect(() => {
        reset(defaultValues, { keepDirtyValues: true });
    }, [initialValues]);

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
                        <Tabs
                            color="primary"
                            value={tabIndex}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                        >
                            <Tab label={t('actions.input')} />
                            <Tab label={t('actions.preview')} />
                        </Tabs>
                        <TabPanel index={0} value={tabIndex}>
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
                        </TabPanel>
                        <TabPanel index={1} value={tabIndex}>
                            <Paper
                                className={styles.previewTab}
                                variant="outlined"
                            >
                                <Markdown>{watch('comment')}</Markdown>
                            </Paper>
                        </TabPanel>
                        <Typography variant="body2">
                            {t('general.support_markdown')}
                            <br />
                            <a
                                target="_blank"
                                href="https://www.markdownguide.org/cheat-sheet"
                                rel="noreferrer"
                            >
                                {t('general.markdown_cheatsheet_link')}
                            </a>
                        </Typography>
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
                                        <TextField
                                            {...props}
                                            error={!!errors.dueDate}
                                            fullWidth
                                        />
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
                            rules={{
                                validate: {
                                    validExpectedDate: (value) =>
                                        dateValidation(value) ||
                                        t('errors.expected_after_due'),
                                },
                            }}
                            render={({ field }) => (
                                <DatePicker
                                    onChange={(date) =>
                                        field.onChange(
                                            moment(date).toISOString(true)
                                        )
                                    }
                                    minDate={moment(watch('dueDate'))}
                                    value={field.value}
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            sx={{ width: '100%' }}
                                            error={
                                                !!errors.expectedDeliveryDate
                                            }
                                            helperText={
                                                errors.expectedDeliveryDate
                                                    ?.message
                                            }
                                        />
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
                                ? t('actions.save')
                                : t('actions.add_new_list')}
                        </Button>
                    </Grid2>
                    {initialValues && (
                        <Grid2 xs={12}>
                            <Button
                                variant="contained"
                                color="error"
                                fullWidth
                                onClick={onDelete}
                            >
                                {t('actions.remove_list')}
                            </Button>
                        </Grid2>
                    )}
                </form>
            }
        </Grid2>
    );
};

export default ShoppingListForm;
