import ApiClient from '../client';

export const removeShoppingListItem = async (
    itemId: number
): Promise<boolean> => {
    const response = await ApiClient.delete(`shoppinglistitem`, itemId);
    if (!response.ok) {
        return false;
    }

    return true;
};