import { ArrowBackIos } from '@mui/icons-material';
import { Button, IconButton, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import AddShoppingListForm from '../../components/add-shopping-list-form/AddShoppingListForm';
import MainLayout from '../../components/main-layout/MainLayout';
import { AddShoppingListDto } from '../../models/shopping-list/AddShoppingListDto';
import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';

const EditShoppingList = (): JSX.Element => {
    const { listId } = useParams();
    // TODO Fetch actual shoppinglist when possible
    const shoppingList: ShoppingListDto = {
        name: 'Test',
        comment: 'Test comment',
        dueDate: '2022-10-30T22:00:00',
        expectedDeliveryDate: '2022-10-30T00:00:00',
        id: parseInt(listId as string),
        ordered: false,
        createdDate: '2022-10-01T00:00:00',
        items: [],
    };

    const { t } = useTranslation();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<AddShoppingListDto> = async (data) => {
        // TODO
        console.log(data);
    };

    const onRemove = (): void => {
        // TODO
        console.log(shoppingList);
    };

    return (
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
