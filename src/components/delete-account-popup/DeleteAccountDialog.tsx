import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
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
            <DialogTitle
                id="delete-account-dialog-title"
                sx={{ textAlign: 'center' }}
            >
                {props.title}
            </DialogTitle>
            <DialogContent>{props.children}</DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                {props.onConfirm && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={props.onConfirm}
                        autoFocus
                    >
                        {t('actions.delete')}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default DeleteAccountDialog;
