import { ArrowBackIos } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import ItemForm from '../../components/item-form/ItemForm';
import MainLayout from '../../components/main-layout/MainLayout';
import { AddItemDto } from '../../models/shopping-list/AddItemDto';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    getShoppingListByIdAsync,
    modifyItemAsync,
    selectEditItemById,
    clearEditShoppingList,
} from '../../store/shopping-list/shopping-list-slice';
import { selectCurrentUser } from '../../store/user/user-slice';
import { isAdmin } from '../../utility/user-helper';

const EditItem = (): JSX.Element => {
    const { itemId, listId } = useParams();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const user = useAppSelector(selectCurrentUser);

    useEffect(() => {
        void dispatch(
            getShoppingListByIdAsync({
                listId: Number(listId),
                isEditing: true,
            })
        );
        return () => {
            dispatch(clearEditShoppingList());
        };
    }, []);

    const item = useAppSelector(
        selectEditItemById(Number(listId), Number(itemId))
    );

    const onSubmit: SubmitHandler<AddItemDto> = async (modifiedData) => {
        if (modifiedData && item) {
            await dispatch(
                modifyItemAsync({
                    data: {
                        ...item,
                        ...modifiedData,
                    },
                    itemId: Number(itemId),
                })
            );
            handleNavigate();
        }
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
            <MainLayout>
                <Grid2 container spacing={1}>
                    <Grid2 xs={12} className="flex-center">
                        <IconButton onClick={() => handleNavigate()}>
                            <ArrowBackIos />
                        </IconButton>
                        <Typography
                            variant="h1"
                            display="flex"
                            justifyContent="center"
                        >
                            {t('list.edit-item')}
                        </Typography>
                    </Grid2>
                    <Grid2 xs={12}>
                        <ItemForm onSubmit={onSubmit} initialValues={item} />
                    </Grid2>
                </Grid2>
            </MainLayout>
        </>
    );
};

export default EditItem;
