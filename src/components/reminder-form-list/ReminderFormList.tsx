import { Button, FormLabel, Switch } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { ListReminderSettingsDto } from '../../models/user/ReminderDto';
import { useTranslation } from 'react-i18next';
import ReminderSelect from '../reminder-select/ReminderSelect';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import styles from './ReminderFormList.module.css';
import { useAppDispatch } from '../../store/hooks';
import { changeListRemindersAsync } from '../../store/user/user-slice';

interface ReminderFormProps {
    initialValues?: ListReminderSettingsDto | undefined;
    listId: number;
    pastOrder: boolean;
}

const ReminderFormList = (props: ReminderFormProps): JSX.Element => {
    const { t } = useTranslation();
    const { initialValues } = props;
    const dispatch = useAppDispatch();

    const defaultValues: Partial<ListReminderSettingsDto> = initialValues
        ? {
              shoppingListId: props.listId,
              dueDateRemindersDisabled: initialValues.dueDateRemindersDisabled,
              expectedRemindersDisabled:
                  initialValues.expectedRemindersDisabled,
              reminderDaysBeforeDueDate:
                  initialValues.reminderDaysBeforeDueDate,
              reminderDaysBeforeExpectedDate:
                  initialValues.reminderDaysBeforeExpectedDate,
          }
        : {
              shoppingListId: props.listId,
              dueDateRemindersDisabled: true,
              expectedRemindersDisabled: true,
              reminderDaysBeforeDueDate: [],
              reminderDaysBeforeExpectedDate: [],
          };

    const { control, handleSubmit, watch, reset, setValue } =
        useForm<ListReminderSettingsDto>({
            defaultValues,
            mode: 'onChange',
        });

    useEffect(() => {
        reset(defaultValues);
    }, [initialValues]);

    const onSubmit: SubmitHandler<ListReminderSettingsDto> = async (data) => {
        await dispatch(changeListRemindersAsync(data)).unwrap();
    };

    const dueDateSwitchOnChange = (disable: boolean): void => {
        setValue(
            'reminderDaysBeforeDueDate',
            disable
                ? []
                : initialValues?.reminderDaysBeforeDueDate.length
                ? initialValues?.reminderDaysBeforeDueDate
                : [2]
        );
    };

    const expectedDateSwitchOnChange = (disable: boolean): void => {
        setValue(
            'reminderDaysBeforeExpectedDate',
            disable
                ? []
                : initialValues?.reminderDaysBeforeExpectedDate.length
                ? initialValues?.reminderDaysBeforeExpectedDate
                : [2]
        );
    };

    const selectDueDateOnChange = (): void => {
        setValue(
            'dueDateRemindersDisabled',
            !watch('reminderDaysBeforeDueDate').length
        );
    };

    const selectExpectedDateOnChange = (): void => {
        setValue(
            'expectedRemindersDisabled',
            !watch('reminderDaysBeforeExpectedDate').length
        );
    };

    return (
        <form
            id="List-Reminder-Settings-Form"
            className={styles.remindersForm}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Grid2 container spacing={2} className={styles.formInputs}>
                {!props.pastOrder && (
                    <>
                        <Grid2 xs={8}>
                            <div className={'flex-space-between'}>
                                <FormLabel
                                    sx={{ display: 'inline' }}
                                    id="due_date_enabled"
                                >
                                    {t('list.due_date')}
                                </FormLabel>
                                <Controller
                                    name="dueDateRemindersDisabled"
                                    control={control}
                                    render={({ field }) => (
                                        <Switch
                                            {...field}
                                            checked={!field.value}
                                            onChange={(_, isChecked) => {
                                                field.onChange(!isChecked);
                                                dueDateSwitchOnChange(
                                                    !isChecked
                                                );
                                            }}
                                            inputProps={{
                                                'aria-labelledby':
                                                    'due_date_enabled',
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </Grid2>
                        <Grid2 xs={4}>
                            <Controller
                                name="reminderDaysBeforeDueDate"
                                control={control}
                                render={({ field }) => (
                                    <ReminderSelect
                                        {...field}
                                        fullWidth
                                        onChange={(event) => {
                                            field.onChange(event);
                                            selectDueDateOnChange();
                                        }}
                                    />
                                )}
                            />
                        </Grid2>
                    </>
                )}
                <Grid2 xs={8}>
                    <div className={'flex-space-between'}>
                        <FormLabel
                            sx={{ display: 'inline' }}
                            id="expected_date_enabled"
                        >
                            {t('list.expected_delivery_date')}
                        </FormLabel>
                        <Controller
                            name="expectedRemindersDisabled"
                            control={control}
                            render={({ field }) => (
                                <Switch
                                    {...field}
                                    checked={!field.value}
                                    onChange={(_, isChecked) => {
                                        field.onChange(!isChecked);
                                        expectedDateSwitchOnChange(!isChecked);
                                    }}
                                    inputProps={{
                                        'aria-labelledby':
                                            'expected_date_enabled',
                                    }}
                                />
                            )}
                        />
                    </div>
                </Grid2>
                <Grid2 xs={4}>
                    <Controller
                        name="reminderDaysBeforeExpectedDate"
                        control={control}
                        render={({ field }) => (
                            <ReminderSelect
                                {...field}
                                fullWidth
                                onChange={(event) => {
                                    field.onChange(event);
                                    selectExpectedDateOnChange();
                                }}
                            />
                        )}
                    />
                </Grid2>
            </Grid2>
            <Grid2 xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                    {t('actions.save')}
                </Button>
            </Grid2>
        </form>
    );
};

export default ReminderFormList;
