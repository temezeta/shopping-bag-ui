import { useAppSelector } from '../../store/hooks';
import { selectActiveLists } from '../../store/shopping-list/shopping-list-slice';
import { Button, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useTranslation } from 'react-i18next';
import MainLayout from '../../components/main-layout/MainLayout';
import { selectCurrentOffice } from '../../store/user/user-slice';
import OrderListItem from '../../components/order-list-item/OrderListItem';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AdminOrderList = (): JSX.Element => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const currentOffice = useAppSelector(selectCurrentOffice);
    const activeShoppingLists = useAppSelector(selectActiveLists);

    return (
        <>
            <MainLayout width="60em">
                <Grid2 container spacing={1} className="full-width">
                    <Grid2 xs={12} className="flex-center">
                        <Typography
                            variant="h1"
                            display="flex"
                            justifyContent="center"
                        >
                            {t('list.active_orders')}
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
                    <Grid2
                        xs={12}
                        className="flex-center"
                        sx={{ marginTop: '2rem' }}
                    >
                        <Button
                            startIcon={<Add />}
                            variant="contained"
                            onClick={() => navigate('/orders/add')}
                        >
                            {t('actions.add_new_list')}
                        </Button>
                    </Grid2>
                    <Grid2 xs={12}>
                        {activeShoppingLists.map((list, i) => (
                            <OrderListItem list={list} key={i} />
                        ))}
                    </Grid2>
                </Grid2>
            </MainLayout>
        </>
    );
};

export default AdminOrderList;
