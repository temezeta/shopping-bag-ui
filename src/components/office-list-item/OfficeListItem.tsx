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
import RenameOfficeDialog from '../rename-office-popup/RenameOfficeDialog';

interface OfficeListItemProps {
    office: OfficeDto;
}

const OfficeListItem = (props: OfficeListItemProps): JSX.Element => {
    const { office } = props;
    const { t } = useTranslation();
    const [isDeleteOpen, setDeleteOpen] = useState<boolean>(false);
    const [isRenameOpen, setRenameOpen] = useState<boolean>(false);

    const handleDelete = (): void => {
        setDeleteOpen(true);
    };

    const handleRename = (): void => {
        setRenameOpen(true);
    };

    const removeOffice = async (officeId: number): Promise<void> => {
        console.log(officeId);
        return undefined;
    };

    const renameOffice = async (officeId: number): Promise<void> => {
        console.log(officeId);
        return undefined;
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
                    <Typography
                        color="info.main"
                        variant="h3"
                        fontWeight="medium"
                    >
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
                    <IconButton aria-label="rename" onClick={handleRename}>
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
            <RenameOfficeDialog
                open={isRenameOpen}
                onConfirm={async () => await renameOffice(office.id)}
                onCancel={() => setRenameOpen(false)}
                title={t('actions.rename_office')}
            ></RenameOfficeDialog>
        </ListItem>
    );
};

export default OfficeListItem;
