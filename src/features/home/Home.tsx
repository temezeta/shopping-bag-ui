import { Tab, Tabs } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/main-layout/MainLayout';
import ShoppingListTab from '../../components/shopping-list-tab/ShoppingListTab';
import { Role } from '../../models/user/RoleEnum';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    getShoppingListsByOfficeAsync,
    selectActiveLists,
} from '../../store/shopping-list/shopping-list-slice';
import {
    selectCurrentOffice,
    selectCurrentUser,
} from '../../store/user/user-slice';

const Home = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectCurrentUser);
    const currentOffice = useAppSelector(selectCurrentOffice);
    const activeShoppingLists = useAppSelector(selectActiveLists);
    const [selectedListId, setSelectedListId] = useState<number | false>(false);

    // Handle admin page transition
    useEffect(() => {
        if (user?.userRoles.some((it) => it.roleName === Role.Admin)) {
            navigate('/orders', { replace: true });
        }
    }, [user]);

    // Handle office change
    useEffect(() => {
        const fetchLists = async (): Promise<void> => {
            if (currentOffice) {
                await dispatch(getShoppingListsByOfficeAsync(currentOffice.id));
            }
        };
        setSelectedListId(false);
        void fetchLists();
    }, [currentOffice]);

    useEffect(() => {
        setSelectedListId(
            activeShoppingLists.length ? activeShoppingLists[0].id : false
        );
    }, [activeShoppingLists]);

    const handleTabChange = (_: SyntheticEvent, value: number): void => {
        setSelectedListId(value);
    };

    return (
        <MainLayout>
            <Grid2 container spacing={1}>
                <Grid2 xs={12}>
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
