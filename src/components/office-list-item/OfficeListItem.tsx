import { Delete, Edit } from '@mui/icons-material';
import {
    DialogContentText,
    IconButton,
    ListItem,
    Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { OfficeDto } from '../../models/office/OfficeDto';
import ConfirmationDialog from '../../components/confirmation-popup/ConfirmationDialog';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import OfficeNameDialog from '../office-name-popup/OfficeNameDialog';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../store/hooks';
import { deleteOfficeAsync } from '../../store/office/office-slice';
import { showSuccessSnackBar } from '../../store/ui/ui-slice';

interface OfficeListItemProps {
    office: OfficeDto;
}

const OfficeListItem = (props: OfficeListItemProps): JSX.Element => {
    const { office } = props;
    const { t } = useTranslation();
    const [isDeleteOpen, setDeleteOpen] = useState<boolean>(false);
    const [isNameDialogOpen, setNameDialogOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleDelete = (): void => {
        setDeleteOpen(true);
    };

    const handleNameDialog = (): void => {
        setNameDialogOpen(true);
    };

    const removeOffice = async (officeId: number): Promise<void> => {
        if (officeId) {
            unwrapResult(await dispatch(deleteOfficeAsync(officeId)));
            setDeleteOpen(false);
            await showSuccessSnackBar(t('actions.office_delete_successful'));
        }
    };

    return (
        <ListItem divider={true}>
            <Grid2
                container
                xs={12}
                wrap="nowrap"
                justifyContent="space_between"
                alignItems="center"
            >
                <Grid2 container xs={7} justifyContent="flex-start">
                    <Typography variant="h3" fontWeight="medium">
                        {office.name}
                    </Typography>
                </Grid2>
                <Grid2
                    container
                    xs={5}
                    columnSpacing={4}
                    justifyContent="flex-end"
                >
                    <IconButton aria-label="delete" onClick={handleDelete}>
                        <Delete />
                    </IconButton>
                    <IconButton aria-label="rename" onClick={handleNameDialog}>
                        <Edit />
                    </IconButton>
                </Grid2>
            </Grid2>
            <ConfirmationDialog
                open={isDeleteOpen}
                onConfirm={async () => await removeOffice(office.id)}
                onCancel={() => setDeleteOpen(false)}
                title={t('actions.remove_office')}
            >
                <DialogContentText>
                    {t('dialogs.confirmation')}
                </DialogContentText>
            </ConfirmationDialog>
            <OfficeNameDialog
                open={isNameDialogOpen}
                officeId={office.id}
                currentName={office.name}
                closeDialog={() => setNameDialogOpen(false)}
                title={t('actions.rename_office')}
            ></OfficeNameDialog>
        </ListItem>
    );
};

export default OfficeListItem;
