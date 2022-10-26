import { ArrowBackIos } from '@mui/icons-material';
import { Button, IconButton, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import AddShoppingListForm from '../../components/add-shopping-list-form/AddShoppingListForm';
import MainLayout from '../../components/main-layout/MainLayout';
import { AddShoppingListDto } from '../../models/shopping-list/AddShoppingListDto';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    modifyShoppingListAsync,
    removeShoppingListAsync,
    selectShoppingListById,
} from '../../store/shopping-list/shopping-list-slice';
import { RootState } from '../../store/store';

const EditShoppingList = (): JSX.Element => {
    const { listId } = useParams();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();

    // TODO Fetch fresh version of shopping list on mount when endpoint available
    const shoppingList = useAppSelector((state: RootState) =>
        selectShoppingListById(state, parseInt(listId as string))
    );

    const onSubmit: SubmitHandler<AddShoppingListDto> = async (data) => {
        if (shoppingList) {
            await dispatch(
                modifyShoppingListAsync({ data, listId: shoppingList.id })
            ).unwrap();
            navigate('/home');
        }
    };

    const onRemove = async (): Promise<void> => {
        if (shoppingList) {
            await dispatch(removeShoppingListAsync(shoppingList)).unwrap();
            navigate('/home');
        }
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
                    <AddShoppingListForm
                        initialValues={shoppingList}
                        onSubmit={onSubmit}
                    />
                </Grid2>
                <Grid2 xs={12}>
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        onClick={onRemove}
                    >
                        {t('actions.remove_list')}
                    </Button>
                </Grid2>
            </Grid2>
        </MainLayout>
    );
};

export default EditShoppingList;
