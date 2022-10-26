import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { removeShoppingListItem } from './shopping-list-item-actions';
import { ShoppingListItemState } from './shopping-list-item-types';

const initialState: ShoppingListItemState = {};

export const removeShoppingListItemAsync = createAsyncThunk(
    'shoppinglistitem/remove',
    async (itemId: number, { rejectWithValue }) => {
        const response = await removeShoppingListItem(itemId);
        if (!response) {
            return rejectWithValue('Removing item failed');
        }
        return response;
    }
);

export const shoppingListItemSlice = createSlice({
    name: 'shoppinglistitem',
    initialState,
    reducers: {},
    extraReducers: (builder) => {},
});

export default shoppingListItemSlice.reducer;
