import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getShoppingListsByOfficeId } from './shopping-list-actions';
import { ShoppingListState } from './shopping-list-types';
import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';

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
            );
    },
});

export default shoppingListSlice.reducer;
