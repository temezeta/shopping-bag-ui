import { ArrowBackIos } from '@mui/icons-material';
import {
    Box,
    Button,
    DialogContentText,
    IconButton,
    Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../components/main-layout/MainLayout';
import {
    clearEditShoppingList,
    getShoppingListByIdAsync,
    orderShoppingListAsync,
    selectEditShoppingListById,
} from '../../store/shopping-list/shopping-list-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/user/user-slice';
import { useEffect, useState } from 'react';
import ShoppingListTab from '../../components/shopping-list-tab/ShoppingListTab';
import { useTranslation } from 'react-i18next';
import ConfirmationDialog from '../../components/confirmation-popup/ConfirmationDialog';
import { showSuccessSnackBar } from '../../store/ui/ui-slice';
import { isAdmin } from '../../utility/user-helper';

const AdminShoppingList = (): JSX.Element => {
    const { t } = useTranslation();
    const { listId } = useParams();
    const id = Number(listId);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    const shoppingList = useAppSelector(selectEditShoppingListById(id));
    const [isConfirmOpen, setConfirmOpen] = useState<boolean>(false);

    useEffect(() => {
        void dispatch(
            getShoppingListByIdAsync({ listId: id, isEditing: true })
        );
        return () => {
            dispatch(clearEditShoppingList());
        };
    }, []);

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

    const handleNavigate = (): void => {
        if (shoppingList?.ordered) {
            navigate('/past-orders');
        } else {
            navigate('/home');
        }
    };

    return (
        <>
            <MainLayout width="65em">
                {shoppingList ? (
                    <Grid2 container spacing={2}>
                        <Grid2>
                            <IconButton onClick={() => handleNavigate()}>
                                <ArrowBackIos />
                            </IconButton>
                        </Grid2>
                        <Grid2 xs={12}>
                            <ShoppingListTab value={id} list={shoppingList} />
                            {isAdmin(user) && (
                                <Grid2 justifyContent={'center'}>
                                    {!shoppingList.ordered && (
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
                                    )}
                                </Grid2>
                            )}
                        </Grid2>
                    </Grid2>
                ) : (
                    <Grid2 container spacing={2}>
                        <Grid2 xs={12}>
                            <Typography variant="subtitle1" color="error.main">
                                {t('errors.order_not_found')}
                            </Typography>
                        </Grid2>
                    </Grid2>
                )}
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
