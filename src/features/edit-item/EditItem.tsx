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
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    modifyItemAsync,
    selectItemById,
} from '../../store/shopping-list/shopping-list-slice';

const EditItem = (): JSX.Element => {
    const { itemId, listId } = useParams();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [modification, setModification] = useState<AddItemDto | undefined>(
        undefined
    );
    const [isModifyOpen, setModifyOpen] = useState<boolean>(false);

    const item = useAppSelector(selectItemById(Number(listId), Number(itemId)));

    const onSubmit: SubmitHandler<AddItemDto> = async (data) => {
        setModification(data);
        setModifyOpen(true);
    };

    const onModifyConfirm = async (): Promise<void> => {
        if (modification && item) {
            await dispatch(
                modifyItemAsync({
                    data: {
                        ...item,
                        ...modification,
                    },
                    itemId: Number(itemId),
                })
            );
            setModification(undefined);
            setModifyOpen(false);
            navigate('/home');
        }
    };

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
                            {t('list.edit-item')}
                        </Typography>
                    </Grid2>
                    <Grid2 xs={12}>
                        <ItemForm onSubmit={onSubmit} initialValues={item} />
                    </Grid2>
                </Grid2>
            </MainLayout>
            <ConfirmationDialog
                open={isModifyOpen}
                onConfirm={onModifyConfirm}
                onCancel={() => setModifyOpen(false)}
                title={t('list.edit-item')}
            >
                <DialogContentText>
                    {t('dialogs.confirmation')}
                </DialogContentText>
            </ConfirmationDialog>
        </>
    );
};

export default EditItem;
