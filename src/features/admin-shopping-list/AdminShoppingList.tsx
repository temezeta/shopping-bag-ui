import { ArrowBackIos } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
// import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../components/main-layout/MainLayout';
import { RootState } from '../../store/store';
import {
    selectShoppingListById,
    selectActiveLists,
} from '../../store/shopping-list/shopping-list-slice';
import { useAppSelector } from '../../store/hooks';
import ShoppingListTab from '../../components/shopping-list-tab/ShoppingListTab';
import {
    selectCurrentOffice,
    selectCurrentUser,
} from '../../store/user/user-slice';
import { Role } from '../../models/user/RoleEnum';
import AdminShoppingListTab from '../../components/shopping-list-tab/AdminShoppingListTab';
const AdminShoppingList = (): JSX.Element => {
    const { listId } = useParams();
    const id = Number(listId);
    // const { t } = useTranslation();
    const shoppingList = useAppSelector((state: RootState) =>
        selectShoppingListById(state, id)
    );
    const navigate = useNavigate();
    const header = shoppingList?.name;
    const shoppingLists = useAppSelector(selectActiveLists);
    const user = useAppSelector(selectCurrentUser);
    const currentOffice = useAppSelector(selectCurrentOffice);
    return (
        <MainLayout>
            <Grid2 container spacing={2}>
                <Grid2 xs={12} className="flex-center">
                    <IconButton onClick={() => navigate('/shopping-lists')}>
                        <ArrowBackIos />
                    </IconButton>
                    <Typography
                        variant="h1"
                        display="flex"
                        justifyContent="center"
                    >
                        {header}
                    </Typography>
                </Grid2>
                {/* show different views depending the user */}
                <div>
                    {id &&
                        user?.userRoles.some(
                            (it) => it.roleName === Role.User
                        ) &&
                        shoppingLists.map((list, i) => (
                            <ShoppingListTab value={id} list={list} key={i} />
                        ))}
                    {id &&
                        currentOffice &&
                        user?.userRoles.some(
                            (it) => it.roleName === Role.Admin
                        ) &&
                        shoppingLists.map((list, i) => (
                            <AdminShoppingListTab
                                value={id}
                                list={list}
                                key={i}
                                office={currentOffice}
                            />
                        ))}
                </div>
            </Grid2>
        </MainLayout>
    );
};
export default AdminShoppingList;
