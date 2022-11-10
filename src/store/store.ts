import {
    configureStore,
    ThunkAction,
    Action,
    createAction,
} from '@reduxjs/toolkit';
import authReducer from './auth/auth-slice';
import officesReducer from './office/office-slice';
import userReducer from './user/user-slice';
import shoppingListReducer from './shopping-list/shopping-list-slice';
import uiReducer from './ui/ui-slice';

export const RESET_ALL = createAction('RESET_ALL');

export const store = configureStore({
    reducer: {
        auth: authReducer,
        offices: officesReducer,
        user: userReducer,
        shoppinglist: shoppingListReducer,
        ui: uiReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
