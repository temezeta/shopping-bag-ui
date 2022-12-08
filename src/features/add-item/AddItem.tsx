import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ItemForm from '../../components/item-form/ItemForm';
import MainLayout from '../../components/main-layout/MainLayout';
import { AddItemDto } from '../../models/shopping-list/AddItemDto';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    addItemAsync,
    setLikeStatusAsync,
} from '../../store/shopping-list/shopping-list-slice';
import { isAdmin } from '../../utility/user-helper';
import { selectCurrentUser } from '../../store/user/user-slice';

const AddItem = (): JSX.Element => {
    const { listId } = useParams();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectCurrentUser);
    const onSubmit: SubmitHandler<AddItemDto> = async (data) => {
        const isLike = data.like;
        const item = unwrapResult(
            await dispatch(addItemAsync({ data, listId: Number(listId) }))
        );
        if (isLike === true && item) {
            unwrapResult(
                await dispatch(
                    setLikeStatusAsync({ data: isLike, itemId: item.id })
                )
            );
        }
        handleNavigate();
    };

    const handleNavigate = (): void => {
        if (isAdmin(user) && listId) {
            navigate(`/order/${listId}`);
        } else {
            navigate('/home');
        }
    };

    return (
        <>
            <MainLayout onBackButton={() => handleNavigate()}>
                <Grid2 container spacing={2}>
                    <Grid2 xs={12} className="flex-center">
                        <Grid2 xs={12}>
                            <Typography
                                variant="h1"
                                display="flex"
                                justifyContent="center"
                            >
                                {t('actions.add_new_item')}
                            </Typography>
                        </Grid2>
                    </Grid2>
                    <Grid2 xs={12}>
                        <ItemForm onSubmit={onSubmit} />
                    </Grid2>
                </Grid2>
            </MainLayout>
        </>
    );
};

export default AddItem;
