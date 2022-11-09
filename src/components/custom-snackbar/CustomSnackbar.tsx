import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearSnackbar, selectUIState } from '../../store/ui/ui-slice';

const CustomSnackbar = (): JSX.Element | null => {
    const dispatch = useAppDispatch();
    const { showSnackbar, snackbarInfo } = useAppSelector(selectUIState);

    const handleClose = (): void => {
        dispatch(clearSnackbar());
    };

    return snackbarInfo ? (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={showSnackbar}
            autoHideDuration={4000}
            onClose={handleClose}
            aria-describedby="snackbar-alert"
        >
            <Alert
                elevation={3}
                variant="filled"
                severity={snackbarInfo.type}
                id="snackbar-alert"
            >
                {snackbarInfo.message}
            </Alert>
        </Snackbar>
    ) : null;
};

export default CustomSnackbar;
