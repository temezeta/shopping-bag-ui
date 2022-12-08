import { DialogContentText, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../components/main-layout/MainLayout';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    getShoppingListByIdAsync,
    modifyShoppingListAsync,
    removeShoppingListAsync,
    selectEditShoppingListById,
    clearEditShoppingList,
} from '../../store/shopping-list/shopping-list-slice';
import { ModifyShoppingListDto } from '../../models/shopping-list/ModifyShoppingListDto';
import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';
import { useEffect, useState } from 'react';
import ConfirmationDialog from '../../components/confirmation-popup/ConfirmationDialog';
import ShoppingListForm from '../../components/shopping-list-form/ShoppingListForm';

const EditShoppingList = (): JSX.Element => {
    const { listId } = useParams();
    const id = Number(listId);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [toDelete, setToDelete] = useState<ShoppingListDto | undefined>(
        undefined
    );
    const [isDeleteOpen, setDeleteOpen] = useState<boolean>(false);

    useEffect(() => {
        void dispatch(
            getShoppingListByIdAsync({ listId: id, isEditing: true })
        );
        return () => {
            dispatch(clearEditShoppingList());
        };
    }, []);

    const shoppingList = useAppSelector(selectEditShoppingListById(id));

    const onSubmit: SubmitHandler<ModifyShoppingListDto> = async (
        modifiedData
    ) => {
        if (modifiedData && shoppingList) {
            await dispatch(
                modifyShoppingListAsync({
                    data: modifiedData,
                    listId: shoppingList.id,
                })
            ).unwrap();
            handleNavigate();
        }
    };

    const onDelete: SubmitHandler<ShoppingListDto> = async (data) => {
        setToDelete(data);
        setDeleteOpen(true);
    };

    const onDeleteConfirm = async (): Promise<void> => {
        if (toDelete) {
            await dispatch(removeShoppingListAsync(toDelete)).unwrap();
            setToDelete(undefined);
            setDeleteOpen(false);
            handleNavigate();
        }
    };

    const handleNavigate = (): void => {
        if (shoppingList?.ordered) {
            navigate('/past-orders');
        } else {
            navigate('/home');
        }
    };

    return (
        <>
            <MainLayout onBackButton={() => handleNavigate()}>
                <Grid2 container spacing={1}>
                    <Grid2 xs={12} className="flex-center">
                        <Typography
                            variant="h1"
                            display="flex"
                            justifyContent="center"
                        >
                            {t('actions.edit_list')}
                        </Typography>
                    </Grid2>
                    <Grid2 xs={12}>
                        <ShoppingListForm
                            initialValues={shoppingList}
                            onSubmit={onSubmit}
                            onDelete={onDelete}
                        />
                    </Grid2>
                </Grid2>
            </MainLayout>
            <ConfirmationDialog
                open={isDeleteOpen}
                onConfirm={onDeleteConfirm}
                onCancel={() => setDeleteOpen(false)}
                title={t('actions.remove_list')}
            >
                <DialogContentText>
                    {t('dialogs.confirmation')}
                </DialogContentText>
            </ConfirmationDialog>
        </>
    );
};

export default EditShoppingList;
