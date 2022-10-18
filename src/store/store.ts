import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './counter/counter-slice';
import authReducer from './auth/auth-slice';
import officesReducer from './office/office-slice';
import userReducer from './user/user-slice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        offices: officesReducer,
        user: userReducer,
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
