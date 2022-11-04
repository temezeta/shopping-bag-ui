import { ArrowBackIos } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { unwrapResult } from '@reduxjs/toolkit';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ShoppingListForm from '../../components/shopping-list-form/ShoppingListForm';
import MainLayout from '../../components/main-layout/MainLayout';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addShoppingListAsync } from '../../store/shopping-list/shopping-list-slice';
import { selectCurrentOffice } from '../../store/user/user-slice';
import { ModifyShoppingListDto } from '../../models/shopping-list/ModifyShoppingListDto';
import { AddShoppingListDto } from '../../models/shopping-list/AddShoppingListDto';

const AddShoppingList = (): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentOffice = useAppSelector(selectCurrentOffice);

    const onSubmit: SubmitHandler<ModifyShoppingListDto> = async (data) => {
        const addShoppingList: AddShoppingListDto = {
            ...data,
            officeId: currentOffice!.id,
        };
        unwrapResult(await dispatch(addShoppingListAsync(addShoppingList)));
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
                        <ShoppingListForm onSubmit={onSubmit} />
                    </Grid2>
                </Grid2>
            </MainLayout>
        </>
    );
};

export default AddShoppingList;
