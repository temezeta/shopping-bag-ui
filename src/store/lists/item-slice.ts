import { createAsyncThunk } from '@reduxjs/toolkit';
import { AddItemDto } from '../../models/lists/AddItemDto';
import { addItem } from './item-actions';

export const addItemAsync = createAsyncThunk(
    'auth/addItem',
    async (data: AddItemDto, { rejectWithValue }) => {
        const response = await addItem(data);
        if (!response) {
            return rejectWithValue('An error ocurred adding the item');
        }
        return response;
    }
);
