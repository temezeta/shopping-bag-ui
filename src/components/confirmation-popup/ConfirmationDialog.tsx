import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ConfirmationDialogProps {
    open: boolean;
    title: string;
    onConfirm: () => void;
    onCancel?: () => void;
    children?: React.ReactNode;
}

const ConfirmationDialog = (props: ConfirmationDialogProps): JSX.Element => {
    const { t } = useTranslation();
    return (
        <Dialog
            open={props.open}
            onClose={props.onCancel}
            aria-labelledby="dialog-title"
        >
            <DialogTitle id="dialog-title" sx={{ textAlign: 'center' }}>
                {props.title}
            </DialogTitle>
            <DialogContent>{props.children}</DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                {props.onCancel && (
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={props.onCancel}
                    >
                        {t('actions.cancel')}
                    </Button>
                )}
                {props.onConfirm && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={props.onConfirm}
                        autoFocus
                    >
                        {t('actions.ok')}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
