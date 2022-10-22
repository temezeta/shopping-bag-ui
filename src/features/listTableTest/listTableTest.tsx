import { useEffect, useState } from 'react';
import MainLayout from '../../components/main-layout/MainLayout';
import ShoppingListsTable from '../../components/shopping-lists-table/ShoppingListsTable';

import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    getShoppingListsByOfficeAsync,
    selectActiveLists,
    selectInactiveLists,
} from '../../store/shopping-list/shopping-list-slice';
import { selectCurrentOffice } from '../../store/user/user-slice';
import { useQuery } from '../../utility/navigation-hooks';

const AdminTest = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const query = useQuery();
    const showPast = query.get('showPast');
    const currentOffice = useAppSelector(selectCurrentOffice);
    const activeShoppingLists = useAppSelector(selectActiveLists);
    const inactiveShoppingLists = useAppSelector(selectInactiveLists);
    const [shoppingLists, setShoppingLists] = useState<ShoppingListDto[]>([]);
    const [, setSelectedListId] = useState<number | false>(false);

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

    // Handle past vs active changes
    useEffect(() => {
        const currentLists = showPast
            ? inactiveShoppingLists
            : activeShoppingLists;

        setSelectedListId(currentLists.length ? currentLists[0].id : false);
        setShoppingLists(currentLists);
    }, [showPast, activeShoppingLists, inactiveShoppingLists]);

    return (
        <MainLayout>
            <ShoppingListsTable
                shoppingLists={shoppingLists}
            ></ShoppingListsTable>
        </MainLayout>
    );
};

export default AdminTest;
