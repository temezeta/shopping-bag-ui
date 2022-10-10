import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserDto } from '../../models/user/UserDto';
import { RootState } from '../store';
import { getCurrentUser } from './user-actions';
import { UserState } from './user-types';

const initialState: UserState = {};

export const getCurrentUserAsync = createAsyncThunk(
    'user/me',
    async (_, { rejectWithValue }) => {
        const response = await getCurrentUser();
        if (!response) {
            return rejectWithValue('User not available');
        }
        return response;
    }
);

// Selectors
export const selectCurrentUser = (state: RootState): UserDto | undefined =>
    state.user.currentUser;

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentUserAsync.pending, (state) => {
                state.currentUser = undefined;
            })
            .addCase(getCurrentUserAsync.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            });
    },
});

export default userSlice.reducer;
