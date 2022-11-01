import { AddItemDto } from '../../models/lists/AddItemDto';
import ApiClient from '../client';

export const addItem = async (
    data: AddItemDto,
    listId: number
): Promise<AddItemDto | null> => {
    const response = await ApiClient.post(`item?listId=${listId}`, data);
    if (!response.ok) {
        return null;
    }
    return (await response.json()) as AddItemDto;
};
