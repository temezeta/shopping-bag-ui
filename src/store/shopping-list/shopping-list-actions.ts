import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';
import ApiClient from '../client';

export const getShoppingListsByOfficeId = async (
    officeId: number
): Promise<ShoppingListDto[] | null> => {
    const response = await ApiClient.get(`shoppinglist?officeId=${officeId}`);
    if (!response.ok) {
        return null;
    }

    return (await response.json()) as ShoppingListDto[];
};
