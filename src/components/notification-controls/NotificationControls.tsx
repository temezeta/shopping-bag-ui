import { FormLabel, Switch } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { ReminderSettingsDto } from '../../models/user/ReminderDto';
import { useTranslation } from 'react-i18next';
import NotificationSelect from '../notification-select/NotificationSelect';

interface NotificationControlsProps {
    reminders: ReminderSettingsDto;
}

const NotificationControls = (
    props: NotificationControlsProps
): JSX.Element => {
    const { t } = useTranslation();
    return (
        <Grid2 container spacing={1}>
            <Grid2 xs={8}>
                <div className={'flex-space-between'}>
                    <FormLabel sx={{ display: 'inline' }} id="due_date_enabled">
                        {t('list.due_date')}
                    </FormLabel>
                    <Switch
                        defaultChecked={
                            !props.reminders.dueDateRemindersDisabled
                        }
                    />
                </div>
            </Grid2>
            <Grid2 xs={4}>
                <NotificationSelect
                    selections={props.reminders.reminderDaysBeforeDueDate}
                />
            </Grid2>
            <Grid2 xs={8}>
                <div className={'flex-space-between'}>
                    <FormLabel sx={{ display: 'inline' }} id="due_date_enabled">
                        {t('list.expected_delivery_date')}
                    </FormLabel>
                    <Switch
                        defaultChecked={
                            !props.reminders.expectedRemindersDisabled
                        }
                    />
                </div>
            </Grid2>
            <Grid2 xs={4}>
                <NotificationSelect
                    selections={props.reminders.reminderDaysBeforeExpectedDate}
                />
            </Grid2>
        </Grid2>
    );
};

export default NotificationControls;
