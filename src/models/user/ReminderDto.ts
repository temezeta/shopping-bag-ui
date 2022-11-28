export interface ReminderSettingsDto {
    allRemindersDisabled: boolean;
    dueDateRemindersDisabled: boolean;
    expectedRemindersDisabled: boolean;
    reminderDaysBeforeDueDate: number[];
    reminderDaysBeforeExpectedDate: number[];
}

export interface ListReminderSettingsDto {
    shoppingListId: number;
    dueDateRemindersDisabled: boolean;
    expectedRemindersDisabled: boolean;
    reminderDaysBeforeDueDate: number[];
    reminderDaysBeforeExpectedDate: number[];
}
