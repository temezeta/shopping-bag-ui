export interface ReminderSettingsDto {
    allRemindersDisabled: boolean;
    dueDateRemindersDisabled: boolean;
    expectedRemindersDisabled: boolean;
    reminderDaysBeforeDueDate: number[];
    reminderDaysBeforeExpectedDate: number[];
}
