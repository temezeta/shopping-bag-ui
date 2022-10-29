import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
    addShoppingList,
    getShoppingListsByOfficeId,
    removeShoppingListItem,
} from './shopping-list-actions';
import { ShoppingListState } from './shopping-list-types';
import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';
import { AddShoppingListDto } from '../../models/shopping-list/AddShoppingListDto';

const initialState: ShoppingListState = {
    activeShoppingLists: [],
    inactiveShoppingLists: [],
};

export const getShoppingListsByOfficeAsync = createAsyncThunk(
    'shoppinglist/by-office',
    async (officeId: number, { rejectWithValue }) => {
        const response = await getShoppingListsByOfficeId(officeId);
        if (!response) {
            return rejectWithValue('Error fetching shopping lists');
        }
        return response;
    }
);

export const addShoppingListAsync = createAsyncThunk(
    'shoppinglist/add',
    async (shoppingList: AddShoppingListDto, { rejectWithValue }) => {
        const response = await addShoppingList(shoppingList);
        if (!response) {
            return rejectWithValue('Error adding shopping list');
        }
        return response;
    }
);

export const removeShoppingListItemAsync = createAsyncThunk(
    'shoppinglistitem/remove',
    async (itemId: number, { rejectWithValue }) => {
        const response = await removeShoppingListItem(itemId);
        if (!response) {
            return rejectWithValue('Removing item failed');
        }
        return itemId;
    }
);

// Selectors
export const selectActiveLists = (state: RootState): ShoppingListDto[] =>
    state.shoppinglist.activeShoppingLists;
export const selectInactiveLists = (state: RootState): ShoppingListDto[] =>
    state.shoppinglist.inactiveShoppingLists;

export const shoppingListSlice = createSlice({
    name: 'shoppinglist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getShoppingListsByOfficeAsync.pending, (state) => {
                state.activeShoppingLists = [];
                state.inactiveShoppingLists = [];
            })
            .addCase(
                getShoppingListsByOfficeAsync.fulfilled,
                (state, action) => {
                    state.activeShoppingLists = action.payload.filter(
                        (it) => !it.ordered
                    );
                    state.inactiveShoppingLists = action.payload.filter(
                        (it) => it.ordered
                    );
                }
            )
            .addCase(addShoppingListAsync.fulfilled, (state, action) => {
                state.activeShoppingLists.push(action.payload);
            });
    },
});

export default shoppingListSlice.reducer;
