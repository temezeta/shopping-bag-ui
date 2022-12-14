import {
    ListReminderSettingsDto,
    ReminderSettingsDto,
} from '../../models/user/ReminderDto';
import {
    UserDto,
    ChangePasswordDto,
    ModifyUserDto,
} from '../../models/user/UserDto';
import { UserRoleDto } from '../../models/user/UserRoleDto';
import ApiClient from '../client';
import { showResponseError } from '../ui/ui-slice';

export const getCurrentUser = async (): Promise<UserDto | null> => {
    const response = await ApiClient.get('user/me');
    if (!response.ok) {
        return null;
    }
    return (await response.json()) as UserDto;
};

export const changePassword = async (
    data: ChangePasswordDto
): Promise<UserDto | null> => {
    const response = await ApiClient.put('user/change-password', data);
    if (!response.ok) {
        return null;
    }
    return (await response.json()) as UserDto;
};

export const changeGlobalReminders = async (
    data: ReminderSettingsDto
): Promise<UserDto | null> => {
    const response = await ApiClient.post('reminder', data);
    if (!response.ok) {
        return null;
    }
    return (await response.json()) as UserDto;
};

export const changeListReminders = async (
    listId: number,
    data: ListReminderSettingsDto
): Promise<UserDto | null> => {
    const response = await ApiClient.post(
        `reminder/list?listId=${listId}`,
        data
    );
    if (!response.ok) {
        return null;
    }
    return (await response.json()) as UserDto;
};

export const modifyUser = async (
    userId: number,
    data: ModifyUserDto
): Promise<UserDto | null> => {
    const response = await ApiClient.put(`user/modify?userId=${userId}`, data);
    if (!response.ok) {
        await showResponseError(response);
        return null;
    }

    return (await response.json()) as UserDto;
};

export const disableUser = async (userId: number): Promise<boolean> => {
    const response = await ApiClient.delete(`user?userId=${userId}`, null);
    if (!response.ok) {
        return false;
    }
    return response.ok;
};

export const getAllUsers = async (): Promise<UserDto[] | null> => {
    const response = await ApiClient.get('user/list');
    if (!response.ok) {
        await showResponseError(response);
        return null;
    }
    return (await response.json()) as UserDto[];
};

export const getAllRoles = async (): Promise<UserRoleDto[]> => {
    const response = await ApiClient.get('userrole/list');
    if (!response.ok) {
        return [];
    }
    return (await response.json()) as UserRoleDto[];
};
