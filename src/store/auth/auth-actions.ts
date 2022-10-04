import { RegisterDto } from '../../models/user/RegisterDto';
import ApiClient from '../client';

export const register = async (data: RegisterDto): Promise<boolean> => {
    const response = await ApiClient.post('auth/register', data);
    return response.ok;
};
