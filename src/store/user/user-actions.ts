import { UserDto } from '../../models/user/UserDto';
import ApiClient from '../client';

export const getCurrentUser = async (): Promise<UserDto | null> => {
    const response = await ApiClient.get('user/me');
    if (!response.ok) {
        return null;
    }
    return (await response.json()) as UserDto;
};
