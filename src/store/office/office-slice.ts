import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OfficeDto } from '../../models/office/OfficeDto';
import { RESET_ALL, RootState } from '../store';
import {
    addOffice,
    deleteOffice,
    editOffice,
    getAllOffices,
} from './office-actions';
import {
    AddOfficePayload,
    EditOfficePayload,
    OfficeState,
} from './office-types';

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

export const addOfficeAsync = createAsyncThunk(
    'office/add',
    async (data: AddOfficePayload, { rejectWithValue }) => {
        const response = await addOffice(data.data);
        if (!response) {
            return rejectWithValue('An error ocurred adding the office');
        }
        return response;
    }
);

export const editOfficeAsync = createAsyncThunk(
    'office/edit',
    async (data: EditOfficePayload, { rejectWithValue }) => {
        const response = await editOffice(data.data, data.officeId);
        if (!response) {
            return rejectWithValue('An error ocurred editing the office');
        }
        return response;
    }
);

export const deleteOfficeAsync = createAsyncThunk(
    'office/delete',
    async (officeId: number, { rejectWithValue }) => {
        const response = await deleteOffice(officeId);
        if (!response) {
            return rejectWithValue('An error ocurred deleting the office');
        }
        return officeId;
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
            })
            .addCase(addOfficeAsync.fulfilled, (state, action) => {
                state.offices.push(action.payload);
            })
            .addCase(editOfficeAsync.fulfilled, (state, action) => {
                const index = state.offices.findIndex(
                    (it) => it.id === action.payload.id
                );
                if (index === -1) return;
                state.offices[index] = action.payload;
            })
            .addCase(deleteOfficeAsync.fulfilled, (state, action) => {
                state.offices = state.offices.filter(
                    (it) => it.id !== action.payload
                );
            });
    },
});

export default officeSlice.reducer;
