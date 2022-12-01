import { Close } from '@mui/icons-material';
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface FormDialogProps {
    open: boolean;
    title: string;
    onCancel?: () => Promise<void> | void;
    children?: React.ReactNode;
}

const FormDialog = (props: FormDialogProps): JSX.Element => {
    const { t } = useTranslation();
    return (
        <Dialog
            open={props.open}
            onClose={props.onCancel}
            aria-labelledby="dialog-title"
        >
            <Box className="flex-space-between">
                <DialogTitle id="dialog-title">{props.title}</DialogTitle>
                <IconButton
                    edge="start"
                    aria-label={t('actions.cancel')}
                    onClick={props.onCancel}
                >
                    <Close />
                </IconButton>
            </Box>
            <DialogContent>{props.children}</DialogContent>
        </Dialog>
    );
};

export default FormDialog;
