import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { unwrapResult } from '@reduxjs/toolkit';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AddShoppingListForm from '../../components/add-shopping-list-form/AddShoppingListForm';
import LoginLayout from '../../components/login-layout/LoginLayout';
import { AddShoppingListDto } from '../../models/shopping-list/AddShoppingListDto';
import { useAppDispatch } from '../../store/hooks';
import { addShoppingListAsync } from '../../store/shopping-list/shopping-list-slice';

const AddShoppingList = (): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<AddShoppingListDto> = async (data) => {
        console.log(data);
        unwrapResult(await dispatch(addShoppingListAsync(data)));
    };

    return (
        <>
            <LoginLayout>
                <Grid2 container spacing={1}>
                    <Grid2 xs={12} className="flex-center">
                        <Typography
                            variant="h1"
                            display="flex"
                            justifyContent="center"
                        >
                            {t('actions.add_new_list')}
                        </Typography>
                    </Grid2>
                    <Grid2 xs={12}>
                        <AddShoppingListForm onSubmit={onSubmit} />
                    </Grid2>
                </Grid2>
            </LoginLayout>
        </>
    );
};

export default AddShoppingList;
