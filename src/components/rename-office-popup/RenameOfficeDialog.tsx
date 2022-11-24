import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface RenameOfficeProps {
    open: boolean;
    title: string;
    onConfirm: () => Promise<void> | void;
    onCancel: () => void;
    children?: React.ReactNode;
}

const RenameOfficeDialog = (props: RenameOfficeProps): JSX.Element => {
    const { t } = useTranslation();

    const [officeNameText, setOfficeNameText] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const handleChange = (event: any): void => {
        setButtonDisabled(true);
        setOfficeNameText(event.target.value);
        if (event.target.value.length > 0) {
            setButtonDisabled(false);
        }
    };

    return (
        <Dialog
            open={props.open}
            onClose={props.onCancel}
            aria-labelledby="rename-office-dialog-title"
        >
            <DialogTitle id="dialog-title" sx={{ textAlign: 'center' }}>
                {props.title}
            </DialogTitle>
            <DialogContent>
                <TextField
                    type="rename"
                    aria-labelledby="type-rename"
                    size="small"
                    value={officeNameText}
                    onChange={handleChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                {props.onCancel && (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={props.onCancel}
                    >
                        {t('actions.cancel')}
                    </Button>
                )}
                {props.onConfirm && (
                    <Button
                        disabled={buttonDisabled}
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

export default RenameOfficeDialog;
