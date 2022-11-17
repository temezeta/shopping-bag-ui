import { ArrowBackIos } from '@mui/icons-material';
import { Box, Button, IconButton } from '@mui/material';
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
import { useEffect } from 'react';
import ShoppingListTab from '../../components/shopping-list-tab/ShoppingListTab';
import { Role } from '../../models/user/RoleEnum';
import { useTranslation } from 'react-i18next';
import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';

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

    const orderList = async (
        shoppingList: ShoppingListDto | undefined
    ): Promise<void> => {
        if (shoppingList) {
            await dispatch(orderShoppingListAsync(shoppingList)).unwrap();
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
                                            await orderList(shoppingList)
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
        </>
    );
};
export default AdminShoppingList;
