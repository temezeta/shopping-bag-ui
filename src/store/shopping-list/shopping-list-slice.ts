import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RESET_ALL, RootState } from '../store';
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
    GetListByIdPayload,
    LikeStatusPayload,
    ModifyItemPayload,
    ModifyPayload,
    ShoppingListMap,
    ShoppingListState,
} from './shopping-list-types';
import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';
import { AddShoppingListDto } from '../../models/shopping-list/AddShoppingListDto';
import { ItemDto } from '../../models/shopping-list/ItemDto';
import { updateOrAdd } from '../../utility/array-helper';
import { sortByDate } from '../../utility/date-helper';

const initialState: ShoppingListState = {
    shoppingLists: {},
    activeShoppingListId: false,
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
    async (data: GetListByIdPayload, { rejectWithValue, dispatch }) => {
        const response = await getShoppingListById(data.listId);
        if (!response) {
            return rejectWithValue('Error fetching shopping list by id');
        }
        if (data.isEditing) {
            dispatch(setEditShoppingList(response));
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

export const removeItemAsync = createAsyncThunk(
    'shoppinglistitem/remove',
    async (data: ItemDto, { rejectWithValue }) => {
        const response = await removeItem(data.id);
        if (!response) {
            return rejectWithValue('Removing item failed');
        }
        return data;
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
// Returns active lists, with latest created first
export const selectActiveLists = (state: RootState): ShoppingListDto[] =>
    Object.values(state.shoppinglist.shoppingLists)
        .filter((it) => !it.ordered)
        .sort((a, b) => sortByDate(b.createdDate, a.createdDate));
// Returns inactive lists, with latest created first
export const selectInactiveLists = (state: RootState): ShoppingListDto[] =>
    Object.values(state.shoppinglist.shoppingLists)
        .filter((it) => it.ordered)
        .sort((a, b) => sortByDate(b.createdDate, a.createdDate));

export const selectShoppingListById =
    (listId: number) =>
    (state: RootState): ShoppingListDto | undefined =>
        state.shoppinglist.shoppingLists[listId];

export const selectItemById =
    (listId: number, itemId: number) =>
    (state: RootState): ItemDto | undefined =>
        state.shoppinglist.shoppingLists[listId]?.items.find(
            (it) => it.id === itemId
        );

export const selectEditShoppingListById =
    (listId: number) =>
    (state: RootState): ShoppingListDto | undefined =>
        state.shoppinglist.editShoppingList?.id === listId
            ? state.shoppinglist.editShoppingList
            : undefined;

export const selectEditItemById =
    (listId: number, itemId: number) =>
    (state: RootState): ItemDto | undefined =>
        state.shoppinglist.editShoppingList?.id === listId
            ? state.shoppinglist.editShoppingList.items.find(
                  (it) => it.id === itemId
              )
            : undefined;

export const selectActiveShoppingListId = (state: RootState): number | false =>
    state.shoppinglist.activeShoppingListId;

export const shoppingListSlice = createSlice({
    name: 'shoppinglist',
    initialState,
    reducers: {
        setActiveShoppingListId: (
            state,
            action: PayloadAction<number | false>
        ) => {
            state.activeShoppingListId = action.payload;
        },
        setEditShoppingList: (
            state,
            action: PayloadAction<ShoppingListDto | undefined>
        ) => {
            state.editShoppingList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(RESET_ALL, () => initialState)
            .addCase(getShoppingListsByOfficeAsync.pending, (state) => {
                state.shoppingLists = {};
            })
            .addCase(
                getShoppingListsByOfficeAsync.fulfilled,
                (state, action) => {
                    const shoppingLists: ShoppingListMap = {};
                    for (const list of action.payload) {
                        shoppingLists[list.id] = list;
                    }
                    state.shoppingLists = shoppingLists;
                }
            )
            .addCase(addShoppingListAsync.fulfilled, (state, action) => {
                state.shoppingLists[action.payload.id] = action.payload;
            })
            .addCase(modifyShoppingListAsync.fulfilled, (state, action) => {
                state.shoppingLists[action.payload.id] = action.payload;
            })
            .addCase(removeShoppingListAsync.fulfilled, (state, action) => {
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete state.shoppingLists[action.payload.id];
            })
            .addCase(getShoppingListByIdAsync.fulfilled, (state, action) => {
                state.shoppingLists[action.payload.id] = action.payload;
            })
            .addCase(addItemAsync.fulfilled, (state, action) => {
                if (!state.shoppingLists[action.payload.shoppingListId]) return;
                updateOrAdd(
                    state.shoppingLists[action.payload.shoppingListId].items,
                    (it) => it.id,
                    action.payload
                );
            })
            .addCase(modifyItemAsync.fulfilled, (state, action) => {
                if (!state.shoppingLists[action.payload.shoppingListId]) return;
                updateOrAdd(
                    state.shoppingLists[action.payload.shoppingListId].items,
                    (it) => it.id,
                    action.payload
                );
            })
            .addCase(removeItemAsync.fulfilled, (state, action) => {
                if (!state.shoppingLists[action.payload.shoppingListId]) return;
                state.shoppingLists[action.payload.shoppingListId].items =
                    state.shoppingLists[
                        action.payload.shoppingListId
                    ].items.filter((it) => it.id !== action.payload.id);
            })
            .addCase(setLikeStatusAsync.fulfilled, (state, action) => {
                if (!state.shoppingLists[action.payload.shoppingListId]) return;
                updateOrAdd(
                    state.shoppingLists[action.payload.shoppingListId].items,
                    (it) => it.id,
                    action.payload
                );
            });
    },
});

export const { setActiveShoppingListId, setEditShoppingList } =
    shoppingListSlice.actions;

export default shoppingListSlice.reducer;
