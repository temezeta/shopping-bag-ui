export interface ReminderSettingsDto {
    dueDateRemindersDisabled: boolean;
    expectedRemindersDisabled: boolean;
    reminderDaysBeforeDueDate: number[];
    reminderDaysBeforeExpectedDate: number[];
}
