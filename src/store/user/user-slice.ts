import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfficeDto } from '../../models/office/OfficeDto';
import { UserDto } from '../../models/user/UserDto';
import { RESET_ALL, RootState } from '../store';
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
export const selectCurrentOffice = (state: RootState): OfficeDto | undefined =>
    state.user.sessionOffice ?? selectHomeOffice(state);
export const selectHomeOffice = (state: RootState): OfficeDto | undefined =>
    state.user.currentUser?.homeOffice;

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSessionOffice: (
            state,
            action: PayloadAction<OfficeDto | undefined>
        ) => {
            state.sessionOffice = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(RESET_ALL, () => initialState)
            .addCase(getCurrentUserAsync.pending, (state) => {
                state.currentUser = undefined;
            })
            .addCase(getCurrentUserAsync.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            });
    },
});

export const { setSessionOffice } = userSlice.actions;

export default userSlice.reducer;
