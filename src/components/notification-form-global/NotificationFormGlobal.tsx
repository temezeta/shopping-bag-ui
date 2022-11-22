import { Button, FormLabel, Switch } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { ReminderSettingsDto } from '../../models/user/ReminderDto';
import { useTranslation } from 'react-i18next';
import NotificationSelect from '../notification-select/NotificationSelect';
import { ChangeEvent, useState } from 'react';

const NotificationFormGlobal = (): JSX.Element => {
    const { t } = useTranslation();

    // TODO: TEMP ReminderSettings ---->
    const reminders: ReminderSettingsDto = {
        dueDateRemindersDisabled: false,
        expectedRemindersDisabled: true,
        reminderDaysBeforeDueDate: [1, 3],
        reminderDaysBeforeExpectedDate: [2],
    };

    const [enableNotifications = true, setEnableNotifications] =
        useState<boolean>();
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setEnableNotifications(event.target.checked);
    };
    // <---- TEMP ReminderSettings

    return (
        <div>
            <Grid2 xs={12} className="flex-space-between">
                <FormLabel sx={{ display: 'inline' }}>
                    {t('notifications.enable_notifications')}
                </FormLabel>
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
                            <Switch
                                defaultChecked={
                                    !reminders.dueDateRemindersDisabled
                                }
                            />
                        </div>
                    </Grid2>
                    <Grid2 xs={4}>
                        <NotificationSelect
                            selections={reminders.reminderDaysBeforeDueDate}
                        />
                    </Grid2>
                    <Grid2 xs={8}>
                        <div className={'flex-space-between'}>
                            <FormLabel
                                sx={{ display: 'inline' }}
                                id="due_date_enabled"
                            >
                                {t('list.expected_delivery_date')}
                            </FormLabel>
                            <Switch
                                defaultChecked={
                                    !reminders.expectedRemindersDisabled
                                }
                            />
                        </div>
                    </Grid2>
                    <Grid2 xs={4}>
                        <NotificationSelect
                            selections={
                                reminders.reminderDaysBeforeExpectedDate
                            }
                        />
                    </Grid2>
                </Grid2>
            )}
            <Grid2 xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                    {t('actions.save')}
                </Button>
            </Grid2>
        </div>
    );
};

export default NotificationFormGlobal;
