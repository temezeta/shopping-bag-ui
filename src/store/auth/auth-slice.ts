import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RegisterDto } from '../../models/user/RegisterDto';
import { register } from './auth-actions';
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

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
});

export default authSlice.reducer;
