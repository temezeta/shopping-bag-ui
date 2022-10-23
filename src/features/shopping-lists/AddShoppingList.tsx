import { ArrowBackIos } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { unwrapResult } from '@reduxjs/toolkit';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AddShoppingListForm from '../../components/add-shopping-list-form/AddShoppingListForm';
import MainLayout from '../../components/main-layout/MainLayout';
import { AddShoppingListDto } from '../../models/shopping-list/AddShoppingListDto';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addShoppingListAsync } from '../../store/shopping-list/shopping-list-slice';
import { selectCurrentOffice } from '../../store/user/user-slice';

const AddShoppingList = (): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentOffice = useAppSelector(selectCurrentOffice);

    const onSubmit: SubmitHandler<AddShoppingListDto> = async (data) => {
        unwrapResult(await dispatch(addShoppingListAsync(data)));
        navigate('/home');
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
                            {t('actions.add_new_list')}
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
                        <AddShoppingListForm onSubmit={onSubmit} />
                    </Grid2>
                </Grid2>
            </MainLayout>
        </>
    );
};

export default AddShoppingList;
