import { ArrowBackIos } from '@mui/icons-material';
import { IconButton, Typography, DialogContentText } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmationDialog from '../../components/confirmation-popup/ConfirmationDialog';
import ItemForm from '../../components/item-form/ItemForm';
import MainLayout from '../../components/main-layout/MainLayout';
import { AddItemDto } from '../../models/shopping-list/AddItemDto';
import { useAppDispatch } from '../../store/hooks';

const EditItem = (): JSX.Element => {
    const { itemId } = useParams();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [modification, setModification] = useState<AddItemDto | undefined>(
        undefined
    );
    const [isModifyOpen, setModifyOpen] = useState<boolean>(false);

    const onSubmit: SubmitHandler<AddItemDto> = async (data) => {
        setModification(data);
        setModifyOpen(true);
    };

    const onModifyConfirm = async (): Promise<void> => {};

    return (
        <>
            <MainLayout>
                <Grid2 container spacing={1}>
                    <Grid2 xs={12} className="flex-center">
                        <IconButton onClick={() => navigate('/home')}>
                            <ArrowBackIos />
                        </IconButton>
                        <Typography
                            variant="h1"
                            display="flex"
                            justifyContent="center"
                        >
                            {t('actions.edit_list')}
                        </Typography>
                    </Grid2>
                    <Grid2 xs={12}>
                        <ItemForm onSubmit={onSubmit} />
                    </Grid2>
                </Grid2>
            </MainLayout>
            <ConfirmationDialog
                open={isModifyOpen}
                onConfirm={onModifyConfirm}
                onCancel={() => setModifyOpen(false)}
                title={t('actions.edit_list')}
            >
                <DialogContentText>
                    {t('dialogs.confirmation')}
                </DialogContentText>
            </ConfirmationDialog>
        </>
    );
};

export default EditItem;
