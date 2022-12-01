import {
    Notifications,
    NotificationsNone,
    NotificationsOff,
} from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ListReminderSettingsDto } from '../../models/user/ReminderDto';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/user/user-slice';
import FormDialog from '../form-dialog/FormDialog';
import ReminderFormList from '../reminder-form-list/ReminderFormList';

interface RemindersIconButtonProps {
    listId: number;
}

const RemindersIconButton = (props: RemindersIconButtonProps): JSX.Element => {
    const { t } = useTranslation();
    const user = useAppSelector(selectCurrentUser);
    const listReminders: ListReminderSettingsDto | undefined =
        user?.listReminderSettings.find(
            (e) => e.shoppingListId === props.listId
        );
    const [isRemindersOpen, setRemindersOpen] = useState<boolean>(false);

    const remindersOnClick = (): void => {
        setRemindersOpen(true);
    };

    return (
        <>
            {user?.reminderSettings.allRemindersDisabled ? (
                <Tooltip title={t('notifications.notifications_off_tooltip')}>
                    <NotificationsOff />
                </Tooltip>
            ) : (
                <IconButton
                    aria-label={t('notifications.edit_notifications')}
                    onClick={remindersOnClick}
                >
                    {listReminders?.dueDateRemindersDisabled &&
                    listReminders.expectedRemindersDisabled ? (
                        <NotificationsNone />
                    ) : (
                        <Notifications />
                    )}
                </IconButton>
            )}
            <FormDialog
                open={isRemindersOpen}
                onCancel={() => setRemindersOpen(false)}
                title={t('notifications.notifications')}
            >
                <ReminderFormList
                    listId={props.listId}
                    initialValues={listReminders}
                />
            </FormDialog>
        </>
    );
};

export default RemindersIconButton;
