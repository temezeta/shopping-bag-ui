import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { t } from 'i18next';
import { LoginDto } from '../../models/auth/LoginDto';
import { RefreshTokenDto } from '../../models/auth/RefreshTokenDto';
import { RegisterDto } from '../../models/auth/RegisterDto';
import { ResetPasswordDto } from '../../models/auth/ResetPasswordDto';
import { RESET_ALL, RootState } from '../store';
import { setSnackbar } from '../ui/ui-slice';
import {
    login,
    logout,
    recoverAccount,
    refreshToken,
    register,
    resendVerificationEmail,
    resetPassword,
} from './auth-actions';
import { AuthState } from './auth-types';

const initialState: AuthState = {
    registrationSending: false,
};

export const registerAsync = createAsyncThunk(
    'auth/register',
    async (data: RegisterDto, { rejectWithValue, dispatch }) => {
        const response = await register(data);
        if (!response) {
            dispatch(
                setSnackbar({
                    type: 'error',
                    message: t('errors.registration_failed'),
                })
            );
            return rejectWithValue('Registration failed');
        }
        return response;
    }
);

export const loginAsync = createAsyncThunk(
    'auth/login',
    async (data: LoginDto, { rejectWithValue, dispatch }) => {
        localStorage.removeItem('authToken');
        const response = await login(data);
        if (!response) {
            dispatch(
                setSnackbar({
                    type: 'error',
                    message: t('errors.login_failed'),
                })
            );
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
    async (_, { rejectWithValue, dispatch }) => {
        const response = await logout();
        if (!response) {
            dispatch(
                setSnackbar({
                    type: 'error',
                    message: t('errors.logout_failed'),
                })
            );
            return rejectWithValue('Logout failed');
        }
        localStorage.removeItem('authToken');
        dispatch(RESET_ALL());
        return response;
    }
);

export const recoverAccountAsync = createAsyncThunk(
    'auth/recover-account',
    async (email: string, { rejectWithValue, dispatch }) => {
        const response = await recoverAccount(email);
        if (!response) {
            dispatch(
                setSnackbar({
                    type: 'error',
                    message: t('errors.recover_account_failed'),
                })
            );
            return rejectWithValue('Recovery email sending failed');
        }
        return response;
    }
);

export const resetPasswordAsync = createAsyncThunk(
    'auth/reset-password',
    async (data: ResetPasswordDto, { rejectWithValue, dispatch }) => {
        const response = await resetPassword(data);
        if (!response) {
            dispatch(
                setSnackbar({
                    type: 'error',
                    message: t('errors.reset_password_failed'),
                })
            );
            return rejectWithValue('Could not reset password');
        }
        return response;
    }
);

export const resendVerificationEmailAsync = createAsyncThunk(
    'auth/resend-verification',
    async (email: string, { rejectWithValue, dispatch }) => {
        const response = await resendVerificationEmail(email);
        if (!response) {
            dispatch(
                setSnackbar({
                    type: 'error',
                    message: t('errors.resend_verificationm_failed'),
                })
            );
            return rejectWithValue('Recovery email sending failed');
        }
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
            .addCase(RESET_ALL, () => initialState)
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
