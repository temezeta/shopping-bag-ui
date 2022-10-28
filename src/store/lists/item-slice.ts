import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { removeShoppingListItem } from './item-actions';
import { ShoppingListItemState } from './item-types';

const initialState: ShoppingListItemState = {};

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

export const shoppingListItemSlice = createSlice({
    name: 'shoppinglistitem',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(removeShoppingListItemAsync.fulfilled, (state, action) => {
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

export default shoppingListItemSlice.reducer;
