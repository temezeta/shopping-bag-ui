import { Button, FormLabel, Switch } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { ListReminderSettingsDto } from '../../models/user/ReminderDto';
import { useTranslation } from 'react-i18next';
import ReminderSelect from '../reminder-select/ReminderSelect';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import styles from './ReminderFormList.module.css';

interface ReminderFormProps {
    initialValues?: ListReminderSettingsDto;
    listId: number;
    onSubmit?: SubmitHandler<ListReminderSettingsDto>;
}

const ReminderFormList = (props: ReminderFormProps): JSX.Element => {
    const { t } = useTranslation();
    const { initialValues } = props;

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
              dueDateRemindersDisabled: false,
              expectedRemindersDisabled: false,
              reminderDaysBeforeDueDate: [],
              reminderDaysBeforeExpectedDate: [],
          };

    const { control, handleSubmit, watch, reset } =
        useForm<ListReminderSettingsDto>({
            defaultValues,
            mode: 'onChange',
        });

    useEffect(() => {
        reset(defaultValues);
    }, [initialValues]);

    const onSubmit: SubmitHandler<ListReminderSettingsDto> = (data) => {
        props.onSubmit?.(data);
    };

    return (
        <form
            id="List-Reminder-Settings-Form"
            className={'full-width'}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Grid2 container spacing={2} className={styles.formInputs}>
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
                                    onChange={(_, isChecked) =>
                                        field.onChange(!isChecked)
                                    }
                                    inputProps={{
                                        'aria-labelledby': 'due_date_enabled',
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
                                disabled={watch('dueDateRemindersDisabled')}
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
                                    onChange={(_, isChecked) =>
                                        field.onChange(!isChecked)
                                    }
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
                                disabled={watch('expectedRemindersDisabled')}
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
