import { ShoppingListDto } from '../../models/shopping-list/ShoppingListDto';
import { AddShoppingListDto } from '../../models/shopping-list/AddShoppingListDto';
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

export const addShoppingList = async (
    data: AddShoppingListDto
): Promise<ShoppingListDto | null> => {
    const response = await ApiClient.post(`shoppinglist`, data);
    if (!response.ok) {
        return null;
    }

    return (await response.json()) as ShoppingListDto;
};

export const removeItem = async (itemId: number): Promise<boolean> => {
    const response = await ApiClient.delete(`Item/${itemId}`, '');
    return response.ok;
};
