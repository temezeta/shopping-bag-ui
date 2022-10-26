import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
    addShoppingList,
    getShoppingListsByOfficeId,
    removeItem,
    modifyShoppingList,
    removeShoppingList,
} from './shopping-list-actions';
import { ModifyPayload, ShoppingListState } from './shopping-list-types';
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

export const removeItemAsync = createAsyncThunk(
    'shoppinglistitem/remove',
    async (itemId: number, { rejectWithValue }) => {
        const response = await removeItem(itemId);
        if (!response) {
            return rejectWithValue('Removing item failed');
        }
        return itemId;
    }
);

export const modifyShoppingListAsync = createAsyncThunk(
    'shoppinglist/modify',
    async (action: ModifyPayload, { rejectWithValue }) => {
        const response = await modifyShoppingList(action.data, action.listId);
        if (!response) {
            return rejectWithValue('Error modifying shopping list');
        }
        return response;
    }
);

export const removeShoppingListAsync = createAsyncThunk(
    'shoppinglist/remove',
    async (data: ShoppingListDto, { rejectWithValue }) => {
        const response = await removeShoppingList(data.id);
        if (!response) {
            return rejectWithValue('Error removing shopping list');
        }
        return data;
    }
);

// Selectors
export const selectActiveLists = (state: RootState): ShoppingListDto[] =>
    state.shoppinglist.activeShoppingLists;
export const selectInactiveLists = (state: RootState): ShoppingListDto[] =>
    state.shoppinglist.inactiveShoppingLists;
export const selectShoppingListById = (
    state: RootState,
    listId: number
): ShoppingListDto | undefined =>
    selectActiveLists(state).find((it) => it.id === listId) ??
    selectInactiveLists(state).find((it) => it.id === listId);

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
            })
            .addCase(removeItemAsync.fulfilled, (state, action) => {
                const itemId = action.payload;
                for (let i = 0; i < state.activeShoppingLists.length; i++) {
                    if (
                        state.activeShoppingLists[i].items.filter(
                            (e) => e.id === itemId
                        )
                    ) {
                        state.activeShoppingLists[i].items =
                            state.activeShoppingLists[i].items.filter(
                                (it) => it.id !== itemId
                            );
                    }
                }
            })
            .addCase(modifyShoppingListAsync.fulfilled, (state, action) => {
                const list = action.payload;
                if (!list.ordered) {
                    state.activeShoppingLists = state.activeShoppingLists.map(
                        (it) => (it.id === list.id ? list : it)
                    );
                } else {
                    state.inactiveShoppingLists =
                        state.inactiveShoppingLists.map((it) =>
                            it.id === list.id ? list : it
                        );
                }
            })
            .addCase(removeShoppingListAsync.fulfilled, (state, action) => {
                const list = action.payload;
                if (!list.ordered) {
                    state.activeShoppingLists =
                        state.activeShoppingLists.filter(
                            (it) => it.id !== list.id
                        );
                } else {
                    state.inactiveShoppingLists =
                        state.inactiveShoppingLists.filter(
                            (it) => it.id !== list.id
                        );
                }
            });
    },
});

export default shoppingListSlice.reducer;
