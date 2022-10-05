import { LoginDto } from '../../models/auth/LoginDto';
import { RefreshTokenDto } from '../../models/auth/RefreshTokenDto';
import { RegisterDto } from '../../models/auth/RegisterDto';
import { TokenResponseDto } from '../../models/auth/TokenResponseDto';
import ApiClient from '../client';

export const register = async (data: RegisterDto): Promise<boolean> => {
    const response = await ApiClient.post('auth/register', data);
    return response.ok;
};

export const login = async (
    data: LoginDto
): Promise<TokenResponseDto | null> => {
    const response = await ApiClient.post('auth/login', data);
    if (!response.ok) {
        return null;
    }
    return (await response.json()) as TokenResponseDto;
};

export const refreshToken = async (
    data: RefreshTokenDto
): Promise<TokenResponseDto | null> => {
    const response = await ApiClient.post('auth/refresh-token', data);
    if (!response.ok) {
        return null;
    }
    return (await response.json()) as TokenResponseDto;
};
