import ApiClient from '../client';

export const removeShoppingListItem = async (
    itemId: number
): Promise<boolean> => {
    const response = await ApiClient.delete(`Item/${itemId}`, '');
    return response.ok;
};
