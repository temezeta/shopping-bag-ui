import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    FormLabel,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

interface DeleteAccountgProps {
    open: boolean;
    title: string;
    onConfirm: () => Promise<void> | void;
    onCancel?: () => Promise<void> | void;
    children?: React.ReactNode;
}

const DeleteAccountDialog = (props: DeleteAccountgProps): JSX.Element => {
    const { t } = useTranslation();
    return (
        <Dialog
            open={props.open}
            onClose={props.onCancel}
            aria-labelledby="delete-account-dialog-title"
        >
            <Grid2>
                <DialogTitle
                    id="delete-account-dialog-title"
                    sx={{ textAlign: 'center' }}
                >
                    {props.title}
                    <CloseIcon
                        fontSize="medium"
                        onClick={props.onCancel}
                        style={{
                            float: 'right',
                        }}
                    />
                </DialogTitle>
            </Grid2>
            <DialogContent>{props.children}</DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                {props.onConfirm && (
                    <Grid2
                        container
                        spacing={1}
                        alignItems="flex-end"
                        sx={{ padding: '1.5rem' }}
                    >
                        <Grid2 xs={6} md={9}>
                            <FormLabel id="type-delete">
                                {t('dialogs.type_delete')}
                            </FormLabel>
                            <TextField
                                aria-labelledby="type-delete"
                                size="small"
                                fullWidth
                            />
                        </Grid2>
                        <Grid2 xs={6} md={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={props.onConfirm}
                                autoFocus
                            >
                                {t('actions.delete')}
                            </Button>
                        </Grid2>
                    </Grid2>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default DeleteAccountDialog;
