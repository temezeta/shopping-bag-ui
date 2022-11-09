import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
    addShoppingList,
    getShoppingListById,
    getShoppingListsByOfficeId,
    removeItem,
    modifyShoppingList,
    removeShoppingList,
    addItem,
    modifyItem,
    setLikeStatus,
} from './shopping-list-actions';
import {
    AddItemPayload,
    LikeStatusPayload,
    ModifyItemPayload,
    ModifyPayload,
    ShoppingListState,
} from './shopping-list-types';
import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';
import { AddShoppingListDto } from '../../models/shopping-list/AddShoppingListDto';
import { updateOrAdd } from '../../utility/array-helper';
import { ItemDto } from '../../models/shopping-list/ItemDto';
import { RESET_ALL } from '../auth/auth-slice';

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

export const addItemAsync = createAsyncThunk(
    'shoppinglistitem/addItem',
    async (data: AddItemPayload, { rejectWithValue }) => {
        const response = await addItem(data.data, data.listId);
        if (!response) {
            return rejectWithValue('An error ocurred adding the item');
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

export const modifyItemAsync = createAsyncThunk(
    'shoppinglistitem/modify',
    async (data: ModifyItemPayload, { rejectWithValue }) => {
        const response = await modifyItem(data.data, data.itemId);
        if (!response) {
            return rejectWithValue('An error occured in modifying item');
        }
        return response;
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

export const getShoppingListByIdAsync = createAsyncThunk(
    'shoppinglist/by-id',
    async (listId: number, { rejectWithValue }) => {
        const response = await getShoppingListById(listId);
        if (!response) {
            return rejectWithValue('Error fetching shopping list by id');
        }
        return response;
    }
);

export const setLikeStatusAsync = createAsyncThunk(
    'item/setLikeStatus',
    async (data: LikeStatusPayload, { rejectWithValue }) => {
        const response = await setLikeStatus(data.data, data.itemId);
        if (!response) {
            return rejectWithValue('An error ocurred setting like status');
        }
        return response;
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
export const selectItemById = (
    state: RootState,
    itemId: number
): ItemDto | undefined => {
    const lists = selectActiveLists(state).concat(selectInactiveLists(state));
    let item: ItemDto | undefined;

    for (const list of lists) {
        const itemIndex = list.items.findIndex((it) => it.id === itemId);
        if (itemIndex !== -1) {
            item = list.items[itemIndex];
            break;
        }
    }
    return item;
};

export const shoppingListSlice = createSlice({
    name: 'shoppinglist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(RESET_ALL, () => initialState)
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
            })
            .addCase(getShoppingListByIdAsync.fulfilled, (state, action) => {
                const list = action.payload;
                if (!list.ordered) {
                    updateOrAdd(state.activeShoppingLists, (it) => it.id, list);
                } else {
                    updateOrAdd(
                        state.inactiveShoppingLists,
                        (it) => it.id,
                        list
                    );
                }
            });
    },
});

export default shoppingListSlice.reducer;
