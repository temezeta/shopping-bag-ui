import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { t } from 'i18next';
import { OfficeDto } from '../../models/office/OfficeDto';
import {
    ListReminderSettingsDto,
    ReminderSettingsDto,
} from '../../models/user/ReminderDto';
import { UserDto, ChangePasswordDto } from '../../models/user/UserDto';
import { UserRoleDto } from '../../models/user/UserRoleDto';
import { RESET_ALL, RootState } from '../store';
import { setSnackbar, showSuccessSnackBar } from '../ui/ui-slice';
import {
    changeGlobalReminders,
    changeListReminders,
    changePassword,
    getAllUsers,
    getAllRoles,
    getCurrentUser,
    modifyUser,
    disableUser,
} from './user-actions';
import { ModifyUserPayload, UserState } from './user-types';

const initialState: UserState = {
    users: [],
    roles: [],
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

export const changeGlobalRemindersAsync = createAsyncThunk(
    'user/change-global-reminders',
    async (data: ReminderSettingsDto, { rejectWithValue, dispatch }) => {
        const response = await changeGlobalReminders(data);
        if (!response) {
            dispatch(
                setSnackbar({
                    type: 'error',
                    message: t('errors.global_reminders_change_failed'),
                })
            );
            return rejectWithValue('Global reminders change failed!');
        }
        await showSuccessSnackBar(t('user.global_reminders_change_successful'));
        return response;
    }
);

export const changeListRemindersAsync = createAsyncThunk(
    'user/change-list-reminders',
    async (data: ListReminderSettingsDto, { rejectWithValue, dispatch }) => {
        const response = await changeListReminders(data.shoppingListId, data);
        if (!response) {
            dispatch(
                setSnackbar({
                    type: 'error',
                    message: t('errors.list_reminders_change_failed'),
                })
            );
            return rejectWithValue('List reminders change failed!');
        }
        await showSuccessSnackBar(t('user.list_reminders_change_successful'));
        return response;
    }
);

export const disableUserAsync = createAsyncThunk(
    'user/remove-user',
    async (data: number, { rejectWithValue, dispatch }) => {
        const response = await disableUser(data);
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

export const disableAccountAdminAsync = createAsyncThunk(
    'user/disable-user-admin',
    async (userId: number, { rejectWithValue, dispatch }) => {
        const response = await disableUser(userId);
        if (!response) {
            dispatch(
                setSnackbar({
                    type: 'error',
                    message: t('errors.disable_account_failed'),
                })
            );
            return rejectWithValue('Disabling account failed!');
        }
        await showSuccessSnackBar(t('user.account_disabled_admin'));
        return userId;
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

export const modifyUserAsync = createAsyncThunk(
    'user/adminmodify',
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

export const getAllRolesAsync = createAsyncThunk(
    'userrole/list',
    async (_, { rejectWithValue }) => {
        const response = await getAllRoles();
        if (!response) {
            return rejectWithValue('Cannot find roles');
        }
        return response;
    }
);

export const getUserReminders = createAsyncThunk(
    'user/get-reminders',
    async (_, { rejectWithValue }) => {
        const response = await getCurrentUser();
        if (!response) {
            return rejectWithValue('User not found');
        }

        return {
            reminderSettings: response.reminderSettings,
            listReminderSettings: response.listReminderSettings,
        };
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
export const selectRoles = (state: RootState): UserRoleDto[] =>
    state.user.roles;

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
            .addCase(modifyUserAsync.fulfilled, (state, action) => {
                const index = state.users.findIndex(
                    (x) => x.id === action.payload.id
                );
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(disableAccountAdminAsync.fulfilled, (state, action) => {
                state.users = state.users.filter(
                    (it) => it.id !== action.payload
                );
            })
            .addCase(getAllUsersAsync.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(changeGlobalRemindersAsync.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            })
            .addCase(changeListRemindersAsync.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            })
            .addCase(getAllRolesAsync.fulfilled, (state, action) => {
                state.roles = action.payload;
            })
            .addCase(getUserReminders.fulfilled, (state, action) => {
                if (!state.currentUser) return;
                state.currentUser.reminderSettings =
                    action.payload.reminderSettings;
                state.currentUser.listReminderSettings =
                    action.payload.listReminderSettings;
            });
    },
});

export const { setSessionOffice } = userSlice.actions;

export default userSlice.reducer;
