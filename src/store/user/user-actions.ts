import { UserDto, ChangePasswordDto } from '../../models/user/UserDto';
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

export const removeUser = async (userId: number): Promise<boolean> => {
    const response = await ApiClient.delete(`user?userId=${userId}`, null);
    if (!response.ok) {
        await showResponseError(response);
    }
    return response.ok;
};
