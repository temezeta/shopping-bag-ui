import { Button, FormLabel, Switch } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { ReminderSettingsDto } from '../../models/user/ReminderDto';
import { useTranslation } from 'react-i18next';
import NotificationSelect from '../notification-select/NotificationSelect';
import { ChangeEvent, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface NotificationFormProps {
    initialValues?: ReminderSettingsDto;
    onSubmit?: SubmitHandler<ReminderSettingsDto>;
}

const NotificationFormGlobal = (props: NotificationFormProps): JSX.Element => {
    const { t } = useTranslation();
    const { initialValues } = props;

    const defaultValues: Partial<ReminderSettingsDto> = initialValues
        ? {
              dueDateRemindersDisabled: initialValues.dueDateRemindersDisabled,
              expectedRemindersDisabled:
                  initialValues.expectedRemindersDisabled,
              reminderDaysBeforeDueDate:
                  initialValues.reminderDaysBeforeDueDate,
              reminderDaysBeforeExpectedDate:
                  initialValues.reminderDaysBeforeExpectedDate,
          }
        : {
              dueDateRemindersDisabled: false,
              expectedRemindersDisabled: false,
              reminderDaysBeforeDueDate: [],
              reminderDaysBeforeExpectedDate: [],
          };

    const { control, handleSubmit, reset } = useForm<ReminderSettingsDto>({
        defaultValues,
        mode: 'onChange',
    });

    useEffect(() => {
        reset(defaultValues);
    }, [initialValues]);

    const onSubmit: SubmitHandler<ReminderSettingsDto> = (data) => {
        props.onSubmit?.(data);
    };

    // TODO: TEMP Global master switch settings ---->
    const [enableNotifications = true, setEnableNotifications] =
        useState<boolean>();
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setEnableNotifications(event.target.checked);
    };
    // <---- TEMP

    return (
        <form
            id="Global-Notifications-Settings-Form"
            className={'full-width'}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Grid2 xs={12} className="flex-space-between">
                <FormLabel sx={{ display: 'inline' }}>
                    {t('notifications.enable_notifications')}
                </FormLabel>
                {/* TODO change to Controller */}
                <Switch defaultChecked={true} onChange={handleChange} />
            </Grid2>
            {enableNotifications && (
                <Grid2 container spacing={1}>
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
                            rules={{ required: true }}
                            render={({ field }) => (
                                <NotificationSelect
                                    {...field}
                                    selections={
                                        defaultValues.reminderDaysBeforeDueDate
                                    }
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
                            rules={{ required: true }}
                            render={({ field }) => (
                                <NotificationSelect
                                    {...field}
                                    selections={
                                        defaultValues.reminderDaysBeforeExpectedDate
                                    }
                                />
                            )}
                        />
                    </Grid2>
                </Grid2>
            )}
            <Grid2 xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                    {t('actions.save')}
                </Button>
            </Grid2>
        </form>
    );
};

export default NotificationFormGlobal;
