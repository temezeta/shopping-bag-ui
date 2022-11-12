import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    FormLabel,
    IconButton,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface DeleteAccountgProps {
    open: boolean;
    title: string;
    onConfirm: () => Promise<void> | void;
    onCancel: () => void;
    children?: React.ReactNode;
}

const DeleteAccountDialog = (props: DeleteAccountgProps): JSX.Element => {
    const { t } = useTranslation();

    const [deleteText, setDeleteText] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const handleChange = (event: any): void => {
        setButtonDisabled(true);
        setDeleteText(event.target.value);
        if (event.target.value === 'DELETE') {
            setButtonDisabled(false);
        }
    };

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
                    <IconButton
                        onClick={() => {
                            setButtonDisabled(true);
                            setDeleteText('');
                            props.onCancel();
                        }}
                        style={{
                            float: 'right',
                        }}
                    >
                        <CloseIcon fontSize="medium" />
                    </IconButton>
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
                                type="delete"
                                aria-labelledby="type-delete"
                                size="small"
                                value={deleteText}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid2>
                        <Grid2 xs={6} md={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={props.onConfirm}
                                disabled={buttonDisabled}
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
