import { Tab, Tabs } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { SyntheticEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/main-layout/MainLayout';
import ShoppingListTab from '../../components/shopping-list-tab/ShoppingListTab';
import { Role } from '../../models/user/RoleEnum';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    selectActiveLists,
    selectActiveShoppingListId,
    setActiveShoppingListId,
} from '../../store/shopping-list/shopping-list-slice';
import { selectCurrentUser } from '../../store/user/user-slice';
import { isAdmin } from '../../utility/user-helper';

const Home = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectCurrentUser);
    const activeShoppingLists = useAppSelector(selectActiveLists);
    const activeListId = useAppSelector(selectActiveShoppingListId);
    const selectedListId =
        activeShoppingLists.find((it) => it.id === activeListId)?.id ?? false;

    // Handle admin page transition
    useEffect(() => {
        if (isAdmin(user)) {
            navigate('/orders', { replace: true });
        }
    }, [user]);

    useEffect(() => {
        /**
         * Reset selectedListId only when the active shopping lists office changes
         * to avoid that liking an item resets it.
         */
        if (!activeShoppingLists.find((it) => it.id === selectedListId)) {
            dispatch(
                setActiveShoppingListId(
                    activeShoppingLists.length
                        ? activeShoppingLists[0].id
                        : false
                )
            );
        }
    }, [activeShoppingLists]);

    const handleTabChange = (_: SyntheticEvent, value: number): void => {
        dispatch(setActiveShoppingListId(value));
    };

    return (
        <MainLayout>
            <Grid2 container spacing={1}>
                <Grid2
                    xs={12}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Tabs
                        variant="scrollable"
                        scrollButtons="auto"
                        color="primary"
                        indicatorColor="primary"
                        value={selectedListId}
                        onChange={handleTabChange}
                    >
                        {activeShoppingLists.map((list, i) => (
                            <Tab label={list.name} key={i} value={list.id} />
                        ))}
                    </Tabs>
                </Grid2>

                {selectedListId &&
                    user?.userRoles.some(
                        (userRole) => userRole.roleName === Role.User
                    ) &&
                    activeShoppingLists.map((list, i) => (
                        <ShoppingListTab
                            value={selectedListId}
                            list={list}
                            key={i}
                        />
                    ))}
            </Grid2>
        </MainLayout>
    );
};

export default Home;
