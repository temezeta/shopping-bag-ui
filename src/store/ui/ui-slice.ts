import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RESET_ALL, RootState, store } from '../store';
import { SnackbarInfo, UIState } from './ui-types';

const initialState: UIState = {
    showSnackbar: false,
};

export const showResponseError = async (response: Response): Promise<void> => {
    store.dispatch(
        setSnackbar({ type: 'error', message: await response.text() })
    );
};

// Selectors
export const selectUIState = (state: RootState): UIState => state.ui;

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setSnackbar: (state, action: PayloadAction<SnackbarInfo>) => {
            state.showSnackbar = true;
            state.snackbarInfo = action.payload;
        },
        clearSnackbar: (state) => {
            state.showSnackbar = false;
            state.snackbarInfo = undefined;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(RESET_ALL, () => initialState);
    },
});

export const { setSnackbar, clearSnackbar } = uiSlice.actions;

export default uiSlice.reducer;
