import { ArrowBackIos } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
// import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../components/main-layout/MainLayout';
import { RootState } from '../../store/store';
import {
    selectShoppingListById,
    getShoppingListByIdAsync,
} from '../../store/shopping-list/shopping-list-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/user/user-slice';
import { useEffect } from 'react';
import ShoppingListTab from '../../components/shopping-list-tab/ShoppingListTab';
import { Role } from '../../models/user/RoleEnum';

const AdminShoppingList = (): JSX.Element => {
    const { listId } = useParams();
    const id = Number(listId);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    useEffect(() => {
        void dispatch(getShoppingListByIdAsync(id));
    }, []);
    const shoppingList = useAppSelector((state: RootState) =>
        selectShoppingListById(state, id)
    );
    return (
        <>
            <MainLayout>
                <Grid2 container spacing={2}>
                    <Grid2>
                        <IconButton onClick={() => navigate('/shopping-lists')}>
                            <ArrowBackIos />
                        </IconButton>
                    </Grid2>
                    <Grid2 xs={12}>
                        {shoppingList &&
                            user?.userRoles.some(
                                (userRole) => userRole.roleName === Role.Admin
                            ) && (
                                <ShoppingListTab
                                    showControls={user?.userRoles.some(
                                        (userRole) =>
                                            userRole.roleName === Role.Admin
                                    )}
                                    value={id}
                                    list={shoppingList}
                                />
                            )}
                    </Grid2>
                </Grid2>
            </MainLayout>
        </>
    );
};
export default AdminShoppingList;
