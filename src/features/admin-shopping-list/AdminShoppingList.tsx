import { ArrowBackIos } from '@mui/icons-material';
import { Box, Button, DialogContentText, IconButton } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
// import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../components/main-layout/MainLayout';
import {
    selectShoppingListById,
    getShoppingListByIdAsync,
    orderShoppingListAsync,
} from '../../store/shopping-list/shopping-list-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/user/user-slice';
import { useEffect, useState } from 'react';
import ShoppingListTab from '../../components/shopping-list-tab/ShoppingListTab';
import { Role } from '../../models/user/RoleEnum';
import { useTranslation } from 'react-i18next';
import ConfirmationDialog from '../../components/confirmation-popup/ConfirmationDialog';
import { showSuccessSnackBar } from '../../store/ui/ui-slice';

const AdminShoppingList = (): JSX.Element => {
    const { t } = useTranslation();
    const { listId } = useParams();
    const id = Number(listId);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    useEffect(() => {
        void dispatch(getShoppingListByIdAsync({ listId: id }));
    }, []);
    const shoppingList = useAppSelector(selectShoppingListById(id));
    const [isConfirmOpen, setConfirmOpen] = useState<boolean>(false);

    const onOrderClicked = async (): Promise<void> => {
        setConfirmOpen(true);
    };

    const onOrderConfirm = async (): Promise<void> => {
        if (shoppingList) {
            await dispatch(orderShoppingListAsync(shoppingList)).unwrap();
            setConfirmOpen(false);
            await showSuccessSnackBar(t('list.list-order-successful'));
            navigate('/past-orders');
        }
    };

    return (
        <>
            <MainLayout>
                <Grid2 container spacing={2}>
                    <Grid2>
                        <IconButton onClick={() => navigate('/shopping-lists')}>
                            <ArrowBackIos />
                        </IconButton>
                    </Grid2>
                    <Grid2 xs={12}>
                        {shoppingList !== undefined && (
                            <ShoppingListTab value={id} list={shoppingList} />
                        )}
                        {user?.userRoles.some(
                            (userRole) => userRole.roleName === Role.Admin
                        ) && (
                            <Grid2 justifyContent={'center'}>
                                <Box textAlign="center">
                                    <Button
                                        variant="contained"
                                        onClick={async () =>
                                            await onOrderClicked()
                                        }
                                    >
                                        {t('actions.order')}
                                    </Button>
                                </Box>
                            </Grid2>
                        )}
                    </Grid2>
                </Grid2>
            </MainLayout>
            <ConfirmationDialog
                open={isConfirmOpen}
                onConfirm={onOrderConfirm}
                onCancel={() => setConfirmOpen(false)}
                title={t('actions.order_list')}
            >
                <DialogContentText>
                    {t('dialogs.confirmation')}
                </DialogContentText>
            </ConfirmationDialog>
        </>
    );
};
export default AdminShoppingList;
