import { ArrowBackIos } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import ShoppingListForm from '../../components/shopping-list-form/ShoppingListForm';
import MainLayout from '../../components/main-layout/MainLayout';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    modifyShoppingListAsync,
    removeShoppingListAsync,
    selectShoppingListById,
} from '../../store/shopping-list/shopping-list-slice';
import { RootState } from '../../store/store';
import { ModifyShoppingListDto } from '../../models/shopping-list/ModifyShoppingListDto';
import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';

const EditShoppingList = (): JSX.Element => {
    const { listId } = useParams();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();

    // TODO Fetch fresh version of shopping list on mount when endpoint available
    const shoppingList = useAppSelector((state: RootState) =>
        selectShoppingListById(state, parseInt(listId as string))
    );

    const onSubmit: SubmitHandler<ModifyShoppingListDto> = async (data) => {
        if (shoppingList) {
            await dispatch(
                modifyShoppingListAsync({ data, listId: shoppingList.id })
            ).unwrap();
            navigate('/home');
        }
    };

    const onDelete: SubmitHandler<ShoppingListDto> = async (data) => {
        await dispatch(removeShoppingListAsync(data)).unwrap();
        navigate('/home');
    };

    return (
        <MainLayout width="35em">
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
                        {t('actions.edit_list')}
                    </Typography>
                </Grid2>
                <Grid2 xs={12}>
                    <ShoppingListForm
                        initialValues={shoppingList}
                        onSubmit={onSubmit}
                        onDelete={onDelete}
                    />
                </Grid2>
            </Grid2>
        </MainLayout>
    );
};

export default EditShoppingList;
