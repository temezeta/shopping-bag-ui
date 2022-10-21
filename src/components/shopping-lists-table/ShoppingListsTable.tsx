import Grid2 from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import MainLayout from '../../components/main-layout/MainLayout';
import ShoppingListsItem from '../../components/shopping-lists-item/ShoppingListsItem';
import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    getShoppingListsByOfficeAsync,
    selectActiveLists,
    selectInactiveLists,
} from '../../store/shopping-list/shopping-list-slice';
import { selectCurrentOffice } from '../../store/user/user-slice';
import { useQuery } from '../../utility/navigation-hooks';

const ShoppingListsTable = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const query = useQuery();
    const showPast = query.get('showPast');
    const currentOffice = useAppSelector(selectCurrentOffice);
    const activeShoppingLists = useAppSelector(selectActiveLists);
    const inactiveShoppingLists = useAppSelector(selectInactiveLists);
    const [shoppingLists, setShoppingLists] = useState<ShoppingListDto[]>([]);
    const [selectedListId, setSelectedListId] = useState<number | false>(false);

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
            <Grid2 container xs={12}>
                {selectedListId &&
                    shoppingLists.map((list, i) => (
                        <ShoppingListsItem
                            value={selectedListId}
                            list={list}
                            key={i}
                        />
                    ))}
            </Grid2>
        </MainLayout>
    );
};

export default ShoppingListsTable;
