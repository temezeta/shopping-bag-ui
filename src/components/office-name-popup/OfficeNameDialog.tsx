import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import {
    addOfficeAsync,
    editOfficeAsync,
} from '../../store/office/office-slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { showSuccessSnackBar } from '../../store/ui/ui-slice';

interface OfficeNameDialogProps {
    open: boolean;
    title: string;
    officeId?: number;
    currentName?: string;
    closeDialog: () => void;
    children?: React.ReactNode;
}

const OfficeNameDialog = (props: OfficeNameDialogProps): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const [officeNameText, setOfficeNameText] = useState(
        props.currentName ?? ''
    );

    useEffect(() => {
        setOfficeNameText(props.currentName ?? '');
    }, [props.currentName]);

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const handleChange = (event: any): void => {
        setButtonDisabled(true);
        setOfficeNameText(event.target.value);
        if (
            event.target.value.length > 0 &&
            event.target.value !== props.currentName
        ) {
            setButtonDisabled(false);
        }
    };

    const renameOffice = async (newName: string, id: number): Promise<void> => {
        const data = { name: newName };
        const officeId = id;
        const result = unwrapResult(
            await dispatch(editOfficeAsync({ data, officeId }))
        );
        if (result) {
            props.closeDialog();
            setOfficeNameText(result.name ?? '');
            await showSuccessSnackBar(t('actions.office_rename_successful'));
        }
    };

    const addNewOffice = async (newName: string): Promise<void> => {
        const data = { name: newName };
        const result = unwrapResult(await dispatch(addOfficeAsync({ data })));
        if (result) {
            props.closeDialog();
            setOfficeNameText('');
            await showSuccessSnackBar(t('actions.office_add_successful'));
        }
    };

    const handleConfirm = async (
        newName: string,
        id?: number
    ): Promise<void> => {
        setButtonDisabled(true);
        if (id) await renameOffice(newName, id);
        else await addNewOffice(newName);
    };

    const cancelAction = async (): Promise<void> => {
        setOfficeNameText(props.currentName ?? '');
        props.closeDialog();
    };

    return (
        <Dialog
            open={props.open}
            onClose={cancelAction}
            aria-labelledby="office-name-dialog-title"
        >
            <DialogTitle id="dialog-title" sx={{ textAlign: 'center' }}>
                {props.title}
            </DialogTitle>
            <DialogContent>
                <TextField
                    type="office-name"
                    aria-labelledby="type-office-name"
                    size="small"
                    value={officeNameText}
                    onChange={handleChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={cancelAction}
                >
                    {t('actions.cancel')}
                </Button>
                <Button
                    disabled={buttonDisabled}
                    variant="contained"
                    color="primary"
                    onClick={async () =>
                        await handleConfirm(officeNameText, props.officeId)
                    }
                    autoFocus
                >
                    {t('actions.save')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default OfficeNameDialog;
