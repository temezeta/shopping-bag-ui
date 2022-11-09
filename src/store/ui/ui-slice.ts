import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { SnackbarInfo, UIState } from './ui-types';

const initialState: UIState = {
    showSnackbar: false,
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
});

export const { setSnackbar, clearSnackbar } = uiSlice.actions;

export default uiSlice.reducer;
