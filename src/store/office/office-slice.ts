import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OfficeDto } from '../../models/office/OfficeDto';
import { RESET_ALL, RootState } from '../store';
import { getAllOffices } from './office-actions';
import { OfficeState } from './office-types';

const initialState: OfficeState = {
    offices: [],
};

export const getAllOfficesAsync = createAsyncThunk(
    'office/get/all',
    async (_, { rejectWithValue }) => {
        const response = await getAllOffices();
        if (!response) {
            return rejectWithValue('Cannot find offices');
        }
        return response;
    }
);

// Selectors
export const selectOffices = (state: RootState): OfficeDto[] =>
    state.offices.offices;

export const officeSlice = createSlice({
    name: 'offices',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(RESET_ALL, () => initialState)
            .addCase(getAllOfficesAsync.fulfilled, (state, action) => {
                state.offices = action.payload;
            });
    },
});

export default officeSlice.reducer;
