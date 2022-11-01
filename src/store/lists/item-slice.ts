import { createAsyncThunk } from '@reduxjs/toolkit';
import { AddItemDto } from '../../models/shopping-list/AddItemDto';
import { addItem } from './item-actions';

// TODO Move elsewhere
export interface AddItemPayload {
    data: AddItemDto;
    listId: number;
}

export const addItemAsync = createAsyncThunk(
    'auth/addItem',
    async (data: AddItemPayload, { rejectWithValue }) => {
        const response = await addItem(data.data, data.listId);
        if (!response) {
            return rejectWithValue('An error ocurred adding the item');
        }
        return response;
    }
);
