import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { t } from 'i18next';
import { OfficeDto } from '../../models/office/OfficeDto';
import { UserDto, ChangePasswordDto } from '../../models/user/UserDto';
import { RESET_ALL, RootState } from '../store';
import { setSnackbar, showSuccessSnackBar } from '../ui/ui-slice';
import {
    changePassword,
    getAllUsers,
    getCurrentUser,
    modifyUser,
    removeUser,
} from './user-actions';
import { ModifyUserPayload, UserState } from './user-types';

const initialState: UserState = {
    users: [],
};

export const changePasswordAsync = createAsyncThunk(
    'user/change-password',
    async (data: ChangePasswordDto, { rejectWithValue, dispatch }) => {
        const response = await changePassword(data);
        if (!response) {
            dispatch(
                setSnackbar({
                    type: 'error',
                    message: t('errors.password_change_failed'),
                })
            );
            return rejectWithValue('Password change failed!');
        }
        await showSuccessSnackBar(t('user.password_change_successful'));
        return response;
    }
);

export const removeUserAsync = createAsyncThunk(
    'user/remove-user',
    async (data: number, { rejectWithValue, dispatch }) => {
        const response = await removeUser(data);
        if (!response) {
            dispatch(
                setSnackbar({
                    type: 'error',
                    message: t('errors.disable_account_failed'),
                })
            );
            return rejectWithValue('Disabling account failed!');
        }
        localStorage.removeItem('authToken');
        dispatch(RESET_ALL());
        await showSuccessSnackBar(t('user.account_disabled'));
        return response;
    }
);

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

export const modifyCurrentUserAsync = createAsyncThunk(
    'user/modify',
    async (data: ModifyUserPayload, { rejectWithValue }) => {
        const response = await modifyUser(data.userId, data.data);
        if (!response) {
            return rejectWithValue('Cannot modify user');
        }
        return response;
    }
);

export const getAllUsersAsync = createAsyncThunk(
    'user/list',
    async (_, { rejectWithValue }) => {
        const response = await getAllUsers();
        if (!response) {
            return rejectWithValue('Cannot get all users');
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
export const selectAllUsers = (state: RootState): UserDto[] => state.user.users;
export const selectUserById =
    (userId: number) =>
    (state: RootState): UserDto | undefined =>
        state.user.users.find((it) => it.id === userId);

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
            })
            .addCase(modifyCurrentUserAsync.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            })
            .addCase(getAllUsersAsync.fulfilled, (state, action) => {
                state.users = action.payload;
            });
    },
});

export const { setSessionOffice } = userSlice.actions;

export default userSlice.reducer;
