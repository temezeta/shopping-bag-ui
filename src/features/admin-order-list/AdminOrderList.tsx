import { useEffect, useState } from 'react';
import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    getShoppingListsByOfficeAsync,
    selectActiveLists,
} from '../../store/shopping-list/shopping-list-slice';
import OrderListTab from '../../components/order-list-tab/OrderListTab';
import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useTranslation } from 'react-i18next';
import MainLayout from '../../components/main-layout/MainLayout';
import { selectCurrentOffice } from '../../store/user/user-slice';

const AdminOrderList = (): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const currentOffice = useAppSelector(selectCurrentOffice);
    const activeShoppingLists = useAppSelector(selectActiveLists);
    const [shoppingLists, setShoppingLists] = useState<ShoppingListDto[]>([]);

    // Handle office change
    useEffect(() => {
        const fetchLists = async (): Promise<void> => {
            if (currentOffice) {
                await dispatch(getShoppingListsByOfficeAsync(currentOffice.id));
            }
        };
        void fetchLists();
    }, [currentOffice]);

    useEffect(() => {
        setShoppingLists(activeShoppingLists);
    }, [activeShoppingLists]);

    return (
        <>
            <MainLayout>
                <Grid2 container spacing={1}>
                    <Grid2 xs={12} className="flex-center">
                        <Typography
                            variant="h1"
                            display="flex"
                            justifyContent="center"
                        >
                            {t('order.active_orders')}
                        </Typography>
                    </Grid2>
                    <Grid2 xs={12} className="flex-center">
                        <Typography
                            variant="h3"
                            display="flex"
                            justifyContent="center"
                        >
                            {currentOffice?.name}
                        </Typography>
                    </Grid2>
                    <Grid2 xs={12}>
                        <OrderListTab shoppingLists={shoppingLists} />
                    </Grid2>
                </Grid2>
            </MainLayout>
        </>
    );
};

export default AdminOrderList;
