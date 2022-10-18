import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginDto } from '../../models/auth/LoginDto';
import { RefreshTokenDto } from '../../models/auth/RefreshTokenDto';
import { RegisterDto } from '../../models/auth/RegisterDto';
import { RootState } from '../store';
import { login, logout, refreshToken, register } from './auth-actions';
import { AuthState } from './auth-types';

const initialState: AuthState = {
    registrationSending: false,
};

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

export const logoutAsync = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        const response = await logout();
        if (!response) {
            return rejectWithValue('Logout failed');
        }
        localStorage.removeItem('authToken');
        return response;
    }
);

// Selectors
export const selectRegistrationSending = (state: RootState): boolean =>
    state.auth.registrationSending;

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerAsync.pending, (state) => {
                state.registrationSending = true;
            })
            .addCase(registerAsync.fulfilled, (state) => {
                state.registrationSending = false;
            })
            .addCase(registerAsync.rejected, (state) => {
                state.registrationSending = false;
            });
    },
});

export default authSlice.reducer;
