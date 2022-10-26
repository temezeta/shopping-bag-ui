import { AddItemDto } from '../../models/lists/AddItemDto';
import ApiClient from '../client';

// Don't really know if we receive a boolean, the iten controler seams to give back Ok(_mapper.Map<ItemDto>(response.Data) but not really sure how to handle that.
export const addItem = async (data: AddItemDto): Promise<AddItemDto | null> => {
    const response = await ApiClient.post('item', data);
    if (!response.ok) {
        return null;
    }
    return (await response.json()) as AddItemDto;
};
