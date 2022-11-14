import { AlertColor } from '@mui/material';

export interface UIState {
    showSnackbar: boolean;
    snackbarInfo?: SnackbarInfo;
}

export interface SnackbarInfo {
    type: AlertColor;
    message: string;
}
