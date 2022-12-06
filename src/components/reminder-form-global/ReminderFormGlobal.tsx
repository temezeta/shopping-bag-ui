import { Button, FormLabel, Switch, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { ReminderSettingsDto } from '../../models/user/ReminderDto';
import { useTranslation } from 'react-i18next';
import ReminderSelect from '../reminder-select/ReminderSelect';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface ReminderFormProps {
    initialValues?: ReminderSettingsDto;
    onSubmit?: SubmitHandler<ReminderSettingsDto>;
}

const ReminderFormGlobal = (props: ReminderFormProps): JSX.Element => {
    const { t } = useTranslation();
    const { initialValues } = props;

    const defaultValues: Partial<ReminderSettingsDto> = initialValues
        ? {
              allRemindersDisabled: initialValues.allRemindersDisabled,
              dueDateRemindersDisabled: initialValues.dueDateRemindersDisabled,
              expectedRemindersDisabled:
                  initialValues.expectedRemindersDisabled,
              reminderDaysBeforeDueDate:
                  initialValues.reminderDaysBeforeDueDate,
              reminderDaysBeforeExpectedDate:
                  initialValues.reminderDaysBeforeExpectedDate,
          }
        : {
              allRemindersDisabled: false,
              dueDateRemindersDisabled: false,
              expectedRemindersDisabled: false,
              reminderDaysBeforeDueDate: [],
              reminderDaysBeforeExpectedDate: [],
          };

    const { control, handleSubmit, watch, reset, setValue } =
        useForm<ReminderSettingsDto>({
            defaultValues,
            mode: 'onChange',
        });

    useEffect(() => {
        reset(defaultValues);
    }, [initialValues]);

    const onSubmit: SubmitHandler<ReminderSettingsDto> = (data) => {
        props.onSubmit?.(data);
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
            id="Global-Reminder-Settings-Form"
            className={'full-width'}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Grid2 xs={12} className="flex-space-between">
                <FormLabel
                    id="all_reminders_enabled"
                    sx={{ display: 'inline' }}
                >
                    {t('notifications.enable_notifications')}
                </FormLabel>
                <Controller
                    name="allRemindersDisabled"
                    control={control}
                    render={({ field }) => (
                        <Switch
                            {...field}
                            checked={!field.value}
                            onChange={(_, isChecked) => {
                                field.onChange(!isChecked);
                            }}
                            inputProps={{
                                'aria-labelledby': 'all_reminders_enabled',
                            }}
                        />
                    )}
                />
            </Grid2>
            {!watch('allRemindersDisabled') && (
                <div>
                    <Grid2 container spacing={1}>
                        <Grid2 xs={12}>
                            <Typography
                                sx={{ padding: '1rem 0', fontWeight: 'bold' }}
                            >
                                {t('notifications.notifications_info')}
                            </Typography>
                        </Grid2>
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
                                                expectedDateSwitchOnChange(
                                                    !isChecked
                                                );
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
                </div>
            )}
            <Grid2 xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                    {t('actions.save')}
                </Button>
            </Grid2>
        </form>
    );
};

export default ReminderFormGlobal;
