import { useAppSelector } from '../../store/hooks';
import { selectInactiveLists } from '../../store/shopping-list/shopping-list-slice';
import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useTranslation } from 'react-i18next';
import MainLayout from '../../components/main-layout/MainLayout';
import { selectCurrentOffice } from '../../store/user/user-slice';
import OrderListItem from '../../components/order-list-item/OrderListItem';

const PastOrders = (): JSX.Element => {
    const { t } = useTranslation();
    const currentOffice = useAppSelector(selectCurrentOffice);
    const inactiveShoppingLists = useAppSelector(selectInactiveLists);

    return (
        <MainLayout>
            <Grid2 container spacing={1}>
                <Grid2 xs={12} className="flex-center">
                    <Typography
                        variant="h1"
                        display="flex"
                        justifyContent="center"
                    >
                        {t('list.past_orders')}
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
                    {inactiveShoppingLists.map((list, i) => (
                        <OrderListItem list={list} key={i} />
                    ))}
                </Grid2>
            </Grid2>
        </MainLayout>
    );
};

export default PastOrders;
