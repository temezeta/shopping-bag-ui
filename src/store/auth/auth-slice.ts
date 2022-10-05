import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginDto } from '../../models/auth/LoginDto';
import { RefreshTokenDto } from '../../models/auth/RefreshTokenDto';
import { RegisterDto } from '../../models/auth/RegisterDto';
import { login, refreshToken, register } from './auth-actions';
import { AuthState } from './auth-types';

const initialState: AuthState = {};

export const registerAsync = createAsyncThunk(
    'auth/register',
    async (data: RegisterDto, { rejectWithValue }) => {
        const response = await register(data);
        if (!response) {
            return rejectWithValue('Registration failed');
        }
        return response;
    }
);

export const loginAsync = createAsyncThunk(
    'auth/login',
    async (data: LoginDto, { rejectWithValue }) => {
        localStorage.removeItem('authToken');
        const response = await login(data);
        if (!response) {
            return rejectWithValue('Login failed');
        }
        localStorage.setItem('authToken', response.token);
        return response;
    }
);

export const refreshTokenAsync = createAsyncThunk(
    'auth/refresh-token',
    async (data: RefreshTokenDto, { rejectWithValue }) => {
        localStorage.removeItem('authToken');
        const response = await refreshToken(data);
        if (!response) {
            return rejectWithValue('Refresh token failed');
        }
        localStorage.setItem('authToken', response.token);
        return response;
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
});

export default authSlice.reducer;
