import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OfficeDto } from '../../models/office/OfficeDto';
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
// TODO: When "session office" is implemented this should return that if defined, else home office
export const selectCurrentOffice = (state: RootState): OfficeDto | undefined =>
    state.user.currentUser?.homeOffice;

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
